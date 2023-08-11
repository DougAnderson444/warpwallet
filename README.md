# Secure Bookmark Wallet

A Secure Bookmark Wallet. Set Warp Wallet up with a Libp2p Request-Response protocol that uses a Wurbo WIT UI handler to generate proofs

## Wallet Design

The standalone wallet is in the [wallet](/wallet) folder. It builds to a single file app that has an [integrity hash](https://coins.github.io/secure-bookmark/) that can be bookmarked and verified witht he browser when in use.

### Build Inner Wallet

```bash
cd wallet
npm install
npm run build
```

This build step will put the assets in the [wallet/dist](/wallet/dist) folder.

## Wallet Loader

The loader is a simple Svelte app that loads the wallet and provides a UI for the user to interact with the wallet.

### Wrapping build step

Once the [wallet](/wallet) has been built, the [/wallet/dist/index.html](/wallet/dist/index.html) needs to be wrapped in a javascript loader that can be called from the loader app below. This step is done in [vite.config.js](/vite.config.js) by the loader.

This wrapping step is doen using base64 encoding so that the Javascript can be embedded without causing any conflicts with the loader JavaScript.

## Future Work: Extensibility

TODO: This wallet loader _could_ load other people's modules using the WebAssembly WIT Component and the `wurbo` framework. This would allow for a plugin system to be built on top of the wallet to extend functionality.
