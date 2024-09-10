"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[3090],{856:(e,n,a)=>{a.r(n),a.d(n,{assets:()=>s,contentTitle:()=>i,default:()=>p,frontMatter:()=>t,metadata:()=>d,toc:()=>l});var r=a(1085),o=a(1184);const t={sidebar_position:3,title:"Graph middlewares"},i=void 0,d={id:"documentation/meta/middlewares",title:"Graph middlewares",description:'Graph middlewares let you plug into the graph creation process and modify the graph in any way you want. This is useful when working on large scale applications where "observability" is a key concern. For example, you can use a middleware to swizzle providers, add logging, or even add a new provider to the graph.',source:"@site/docs/documentation/meta/middlewares.mdx",sourceDirName:"documentation/meta",slug:"/documentation/meta/middlewares",permalink:"/obsidian/docs/documentation/meta/middlewares",draft:!1,unlisted:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/documentation/meta/middlewares.mdx",tags:[],version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3,title:"Graph middlewares"},sidebar:"docs2",previous:{title:"Clearing graphs",permalink:"/obsidian/docs/documentation/meta/clearingGraphs"}},s={},l=[{value:"Example: adding a logging middleware",id:"example-adding-a-logging-middleware",level:2}];function c(e){const n={code:"code",h2:"h2",p:"p",pre:"pre",...(0,o.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.p,{children:'Graph middlewares let you plug into the graph creation process and modify the graph in any way you want. This is useful when working on large scale applications where "observability" is a key concern. For example, you can use a middleware to swizzle providers, add logging, or even add a new provider to the graph.'}),"\n",(0,r.jsx)(n.p,{children:"Middleware follow the Chain of Responsibility pattern and therefore must always return a graph, either by creating one explicitly or by returning the instance created by another member in the resolve chain."}),"\n",(0,r.jsx)(n.h2,{id:"example-adding-a-logging-middleware",children:"Example: adding a logging middleware"}),"\n",(0,r.jsx)(n.p,{children:"The following example demonstrates how to add a middleware that's used for logging purposes."}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-ts",children:"import { GraphMiddleware } from 'react-obsidian';\n\nconst loggingMiddleware = new class extends GraphMiddleware {\n      resolve<Props>(resolveChain: GraphResolveChain, Graph: Constructable<T>, props?: Props) {\n        const t1 = Date.now();\n        const graph = resolveChain.proceed(Graph, props);\n        const t2 = Date.now();\n        console.log(`Graph created in ${t2 - t1} milliseconds`);\n        return graph;\n      }\n    }();\n\nObsidian.addGraphMiddleware(loggingMiddleware);\n"})})]})}function p(e={}){const{wrapper:n}={...(0,o.R)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(c,{...e})}):c(e)}},1184:(e,n,a)=>{a.d(n,{R:()=>i,x:()=>d});var r=a(4041);const o={},t=r.createContext(o);function i(e){const n=r.useContext(t);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function d(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:i(e.components),r.createElement(t.Provider,{value:n},e.children)}}}]);