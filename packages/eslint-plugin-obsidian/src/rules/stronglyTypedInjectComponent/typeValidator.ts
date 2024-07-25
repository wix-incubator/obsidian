import { isEmpty } from 'lodash';
import { FunctionalComponent } from '../../dto/functionalComponent';
import type { Generics } from '../../dto/generics';
import type { Variable } from '../../dto/variable';
import type { Type } from '../../dto/type';
import type { Options } from '.';
import { stringToRegex } from '../../utils/regex';
import { TypeLiteral } from '../../dto/typeLiteral';

export class TypeValidator {
  constructor(private options: Options) { }

  public validate(injectedComponent?: Variable, generics?: Generics) {
    if (!injectedComponent) return { isError: false };
    const componentProps = new FunctionalComponent(injectedComponent.arrowFunction).props.type;
    const injectComponentGenerics = generics?.types || [];
    return { isError: !this.areTypesValid(componentProps, injectComponentGenerics), componentProps };
  }

  private areTypesValid(componentProps: Type, injectComponentGenerics: Type[]): boolean {
    return (
      this.hasInlineType(injectComponentGenerics) ||
      this.typesAreEqualAndNotInjected(componentProps, injectComponentGenerics) ||
      (isEmpty(injectComponentGenerics) && this.isInjected(componentProps)) ||
      this.typesAreInCorrectOrder(injectComponentGenerics, componentProps)
    );
  }

  private hasInlineType(injectComponentGenerics: Type[]) {
    return injectComponentGenerics.some(TypeLiteral.isTypeLiteral);
  }

  private typesAreEqualAndNotInjected(componentProps: Type, injectComponentGenerics: Type[]): boolean {
    return componentProps.equals(injectComponentGenerics) && !this.isInjected(componentProps);
  }

  private isInjected(componentProps: Type) {
    return componentProps.toString().length === 1 &&
      !!componentProps.toString()[0].match(stringToRegex(this.injectedPattern));
  }

  private typesAreInCorrectOrder(injectComponentGenerics: Type[], componentProps: Type) {
    const isInjectSecond = !!injectComponentGenerics[1]?.toString()[0].match(stringToRegex(this.injectedPattern));
    return isInjectSecond &&
      componentProps.size() === injectComponentGenerics.length &&
      componentProps.includes(injectComponentGenerics);
  }

  private get injectedPattern() {
    return this.options[0].injectedPropsPattern;
  }
}