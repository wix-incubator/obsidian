[![SWUbanner](https://raw.githubusercontent.com/vshymanskyy/StandWithUkraine/main/banner2-direct.svg)](https://vshymanskyy.github.io/StandWithUkraine)

# react-obsidian
> Dependency injection framework for React and React Native applications

<h5>🏗 <b>This library is still under active development.</b>
<br>⚠️ <b>Until we hit v1, Obsidian is not semver-compliant and all APIs are subject to change.</b></h5>

## Introduction

React Obsidian is a dependency injection framework for React and React Native applications. It allows you to inject dependencies effortlessly into hooks, components or classes. Separating the construction and consumption of dependencies is crucial to maintaining a readable and testable codebase.

React Obsidian is guided by the principles of the Dependency Injection pattern, but does not strictly follow them. We allowed ourselves a degree of freedom when designing the library in order to reduce boilerplate code and library footprint.

* [Installation](https://github.com/wix-incubator/react-obsidian#installation)
* [Prerequisites](https://github.com/wix-incubator/react-obsidian#prerequisites)
* [Usage](https://github.com/wix-incubator/react-obsidian#usage)
  * [Declare an object graph](https://github.com/wix-incubator/react-obsidian#declare-an-object-graph)
  * [Component injection](https://github.com/wix-incubator/react-obsidian#component-injection)
  * [Hooks injection](https://github.com/wix-incubator/react-obsidian#hooks-injection)
  * [Class injection](https://github.com/wix-incubator/react-obsidian#class-injection)
    * [Injecting properties](https://github.com/wix-incubator/react-obsidian#injecting-properties)
    * [Injecting constructor arguments](https://github.com/wix-incubator/react-obsidian#injecting-constructor-arguments)
  * [Obtaining dependencies from a graph](https://github.com/wix-incubator/react-obsidian#obtaining-dependencies-from-a-graph)
* [Advance usage](https://github.com/wix-incubator/react-obsidian#advance-usage)
  * [Accessing props in graphs](https://github.com/wix-incubator/react-obsidian#accessing-props-in-graphs)
  * [Singleton graphs and providers](https://github.com/wix-incubator/react-obsidian#singleton-graphs-and-providers)
  * [Graph middleware](https://github.com/wix-incubator/react-obsidian#graph-middleware)
  * [Clear graphs](https://github.com/wix-incubator/react-obsidian#clear-graphs)





## Installation

``` shell
npm install react-obsidian
```

See the [#Prerequisites](https://github.com/wix-incubator/react-obsidian#prerequisites) section for additional requirements.

## Usage

### Declare an object graph
Before we can inject dependencies into hooks, components and classes, we first need to declare our dependencies. Dependencies are declared in classes called "Graphs" where the relationships between the dependencies are outlined.

In the `ApplicationGraph` example below, we declare two dependencies:
1. `httpClient`
2. `biLogger`

Both functions are annotated by the `@Provides()` annotation. This signals Obsidian that the results of these functions are provided by the graph and can be injected.

Notice how the biLogger function receives an `httpClient` as an argument. This means that `biLogger` is dependent on `httpClient`. Obsidian will create an `httpClient` when `biLogger` is injected. 

``` typescript
@Singleton() @Graph()
class ApplicationGraph extends ObjectGraph {
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

// Now that we exported the injected hook, we can use it in a component without the needed so provide its dependencies manually
const Component = () => (
  // No need to specify dependencies as they are injected automatically
  const { onClick } = useButtonClick();
  <>
    <button onclick={onClick}>Click Me</button>
  </>
);
```

### Class injection
Obsidian supports injecting both class properties and constructor arguments.

#### Injecting properties
```typescript
@Injectable(ApplicationGraph)
class ButtonController {
  @Inject() biLogger!: BiLogger;

  onClick() {
    this.biLogger.logButtonClick();
  }
}
```

#### Injecting constructor arguments
```typescript
@Injectable(ApplicationGraph)
class Presenter {
  constructor(@Inject() public biLogger: BiLogger) { }
}
```

The TypeScript compiler won't let you construct the class without providing the `biLogger` argument as it's not optional.
If you want to be able to instantiate the class yourself without providing arguments, you'll also need to declare a constructor overload that receives optional arguments.

```typescript
@Injectable(ApplicationGraph)
class Presenter {
  constructor(biLogger?: BiLogger);
  constructor(@Inject() public biLogger: BiLogger) { }
}

// Now you can instantiate the class without providing it's constructor dependencies
const presenter = new Presenter();
```

### Obtaining dependencies from a graph
Dependencies can also be obtained by accessing the graph that provides them.

```typescript
Obsidian.obtain(ApplicationGraph).biLogger();
```

> Note: While the function that provides the `biLogger` accepts an argument of type `HttpClient`, we don't provide dependencies ourselves when obtaining dependencies directly from the graph, as they are resolved by Obsidian.

## Advanced usage
### Accessing props in graphs
If a graph is instantiated in order to inject a component, then it will receive the component's props in the constructor.
```typescript
@Graph()
class ProfileScreenGraph extends ObjectGraph<ProfileScreenProps> {
  private profile: UserProfile;

  constructor(props: ProfileScreenProps) {
    super(props);
    this.profile = props.profile;
  }

  @Provides()
  profileFetcher(): ProfileFetcher {
    return new ProfileFetcher(this.profile);
  }
}
```

### Singleton graphs and providers
Graphs and Providers can be marked as singletons with the `@Singleton` decorator. If a graph is marked as a singleton, when an instance of such graph is requested, Obsidian will reuse the existing instance. Graphs that are not annotated with the `@Singleton` decorator will be instantiated each time they are needed for injection.

Singleton providers are shared between all instances of a graph.

```typescript
@Graph()
class PushedScreenGraph { // A new PushedScreenGraph instance is created each time the corresponding screen is created
  @Provides()
  presenter(): PushedScreenPresenter {
    return new PushedScreenPresenter(); // Created each time PushedGraph is created
  }

  @Provides() @Singleton()
  someUseCase(): SomeUseCase {
    return new SomeUseCase(); // Created once for all PushedGraph instances
  }
}
```

In this example we declared a singleton graph. This means that all of its providers are also singleton.
```typescript
@Singleton() @Graph()
class ApplicationGraph {
  @Provides()
  biLogger(): BiLogger {
    return new BiLogger() // Created once because the graph is a singleton
  }
}
```

### Graph middleware
When working on large scale applications, we often need to to hook into various low level operations. Obsidian lets you hook into the graph creation process by adding middleware(s).

Those middleware are invoked in LIFO order and can be used for various purposes:
1. Create a graph yourself instead of letting Obsidian to instantiate it.
2. Add logging to graph creation.
3. Handle errors when Obsidian instantiates graphs.
4. Replace graphs with mocks for testing purposes.

Middleware follow the Chain of Responsibility pattern and therefore must always return a graph, either by creating one explicitly or by returning the instance created by another member in the resolve chain.

#### Adding a logging middleware
The following example demonstrates how to add a middleware that's used for logging purposes.

```typescript
const loggingMiddleware = new class extends GraphMiddleware {
      resolve<Props>(resolveChain: GraphResolveChain, Graph: Constructable<T>, props?: Props) {
        const t1 = Date.now();
        const graph = resolveChain.proceed(Graph, props);
        const t2 = Date.now();
        console.log(`Graph created in ${t2 - t1} milliseconds`);
        return graph;
      }
    }();
    Obsidian.addGraphMiddleware(loggingMiddleware);
```

### Clear graphs
Graphs can be cleared by invoking `Obsidian.clearGraphs()`. This is useful in tests or when you need to reset the system to it's original state, for example when a user logs out.

#### Clearing graphs automatically during execution of Jest tests
Create a `jest.setup.js` file and add it to [setupFilesAfterEnv](https://jestjs.io/docs/configuration#setupfilesafterenv-array). Then, import the following file when ensures graphs are cleared before each test.
```javascript
import 'react-obsidian/clearGraphs';
```

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
Obsidian relies on reflection to resolve dependencies. Production code is typically mangled to reduce bundle size. This means that some names Obsidian expects are changed during the mangling process. To work around this, Obsidian persists the names of methods annotated with the `@Provides` decorator with a Babel transformer.

### Add Obsidian's babel transformer
Add the transformer to the list of plugins in your `.babel` file.
```js
module.exports = {
  presets: [
    'module:metro-react-native-babel-preset',
    ['@babel/preset-typescript', {'onlyRemoveTypeImports': true}]
  ],
  plugins: [
    react-obsidian/dist/transformers/babel-plugin-obsidian,
    ['@babel/plugin-proposal-decorators', {legacy: true}],
    ['@babel/plugin-proposal-class-properties', { legacy: true }],
    'babel-plugin-parameter-decorator'
  ]
};
```

### Jest
react-obsidian publishes untranspiled code. If you're using Jest, you'll need to add react-obsidian to [transformIgnorePatterns](https://jestjs.io/docs/configuration#transformignorepatterns-arraystring) so it's transpiled before tests are executed.

### Peer Dependencies
Obsidian has a peer dependency on `lodash`.

## Related

* [InversifyJS](https://github.com/inversify/InversifyJS)
* [tsyringe](https://github.com/microsoft/tsyringe)
* [Dagger](https://github.com/google/dagger)
