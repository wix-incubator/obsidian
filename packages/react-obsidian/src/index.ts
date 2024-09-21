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

/**
 * @deprecated Uppercase decorators are deprecated in favor of lowercase decorators to align with common naming conventions. Please use inject instead.
 */
export const Graph = graph;

/**
 * @deprecated Uppercase decorators are deprecated in favor of lowercase decorators to align with common naming convention. Please use `singleton` instead.
 */
export const Singleton = singleton;

/**
 * @deprecated Uppercase decorators are deprecated in favor of lowercase decorators to align with common naming convention. Please use `provides` instead.
 */
export const Provides = provides;

/**
 * @deprecated Uppercase decorators are deprecated in favor of lowercase decorators to align with common naming convention. Please use `injectable` instead.
 */
export const Injectable = injectable;

/**
 * @deprecated Uppercase decorators are deprecated in favor of lowercase decorators to align with common naming convention. Please use `inject` instead.
 */
export const Inject = inject;

/**
 * @deprecated Uppercase decorators are deprecated in favor of lowercase decorators to align with common naming convention. Please use `lateInject` instead.
 */
export const LateInject = lateInject;

/**
 * @deprecated Uppercase decorators are deprecated in favor of lowercase decorators to align with common naming convention. Please use `lifecycleBound` instead.
 */
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
