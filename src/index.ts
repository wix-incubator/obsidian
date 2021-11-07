/**
 * react-obsidian
 * Dependency injection for React and React Native
 */

/**
 * TODO: document
 */
import _Graph from './obsidian/Graph';
import _injectHook from './obsidian/injectHook';
import _obsidian from './obsidian/Obsidian';

export const Graph = _Graph;
export const injectHook = _injectHook;
export const Obsidian = new _obsidian();

// export const Obsidian =
