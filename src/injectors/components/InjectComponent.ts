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
) => componentInjector.inject(Target, Graph) as React.FunctionComponent<
  InjectedProps extends Discriminator ?
    OwnProps extends Discriminator ? Partial<OwnProps> : OwnProps :
    OwnProps extends InjectedProps ? Partial<OwnProps> : OwnProps & Partial<InjectedProps>
  >;
