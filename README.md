[![SWUbanner](https://raw.githubusercontent.com/vshymanskyy/StandWithUkraine/main/banner2-direct.svg)](https://vshymanskyy.github.io/StandWithUkraine)

<p align="center">
  </br><img width="300px" src=".github/logo.svg"></br>
</p>

# React Obsidian

React Obsidian is a dependency injection framework for React and React Native applications. It allows you to inject dependencies into hooks, components, and classes. Separating the construction and consumption of dependencies is crucial to maintaining a readable and testable codebase.

> 📖 Read more about Dependency Injection and Obsidian in [Breaking complexity with Dependency Injection: Introducing Obsidian](https://guyca.medium.com/breaking-complexity-with-dependency-injection-introducing-obsidian-cd452802f076) on Medium.

* [Documentation](https://wix-incubator.github.io/obsidian/docs/documentation)
  * [Getting Started](https://wix-incubator.github.io/obsidian/docs/documentation/#the-2-steps-tutorial-for-injecting-dependencies-with-obsidian)
  * [Installation](https://wix-incubator.github.io/obsidian/docs/documentation/installation)
  * [Guides](https://wix-incubator.github.io/obsidian/docs/guides/mockDependencies)
* [Chat on Discord](https://discord.gg/MDH2axwaPy)

## Example - Injecting a hook
Obsidian supports injecting hooks, components and classes. The example below shows how to inject a hook.

### Step 1: Declare an object graph
Before we can inject dependencies into hooks, components and classes, we first need to declare our dependencies. Dependencies are declared in classes called "Graphs" where the relationships between the dependencies are outlined.

In the `ApplicationGraph` below, we declare two dependencies:
1. `httpClient`
2. `biLogger`

Both functions are annotated by the `@Provides()` annotation. This signals Obsidian that the results of these functions are provided by the graph and can be injected.

Notice how the `biLogger` function receives an `httpClient` as an argument. This means that `biLogger` is dependent on `httpClient`. Obsidian will create an `httpClient` when `biLogger` is injected. 

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

### Step 2: Inject a dependency

```typescript
type Injected = DependenciesOf<ApplicationGraph, 'biLogger'>; // { biLogger: BiLogger }

interface UseButtonPress {
  usePress: () => void;
}

// We must use destructuring for Obsidian to be able to inject the dependencies
const useButtonClick = ({ biLogger }: Injected): UseButtonPress => {
  const onClick = useCallback(() => {
    biLogger.logButtonClick();
  }, [biLogger]);
  
  return { onClick };
};

// Export the injected hook
export default injectHook(useButtonClick, ApplicationGraph);
```

### Step 3: Use the injected hook
Now that we exported the injected hook, we can use it in a component without needing to provide its dependencies manually.

```tsx
const Component = () => (
  // No need to specify dependencies as they are injected automatically
  const { onClick } = useButtonClick();
  <>
    <button onclick={onClick}>Click Me</button>
  </>
);
```
