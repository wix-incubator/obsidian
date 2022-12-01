"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[226],{3905:(e,t,n)=>{n.d(t,{Zo:()=>d,kt:()=>u});var a=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function p(e,t){if(null==e)return{};var n,a,i=function(e,t){if(null==e)return{};var n,a,i={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var s=a.createContext({}),l=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},d=function(e){var t=l(e.components);return a.createElement(s.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},h=a.forwardRef((function(e,t){var n=e.components,i=e.mdxType,r=e.originalType,s=e.parentName,d=p(e,["components","mdxType","originalType","parentName"]),h=l(n),u=i,m=h["".concat(s,".").concat(u)]||h[u]||c[u]||r;return n?a.createElement(m,o(o({ref:t},d),{},{components:n})):a.createElement(m,o({ref:t},d))}));function u(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var r=n.length,o=new Array(r);o[0]=h;var p={};for(var s in t)hasOwnProperty.call(t,s)&&(p[s]=t[s]);p.originalType=e,p.mdxType="string"==typeof e?e:i,o[1]=p;for(var l=2;l<r;l++)o[l]=n[l];return a.createElement.apply(null,o)}return a.createElement.apply(null,n)}h.displayName="MDXCreateElement"},1975:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>o,default:()=>c,frontMatter:()=>r,metadata:()=>p,toc:()=>l});var a=n(7462),i=(n(7294),n(3905));const r={sidebar_position:1},o=void 0,p={unversionedId:"usage/Graphs",id:"usage/Graphs",title:"Graphs",description:"Introduction",source:"@site/docs/usage/Graphs.mdx",sourceDirName:"usage",slug:"/usage/Graphs",permalink:"/obsidian/docs/usage/Graphs",draft:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/usage/Graphs.mdx",tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"tutorialSidebar",previous:{title:"Usage",permalink:"/obsidian/docs/category/usage"},next:{title:"Hooks",permalink:"/obsidian/docs/usage/Hooks"}},s={},l=[{value:"Introduction",id:"introduction",level:2},{value:"Declaring dependencies in a graph",id:"declaring-dependencies-in-a-graph",level:2},{value:"Specifying relationships between dependencies",id:"specifying-relationships-between-dependencies",level:2},{value:"Graph types",id:"graph-types",level:2},{value:"The singleton graph",id:"the-singleton-graph",level:3},{value:"The lifecycle-bound graph",id:"the-lifecycle-bound-graph",level:3},{value:"Typed dependencies",id:"typed-dependencies",level:2},{value:"Graph composition",id:"graph-composition",level:2}],d={toc:l};function c(e){let{components:t,...n}=e;return(0,i.kt)("wrapper",(0,a.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h2",{id:"introduction"},"Introduction"),(0,i.kt)("p",null,"In Object Oriented Programming, programs are organized around objects, where each object has a specific purpose. These objects can require other objects to perform their responsibilities. The required objects are called dependencies. Providing these dependencies manually is a tedious and error-prone process. The dependency injection pattern is a way to automate this process so you can focus on the logic of your application instead of writing boilerplate code."),(0,i.kt)("p",null,'Before you can inject dependencies into hooks, components and classes, the dependencies first need to be declared so Obsidian knows how to construct them. In Obsidian, dependencies are declared in classes called "Graphs". Graphs create a centralized place where dependencies are defined. This makes them a powerful tool for understanding the relationships between objects in your program.'),(0,i.kt)("h2",{id:"declaring-dependencies-in-a-graph"},"Declaring dependencies in a graph"),(0,i.kt)("p",null,"The snippet below shows a basic example of a Graph. It defines two dependencies, ",(0,i.kt)("inlineCode",{parentName:"p"},"httpClient")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"databaseService"),". "),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-ts",metastring:'title="ApplicationGraph.ts"',title:'"ApplicationGraph.ts"'},"import {Singleton, Graph, ObjectGraph, Provides} from 'react-obsidian';\n\n@Singleton() @Graph()\nexport class ApplicationGraph extends ObjectGraph {\n  @Provides()\n  httpClient(): HttpClient {\n    return new HttpClient();\n  }\n\n  @Provides()\n  databaseService(): DatabaseService {\n    return new DatabaseService();\n  }\n}\n")),(0,i.kt)("p",null,"Graphs must be annotated with the ",(0,i.kt)("inlineCode",{parentName:"p"},"@Graph")," decorator. In this example we chose to annotate the class with the ",(0,i.kt)("inlineCode",{parentName:"p"},"@Singleton")," decorator as well, which means that the graph and the dependencies it provides will only be constructed once."),(0,i.kt)("p",null,"Dependencies are constructed in methods annotated with the ",(0,i.kt)("inlineCode",{parentName:"p"},"@Provides")," annotation. The ",(0,i.kt)("inlineCode",{parentName:"p"},"@Provides")," annotation is used to tell Obsidian that the method is a dependency provider. From now on we'll refer to these methods as providers. Obsidian uses the provider's method name as the dependency's name. In this example, the ",(0,i.kt)("inlineCode",{parentName:"p"},"httpClient")," provider method provides the ",(0,i.kt)("inlineCode",{parentName:"p"},"httpClient")," dependency. The ",(0,i.kt)("inlineCode",{parentName:"p"},"databaseService")," provider method provides the ",(0,i.kt)("inlineCode",{parentName:"p"},"databaseService")," dependency."),(0,i.kt)("p",null,"Once your graph is declared you can use it to inject dependencies into the various constructs that form your application:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/docs/usage/hooks#injecting-hooks"},"Inject hooks")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/docs/usage/FunctionalComponents"},"Inject functional components")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/docs/usage/ClassComponents"},"Inject components")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/docs/usage/Classes"},"Inject classes"))),(0,i.kt)("admonition",{title:"Did you know?",type:"info"},(0,i.kt)("p",{parentName:"admonition"},'The term "graph" comes from ',(0,i.kt)("a",{parentName:"p",href:"https://en.wikipedia.org/wiki/Graph_theory"},"graph theory"),". Obsidian constructs ",(0,i.kt)("a",{parentName:"p",href:"https://en.wikipedia.org/wiki/Directed_acyclic_graph"},"Directed Acyclic Graphs")," (DAGs) to represent the dependencies between objects. This type of graph ensures there are no circular dependencies between objects which cause call stack overflows and other unexpected bugs.")),(0,i.kt)("h2",{id:"specifying-relationships-between-dependencies"},"Specifying relationships between dependencies"),(0,i.kt)("p",null,"Some of the services defined in your graphs may be independent, meaning they don't require any dependencies to be constructed. However, most of the time, services will require other services to perform their responsibilities. In these cases, you can specify the dependencies of a service as arguments in the provider and Obsidian will resolve them automatically."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-ts",metastring:'title="A graph that provides a service that depends on other services"',title:'"A',graph:!0,that:!0,provides:!0,a:!0,service:!0,depends:!0,on:!0,other:!0,'services"':!0},"import {Singleton, Graph, ObjectGraph, Provides} from 'react-obsidian';\n\n@Singleton() @Graph()\nexport class ApplicationGraph extends ObjectGraph {\n  @Provides()\n  httpClient(): HttpClient {\n    return new HttpClient();\n  }\n\n  @Provides()\n  databaseService(): DatabaseService {\n    return new DatabaseService();\n  }\n\n  @Provides()\n  appInitializer(httpClient: HttpClient, databaseService: DatabaseService): AppInitializer {\n    return new AppInitializer(httpClient, databaseService);\n  }\n}\n")),(0,i.kt)("admonition",{type:"info"},(0,i.kt)("p",{parentName:"admonition"},"Providers are evaluated lazily. This means that a provider is evaluated only when the dependency it provides is requested. Dependencies that are not used in the application, will never be constructed.")),(0,i.kt)("h2",{id:"graph-types"},"Graph types"),(0,i.kt)("p",null,"There are two types of graphs in Obsidian: A singleton graph and a lifecycle-bound graph."),(0,i.kt)("h3",{id:"the-singleton-graph"},"The singleton graph"),(0,i.kt)("p",null,"Applications typically have at least one singleton graph. These graphs are used to provide dependencies that are used throughout the application. These dependencies are usually singletons, which means they should only be constructed once. The ",(0,i.kt)("inlineCode",{parentName:"p"},"ApplicationGraph")," in the ",(0,i.kt)("a",{parentName:"p",href:"/docs/usage/Graphs#specifying-relationships-between-dependencies"},"example above")," is a singleton graph."),(0,i.kt)("p",null,"To declare a singleton graph, annotate the graph class with the ",(0,i.kt)("inlineCode",{parentName:"p"},"@Singleton")," decorator."),(0,i.kt)("h3",{id:"the-lifecycle-bound-graph"},"The lifecycle-bound graph"),(0,i.kt)("p",null,"Lifecycle-bound graphs are used to provide dependencies that are shared between components and hooks in a specific UI flow."),(0,i.kt)("p",null,"Dependencies provided by a lifecycle-bound graph are treated as singletons within the scope of the components or hooks that depend on that graph. When a component or hook that depends on a lifecycle-bound graph is mounted, Obsidian will reuse an existing instance of the graph if one exists. If no instance of the graph exists, Obsidian will construct a new instance of the graph. Once all components or hooks that use the graph are unmounted, the graph is destroyed."),(0,i.kt)("p",null,"In other words, dependencies provided by lifecycle-bound graphs are:"),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},"Constructed and destroyed when the flow starts and ends."),(0,i.kt)("li",{parentName:"ol"},"Shared between all components and hooks that take part in the flow.")),(0,i.kt)("h2",{id:"typed-dependencies"},"Typed dependencies"),(0,i.kt)("p",null,"The ",(0,i.kt)("inlineCode",{parentName:"p"},"DependenciesOf")," utility type creates a type of the dependencies provided by a graph. This type can be used to type the dependencies of hooks or props required by components. This utility type takes two arguments: the graph and a union of the keys of the dependencies we want to inject."),(0,i.kt)("p",null,"In this example we create a type called ",(0,i.kt)("inlineCode",{parentName:"p"},"ApplicationDependencies")," which contains the dependencies ",(0,i.kt)("inlineCode",{parentName:"p"},"httpClient")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"databaseService")," from the ",(0,i.kt)("inlineCode",{parentName:"p"},"ApplicationGraph")," graph."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-ts"},"type ApplicationDependencies = DependenciesOf<ApplicationGraph, 'httpClient' | 'databaseService'>; // {httpClient: httpClient, databaseService: DatabaseService}\n")),(0,i.kt)("h2",{id:"graph-composition"},"Graph composition"),(0,i.kt)("p",null,"Graph composition is a powerful feature that allows you to create complex dependency graphs by combining smaller graphs. Composing graphs is useful when you want to reuse a graph in multiple places. For example, you might have a singleton graph that provides application-level dependencies. You might also have a lifecycle-bound graph that provides dependencies for a specific UI flow. You can compose these graphs together so that the lifecycle-bound graph can also inject the dependencies provided by the singleton graph."),(0,i.kt)("p",null,"To compose graphs, pass a ",(0,i.kt)("inlineCode",{parentName:"p"},"subgraphs")," array to the ",(0,i.kt)("inlineCode",{parentName:"p"},"@Graph")," decorator. The ",(0,i.kt)("inlineCode",{parentName:"p"},"subgraphs"),' array contains the graphs you want to "include" in your graph.'),(0,i.kt)("p",null,"In the example below we declared a lifecycle-bound graph called ",(0,i.kt)("inlineCode",{parentName:"p"},"LoginGraph"),". This graph provides a single dependency called ",(0,i.kt)("inlineCode",{parentName:"p"},"loginService")," which has a dependency on ",(0,i.kt)("inlineCode",{parentName:"p"},"httpClient"),". Since ",(0,i.kt)("inlineCode",{parentName:"p"},"httpClient")," is exposed via the ",(0,i.kt)("inlineCode",{parentName:"p"},"ApplicationGraph"),", we included it in the ",(0,i.kt)("inlineCode",{parentName:"p"},"subgraphs")," array of our graph."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-ts",metastring:'title="LoginGraph.ts"',title:'"LoginGraph.ts"'},"import {Graph, ObjectGraph, Provides} from 'react-obsidian';\nimport {ApplicationGraph} from './ApplicationGraph';\n\n@LifecycleBound() @Graph({subgraphs: [ApplicationGraph]}) \nexport class LoginGraph extends ObjectGraph {\n  @Provides()\n  loginService(httpClient: HttpClient): LoginService {\n    return new LoginService(httpClient);\n  }\n}\n")))}c.isMDXComponent=!0}}]);