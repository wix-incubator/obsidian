import React from 'react';
import { Constructable } from '@Obsidian';
import _Graph from './decorators/Graph';
import _ObjectGraph from './graph/ObjectGraph';
import _injectHook from './injectHook';
import ComponentInjector from './injectors/components/ComponentInjector';
import _Provides from './Provides';
import { Inject as _Inject, Injectable as _Injectable } from './decorators/injectClass';
import _obsidian from './Obsidian';
import _testKit from './testKit/TestKit';

export const Graph = _Graph;
export const ObjectGraph = _ObjectGraph;
export const injectHook = _injectHook;
export const Provides = _Provides;
export const Injectable = _Injectable;
export const Inject = _Inject;
export const Obsidian = new _obsidian();

const componentInjector = new ComponentInjector();
export const injectComponent = <P> (
  __Target: React.FunctionComponent<P>,
  __Graph: Constructable<_ObjectGraph>,
) => componentInjector.inject(__Target, __Graph);

export const TestKit = _testKit;
