# vscode-language-server-obsidian

## Development
During development using [ts-ast-viewer.com](https://ts-ast-viewer.com/#) to analyze source files is very helpful.

## Tests
Run `npm run test` to execute all test from the terminal. Alternatively, install the [Wallaby](https://marketplace.visualstudio.com/items?itemName=WallabyJs.wallaby-vscode) extention for VSCode to continously execute tests within the IDE.

## Debugging
1. Run `npm run watch` to compile to continiously debug the project
2. Press `cmd + shift + D`  to open the Run & Debug panel
3. Select `Client + Server` and hit the play button
4. Set break points by clicking in the gutter to the left of the code

## Publishing
1. First, make sure you have the VSCode Extension Manager (vsce) installed globally.
```shell
npm install -g @vscode/vsce
```
2. 