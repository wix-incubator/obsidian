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
    const injectComponentGenerics = generics?.types ?? [];
    return this.areTypesValid(componentProps, injectComponentGenerics);
  }

  private areTypesValid(componentProps: Type, injectComponentGenerics: Type[]): Result {
    if (this.typesAreEqual(componentProps, injectComponentGenerics) && this.isInjected(componentProps)) {
      return new RedundantTypeError(injectComponentGenerics);
    }

    if (
      this.hasInlineType(injectComponentGenerics)
      || (this.typesAreEqual(componentProps, injectComponentGenerics) && !this.isInjected(componentProps))
      || (isEmpty(injectComponentGenerics) && this.isInjected(componentProps))
      || this.typesAreInCorrectOrder(injectComponentGenerics, componentProps)
      || (this.isInjected(componentProps) && injectComponentGenerics.length === 2)
    ) return new Success();

    const injected = this.getInjectedTypes(componentProps);
    const own = this.getOwnTypes(componentProps);
    if (!own && !injected) return new Success();
    return new MissingTypeError(own!, injected ?? []);
  }

  private hasInlineType(injectComponentGenerics: Type[]) {
    return injectComponentGenerics.some(TypeLiteral.isTypeLiteral);
  }

  private typesAreEqual(componentProps: Type, injectComponentGenerics: Type[]): boolean {
    return componentProps.equals(injectComponentGenerics);
  }

  private isInjected(componentProps: Type) {
    return componentProps.size() === 1 && !!this.getInjectedTypes(componentProps);
  }

  private getInjectedTypes(componentProps: Type) {
    return componentProps.toString().join(',').match(stringToRegex(this.injectedPattern));
  }

  private getOwnTypes(componentProps: Type) {
    return componentProps.toString().join(',').match(stringToRegex(this.ownPattern));
  }

  private typesAreInCorrectOrder(injectComponentGenerics: Type[], componentProps: Type) {
    const isInjectSecond = !!injectComponentGenerics[1]?.toString()[0].match(stringToRegex(this.injectedPattern));
    return isInjectSecond
      && componentProps.size() === injectComponentGenerics.length
      && componentProps.includes(injectComponentGenerics);
  }

  private get injectedPattern() {
    return this.options[0].injectedPropsPattern;
  }

  private get ownPattern() {
    return this.options[0].ownPropsPattern;
  }
}
