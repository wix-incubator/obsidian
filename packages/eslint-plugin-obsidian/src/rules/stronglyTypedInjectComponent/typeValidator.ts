import { isEmpty } from 'lodash';
import { FunctionalComponent } from '../../dto/functionalComponent';
import type { Generics } from '../../dto/generics';
import type { Variable } from '../../dto/variable';
import type { Type } from '../../dto/types/type';
import type { Options } from '.';
import { stringToRegex } from '../../utils/regex';
import { TypeLiteral } from '../../dto/types/typeLiteral';
import { RedundantTypeError } from './result/redundantTypeError';
import type { Result } from './result/result';
import { Success } from './result/success';
import { MissingTypeError } from './result/missingTypeError';

export class TypeValidator {
  constructor(private options: Options) { }

  public validate(injectedComponent?: Variable, generics?: Generics): Result {
    if (!injectedComponent) return new Success();
    const componentProps = new FunctionalComponent(injectedComponent.arrowFunction).props.type;
    const injectComponentGenerics = generics?.types || [];
    return this.areTypesValid(componentProps, injectComponentGenerics);
  }

  private areTypesValid(componentProps: Type, injectComponentGenerics: Type[]): Result {
    if ( this.typesAreEqual(componentProps, injectComponentGenerics) && this.isInjected(componentProps)) {
      return new RedundantTypeError(injectComponentGenerics);
    }

    if (
      this.hasInlineType(injectComponentGenerics) ||
      (this.typesAreEqual(componentProps, injectComponentGenerics) && !this.isInjected(componentProps)) ||
      (isEmpty(injectComponentGenerics) && this.isInjected(componentProps)) ||
      this.typesAreInCorrectOrder(injectComponentGenerics, componentProps)
    ) {
      return new Success();
    }

    // TODO: Report the actual missing type
    return new MissingTypeError(injectComponentGenerics);
  }

  private hasInlineType(injectComponentGenerics: Type[]) {
    return injectComponentGenerics.some(TypeLiteral.isTypeLiteral);
  }

  private typesAreEqual(componentProps: Type, injectComponentGenerics: Type[]): boolean {
    return componentProps.equals(injectComponentGenerics);
  }

  private isInjected(componentProps: Type) {
    return componentProps.size() === 1 &&
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