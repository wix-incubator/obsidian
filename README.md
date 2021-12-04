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

export default injectComponent(InjectedComponent, ApplicationGraph);
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

// Dependencies are injected from ApplicationGraph
export default injectHook(usePress, ApplicationGraph);

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
@Injectable(MainApplicationGraphGraph)
class ButtonController {
  @Inject biLogger!: BiLogger;

  onClick() {
    this.biLogger.logButtonClick();
  }
}
```

### Obtaining dependencies from a graph
Dependencies can also be obtained by accessing the graph that provides them.

```typescript
Obsidian.obtain(ApplicationGraph).biLogger();
```

> Note: While the function that provides the `biLogger` accepts an argument of type `HttpClient`, when obtaining dependencies directly from the graph, we don't provide dependencies ourselves as they are resolved by Obsidian.

## Prerequisites
Obsidian is highly opinionated and is developed with a specific environment in mind. Therefore, it has a few prerequisites for projects that want to integrate it.

### TypeScript
Obsidian targets TypeScript projects. There are no plans to officially support pure JS environments.

### Reflect-metadata
Install and enable the reflect-metadata polyfill.
* `npm install reflect-metadata`
* `import 'reflect-metadata';` - this needs to be done once, typically in your application's entry point (index.ts).

### Enable experimental decorators
Obsidian uses the Decorators feature whose proposal is still stage 2.

Add the following options to your `tsconfig.json` file.
```json
{
  "compilerOptions": {
    "types": ["reflect-metadata", "jest"],
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
```

### Babel
Obsidian relies on reflection to resolve dependencies. Production code is typically mangled to reduce bundle size. This means that some names Obsidian expects are changed during the mangling process. To workaround this, Obsidian persists the names of methods annotated with the `@Provides` decorator with a Babel transformer.

### Add Obsidian's babel transformer
Add the transformer to the list of plugins in your `.babel` file.
```js
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ['@babel/plugin-proposal-decorators', {legacy: true}],
    ['@babel/plugin-proposal-class-properties', {legacy: true}],
    [`${__dirname}/../dist/transformers/babel-plugin-obsidian-provide`],
  ],
};

```


## Related

* [InversifyJS](https://github.com/inversify/InversifyJS)
* [tsyringe](https://github.com/microsoft/tsyringe)
* [Dagger](https://github.com/google/dagger)
