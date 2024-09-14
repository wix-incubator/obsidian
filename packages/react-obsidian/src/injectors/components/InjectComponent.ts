import React from 'react';
import { ObjectGraph } from '../../graph/ObjectGraph';
import { Constructable } from '../../types';
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
  Graph: Constructable<ObjectGraph>,
) => {
  assertGraph(Graph, Target);

  return componentInjector.inject(Target, Graph) as React.FunctionComponent<
    InjectedProps extends Discriminator ?
      OwnProps extends Discriminator ? Partial<OwnProps> : OwnProps :
      OwnProps extends InjectedProps ? Partial<OwnProps> : OwnProps & Partial<InjectedProps>
  >;
};
function assertGraph(Graph: Constructable<ObjectGraph<unknown>>, Target: any) {
  if (!Graph) {
    throw new Error(
      `injectComponent was called with an undefined Graph.`
      + `This is probably not an issue with Obsidian.`
      + `It's typically caused by circular dependencies.`
      + ` Check the implementation of ${Target.name}.`,
    );
  }
}
