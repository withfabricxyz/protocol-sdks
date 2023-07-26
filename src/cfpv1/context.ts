import { TransactionReceipt, zeroAddress } from 'viem';
import { prepareTokenApproval } from '../erc20/index.js';
import {
  CampaignState,
  AccountState,
  prepareCampaignContribution,
  fetchCampaignAccountContext,
  prepareCampaignFundsTransfer,
  prepareCampaignYield,
  prepareCampaignWithdraw,
} from './campaign.js';

export type Holdings = {
  /** The amount of tokens held */
  balance: bigint;
  /** The amount of tokens approved for use (ERC20 only) */
  approved?: bigint;
};

export enum CampaignPreflightResult {
  CONTRIBUTE_CAPPED = 'Campaign max goal already met',
  CONTRIBUTE_NOT_STARTED = 'Campaign is not yet accepting contributions',
  CONTRIBUTE_ENDED = 'Campaign has ended',
  CONTRIBUTE_NOT_ALLOWED = 'Contributions are not allowed at this time',
  CONTRIBUTE_TOO_LOW = 'Contribution amount below minimum allowed contribution',
  CONTRIBUTE_TOO_HIGH = 'Contribution amount exceeds maximum allowed contribution',
  INSUFFICIENT_FUNDS = 'Insufficient funds for transfer',
  WITHDRAW_NOT_ALLOWED = 'Withdraws are not allowed at this time',
  WITHDRAW_NO_FUNDS = 'No funds to withdraw',
  WITHDRAW_NO_YIELD = 'No yield to withdraw',
  YIELD_NOT_ALLOWED = 'Yield is not allowed at this time',
  TRANSFER_NOT_ALLOWED = 'Transfers are not allowed at this time',
}

/**
 * Thrown when a prepare action fails preflight checks
 */
export class CampaignPreflightError extends Error {
  constructor(readonly failedChecks: CampaignPreflightResult[]) {
    super('Campaign action preflight checks failed: ' + failedChecks.join(', '));
  }
}

/**
 * A context object that provides information about the state of a campaign, the state of an account, and the holdings of an account.
 *
 * The context object also provides methods to prepare and execute transactions for the account to interact with the campaign.
 */
export class CampaignAccountContext {
  state: CampaignState;
  account: AccountState;
  holdings: Holdings;

  private approveTxn?: () => Promise<TransactionReceipt>;
  private contributeTxn?: () => Promise<TransactionReceipt>;
  private transferTxn?: () => Promise<TransactionReceipt>;
  private yieldTxn?: () => Promise<TransactionReceipt>;
  private withdrawTxn?: () => Promise<TransactionReceipt>;

  /**
   *
   * @param state The campaign state
   * @param account The account state
   * @param holdings The token holdings of the account (ERC-20 or Native, depending on the campaign)
   */
  constructor(state: CampaignState, account: AccountState, holdings: Holdings) {
    this.state = state;
    this.account = account;
    this.holdings = holdings;
  }

  /// Preflight ///

  /**
   *
   * @param numTokens The amount of tokens to contribute
   * @returns An array of CampaignPreflightResult values indicating the reasons why the contribution is not possible in this context
   */
  getContributePreflightResults(numTokens: bigint) : CampaignPreflightResult[] {
    const errors = [];

    if (!this.state.isContributionAllowed) {
      if (this.state.isEnded) {
        errors.push(CampaignPreflightResult.CONTRIBUTE_ENDED);
      } else if (!this.state.isStarted) {
        errors.push(CampaignPreflightResult.CONTRIBUTE_NOT_STARTED);
      } else if (this.state.totalSupply >= this.state.goalMax) {
        errors.push(CampaignPreflightResult.CONTRIBUTE_CAPPED);
      } else {
        errors.push(CampaignPreflightResult.CONTRIBUTE_NOT_ALLOWED);
      }
    }

    if (numTokens < this.account.minAllowedContribution) {
      errors.push(CampaignPreflightResult.CONTRIBUTE_TOO_LOW);
    }

    if (numTokens > this.account.maxAllowedContribution) {
      errors.push(CampaignPreflightResult.CONTRIBUTE_TOO_HIGH);
    }

    // Account specific
    if (numTokens > this.holdings.balance) {
      errors.push(CampaignPreflightResult.INSUFFICIENT_FUNDS);
    }

    return errors;
  }

