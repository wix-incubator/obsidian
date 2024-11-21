A demo project showcasing how to integrate Obsidian with Vite and SWC.

## Running the project
```bash
yarn install
yarn dev
```
Then open the app at `http://localhost:5173/`

## Debugging
To debug the SWC plugin, you can run `yarn dev:debug` which will open Chrome with the DevTools attached. Additionally, you can open the plugin inspector at `http://localhost:5173/__inspect/` to view the transpiled code.

## Notes
The app is using [unplugin-swc](https://github.com/unplugin/unplugin-swc) to configure SWC. It's a drop in replacement for [vite-plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) and supports the same functionality while providing a more flexible API.
