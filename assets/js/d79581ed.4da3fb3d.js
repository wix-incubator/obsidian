"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[8816],{9075:(e,n,o)=>{o.r(n),o.d(n,{assets:()=>c,contentTitle:()=>s,default:()=>l,frontMatter:()=>r,metadata:()=>d,toc:()=>p});var i=o(1085),t=o(1184);const r={sidebar_position:2,title:" Avoiding prop drilling",tags:["Architecture","Reactivity","Lifecycle-bound","Graph"]},s=void 0,d={id:"guides/avoidingPropDrilling",title:" Avoiding prop drilling",description:"Prop Drilling is a common issue in React development where props are passed down multiple levels of the component hierarchy, making the code difficult to maintain and understand. This guide will show you how to use @lifecycleBound graphs to avoid Prop Drilling.",source:"@site/docs/guides/avoidingPropDrilling.mdx",sourceDirName:"guides",slug:"/guides/avoidingPropDrilling",permalink:"/obsidian/docs/guides/avoidingPropDrilling",draft:!1,unlisted:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/guides/avoidingPropDrilling.mdx",tags:[{inline:!0,label:"Architecture",permalink:"/obsidian/docs/tags/architecture"},{inline:!0,label:"Reactivity",permalink:"/obsidian/docs/tags/reactivity"},{inline:!0,label:"Lifecycle-bound",permalink:"/obsidian/docs/tags/lifecycle-bound"},{inline:!0,label:"Graph",permalink:"/obsidian/docs/tags/graph"}],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2,title:" Avoiding prop drilling",tags:["Architecture","Reactivity","Lifecycle-bound","Graph"]},sidebar:"guides",previous:{title:"MVVM architecture with Obsidian",permalink:"/obsidian/docs/guides/mvvm"},next:{title:"Configurable applications",permalink:"/obsidian/docs/guides/configurableApplications"}},c={},p=[{value:"Understanding lifecycle-bound graphs",id:"understanding-lifecycle-bound-graphs",level:2},{value:"Prop drilling example",id:"prop-drilling-example",level:2},{value:"Avoiding prop drilling with <code>@lifecycleBound</code> graphs",id:"avoiding-prop-drilling-with-lifecyclebound-graphs",level:2},{value:"Step 1: Define a lifecycle-bound graph",id:"step-1-define-a-lifecycle-bound-graph",level:4},{value:"Step 2: Inject dependencies into components",id:"step-2-inject-dependencies-into-components",level:4},{value:"Step 3: Use the components in a UI flow",id:"step-3-use-the-components-in-a-ui-flow",level:4},{value:"Wrapping up",id:"wrapping-up",level:2}];function a(e){const n={a:"a",admonition:"admonition",code:"code",h2:"h2",h4:"h4",p:"p",pre:"pre",strong:"strong",...(0,t.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsxs)(n.p,{children:["Prop Drilling is a common issue in React development where props are passed down multiple levels of the component hierarchy, making the code difficult to maintain and understand. This guide will show you how to use ",(0,i.jsx)(n.code,{children:"@lifecycleBound"})," graphs to avoid Prop Drilling."]}),"\n",(0,i.jsx)(n.h2,{id:"understanding-lifecycle-bound-graphs",children:"Understanding lifecycle-bound graphs"}),"\n",(0,i.jsxs)(n.p,{children:["Lifecycle-bound graphs are designed to provide dependencies that are shared between components and hooks ",(0,i.jsx)(n.strong,{children:"within a specific UI flow"}),". Dependencies provided by a lifecycle-bound graph are treated as singletons within the scope of the components or hooks that depend on that graph."]}),"\n",(0,i.jsx)(n.p,{children:"A key feature of lifecycle-bound graphs is that it has access to the initial props of the component or hook that requested it. This will allow us to inject these props directly into any component, hook, or class that requires them without the need for Prop Drilling."}),"\n",(0,i.jsxs)(n.p,{children:["You can read more about Lifecycle-bound Graphs ",(0,i.jsx)(n.a,{href:"/docs/documentation/usage/Graphs#the-lifecycle-bound-graph",children:"here"}),"."]}),"\n",(0,i.jsx)(n.h2,{id:"prop-drilling-example",children:"Prop drilling example"}),"\n",(0,i.jsxs)(n.p,{children:["In this simple example, three components are rendered. ",(0,i.jsx)(n.code,{children:"ComponentA"})," renders ",(0,i.jsx)(n.code,{children:"ComponentB"}),", which in turn renders ",(0,i.jsx)(n.code,{children:"ComponentC"}),". ",(0,i.jsx)(n.code,{children:"ComponentC"})," needs to access a prop (",(0,i.jsx)(n.code,{children:"'userId"}),") that is passed down from ",(0,i.jsx)(n.code,{children:"ComponentA"}),". This is a classic example of prop drilling."]}),"\n",(0,i.jsx)(n.p,{children:"Here's how the code looks when using traditional prop drilling:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-tsx",metastring:'title="Propagating props down the component tree"',children:"import React from 'react';\n\nconst App = () => {\n  return <ComponentA userId=\"12345\" />;\n};\n\n// Component A passes userId down to ComponentB\nconst ComponentA = ({ userId }) => {\n  return <ComponentB userId={userId} />;\n};\n\n// Component B receives userId and passes it down to ComponentC\nconst ComponentB = ({ userId }) => {\n  return <ComponentC userId={userId} />;\n};\n\n// Component C needs access to userId\nconst ComponentC = ({ userId }) => {\n  return <div>User ID: {userId}</div>;\n};\n"})}),"\n",(0,i.jsxs)(n.p,{children:["In this example, the ",(0,i.jsx)(n.code,{children:"userId"})," prop is drilled down from ",(0,i.jsx)(n.code,{children:"ComponentA"})," to ",(0,i.jsx)(n.code,{children:"ComponentC"})," through ",(0,i.jsx)(n.code,{children:"ComponentB"}),". This approach can become cumbersome as the number of components and the depth of the hierarchy increase."]}),"\n",(0,i.jsxs)(n.h2,{id:"avoiding-prop-drilling-with-lifecyclebound-graphs",children:["Avoiding prop drilling with ",(0,i.jsx)(n.code,{children:"@lifecycleBound"})," graphs"]}),"\n",(0,i.jsxs)(n.p,{children:["Let's refactor this code to use a ",(0,i.jsx)(n.code,{children:"@lifecycleBound"})," graph to avoid prop drilling."]}),"\n",(0,i.jsx)(n.h4,{id:"step-1-define-a-lifecycle-bound-graph",children:"Step 1: Define a lifecycle-bound graph"}),"\n",(0,i.jsxs)(n.p,{children:["First, define a lifecycle-bound graph that provides the ",(0,i.jsx)(n.code,{children:"userId"})," as a dependency."]}),"\n",(0,i.jsx)(n.admonition,{type:"important",children:(0,i.jsxs)(n.p,{children:["Notice how the graph receives ",(0,i.jsx)(n.code,{children:"ComponentA"}),"'s props in its constructor and provides ",(0,i.jsx)(n.code,{children:"userId"})," as a dependency."]})}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-tsx",metastring:'title="UserGraph.ts"',children:"import { lifecycleBound, graph, ObjectGraph, provides } from 'react-obsidian';\nimport {Props} from './ComponentA';\n\n@lifecycleBound() @graph()\nexport class UserGraph extends ObjectGraph<UserProps> {\n  private userId: string;\n\n  construct(props: Props) {\n    super(props);\n    this.userId = props.userId;\n  }\n\n  @provides()\n  userId(): string {\n    return this.userId;\n  }\n}\n"})}),"\n",(0,i.jsx)(n.h4,{id:"step-2-inject-dependencies-into-components",children:"Step 2: Inject dependencies into components"}),"\n",(0,i.jsxs)(n.p,{children:["Next, inject the ",(0,i.jsx)(n.code,{children:"userId"})," dependency into ",(0,i.jsx)(n.code,{children:"ComponentC"}),"."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-tsx",metastring:'title="ComponentC.tsx"',children:"import React from 'react';\nimport { injectComponent, DependenciesOf } from 'react-obsidian';\nimport { UserGraph } from './UserGraph';\n\ntype Injected = DependenciesOf<UserGraph, 'userId'>;\n\nconst ComponentC = ({ userId }: Injected) => {\n  return <div>User ID: {userId}</div>;\n};\n\nexport default injectComponent(ComponentC, UserGraph);\n"})}),"\n",(0,i.jsx)(n.h4,{id:"step-3-use-the-components-in-a-ui-flow",children:"Step 3: Use the components in a UI flow"}),"\n",(0,i.jsxs)(n.p,{children:["Finally, use the components within a UI flow. ",(0,i.jsx)(n.code,{children:"ComponentB"})," and ",(0,i.jsx)(n.code,{children:"ComponentA"})," don't need to pass down the ",(0,i.jsx)(n.code,{children:"userId"})," prop anymore."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-tsx",metastring:'title="ComponentB.tsx"',children:"import React from 'react';\nimport ComponentC from './ComponentC';\n\nconst ComponentB = () => {\n  return <ComponentC />;\n};\n\nexport default ComponentB;\n"})}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.code,{children:"ComponentA"})," is the entry point of the UI flow. Even though ",(0,i.jsx)(n.code,{children:"ComponentA"})," doesn't require any dependencies from the ",(0,i.jsx)(n.code,{children:"UserGraph"}),", we need to inject it by wrapping it with the ",(0,i.jsx)(n.code,{children:"injectComponent"})," HOC. This is done to ensure that the ",(0,i.jsx)(n.code,{children:"UserGraph"})," is initialized and the dependencies it provides are available to other components in the flow."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-tsx",metastring:'title="ComponentA.tsx"',children:"import React from 'react';\nimport { injectComponent, DependenciesOf } from 'react-obsidian';\nimport { UserGraph } from './UserGraph';\nimport ComponentB from './ComponentB';\n\nexport type Props = {\n  userId: string;\n};\n\nconst ComponentA = (props: Props) => {\n  return <ComponentB />;\n};\n\nexport default injectComponent(ComponentA, UserGraph);\n"})}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-tsx",metastring:'title="App.tsx"',children:"import React from 'react';\nimport ComponentA from './ComponentA';\n\nconst App = () => {\n  return <ComponentA userId=\"12345\" />;\n};\n\nexport default App;\n"})}),"\n",(0,i.jsx)(n.h2,{id:"wrapping-up",children:"Wrapping up"}),"\n",(0,i.jsxs)(n.p,{children:["By using ",(0,i.jsx)(n.code,{children:"@lifecycleBound"})," graphs, we've eliminated the need for prop drilling. Dependencies like ",(0,i.jsx)(n.code,{children:"userId"})," are automatically injected where needed, making the code cleaner and easier to maintain."]})]})}function l(e={}){const{wrapper:n}={...(0,t.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(a,{...e})}):a(e)}},1184:(e,n,o)=>{o.d(n,{R:()=>s,x:()=>d});var i=o(4041);const t={},r=i.createContext(t);function s(e){const n=i.useContext(r);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function d(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:s(e.components),i.createElement(r.Provider,{value:n},e.children)}}}]);