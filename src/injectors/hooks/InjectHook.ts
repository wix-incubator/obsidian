/* eslint-disable max-len */
import { ObjectGraph } from '../../graph/ObjectGraph';
import { Constructable } from '../../types';
import HookInjector from './HookInjector';

const hookInjector = new HookInjector();

// TypeScript doesn't infer generics when default types are passed in. - https://github.com/microsoft/TypeScript/issues/14400
// As a workaround, we provide two injection functions with an almost identical signature.
// 1. injectHookWithArguments: Should be used when a hook requires parameters in addition to the injected dependencies.
// 2. injectHook: Should be used when a hook does not require parameters.

export function injectHookWithArguments<Injected, Own, Result = {}>(
  hook: (args: Injected & Own) => Result,
  Graph: Constructable<ObjectGraph>,
): (props: Own & Partial<Injected>) => Result {
  return hookInjector.inject(hook, Graph) as (props: Own & Partial<Injected>) => Result;
}

export function injectHook<Injected, Result = {}>(
  hook: (args: Injected) => Result,
  Graph: Constructable<ObjectGraph>,
): (props?: Partial<Injected>) => Result {
  return hookInjector.inject(hook, Graph);
}
