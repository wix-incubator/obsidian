import { FunctionalComponent } from '../../dto/functionalComponent';
import type { Generics } from '../../dto/generics';
import type { Variable } from '../../dto/variable';
import { equals, isEmpty } from '../../utils/array';

export class TypeValidator {
  public validate(injectedComponent?: Variable, generics?: Generics) {
    if (!injectedComponent) return { isError: false };
    const componentProps = new FunctionalComponent(injectedComponent.arrowFunction).props.type.asString();
    const injectComponentGenerics = generics?.types;

    if (
      (isEmpty(componentProps) || equals(componentProps, injectComponentGenerics)) ||
      (equals(componentProps, ['Injected']) && isEmpty(injectComponentGenerics))
    ) return { isError: false };

    return { isError: true, componentProps };
  }
}