  /**
   * @returns An array of CampaignPreflightResult values indicating the reasons why the withdraw is not possible in this context
   */
  getWithdrawPreflightResults() : CampaignPreflightResult[] {
    const errors = [];

    if (!this.state.isWithdrawAllowed) {
      errors.push(CampaignPreflightResult.WITHDRAW_NOT_ALLOWED);
    }

    if (this.state.isEnded) {
      if (!this.isFunded() && this.account.contributionTokenBalance === 0n) {
        errors.push(CampaignPreflightResult.WITHDRAW_NO_FUNDS);
      } else if (this.isFunded() && this.account.yieldTokenBalance === 0n) {
        errors.push(CampaignPreflightResult.WITHDRAW_NO_YIELD);
      }
    }

    return errors;
  }

  /**
   * @returns An array of CampaignPreflightResult values indicating the reasons why the transfer is not possible in this context
   */
  getTransferPreflightResults() : CampaignPreflightResult[] {
    if (this.state.isTransferAllowed) {
      return [];
    }
    return [CampaignPreflightResult.TRANSFER_NOT_ALLOWED];
  }

  /**
   *
   * @param numTokens The amount of tokens to yield
   * @returns An array of CampaignPreflightResult values indicating the reasons why the yield is not possible in this context
   */
  getYieldPreflightResults(numTokens: bigint) : CampaignPreflightResult[] {
    const errors = [];
    if(!this.isFunded() || this.state.isTransferAllowed) {
      errors.push(CampaignPreflightResult.YIELD_NOT_ALLOWED);
    }
    if (numTokens > this.holdings.balance) {
      errors.push(CampaignPreflightResult.INSUFFICIENT_FUNDS);
    }
    return errors;
  }

  /**
   *
   * @param numTokens The amount of tokens to contribute
   * @returns true if the contribution is possible in this context
   */
  isContributionPossible(numTokens: bigint) : boolean {
    return this.getContributePreflightResults(numTokens).length === 0;
  }

  /**
   *
   * @returns true if a withdraw is possible in this context
   */
  isWithdrawPossible() : boolean {
    return this.getWithdrawPreflightResults().length === 0;
  }

  /**
   *
   * @returns true if balance transfer to recipient is possible in this context
   */
  isTransferPossible() : boolean {
    return this.getTransferPreflightResults().length === 0;
  }

  /**
   *
   * @param numTokens The amount of tokens to yield
   * @returns true if the yield is possible in this context
   */
  isYieldPossible(numTokens: bigint) : boolean {
    return this.getYieldPreflightResults(numTokens).length === 0;
  }

  /// Transactions ///

  private raiseOnPreflightFailure(fn: () => CampaignPreflightResult[]) : void {
    const errors = fn();
    if (errors.length > 0) {
      throw new CampaignPreflightError(errors);
    }
  }

  /// Token Approval ///

  /**
   * @description Prepare a token approval transaction for the account to approve the campaign to spend tokens on its behalf
   * @param numTokens The amount of tokens to approve
   * @returns An async closure which will execute the transaction when called
   */
  async prepareTokenApproval(numTokens: bigint) : Promise<void> {
    this.approveTxn = await prepareTokenApproval({
      address: this.state.erc20Address,
      spender: this.state.address,
      amount: numTokens,
    });
  }

  /**
   * @description Check if a token approval transaction is prepared
   * @returns true if a token approval transaction is prepared
   */
  isApprovalPrepared() : boolean {
    return this.approveTxn !== undefined;
  }

  /**
   * @description Execute the prepared token approval transaction
   * @returns The transaction receipt
   */
  async executeTokenApproval() : Promise<TransactionReceipt> {
    const call = this.approveTxn;
    if (!call) {
      throw new Error('No token approval transaction prepared');
    }
    this.approveTxn = undefined;
    return await call();
  }

  /// Contribute ///

  /**
   * @description Prepare a contribution transaction for the account to contribute tokens to the campaign
   * @param numTokens The amount of tokens to contribute
   * @returns An async closure which will execute the transaction when called
   */
  async prepareContribution(numTokens: bigint) : Promise<void> {
    this.contributeTxn = undefined;
    this.raiseOnPreflightFailure(() => this.getContributePreflightResults(numTokens));
    this.contributeTxn = await prepareCampaignContribution({
      campaignAddress: this.state.address,
      amount: numTokens,
      erc20: this.isERC20Denominated(),
    });
  }

  /**
   * @description Check if a contribution transaction is prepared
   * @returns true if a contribution transaction is prepared
   */
  isContributionPrepared() : boolean {
    return this.contributeTxn !== undefined;
  }

