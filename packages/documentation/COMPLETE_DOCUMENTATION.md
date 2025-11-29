# React Obsidian - Complete Documentation

## Table of Contents

1. [Introduction](#introduction)
2. [Installation](#installation)
3. [Getting Started](#getting-started)
4. [Core Concepts](#core-concepts)
   - [Graphs](#graphs)
   - [Hooks](#hooks)
   - [Functional Components](#functional-components)
   - [Class Components](#class-components)
   - [Classes](#classes)
   - [Reactivity](#reactivity)
   - [Service Locator](#service-locator)
5. [Advanced Features](#advanced-features)
   - [Clearing Graphs](#clearing-graphs)
   - [ESLint Plugin](#eslint-plugin)
   - [Graph Middlewares](#graph-middlewares)
6. [Guides](#guides)
   - [Avoiding Prop Drilling](#avoiding-prop-drilling)
   - [Configurable Applications](#configurable-applications)
   - [Mocking Dependencies](#mocking-dependencies)
   - [MVVM Architecture](#mvvm-architecture)
7. [API Reference](#api-reference)
   - [Observable](#observable)
   - [MediatorObservable](#mediatorobservable)
   - [Model](#model)
   - [useObserver](#useobserver)
   - [useObservers](#useobservers)
   - [Obsidian](#obsidian-api)
   - [Test Kit](#test-kit)

---

# Introduction

React Obsidian is a dependency injection framework for React and React Native applications. It allows you to inject dependencies into hooks, components, and classes. Separating the construction and consumption of dependencies is crucial to maintaining a readable and testable codebase.

## The 2-Step Tutorial

### Step 1: Declare how dependencies should be created

Define a singleton graph that is instantiated once and is retained throughout the lifespan of the application. All dependencies it provides are also singletons.

\`\`\`typescript
import {singleton, graph, ObjectGraph, provides} from 'react-obsidian';

@singleton() @graph()
export class ApplicationGraph extends ObjectGraph {
  // fooService requires a barManager so it receives one as a parameter.
  @provides()
  fooService(barManager: BarManager): FooService {
    return new FooService(barManager);
  }

  @provides()
  barManager(): BarManager {
    return new BarManager();
  }
}
\`\`\`

### Step 2: Inject the dependencies

Obsidian can inject dependencies into components, hooks, and classes.

#### Functional Component Injection

\`\`\`typescript
import {DependenciesOf, injectComponent} from 'react-obsidian';
import {ApplicationGraph} from './ApplicationGraph';

// 1. Declare which dependencies should be injected.
type Props = DependenciesOf<ApplicationGraph, 'fooService'>; // {fooService: FooService}

// 2. Implement the component.
const myComponent = ({fooService}: Props) => {
  // Do something useful with fooService
}

// 3. Export the injected component.
export default injectComponent(myComponent, ApplicationGraph);
\`\`\`

#### Hook Injection

\`\`\`typescript
import {DependenciesOf, injectHook} from 'react-obsidian';
import {ApplicationGraph} from './ApplicationGraph';

type Props = DependenciesOf<ApplicationGraph, 'fooService'>;

const myHook = ({fooService}: Props) => {
  // Do something useful with fooService
}

export default injectHook(myHook, ApplicationGraph);
\`\`\`

#### Class Component Injection

\`\`\`typescript
import {injectable, inject} from 'react-obsidian';
import {ApplicationGraph} from './ApplicationGraph';

@injectable(ApplicationGraph)
export class MyClassComponent extends React.Component {
  @inject() private fooService!: FooService;
}
\`\`\`

## Features

* ⚛️ Inject all React constructs
  * Functional components
  * Hooks
  * Class components
* 🛠 Improve code structure
  * Easily write object-oriented code with Single Responsibility in mind
  * Eliminate circular dependencies
  * Avoid implicit dependencies to make your code easier to reason about
* ❤️ Developer experience
  * Seamlessly integrates into existing projects
  * Easy to adopt gradually
  * Scales well
  * Idiomatic API that's easy to understand

## Design Principles

React Obsidian is guided by the principles of the Dependency Injection pattern, but does not strictly follow them.

* **Easy to start** - Obsidian requires very little code to get you started
* **Intuitive API** - The API should be verbose and understandable even to new users
* **Minimal boilerplate** - Require the bare minimum to construct and resolve dependencies

---

# Installation

## 1. Install Obsidian

Using Yarn:
\`\`\`bash
yarn add react-obsidian
\`\`\`

Using NPM:
\`\`\`bash
npm install react-obsidian
\`\`\`

## 2. Add Obsidian's Transformer

Like most Dependency Injection frameworks, Obsidian uses automatic code generation to create the bindings necessary for resolving dependencies.

### Using Babel

Install the required Babel plugins:

\`\`\`bash
yarn add @babel/plugin-proposal-decorators
yarn add @babel/core @babel/preset-env @babel/preset-typescript
\`\`\`

Update your \`babel.config.js\`:

\`\`\`javascript
module.exports = {
  presets: [
    ['@babel/preset-typescript', { 'onlyRemoveTypeImports': true }],
  ],
  plugins: [
    'react-obsidian/dist/transformers/babel-plugin-obsidian',
    ['@babel/plugin-transform-class-static-block'],
    ['@babel/plugin-proposal-decorators', {version: '2023-11'}],
  ]
};
\`\`\`

### Using SWC

Configure the transformer with the SWC plugin. Example using \`unplugin-swc\`:

\`\`\`javascript
import { defineConfig } from 'vite';
import swc from 'unplugin-swc';
import obsidian from 'swc-plugin-obsidian';

export default defineConfig({
  plugins: [
    swc.vite({
      jsc: {
        parser: {
          syntax: 'typescript',
          decorators: true,
        },
        experimental: {
          runPluginFirst: true,
          plugins: [ obsidian() ],
        },
      },
    }),
  ],
});
\`\`\`

## 3. Add Obsidian's ESLint Plugin (Recommended)

Obsidian provides an ESLint plugin that can help you find errors in your code related to dependency injection.

## 4. Add Obsidian's Language Service Extension for VSCode (Recommended)

Search the VSCode marketplace for "Obsidian Language Service" for improved go-to-definition support.

---

# Core Concepts

## Graphs

### Introduction

In Object Oriented Programming, programs are organized around objects, where each object has a specific purpose. These objects can require other objects to perform their responsibilities. The required objects are called dependencies.

Before you can inject dependencies into hooks, components and classes, the dependencies first need to be declared so Obsidian knows how to construct them. In Obsidian, dependencies are declared in classes called "Graphs".

### Declaring Dependencies in a Graph

\`\`\`typescript
import {singleton, graph, ObjectGraph, provides} from 'react-obsidian';

@singleton() @graph()
export class ApplicationGraph extends ObjectGraph {
  @provides()
  httpClient(): HttpClient {
    return new HttpClient();
  }

  @provides()
  databaseService(): DatabaseService {
    return new DatabaseService();
  }
}
\`\`\`

Graphs must be annotated with the \`@graph\` decorator. Dependencies are constructed in methods annotated with the \`@provides\` annotation.

### Specifying Relationships Between Dependencies

You can specify the dependencies of a service as arguments in the provider:

\`\`\`typescript
@singleton() @graph()
export class ApplicationGraph extends ObjectGraph {
  @provides()
  httpClient(): HttpClient {
    return new HttpClient();
  }

  @provides()
  databaseService(): DatabaseService {
    return new DatabaseService();
  }

  @provides()
  appInitializer(httpClient: HttpClient, databaseService: DatabaseService): AppInitializer {
    return new AppInitializer(httpClient, databaseService);
  }
}
\`\`\`

### Graph Types

#### The Singleton Graph

Applications typically have at least one singleton graph. These graphs provide dependencies that are used throughout the application.

\`\`\`typescript
@singleton() @graph()
export class ApplicationGraph extends ObjectGraph {
  @provides()
  httpClient(): HttpClient {
    return new HttpClient();
  }
}
\`\`\`

#### The Lifecycle-Bound Graph

Lifecycle-bound graphs are used to provide dependencies that are shared between components and hooks in a specific UI scope.

**Feature Scope (default):**
\`\`\`typescript
@lifecycleBound({scope: 'feature'}) @graph()
class AuthGraph extends ObjectGraph {
  @provides()
  userService(): UserService {
    return new UserService();
  }
}
\`\`\`

**Component Scope:**
\`\`\`typescript
@lifecycleBound({scope: 'component'}) @graph()
class FormGraph extends ObjectGraph {
  @provides()
  validationService(): ValidationService {
    return new ValidationService();
  }
}
\`\`\`

**Custom Scope:**
\`\`\`typescript
@lifecycleBound({scope: 'AppScope'}) @graph({subgraphs: [ScreenGraph]})
class HomeScreenGraph extends ObjectGraph {
  constructor(private props: HomeScreenProps & BaseProps) {
    super(props);
  }
}
\`\`\`

#### Passing Props to a Lifecycle-Bound Graph

\`\`\`typescript
type HomeScreenProps {
  userId: string;
}

@lifecycleBound() @graph()
class HomeGraph extends ObjectGraph<HomeScreenProps> {
  private userId: string;

  construct(props: HomeScreenProps) {
    super(props);
    this.userId = props.userId;
  }

  @provides()
  userService(): UserService {
    return new UserService(this.userId);
  }
}
\`\`\`

### Graph Composition

#### Subgraphs

\`\`\`typescript
@lifecycleBound() @graph({subgraphs: [ApplicationGraph]}) 
export class LoginGraph extends ObjectGraph {
  @provides()
  loginService(httpClient: HttpClient): LoginService {
    return new LoginService(httpClient);
  }
}
\`\`\`

#### Private Subgraphs

Private subgraphs allow you to control the visibility of dependencies when composing graphs:

\`\`\`typescript
@singleton() @graph({
  subgraphs: [LoggingGraph],           // Public - exposed to consumers
  privateSubgraphs: [InfrastructureGraph]  // Private - internal use only
})
export class AuthGraph extends ObjectGraph {
  @provides()
  authService(httpClient: HttpClient, logger: Logger): AuthService {
    return new AuthService(httpClient, logger);
  }
}
\`\`\`

#### Abstract Graphs

\`\`\`typescript
export abstract class ScreenGraph extends ObjectGraph {
  @provides()
  screenLogger(screenName: string) {
    return new ScreenLogger(screenName);
  }

  abstract screenName(): string;
}

@graph()
export class HomeGraph extends ScreenGraph {
  @provides()
  override screenName() {
    return 'HomeScreen';
  }

  @provides()
  homeService(screenLogger: ScreenLogger): HomeService {
    return new HomeService(screenLogger);
  }
}
\`\`\`

### Typed Dependencies

\`\`\`typescript
// {httpClient: HttpClient, databaseService: DatabaseService}
type Dependencies = DependenciesOf<ApplicationGraph, 'httpClient' | 'databaseService'>;

// With subgraphs
type Dependencies = DependenciesOf<[LoginGraph, ApplicationGraph], 'httpClient' | 'loginService'>;
\`\`\`

---

## Hooks

### Injecting Hooks

\`\`\`typescript
import { injectHook, DependenciesOf } from 'react-obsidian';

const myHook = ({fooService, barService}: Props) => {
  // do something with fooService and barService
}

type Props = DependenciesOf<ApplicationGraph, 'fooService' | 'barService'>;

export default injectHook(myHook, ApplicationGraph);
\`\`\`

### Strongly Typed Hooks

#### Combining Injected Dependencies and Required Arguments

\`\`\`typescript
type Injected = DependenciesOf<ApplicationGraph, 'fooService'>;
type Own = {count: number};

const myHook = ({fooService, count}: Injected & Own) => {
  // do something with fooService and count
}

export default injectHookWithArguments<Injected, Own>(myHook, ApplicationGraph);
\`\`\`

#### Typing the Return Value

\`\`\`typescript
type Injected = DependenciesOf<ApplicationGraph, 'fooService'>;
type Own = {count: number};
type Result = {onPress: () => void};

const myHook = ({fooService, count}: Injected & Own): Result => {
  const onPress = useCallback(() => {
    fooService.doSomething(count);
  }, [fooService, count]);
  return {onPress};
}

export default injectHookWithArguments<Injected, Own, Result>(myHook, ApplicationGraph);
\`\`\`

---

## Functional Components

### Injecting Functional Components

\`\`\`typescript
import { injectComponent, DependenciesOf } from 'react-obsidian';

const MyComponent = ({httpService}: DependenciesOf<ApplicationGraph, 'httpClient'>) => {
  return <div>My component</div>
}

export default injectComponent(MyComponent, ApplicationGraph);
\`\`\`

### Strongly Typed Components

#### Components with Props and Injected Dependencies

\`\`\`typescript
type Injected = DependenciesOf<ApplicationGraph, 'httpClient'>;
type Own = {name: string};

const MyComponent = ({name, httpService}: Own & Injected) => {
  return <div>Hey, my name is: {name} 👋</div>
}

// Result: React.FunctionComponent<{name: string , httpClient?: HttpClient}>
export default injectComponent<Own, Injected>(MyComponent, ApplicationGraph);
\`\`\`

---

## Class Components

### Injecting Class Components

\`\`\`typescript
import {injectable, inject} from 'react-obsidian';

@injectable(ApplicationGraph)
export class ClassComponent extends React.Component {
  @inject() private httpClient!: HttpClient;
}
\`\`\`

---

## Classes

### Injecting Classes

\`\`\`typescript
import {injectable, inject} from 'react-obsidian';

@injectable(ApplicationGraph)
export class MyClass {
  @inject() private httpClient!: HttpClient;
}
\`\`\`

**Important:** Always prefer constructor injection over field injection. Field injection should only be used when a class is not instantiated by a graph.

### Delayed Injection

\`\`\`typescript
import {injectable, lateInject} from 'react-obsidian';

@injectable(ApplicationGraph)
export class MyClass {
  @lateInject() private httpClient!: HttpClient;

  public init() {
    console.log(this.httpClient === undefined); // true
    Obsidian.inject(this);
    console.log(this.httpClient === undefined); // false
  }
}
\`\`\`

---

## Reactivity

Obsidian includes reactive programming features that allow you to observe changes in your data.

### Observable

#### Create Observables

\`\`\`typescript
import { Observable } from 'react-obsidian';

class UserService {
  public isLoggedIn = new Observable(false);
}
\`\`\`

#### Observe Changes in Hooks or Components

\`\`\`typescript
import { useObserver } from 'react-obsidian';

const useLogin = () => {
  const [isLoggedIn] = useObserver(userService.isLoggedIn);
  return {isLoggedIn};
}
\`\`\`

#### Observe Changes Imperatively

\`\`\`typescript
const unsubscribe = userService.isLoggedIn.subscribe((isLoggedIn: boolean) => {
  // Do something with the isLoggedIn value
});
\`\`\`

#### Update Observables

\`\`\`typescript
userService.isLoggedIn.value = true; // Update and notify subscribers
\`\`\`

#### Update from Hooks or Components

\`\`\`typescript
const useLogin = () => {
  const [isLoggedIn, setIsLoggedIn] = useObserver(userService.isLoggedIn);
  const onLogoutButtonPress = useCallback(() => {
    setIsLoggedIn(false);
  }, [setIsLoggedIn]);

  return {isLoggedIn, onLogoutButtonPress};
}
\`\`\`

### Avoid Recreating Observables

\`\`\`typescript
// ❌ Bad - recreates on every render
const useLogin = () => {
  const [isLoggedIn] = useObserver(new Observable(false));
}

// ✅ Good - uses generator function
const useLogin = () => {
  const [isLoggedIn] = useObserver(() => new Observable(false));
}
\`\`\`

### MediatorObservable

Merge multiple observable sources into a single observable:

\`\`\`typescript
import { MediatorObservable, Observable } from 'react-obsidian';

const networkConditions = new Observable<'poor' | 'strong'>();
const batteryLevel = new Observable<'low' | 'normal'>();

const downloadStatus = new MediatorObservable<'paused' | 'active'>('active')
  .addSource(networkConditions, (condition: 'poor' | 'strong') => {
    this.value = condition === 'poor' ? 'paused' : 'active';
  })
  .addSource(batteryLevel, (level: 'low' | 'normal') => {
    this.value = level === 'low' ? 'paused' : 'active';
  });
\`\`\`

---

## Service Locator

### Obtaining Dependencies Imperatively

\`\`\`typescript
@singleton() @graph()
export class SomeGraph extends ObjectGraph {
  @provides()
  fooService(): FooService {
    return new FooService();
  }

  @provides()
  barService(fooService: FooService): BarService {
    return new BarService(fooService);
  }
}

// Obtain dependencies directly
Obsidian.obtain(ApplicationGraph).fooService();
Obsidian.obtain(ApplicationGraph).barService();
\`\`\`

---

# Advanced Features

## Clearing Graphs

Graphs can be cleared by invoking \`Obsidian.clearGraphs()\`. This is useful in tests or when you need to reset the system.

### Clearing Graphs Automatically in Jest Tests

Create a \`jest.setup.js\` file:

\`\`\`javascript
import 'react-obsidian/clearGraphs';
\`\`\`

---

## ESLint Plugin

### Installation

\`\`\`bash
yarn add -D eslint-plugin-obsidian
\`\`\`

### Configuration

\`\`\`json
{
  "plugins": ["obsidian"],
  "rules": {
    "obsidian/unresolved-provider-dependencies": "error",
    "obsidian/no-circular-dependencies": "error",
    "obsidian/strongly-typed-inject-component": "error"
  }
}
\`\`\`

### Rules

#### unresolved-provider-dependencies

Ensures dependencies requested by providers can be resolved.

#### no-circular-dependencies

Prevents circular dependencies between providers.

#### strongly-typed-inject-component

Ensures injected components are strongly typed with proper generics.

---

## Graph Middlewares

Graph middlewares let you plug into the graph creation process. They follow the Chain of Responsibility pattern.

### Example: Logging Middleware

\`\`\`typescript
import { GraphMiddleware } from 'react-obsidian';

const loggingMiddleware = new class extends GraphMiddleware {
  resolve<Props>(resolveChain: GraphResolveChain, Graph: Constructable<T>, props?: Props) {
    const t1 = Date.now();
    const graph = resolveChain.proceed(Graph, props);
    const t2 = Date.now();
    console.log(\`Graph created in \${t2 - t1} milliseconds\`);
    return graph;
  }
}();

Obsidian.addGraphMiddleware(loggingMiddleware);
\`\`\`

---

# Guides

## Avoiding Prop Drilling

Lifecycle-bound graphs can help avoid prop drilling by providing dependencies throughout a UI flow.

### Step 1: Define a Lifecycle-Bound Graph

\`\`\`typescript
@lifecycleBound() @graph()
export class UserGraph extends ObjectGraph<UserProps> {
  private userId: string;

  construct(props: Props) {
    super(props);
    this.userId = props.userId;
  }

  @provides()
  userId(): string {
    return this.userId;
  }
}
\`\`\`

### Step 2: Inject Dependencies into Components

\`\`\`typescript
type Injected = DependenciesOf<UserGraph, 'userId'>;

const ComponentC = ({ userId }: Injected) => {
  return <div>User ID: {userId}</div>;
};

export default injectComponent(ComponentC, UserGraph);
\`\`\`

### Step 3: Use Components in UI Flow

\`\`\`typescript
const ComponentB = () => {
  return <ComponentC />;
};

export type Props = {
  userId: string;
};

const ComponentA = (props: Props) => {
  return <ComponentB />;
};

export default injectComponent(ComponentA, UserGraph);
\`\`\`

---

## Configurable Applications

### Example: Interchangeable Dependencies

\`\`\`typescript
interface NetworkClient {
  get(url: string): Promise<any>;
  post(url: string, body: any): Promise<any>;
}

class HttpClient implements NetworkClient { /* ... */ }
class AxiosClient implements NetworkClient { /* ... */ }

@singleton() @graph()
class ApplicationGraph extends ObjectGraph {
  @provides()
  httpClient(appConfig: AppConfig): NetworkClient {
    return appConfig.shouldUseAxiosClient() ? new AxiosClient() : new HttpClient();
  }

  @provides()
  appConfig(): AppConfig {
    return new AppConfig();
  }
}
\`\`\`

### Example: Mocking Dependencies in Tests

\`\`\`typescript
import { mock } from 'jest-mock-extended';

@singleton() @graph()
export class ApplicationGraphForTests extends ApplicationGraph {
  @provides()
  override httpClient(): HttpClient {
    return mock<HttpClient>();
  }
}

// In test:
import {mockGraphs} from 'react-obsidian';

describe('Test suite', () => {
  beforeEach(() => {
    mockGraphs({
      ApplicationGraph: ApplicationGraphForTests,
    });
  });
});
\`\`\`

---

## Mocking Dependencies

### The Problem

Common problems in tests:
1. **Partial mocks** - testing multiple units instead of one
2. **Implicit dependencies** - dependencies introduced via imports
3. **Manual mocks** - tedious and error-prone

### The Solution

#### Step 1: Encapsulate Third-Party Dependencies

\`\`\`typescript
import {Linking} from 'react-native';

export class UrlOpener {
  public async openUrl(url: string) {
    if (await Linking.canOpenURL(url)) {
      await Linking.openURL(url);
    } else {
      throw new Error(\`Can't open URL: \${url}\`);
    }
  }
}
\`\`\`

#### Step 2: Convert Dependencies to ES6 Classes

\`\`\`typescript
export class Logger {
  public log(message: string) {
    console.log(message);
  }

  public warn(message: string) {
    console.warn(message);
  }
}
\`\`\`

#### Step 3: Mock Dependencies Using jest-mock-extended

\`\`\`typescript
import {mock} from 'jest-mock-extended';

describe('Example', () => {
  let logger: Logger;
  let foo: Foo;
  let urlOpener: UrlOpener;
  let uut: Example;

  beforeEach(() => {
    logger = mock<Logger>();
    foo = mock<Foo>();
    urlOpener = mock<UrlOpener>();
    uut = new Example(logger, foo, urlOpener);
  });
});
\`\`\`

---

## MVVM Architecture

### Step 1: Create the Model

\`\`\`typescript
export class CounterModel {
  public readonly count = new Observable(0);

  public increment() {
    this.count.value++;
  }
}
\`\`\`

### Step 2: Create the ViewModel

\`\`\`typescript
import { useObserver } from "react-obsidian"

export const useCounterViewModel = (model: CounterModel) => {
  const [count] = useObserver(model.count);

  return {
    count,
    onIncrementClick: () => model.increment(),
  };
}
\`\`\`

### Step 3: Create the View

\`\`\`typescript
const _Counter = ({useViewModel}: DependenciesOf<CounterGraph, 'useViewModel'>) => {
  const {count, increment} = useViewModel();

  return (
    <div>
      <button onClick={increment}>Increment</button>
      <input readOnly type="text" value={count} />
    </div>
  );
};

export const Counter = injectComponent(_Counter, CounterGraph);
\`\`\`

### Step 4: Create the Graph

\`\`\`typescript
import { graph, ObjectGraph, provides } from "react-obsidian";

@singleton() @graph()
export class CounterGraph {
  @provides()
  model(): CounterModel {
    return new CounterModel();
  }

  @provides()
  useViewModel(model: CounterModel) {
    return () => useCounterViewModel(model);
  }
}
\`\`\`

---

# API Reference

## Observable

\`Observable\` is a class that represents a stream of values that can emit multiple values over time.

### Constructor

\`\`\`typescript
const isLoggedIn = new Observable(false);
\`\`\`

### Methods

#### subscribe(onNext)

Listen for changes to the Observable's value.

\`\`\`typescript
const unsubscribe = observable.subscribe((value) => {
  console.log('New value:', value);
});
\`\`\`

#### unsubscribe(onNext)

Unsubscribe a specific callback.

#### get/set value

\`\`\`typescript
const currentValue = observable.value;
observable.value = newValue;
\`\`\`

#### async first(): Promise<T>

Get the Observable's first value (waits if no value exists).

\`\`\`typescript
const value = await observable.first();
\`\`\`

---

## MediatorObservable

\`MediatorObservable\` is a type of \`Observable\` that acts as an adapter between one or more source \`Observable\`s.

### Constructor

\`\`\`typescript
const mediator = new MediatorObservable<boolean>(initialValue);
\`\`\`

### Methods

#### addSource(source, onNext)

\`\`\`typescript
mediator.addSource(sourceObservable, (value) => {
  mediator.value = transformValue(value);
});
\`\`\`

#### mapSource(source, mapNext)

\`\`\`typescript
mediator.mapSource(sourceObservable, (value) => {
  return transformValue(value);
});
\`\`\`

#### addSources(sources, onNext)

\`\`\`typescript
mediator.addSources([source1, source2], (val1, val2) => {
  mediator.value = combine(val1, val2);
});
\`\`\`

#### mapSources(sources, mapNext)

\`\`\`typescript
mediator.mapSources([source1, source2], (val1, val2) => {
  return combine(val1, val2);
});
\`\`\`

---

## Model

\`Model\` is an abstract utility class for observing specific properties of an object.

### Usage

\`\`\`typescript
import { Model } from 'react-obsidian';

class AppState extends Model {
  public user = new Observable<User>();
  public isLoggedIn = new Observable<boolean>();
}

const _useUserName = (appState: AppState) => {
  const {user, isLoggedIn} = appState.use();
  return \`\${user.firstName} is \${isLoggedIn ? '' : 'not '}logged in\`;
};
\`\`\`

---

## useObserver

Hook that allows you to react to changes in an observable.

\`\`\`typescript
const [value, setValue] = useObserver(observable);
\`\`\`

### Parameters

- \`observable\`: The observable to observe (or a generator function)

### Returns

Array with:
1. Current value
2. Set function to update the value

---

## useObservers

Hook for reacting to changes in multiple observables.

\`\`\`typescript
const {foo, bar} = useObservers({foo: fooObservable, bar: barObservable});
\`\`\`

---

## Obsidian API

### obtain(keyOrGraph, props?)

Obtain a graph instance to use as a service locator.

\`\`\`typescript
const service = Obsidian.obtain(ApplicationGraph).fooService();
\`\`\`

### registerGraph(key, graphGenerator)

Register a graph generator function with a key.

\`\`\`typescript
Obsidian.registerGraph('AppGraph', () => require('./ApplicationGraph').ApplicationGraph);
\`\`\`

### inject(target, keyOrGraph)

Inject dependencies annotated with \`@LateInject\` into a class instance.

\`\`\`typescript
Obsidian.inject(this, ApplicationGraph);
\`\`\`

### clearGraphs()

Clear all graph instances.

\`\`\`typescript
Obsidian.clearGraphs();
\`\`\`

### addGraphMiddleware(middleware)

Add a middleware to the graph creation process.

\`\`\`typescript
Obsidian.addGraphMiddleware(loggingMiddleware);
\`\`\`

---

## Test Kit

### mockGraphs

Replace graph implementations with mock implementations in tests.

\`\`\`typescript
import { mockGraphs } from 'react-obsidian';

describe('Test suite', () => {
  beforeEach(() => {
    mockGraphs({ 
      AppGraph: AppGraphForIntegrationTests 
    });
  });
});
\`\`\`

### mockModel

Mock model instances with stubbed Observable properties.

\`\`\`typescript
import { mockModel } from 'react-obsidian';

const mockAppState = mockModel({
  isLoggedIn: new Observable(true),
  session: new Observable('1234')
}, AppState);
\`\`\`

---

## Example: Injecting a Hook

### Step 1: Declare an Object Graph

\`\`\`typescript
@singleton() @graph()
class ApplicationGraph extends ObjectGraph {
  @provides()
  httpClient(): HttpClient {
    return new HttpClient();
  }

  @provides()
  biLogger(httpClient: HttpClient): BiLogger {
    return new BiLogger(httpClient);
  }
}
\`\`\`

### Step 2: Inject a Dependency

\`\`\`typescript
type Injected = DependenciesOf<ApplicationGraph, 'biLogger'>;

interface UseButtonPress {
  usePress: () => void;
}

const useButtonClick = ({ biLogger }: Injected): UseButtonPress => {
  const onClick = useCallback(() => {
    biLogger.logButtonClick();
  }, [biLogger]);
  
  return { onClick };
};

export default injectHook(useButtonClick, ApplicationGraph);
\`\`\`

### Step 3: Use the Injected Hook

\`\`\`typescript
const Component = () => {
  const { onClick } = useButtonClick();
  return (
    <>
      <button onclick={onClick}>Click Me</button>
    </>
  );
};
\`\`\`

---

## Resources

- [Documentation](https://wix-incubator.github.io/obsidian/docs/documentation)
- [Online Playground](https://wix-incubator.github.io/obsidian/playground)
- [Discord Community](https://discord.gg/MDH2axwaPy)
- [GitHub Repository](https://github.com/wix-incubator/obsidian)
- [NPM Package](https://npmjs.com/package/react-obsidian)

---

*This documentation was generated for React Obsidian - A dependency injection framework for React and React Native applications.*
