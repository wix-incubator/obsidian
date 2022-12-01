"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[698],{3905:(e,n,t)=>{t.d(n,{Zo:()=>l,kt:()=>u});var o=t(7294);function i(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function r(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);n&&(o=o.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,o)}return t}function p(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?r(Object(t),!0).forEach((function(n){i(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):r(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function a(e,n){if(null==e)return{};var t,o,i=function(e,n){if(null==e)return{};var t,o,i={},r=Object.keys(e);for(o=0;o<r.length;o++)t=r[o],n.indexOf(t)>=0||(i[t]=e[t]);return i}(e,n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(o=0;o<r.length;o++)t=r[o],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(i[t]=e[t])}return i}var c=o.createContext({}),s=function(e){var n=o.useContext(c),t=n;return e&&(t="function"==typeof e?e(n):p(p({},n),e)),t},l=function(e){var n=s(e.components);return o.createElement(c.Provider,{value:n},e.children)},d={inlineCode:"code",wrapper:function(e){var n=e.children;return o.createElement(o.Fragment,{},n)}},m=o.forwardRef((function(e,n){var t=e.components,i=e.mdxType,r=e.originalType,c=e.parentName,l=a(e,["components","mdxType","originalType","parentName"]),m=s(t),u=i,h=m["".concat(c,".").concat(u)]||m[u]||d[u]||r;return t?o.createElement(h,p(p({ref:n},l),{},{components:t})):o.createElement(h,p({ref:n},l))}));function u(e,n){var t=arguments,i=n&&n.mdxType;if("string"==typeof e||i){var r=t.length,p=new Array(r);p[0]=m;var a={};for(var c in n)hasOwnProperty.call(n,c)&&(a[c]=n[c]);a.originalType=e,a.mdxType="string"==typeof e?e:i,p[1]=a;for(var s=2;s<r;s++)p[s]=t[s];return o.createElement.apply(null,p)}return o.createElement.apply(null,t)}m.displayName="MDXCreateElement"},4354:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>p,default:()=>d,frontMatter:()=>r,metadata:()=>a,toc:()=>s});var o=t(7462),i=(t(7294),t(3905));const r={sidebar_position:3,title:"Functional components"},p=void 0,a={unversionedId:"usage/FunctionalComponents",id:"usage/FunctionalComponents",title:"Functional components",description:"Injecting functional components",source:"@site/docs/usage/FunctionalComponents.mdx",sourceDirName:"usage",slug:"/usage/FunctionalComponents",permalink:"/docs/usage/FunctionalComponents",draft:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/usage/FunctionalComponents.mdx",tags:[],version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3,title:"Functional components"},sidebar:"tutorialSidebar",previous:{title:"Hooks",permalink:"/docs/usage/Hooks"},next:{title:"Class components",permalink:"/docs/usage/ClassComponents"}},c={},s=[{value:"Injecting functional components",id:"injecting-functional-components",level:2},{value:"Strongly typed components",id:"strongly-typed-components",level:2},{value:"Typing components that require props and injected dependencies",id:"typing-components-that-require-props-and-injected-dependencies",level:3},{value:"Typing components that don&#39;t require Props",id:"typing-components-that-dont-require-props",level:3}],l={toc:s};function d(e){let{components:n,...t}=e;return(0,i.kt)("wrapper",(0,o.Z)({},l,t,{components:n,mdxType:"MDXLayout"}),(0,i.kt)("h2",{id:"injecting-functional-components"},"Injecting functional components"),(0,i.kt)("p",null,"Component injection is identical in principle to how hooks are injected. The only difference is that instead of using the ",(0,i.kt)("inlineCode",{parentName:"p"},"injectHook")," function, you use the ",(0,i.kt)("inlineCode",{parentName:"p"},"injectComponent")," function. The ",(0,i.kt)("inlineCode",{parentName:"p"},"injectComponent")," function takes the same arguments as the ",(0,i.kt)("inlineCode",{parentName:"p"},"injectHook")," function, except that it takes a component as the second argument instead of a hook."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-tsx",metastring:'title="Injecting a functional component"',title:'"Injecting',a:!0,functional:!0,'component"':!0},"import { injectComponent, DependenciesOf } from 'react-obsidian';\nimport { ApplicationGraph } from './ApplicationGraph';\n\nconst MyComponent = ({httpService}: DependenciesOf<ApplicationGraph, 'httpClient'>) => {\n  return <div>My component</div>\n}\n\nexport default injectComponent(MyComponent, ApplicationGraph);\n")),(0,i.kt)("admonition",{title:"Prefer injecting hooks over components",type:"tip"},(0,i.kt)("p",{parentName:"admonition"},"Every entity (class, functional component etc.) in your application should have a single responsibility, and as such, there should be only one reason to change it. Components are responsible for rendering the UI, and therefor should change only when UI requirements change. "),(0,i.kt)("p",{parentName:"admonition"},'Prefer injecting hooks that will bridge between components and application logic. This allows components to emphasize "what" they need instead of "how", thus, preventing implementation details from leaking into them.')),(0,i.kt)("h2",{id:"strongly-typed-components"},"Strongly typed components"),(0,i.kt)("p",null,"The ",(0,i.kt)("inlineCode",{parentName:"p"},"injectComponent")," function leverages ",(0,i.kt)("em",{parentName:"p"},"generics")," to correctly type injected components."),(0,i.kt)("h3",{id:"typing-components-that-require-props-and-injected-dependencies"},"Typing components that require props and injected dependencies"),(0,i.kt)("p",null,"In cases where a component requires both props and injected dependencies, we recommend typing them separately and declaring the component's props as the intersection of the two types. This way the component returned by the ",(0,i.kt)("inlineCode",{parentName:"p"},"injectComponent")," function will require its ",(0,i.kt)("inlineCode",{parentName:"p"},"Own")," props while all ",(0,i.kt)("inlineCode",{parentName:"p"},"Injected")," dependencies will be marked as optional. ",(0,i.kt)("inlineCode",{parentName:"p"},"Injected")," dependencies are marked as optional because they can either be injected manually or automatically by Obsidian."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-tsx",metastring:'title="Separate declaration for passed (own) props and injected dependencies"',title:'"Separate',declaration:!0,for:!0,passed:!0,"(own)":!0,props:!0,and:!0,injected:!0,'dependencies"':!0},"import { injectComponent, DependenciesOf } from 'react-obsidian';\nimport {ApplicationGraph} from './ApplicationGraph';\n\ntype Injected = DependenciesOf<ApplicationGraph, 'httpClient'>;\ntype Own = {name: string};\n\nconst MyComponent = ({name, httpService}: Own & Injected) => {\n  return <div>Hey, my name is: {name} \ud83d\udc4b</div>\n}\n\n// The result type is React.FunctionComponent<{name: string , httpClient?: HttpClient}>\nexport default injectComponent<Own, Injected>(MyComponent, ApplicationGraph);\n")),(0,i.kt)("h3",{id:"typing-components-that-dont-require-props"},"Typing components that don't require Props"),(0,i.kt)("p",null,"If a component doesn't require any props from its parent component, simply use the ",(0,i.kt)("inlineCode",{parentName:"p"},"DependenciesOf")," utility type provided by Obsidian to type the component's props. There's no need to use generics in this case as all props will are marked as optional."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-tsx",metastring:'title="Typing components that don\'t require props"',title:'"Typing',components:!0,that:!0,"don't":!0,require:!0,'props"':!0},"const MyComponent = ({httpService}: DependenciesOf<ApplicationGraph, 'httpClient'>) => {\n  return <div>Hello world \ud83d\udc4b</div>\n}\n\n// The result type is React.FunctionComponent<{httpClient?: HttpClient}>\nexport default injectComponent(MyComponent, ApplicationGraph);\n")))}d.isMDXComponent=!0}}]);