  /**
   * @description Execute the prepared contribution transaction
   * @returns The transaction receipt
   */
  async executeContribution() : Promise<TransactionReceipt> {
    const call = this.contributeTxn;
    if (!call) {
      throw new Error('No contribute transaction prepared');
    }
    this.contributeTxn = undefined;
    return await call();
  }

  /// Transfer ///

  /**
   * @description Prepare a transfer transaction for the account to transfer tokens from the campaign to receipient
   * @returns An async closure which will execute the transaction when called
   */
  async prepareTransfer() : Promise<void> {
    this.transferTxn = undefined;
    this.raiseOnPreflightFailure(() => this.getTransferPreflightResults());
    this.transferTxn = await prepareCampaignFundsTransfer({
      campaignAddress: this.state.address,
    });
  }

  /**
   * @description Check if a transfer transaction is prepared
   * @returns true if a transfer transaction is prepared
   */
  isTransferPrepared() : boolean {
    return this.transferTxn !== undefined;
  }

  /**
   * @description Execute the prepared transfer transaction
   * @returns The transaction receipt
   */
  async executeTransfer() : Promise<TransactionReceipt> {
    const call = this.transferTxn;
    if (!call) {
      throw new Error('No transfer transaction prepared');
    }
    this.transferTxn = undefined;
    return await call();
  }

  /// Yield ///

  /**
   * @description Prepare a yield transaction for the account to yield tokens to the campaign and contributors
   * @param numTokens The amount of tokens to yield
   * @returns An async closure which will execute the transaction when called
   */
  async prepareYield(numTokens: bigint) : Promise<void> {
    this.yieldTxn = undefined;
    this.raiseOnPreflightFailure(() => this.getYieldPreflightResults(numTokens));
    this.yieldTxn = await prepareCampaignYield({
      campaignAddress: this.state.address,
      amount: numTokens,
      erc20: this.isERC20Denominated(),
    });
  }

  /**
   * @description Check if a yield transaction is prepared
   * @returns true if a yield transaction is prepared
   */
  isYieldPrepared() : boolean {
    return this.yieldTxn !== undefined;
  }

  /**
   * @description Execute the prepared yield transaction
   * @returns The transaction receipt
   */
  async executeYield() : Promise<TransactionReceipt> {
    const call = this.yieldTxn;
    if (!call) {
      throw new Error('No yield transaction prepared');
    }
    this.yieldTxn = undefined;
    return await call();
  }

  /// Withdraw ///

  /**
   * @description Prepare a withdraw transaction for the account to withdraw tokens from the campaign
   * @returns An async closure which will execute the transaction when called
   */
  async prepareWithdraw() : Promise<void> {
    this.withdrawTxn = undefined;
    this.raiseOnPreflightFailure(() => this.getWithdrawPreflightResults());
    this.withdrawTxn = await prepareCampaignWithdraw({
      campaignAddress: this.state.address,
    });
  }

  /**
   * @description Check if a withdraw transaction is prepared
   * @returns true if a withdraw transaction is prepared
   */
  isWithdrawPrepared() : boolean {
    return this.withdrawTxn !== undefined;
  }

  /**
   * @description Execute the prepared withdraw transaction
   * @returns The transaction receipt
   */
  async executeWithdraw() : Promise<TransactionReceipt> {
    const call = this.withdrawTxn;
    if (!call) {
      throw new Error('No withdraw transaction prepared');
    }
    this.withdrawTxn = undefined;
    return await call();
  }

  /// Helpers ///

  /**
   * @returns true if the campaign is funded (goal max met or goal min met and ended)
   */
  isFunded() : boolean {
    return this.state.isGoalMaxMet || (this.state.isGoalMinMet && this.state.isEnded);
  }

  /**
   * @returns true if the campaign is denominated in an ERC-20 token
   */
  isERC20Denominated() : boolean {
    return this.state.erc20Address !== zeroAddress;
  }

  /**
   * @param numTokens The amount of tokens to check
   * @returns true if the campaign is ERC-20 denominated and the accounts approved token amount is less than the token amount
   */
  isTokenApprovalRequired(numTokens: bigint) : boolean {
    return this.isERC20Denominated() && numTokens > this.holdings.approved!;
  }

  /**
   * @returns A refreshed CampaignAccountContext with updated state from the blockchain
   */
  async refresh() : Promise<CampaignAccountContext> {
    return fetchCampaignAccountContext({ campaignAddress: this.state.address, account: this.account.address });
  }
}

