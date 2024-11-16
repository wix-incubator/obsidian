const path = require('path');

const plugin = () => {
  return [path.join(__dirname, 'swc_plugin_obsidian.wasm'), {}];
}

module.exports = plugin;
