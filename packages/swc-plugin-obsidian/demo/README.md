# Getting Start

Install `yalc` to troubleshoot

In the `swc-plugin-obsidian` run `yalc publish`

Within the `vite-app` folder, run `yarn install`

Run `yalc add swc-plugin-obsidian@3.0.0-alpha.6`

Run `yarn dev` to spin up the project and open in browser at `http://localhost:5173/`

Open the plugin inspector at `http://localhost:5173/__inspect/`

## Running Tests

There is a minimal test that can be run with `yarn test`. It will assert against the dom to check if the dependency was injected correctly.

## Notes

The obsidian plugin is commented out by default in the `vite.config.ts` file.
Uncomment this line and it's import to begin troubleshooting.

## Known Issues

The `obsidian` plugin interferes with the react plugin, which automagically imports `React` into any tsx files. So there is as compile error that the `React` import was not found. You can work around this by importing `React` in `main.tsx` but this shouldn't be necessary.

The `obsidian` plugin seems to mangle _any_ ts and tsx file. Ideally, it should only mangle files with obsidian decorators.
