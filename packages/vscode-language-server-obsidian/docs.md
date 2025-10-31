# vscode-language-server-obsidian

## Development
During development using [ts-ast-viewer.com](https://ts-ast-viewer.com/#) to analyze source files is very helpful.

## Tests
Run `npm run test` to execute all test from the terminal. Alternatively, install the [Wallaby](https://marketplace.visualstudio.com/items?itemName=WallabyJs.wallaby-vscode) extention to continuously execute tests within VSCode.

## Debugging
1. Run `npm run watch` to compile to continuously debug the project
2. Press `cmd + shift + D`  to open the Run & Debug panel
3. Select `Client + Server` and hit the play button
4. Set break points by clicking in the gutter to the left of the code

## Publishing
First, make sure you have the VSCode Extension Manager (vsce) installed globally.
```shell
npm install -g @vscode/vsce
```

Use `vsce` to package and publish the extension. Run `vsce package --no-dependencies` to generate a `.vsix` file which can be installed in VSCode by running `code --install-extension <path-to-vsix-file>`.

Note: The `--no-dependencies` flag is required because this is a Yarn workspace monorepo. The extension bundles all required code via esbuild, so no separate dependency packaging is needed.