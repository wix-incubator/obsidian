import _Graph from './Graph';
import _ObjectGraph from './ObjectGraph';
import _injectHook from './injectHook';
import _injectComponent from './injectComponent';
import _Provides from './Provides';
import { Inject as _Inject, Injectable as _Injectable } from './injectClass';
import _obsidian from './Obsidian';

export const Graph = _Graph;
export const ObjectGraph = _ObjectGraph;
export const injectHook = _injectHook;
export const injectComponent = _injectComponent;
export const Provides = _Provides;
export const Injectable = _Injectable;
export const Inject = _Inject;
export const Obsidian = new _obsidian();
