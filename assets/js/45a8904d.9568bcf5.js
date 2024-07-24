"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[7262],{9434:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>a,contentTitle:()=>c,default:()=>l,frontMatter:()=>s,metadata:()=>p,toc:()=>r});var o=t(1085),i=t(1184);const s={sidebar_position:3,title:"Functional components"},c=void 0,p={id:"documentation/usage/FunctionalComponents",title:"Functional components",description:"Injecting functional components",source:"@site/docs/documentation/usage/FunctionalComponents.mdx",sourceDirName:"documentation/usage",slug:"/documentation/usage/FunctionalComponents",permalink:"/obsidian/docs/documentation/usage/FunctionalComponents",draft:!1,unlisted:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/documentation/usage/FunctionalComponents.mdx",tags:[],version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3,title:"Functional components"},sidebar:"docs2",previous:{title:"Hooks",permalink:"/obsidian/docs/documentation/usage/Hooks"},next:{title:"Class components",permalink:"/obsidian/docs/documentation/usage/ClassComponents"}},a={},r=[{value:"Injecting functional components",id:"injecting-functional-components",level:2},{value:"Strongly typed components",id:"strongly-typed-components",level:2},{value:"Typing components that require props and injected dependencies",id:"typing-components-that-require-props-and-injected-dependencies",level:3},{value:"Typing components that don&#39;t require Props",id:"typing-components-that-dont-require-props",level:3}];function d(e){const n={admonition:"admonition",code:"code",em:"em",h2:"h2",h3:"h3",p:"p",pre:"pre",...(0,i.R)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n.h2,{id:"injecting-functional-components",children:"Injecting functional components"}),"\n",(0,o.jsxs)(n.p,{children:["Component injection is identical in principle to how hooks are injected. The only difference is that instead of using the ",(0,o.jsx)(n.code,{children:"injectHook"})," function, you use the ",(0,o.jsx)(n.code,{children:"injectComponent"})," function. The ",(0,o.jsx)(n.code,{children:"injectComponent"})," function takes the same arguments as the ",(0,o.jsx)(n.code,{children:"injectHook"})," function, except that it takes a component as the second argument instead of a hook."]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-tsx",metastring:'title="Injecting a functional component"',children:"import { injectComponent, DependenciesOf } from 'react-obsidian';\nimport { ApplicationGraph } from './ApplicationGraph';\n\nconst MyComponent = ({httpService}: DependenciesOf<ApplicationGraph, 'httpClient'>) => {\n  return <div>My component</div>\n}\n\nexport default injectComponent(MyComponent, ApplicationGraph);\n"})}),"\n",(0,o.jsxs)(n.admonition,{title:"Prefer injecting hooks over components",type:"tip",children:[(0,o.jsx)(n.p,{children:"Every entity (class, functional component etc.) in your application should have a single responsibility, and as such, there should be only one reason to change it. Components are responsible for rendering the UI, and therefor should change only when UI requirements change."}),(0,o.jsx)(n.p,{children:'Prefer injecting hooks that will bridge between components and application logic. This allows components to emphasize "what" they need instead of "how", thus, preventing implementation details from leaking into them.'})]}),"\n",(0,o.jsx)(n.h2,{id:"strongly-typed-components",children:"Strongly typed components"}),"\n",(0,o.jsxs)(n.p,{children:["The ",(0,o.jsx)(n.code,{children:"injectComponent"})," function leverages ",(0,o.jsx)(n.em,{children:"generics"})," to correctly type injected components."]}),"\n",(0,o.jsx)(n.h3,{id:"typing-components-that-require-props-and-injected-dependencies",children:"Typing components that require props and injected dependencies"}),"\n",(0,o.jsxs)(n.p,{children:["In cases where a component requires both props and injected dependencies, we recommend typing them separately and declaring the component's props as the intersection of the two types. This way the component returned by the ",(0,o.jsx)(n.code,{children:"injectComponent"})," function will require its ",(0,o.jsx)(n.code,{children:"Own"})," props while all ",(0,o.jsx)(n.code,{children:"Injected"})," dependencies will be marked as optional. ",(0,o.jsx)(n.code,{children:"Injected"})," dependencies are marked as optional because they can either be injected manually or automatically by Obsidian."]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-tsx",metastring:'title="Separate declaration for passed (own) props and injected dependencies"',children:"import { injectComponent, DependenciesOf } from 'react-obsidian';\nimport {ApplicationGraph} from './ApplicationGraph';\n\ntype Injected = DependenciesOf<ApplicationGraph, 'httpClient'>;\ntype Own = {name: string};\n\nconst MyComponent = ({name, httpService}: Own & Injected) => {\n  return <div>Hey, my name is: {name} \ud83d\udc4b</div>\n}\n\n// The result type is React.FunctionComponent<{name: string , httpClient?: HttpClient}>\nexport default injectComponent<Own, Injected>(MyComponent, ApplicationGraph);\n"})}),"\n",(0,o.jsx)(n.h3,{id:"typing-components-that-dont-require-props",children:"Typing components that don't require Props"}),"\n",(0,o.jsxs)(n.p,{children:["If a component doesn't require any props from its parent component, simply use the ",(0,o.jsx)(n.code,{children:"DependenciesOf"})," utility type provided by Obsidian to type the component's props. There's no need to use generics in this case as all props will are marked as optional."]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-tsx",metastring:'title="Typing components that don\'t require props"',children:"const MyComponent = ({httpService}: DependenciesOf<ApplicationGraph, 'httpClient'>) => {\n  return <div>Hello world \ud83d\udc4b</div>\n}\n\n// The result type is React.FunctionComponent<{httpClient?: HttpClient}>\nexport default injectComponent(MyComponent, ApplicationGraph);\n"})})]})}function l(e={}){const{wrapper:n}={...(0,i.R)(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(d,{...e})}):d(e)}},1184:(e,n,t)=>{t.d(n,{R:()=>c,x:()=>p});var o=t(4041);const i={},s=o.createContext(i);function c(e){const n=o.useContext(s);return o.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function p(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:c(e.components),o.createElement(s.Provider,{value:n},e.children)}}}]);