import { graph } from './decorators/Graph';
import { inject } from './decorators/inject/Inject';
import { injectable } from './decorators/inject/Injectable';
import { lateInject } from './decorators/inject/LateInject';
import { lifecycleBound } from './decorators/LifecycleBound';
import { provides } from './decorators/provides/Provides';
import { singleton } from './decorators/Singleton';
import _Obsidian from './Obsidian';

export * from './types';

export { graph } from './decorators/Graph';
export { singleton } from './decorators/Singleton';
export { provides } from './decorators/provides/Provides';
export { injectable } from './decorators/inject/Injectable';
export { inject } from './decorators/inject/Inject';
export { lateInject } from './decorators/inject/LateInject';
export { lifecycleBound } from './decorators/LifecycleBound';
export const Graph = graph;
export const Singleton = singleton;
export const Provides = provides;
export const Injectable = injectable;
export const Inject = inject;
export const LateInject = lateInject;
export const LifecycleBound = lifecycleBound;

export { ObjectGraph } from './graph/ObjectGraph';
export { Graph as IGraph } from './graph/Graph';
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
