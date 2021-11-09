/**
 * react-obsidian
 * Dependency injection for React and React Native
 */

/**
 * TODO: document
 */
import _Graph from './obsidian/Graph';
import _ObjectGraph from './obsidian/ObjectGraph';
import _injectHook from './obsidian/injectHook';
import _injectComponent from './obsidian/injectComponent';
import _Provides from './obsidian/Provides';
import { Inject as _Inject, Injectable as _Injectable } from './obsidian/injectClass';
import _obsidian from './obsidian/Obsidian';

export const Graph = _Graph;
export const ObjectGraph = _ObjectGraph;
export const injectHook = _injectHook;
export const injectComponent = _injectComponent;
export const Provides = _Provides;
export const Injectable = _Injectable;
export const Inject = _Inject;
export const Obsidian = new _obsidian();
