import React from 'react';
import { ObjectGraph as _ObjectGraph } from './graph/ObjectGraph';
import ComponentInjector from './injectors/components/ComponentInjector';
import _Obsidian from './Obsidian';
import HookInjector from './injectors/hooks/HookInjector';
import { Constructable } from './types';

export * from './types';

export { Graph } from './decorators/Graph';
export { Singleton } from './decorators/Singleton';
export { ObjectGraph } from './graph/ObjectGraph';
export { Graph as IGraph } from './graph/Graph';
export { Provides } from './decorators/provides/Provides';
export { Injectable } from './decorators/inject/Injectable';
export { Inject } from './decorators/inject/Inject';
export { LazyInject } from './decorators/inject/LazyInject';
export { GraphMiddleware } from './graph/registry/GraphMiddleware';
export { GraphResolveChain as ResolveChain } from './graph/registry/GraphResolveChain';
export const Obsidian = new _Obsidian();

const componentInjector = new ComponentInjector();
export const injectComponent = <P> (
  Target: React.FunctionComponent<P>,
  Graph: Constructable<_ObjectGraph>,
) => componentInjector.inject(Target, Graph);

const hookInjector = new HookInjector();
export const injectHook = <Args, Result> (
  hook: (args: Args) => Result,
  Graph: Constructable<_ObjectGraph>,
) => hookInjector.inject(hook, Graph);
