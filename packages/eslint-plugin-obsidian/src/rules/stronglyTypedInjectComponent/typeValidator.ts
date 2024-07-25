import { FunctionalComponent } from '../../dto/functionalComponent';
import type { Generics } from '../../dto/generics';
import { TypeLiteral } from '../../dto/typeLiteral';
import type { Variable } from '../../dto/variable';
import { isEmpty } from '../../utils/array';
import type { Type } from '../../dto/type';
import type { Options } from '.';
import { stringToRegex } from '../../utils/regex';

export class TypeValidator {
  constructor(private options: Options) { }

  public validate(injectedComponent?: Variable, generics?: Generics) {
    if (!injectedComponent) return { isError: false };
    const componentProps = new FunctionalComponent(injectedComponent.arrowFunction).props.type;
    const injectComponentGenerics = generics?.types || [];
    return { isError: !this.areTypesValid(componentProps, injectComponentGenerics), componentProps };
  }

  private areTypesValid(componentProps: Type, injectComponentGenerics: Type[]): boolean {
    const injectedPattern = this.options[0].injectedPropsPattern;
    return (
      this.hasInlineType(injectComponentGenerics) ||
      componentProps.equals(injectComponentGenerics) ||
      isEmpty(injectComponentGenerics) && !!componentProps.toString()[0].match(stringToRegex(injectedPattern))
    );
  }

  private hasInlineType(injectComponentGenerics: Type[]) {
    return injectComponentGenerics.some(TypeLiteral.isTypeLiteral);
  }
}