import { isEqual } from 'lodash';
import { FunctionalComponent } from '../../dto/functionalComponent';
import type { Generics } from '../../dto/generics';
import { TypeLiteral } from '../../dto/typeLiteral';
import type { Variable } from '../../dto/variable';
import { isEmpty } from '../../utils/array';
import type { Type } from '../../dto/type';

export class TypeValidator {
  public validate(injectedComponent?: Variable, generics?: Generics) {
    if (!injectedComponent) return { isError: false };
    const componentProps = new FunctionalComponent(injectedComponent.arrowFunction).props.type;
    const injectComponentGenerics = generics?.types || [];
    return { isError: !this.comparePropsAndTypes(componentProps, injectComponentGenerics), componentProps };
  }

  private comparePropsAndTypes(componentProps: Type, injectComponentGenerics: Type[]): boolean {
    return (
      this.hasInlineType(injectComponentGenerics) ||
      componentProps.equals(injectComponentGenerics) ||
      isEmpty(injectComponentGenerics) && isEqual(componentProps.toString(), ['Injected'])
    );
  }

  private hasInlineType(injectComponentGenerics: import('/Users/guyc/workspace1/obsidian/packages/eslint-plugin-obsidian/src/dto/type').Type[]) {
    return injectComponentGenerics.some(TypeLiteral.isTypeLiteral);
  }
}