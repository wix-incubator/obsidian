# react-obsidian

> Dependency injection framework for React and React Native applications

## Installation

``` shell
npm install react-obsidian
```

## Usage

### Declare an object graph
Before we can inject dependencies into hooks, components and classes, we first need to declare our dependencies. Dependencies are declared in classes called "Graphs" where the relationships between the dependencies are outlined.

In the `ApplicationGraph` example below, we declare two dependencies:
1. `httpClient`
2. `biLogger`

Both functions are annotated by the `@Provides()` annotation. This signals Obsidian that the results of these functions are provided by the graph and can be injected.

Notice how the biLogger function receives an `httpClient` as an argument. This means that `biLogger` has a dependency on `httpClient`. Obsidian will create an `httpClient` when `biLogger` is injected. 

``` typescript
@Graph()
export default class ApplicationGraph extends ObjectGraph {
  @Provides()
  httpClient(): HttpClient {
    return new HttpClient();
  }

  @Provides()
  biLogger(httpClient: HttpClient): BiLogger {
    return new BiLogger(httpClient);
  }
}
```

### Component injection
```typescript
import {injectComponent} from 'react-obsidian';

interface InjectedComponentProps {
  biLogger: BiLogger;
}

// When injecting components - we must use destructuring in order for Obsidian to know which dependencies to inject.
const InjectedComponent = ({ biLogger }: InjectedComponentProps) => (
  <>
    <button onclick={biLogger.logButtonClick}>Click Me</button>
  </>
);

export default injectComponent(InjectedComponent, MainGraph);
```

### Hooks injection

```typescript
interface UseButtonPressProps {
  biLogger: BiLogger;
}

interface UseButtonPress {
  usePress: () => void;
}

// Similarly to how dependencies are injected into hooks, we must use destructuring for Obsidian to be able to inject the dependencies.
const useButtonClick = ({ biLogger }: UseButtonPressProps): UseButtonPress => {
  const onClick = useCallback(() => {
    biLogger.logButtonClick();
  }, [biLogger]);
  
  return { onClick };
};

// Dependencies are injected from MainGraph
export default injectHook(usePress, MainGraph);

// Now that exported the injected hook, we can use it in a component without needed so provide it's dependencies manually
const Component = () => (
  // No need to specify dependencies as they are injected automatically
  const { onClick } = useButtonClick();
  <>
    <button onclick={onClick}>Click Me</button>
  </>
);
```

### Class injection
Obsidian supports injected class properties. Constructor injection is not supported at this time.

```typescript
@Injectable(MainGraph)
class ButtonController {
  @Inject biLogger!: BiLogger;

  onClick() {
    this.biLogger.logButtonClick();
  }
}
```

## Related

* [InversifyJS](https://github.com/inversify/InversifyJS)
* [tsyringe](https://github.com/microsoft/tsyringe)
* [Dagger](https://github.com/google/dagger)
