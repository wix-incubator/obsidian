import _Obsidian from './Obsidian';

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

export { injectComponent } from './injectors/components/InjectComponent';
export { injectHook } from './injectors/hooks/InjectHook';

export { testKit } from '../testkit';
