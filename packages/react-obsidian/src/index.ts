import { graph } from './decorators/Graph';
import { inject } from './decorators/inject/Inject';
import { injectable } from './decorators/injectable/Injectable';
import { lateInject } from './decorators/lateInject/LateInject';
import { lifecycleBound } from './decorators/LifecycleBound';
import { provides } from './decorators/provides/Provides';
import { singleton } from './decorators/singleton/Singleton';
import _Obsidian from './Obsidian';
import { isReactAvailable, createReactRequiredError, createReactRequiredClass } from './utils/reactAvailability';

export * from './types';

export { graph } from './decorators/Graph';
export { singleton } from './decorators/singleton/Singleton';
export { ObjectGraph } from './graph/ObjectGraph';
export { Graph as IGraph } from './graph/Graph';
export { provides } from './decorators/provides/Provides';
export { injectable } from './decorators/injectable/Injectable';
export { inject } from './decorators/inject/Inject';
export { lateInject } from './decorators/lateInject/LateInject';
export { lifecycleBound } from './decorators/LifecycleBound';
export { GraphMiddleware } from './graph/registry/GraphMiddleware';
export { GraphResolveChain as ResolveChain } from './graph/registry/GraphResolveChain';

/**
 * @deprecated Uppercase decorators are deprecated in favor of lowercase decorators to align with common naming conventions. Please use `@graph` instead.
 */
export const Graph = graph;
/**
 * @deprecated Uppercase decorators are deprecated in favor of lowercase decorators to align with common naming convention. Please use `@singleton` instead.
 */
export const Singleton = singleton;
/**
 * @deprecated Uppercase decorators are deprecated in favor of lowercase decorators to align with common naming convention. Please use `@provides` instead.
 */
export const Provides = provides;
/**
 * @deprecated Uppercase decorators are deprecated in favor of lowercase decorators to align with common naming convention. Please use `@injectable` instead.
 */
export const Injectable = injectable;
/**
 * @deprecated Uppercase decorators are deprecated in favor of lowercase decorators to align with common naming convention. Please use `@inject` instead.
 */
export const Inject = inject;
/**
 * @deprecated Uppercase decorators are deprecated in favor of lowercase decorators to align with common naming convention. Please use `@lateInject` instead.
 */
export const LateInject = lateInject;
/**
 * @deprecated Uppercase decorators are deprecated in favor of lowercase decorators to align with common naming convention. Please use `@lifecycleBound` instead.
 */
export const LifecycleBound = lifecycleBound;

export const Obsidian = new _Obsidian();

export { Observable } from './observable/Observable';
export { MediatorObservable } from './observable/mediator/MediatorObservable';
export { OnNext, Unsubscribe } from './observable/types';

export { mockGraphs } from '../testkit/mockGraphs';

// ============================================================================
// React-dependent exports (conditionally loaded)
// ============================================================================
const reactAvailable = isReactAvailable();

import type { injectComponent as injectComponentType } from './injectors/components/InjectComponent';
import type {
  injectHook as injectHookType,
  injectHookWithArguments as injectHookWithArgumentsType,
} from './injectors/hooks/InjectHook';
import type { useObserver as useObserverType } from './observable/useObserver';
import type { useObservers as useObserversType } from './observable/useObservers';
import type { Model as ModelType } from './model/Model';
import type { mockModel as mockModelType } from '../testkit/index';

export const injectComponent: typeof injectComponentType = reactAvailable
  ? require('./injectors/components/InjectComponent').injectComponent
  : createReactRequiredError('injectComponent');

export const injectHook: typeof injectHookType = reactAvailable
  ? require('./injectors/hooks/InjectHook').injectHook
  : createReactRequiredError('injectHook');

export const injectHookWithArguments: typeof injectHookWithArgumentsType = reactAvailable
? require('./injectors/hooks/InjectHook').injectHookWithArguments
  : createReactRequiredError('injectHookWithArguments');

export const useObserver: typeof useObserverType = reactAvailable
  ? require('./observable/useObserver').useObserver
  : createReactRequiredError('useObserver');

export const useObservers: typeof useObserversType = reactAvailable
  ? require('./observable/useObservers').useObservers
  : createReactRequiredError('useObservers');

export const Model: typeof ModelType = reactAvailable
  ? require('./model/Model').Model
  : createReactRequiredClass('Model');

export const testKit = reactAvailable
  ? require('../testkit/index').testKit
  : createReactRequiredError('testKit');

export const mockModel: typeof mockModelType = reactAvailable
  ? require('../testkit/index').mockModel
  : createReactRequiredError('mockModel');
