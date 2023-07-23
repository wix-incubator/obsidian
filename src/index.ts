import _Obsidian from './Obsidian';

export * from './types';

export { Graph } from './decorators/Graph';
export { Singleton } from './decorators/Singleton';
export { ObjectGraph } from './graph/ObjectGraph';
export { Graph as IGraph } from './graph/Graph';
export { Provides } from './decorators/provides/Provides';
export { Injectable } from './decorators/inject/Injectable';
export { Inject } from './decorators/inject/Inject';
export { LateInject } from './decorators/inject/LateInject';
export { LifecycleBound } from './decorators/LifecycleBound';
export { GraphMiddleware } from './graph/registry/GraphMiddleware';
export { GraphResolveChain as ResolveChain } from './graph/registry/GraphResolveChain';

export const Obsidian = new _Obsidian();

export { injectComponent } from './injectors/components/InjectComponent';
export { injectHook, injectHookWithArguments } from './injectors/hooks/InjectHook';

export { useObserver } from './observable/useObserver';
export { useObservers } from './observable/useObservers';
export { Observable } from './observable/Observable';
export { MediatorObservable } from './observable/mediator/MediatorObservable';
export { OnNext, Unsubscribe } from './observable/types';

export { Model } from './model/Model';

export { testKit } from '../testkit';
export { mockModel, mockGraphs } from '../testkit/index';
