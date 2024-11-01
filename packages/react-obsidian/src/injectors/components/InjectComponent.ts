import React from 'react';
import { ObjectGraph } from '../../graph/ObjectGraph';
import { Constructable } from '../../types';
import { isString } from '../../utils/isString';
import ComponentInjector from './ComponentInjector';

interface Discriminator {
  obsidianDiscriminator: never;
}

const componentInjector = new ComponentInjector();

export const injectComponent = <OwnProps = Discriminator, InjectedProps = Discriminator> (
  Target: React.FunctionComponent<
  (OwnProps extends infer P ? OwnProps extends Discriminator ? P : OwnProps : never) &
  (InjectedProps extends Discriminator ? any : InjectedProps)
  >,
  keyOrGraph: string | Constructable<ObjectGraph>,
) => {
  assertGraph(keyOrGraph, Target);

  return componentInjector.inject(Target, keyOrGraph) as React.FunctionComponent<
    InjectedProps extends Discriminator ?
      OwnProps extends Discriminator ? Partial<OwnProps> : OwnProps :
      OwnProps extends InjectedProps ? Partial<OwnProps> : OwnProps & Partial<InjectedProps>
  >;
};
function assertGraph(keyOrGraph: string | Constructable<ObjectGraph>, Target: any) {
  if (!isString(keyOrGraph) && !keyOrGraph) {
    throw new Error(
      `injectComponent was called with an undefined Graph.`
      + `This is probably not an issue with Obsidian.`
      + `It's typically caused by circular dependencies.`
      + ` Check the implementation of ${Target.name}.`,
    );
  }
}
