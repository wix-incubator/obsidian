import _Obsidian from './Obsidian';

export * from './types';

export { graph } from './decorators/Graph';
export { singleton } from './decorators/Singleton';
export { ObjectGraph } from './graph/ObjectGraph';
export { Graph as IGraph } from './graph/Graph';
export { provides } from './decorators/provides/Provides';
export { injectable } from './decorators/inject/Injectable';
export { inject } from './decorators/inject/Inject';
export { lateInject } from './decorators/inject/LateInject';
export { lifecycleBound } from './decorators/LifecycleBound';
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
