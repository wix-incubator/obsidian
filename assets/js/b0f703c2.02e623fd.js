"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[5826],{3905:(e,n,t)=>{t.d(n,{Zo:()=>d,kt:()=>m});var r=t(7294);function o(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function i(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function a(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?i(Object(t),!0).forEach((function(n){o(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function c(e,n){if(null==e)return{};var t,r,o=function(e,n){if(null==e)return{};var t,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||(o[t]=e[t]);return o}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var p=r.createContext({}),s=function(e){var n=r.useContext(p),t=n;return e&&(t="function"==typeof e?e(n):a(a({},n),e)),t},d=function(e){var n=s(e.components);return r.createElement(p.Provider,{value:n},e.children)},l={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},u=r.forwardRef((function(e,n){var t=e.components,o=e.mdxType,i=e.originalType,p=e.parentName,d=c(e,["components","mdxType","originalType","parentName"]),u=s(t),m=o,v=u["".concat(p,".").concat(m)]||u[m]||l[m]||i;return t?r.createElement(v,a(a({ref:n},d),{},{components:t})):r.createElement(v,a({ref:n},d))}));function m(e,n){var t=arguments,o=n&&n.mdxType;if("string"==typeof e||o){var i=t.length,a=new Array(i);a[0]=u;var c={};for(var p in n)hasOwnProperty.call(n,p)&&(c[p]=n[p]);c.originalType=e,c.mdxType="string"==typeof e?e:o,a[1]=c;for(var s=2;s<i;s++)a[s]=t[s];return r.createElement.apply(null,a)}return r.createElement.apply(null,t)}u.displayName="MDXCreateElement"},5121:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>p,contentTitle:()=>a,default:()=>l,frontMatter:()=>i,metadata:()=>c,toc:()=>s});var r=t(7462),o=(t(7294),t(3905));const i={sidebar_position:5,title:"Service locator"},a=void 0,c={unversionedId:"documentation/usage/ServiceLocator",id:"documentation/usage/ServiceLocator",title:"Service locator",description:"Obtaining dependencies imperatively",source:"@site/docs/documentation/usage/ServiceLocator.mdx",sourceDirName:"documentation/usage",slug:"/documentation/usage/ServiceLocator",permalink:"/obsidian/docs/documentation/usage/ServiceLocator",draft:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/documentation/usage/ServiceLocator.mdx",tags:[],version:"current",sidebarPosition:5,frontMatter:{sidebar_position:5,title:"Service locator"},sidebar:"docs2",previous:{title:"Classes",permalink:"/obsidian/docs/documentation/usage/Classes"},next:{title:"Graph middlewares",permalink:"/obsidian/docs/documentation/meta/middlewares"}},p={},s=[{value:"Obtaining dependencies imperatively",id:"obtaining-dependencies-imperatively",level:2},{value:"Example",id:"example",level:3}],d={toc:s};function l(e){let{components:n,...t}=e;return(0,o.kt)("wrapper",(0,r.Z)({},d,t,{components:n,mdxType:"MDXLayout"}),(0,o.kt)("h2",{id:"obtaining-dependencies-imperatively"},"Obtaining dependencies imperatively"),(0,o.kt)("p",null,"Obsidian is an Inversion of Control container. This means that it will automatically resolve dependencies for you, and you don't need to worry about how to obtain them. However, there are times when you need to obtain a dependency imperatively, for example when you need to pass a dependency to a third-party library that doesn't support dependency injection."),(0,o.kt)("p",null,"For these cases, you can obtain a graph instance and access the dependencies it provides imperatively. This is done by using the ",(0,o.kt)("inlineCode",{parentName:"p"},"Obsidian.obtain()")," function which allows you to treat the graph as a Service Locator."),(0,o.kt)("h3",{id:"example"},"Example"),(0,o.kt)("p",null,"Consider the following graph which provides two dependencies: ",(0,o.kt)("inlineCode",{parentName:"p"},"fooService")," and ",(0,o.kt)("inlineCode",{parentName:"p"},"barService")," where ",(0,o.kt)("inlineCode",{parentName:"p"},"barService")," depends on ",(0,o.kt)("inlineCode",{parentName:"p"},"fooService"),":"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},"import {Singleton, Graph, ObjectGraph, Provides} from 'react-obsidian';\n\n@Singleton() @Graph()\nexport class SomeGraph extends ObjectGraph {\n  @Provides()\n  fooService(): FooService {\n    return new FooService();\n  }\n\n  @Provides()\n  barService(fooService: FooService): AppInitializer {\n    return new BarService(fooService);\n  }\n}\n")),(0,o.kt)("p",null,"Obtaining the dependencies directly from the graph is straight forward:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts",metastring:"Obtaining a dependency imperatively",Obtaining:!0,a:!0,dependency:!0,imperatively:!0},"Obsidian.obtain(ApplicationGraph).fooService();\n\n// Even though barService depends on fooService, you don't need to provide its dependency\nObsidian.obtain(ApplicationGraph).barService();\n")))}l.isMDXComponent=!0}}]);