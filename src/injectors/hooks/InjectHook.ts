import { ObjectGraph } from '../../graph/ObjectGraph';
import { Constructable } from '../../types';
import HookInjector from './HookInjector';

interface Descriminator {
  obsidianDescriminator: string;
}

const hookInjector = new HookInjector();
export const injectHook = <OwnProps = Descriminator, InjectedProps = Descriminator, Result = unknown> (
  hook: (props: (
    OwnProps extends infer P ? OwnProps extends Descriminator ? P : OwnProps : never) &
  (InjectedProps extends Descriminator ? any : InjectedProps
  )) => Result,
  Graph: Constructable<ObjectGraph>,
) => hookInjector.inject(hook, Graph) as (props: InjectedProps extends Descriminator ?
    OwnProps extends Descriminator ? Partial<OwnProps> : OwnProps :
    OwnProps extends InjectedProps ? Partial<OwnProps> : OwnProps & Partial<InjectedProps>) => Result;
