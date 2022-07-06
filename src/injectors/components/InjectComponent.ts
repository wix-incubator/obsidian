import { ObjectGraph } from '../../graph/ObjectGraph';
import { Constructable } from '../../types';
import ComponentInjector from './ComponentInjector';

interface Descriminator {
  obsidianDescriminator: never;
}

const componentInjector = new ComponentInjector();

export const injectComponent = <OwnProps = Descriminator, InjectedProps = Descriminator> (
  Target: React.FunctionComponent<
  (OwnProps extends infer P ? OwnProps extends Descriminator ? P : OwnProps : never) &
  (InjectedProps extends Descriminator ? any : InjectedProps)
  >,
  Graph: Constructable<ObjectGraph>,
) => componentInjector.inject(Target, Graph) as React.FunctionComponent<
  InjectedProps extends Descriminator ?
    OwnProps extends Descriminator ? Partial<OwnProps> : OwnProps :
    OwnProps extends InjectedProps ? Partial<OwnProps> : OwnProps & Partial<InjectedProps>
  >;
