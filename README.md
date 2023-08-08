# Fabric Protocol SDKs

SDK monorepo for Fabric EVM protocols.

[![npm (tag)](https://img.shields.io/npm/v/@withfabric/protocol-sdks)](https://www.npmjs.com/package/@withfabric/protocol-sdks)
[![CI Tests](https://github.com/withfabricxyz/protocol-sdks/actions/workflows/test.yml/badge.svg?branch=main)](https://github.com/withfabricxyz/protocol-sdks/actions/workflows/test.yml)
![npm bundle size (version)](https://img.shields.io/bundlephobia/minzip/@withfabric/protocol-sdks)

### Peer Dependencies

* viem
* wagmi-core

If you don't use wagmi or wagmi-core, you can leverage the protocols directly; [see our docs](https://docs.withfabric.xyz).

### Installation

```
npm i viem @wagmi/core @withfabric/protocol-sdks
```

### Protocols

#### CFPv1 - Crowd Financing Protocol

The Fabric CrowdFi protocol moves capital between creators and communities.

* [Documentation](https://docs.withfabric.xyz/crowdfi/overview)
* [Code](src/cfpv1)

#### STPv1 - Subscription Token Protocol

The Fabric Subscription Token Protocol provides onchain recurring revenue for creators and businesses.

* [Documentation](https://docs.withfabric.xyz/stp/overview)
* [Code](src/stpv1)

### Contributing / Running

In order to make changes, fork/clone the repo and run the setup script.

```
./script/setup
```

Tests can be run using

```
npm run test
```

We accept contributions via pull-request to the main branch. Please ensure your branch is rebased and squashed before issuing a PR.