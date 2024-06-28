"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[6618],{9071:(e,t,n)=>{n.r(t),n.d(t,{Playground:()=>l,contentTitle:()=>i,default:()=>u,frontMatter:()=>o,metadata:()=>c,toc:()=>p});var r=n(9575),a=(n(4041),n(2247));const o={title:"Obsidian playground",description:"A live playground for Obsidian demonstrating both state and dependency management in a React application.",hide_table_of_contents:!0},i="Obsidian playground",c={type:"mdx",permalink:"/obsidian/playground/",source:"@site/src/pages/playground/index.mdx",title:"Obsidian playground",description:"A live playground for Obsidian demonstrating both state and dependency management in a React application.",frontMatter:{title:"Obsidian playground",description:"A live playground for Obsidian demonstrating both state and dependency management in a React application.",hide_table_of_contents:!0}},p=[],l=e=>{let{children:t,color:n}=e;return(0,a.yg)("iframe",{style:{border:"1px solid rgba(0, 0, 0, 0.1)",borderRadius:"2px"},width:"100%",height:"600",src:"https://codesandbox.io/p/sandbox/obsidian-task-list-c16w8r?file=/src/App.tsx:,C11&embed=1&hidenavigation=1",allowfullscreen:!0})},d={toc:p,Playground:l},s="wrapper";function u(e){let{components:t,...n}=e;return(0,a.yg)(s,(0,r.A)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,a.yg)("h1",{id:"obsidian-playground"},"Obsidian playground"),(0,a.yg)("p",null,"The following is a live playground for Obsidian. You can fork the code to edit it or use it as a template for your own project.\nIt's adapted from the state management example in the ",(0,a.yg)("a",{parentName:"p",href:"https://react.dev/learn/scaling-up-with-reducer-and-context"},"React docs")," and is meant to demonstrate how Obsidian can be used to manage both state and dependencies in a React application."),(0,a.yg)(l,{mdxType:"Playground"}))}u.isMDXComponent=!0},2247:(e,t,n)=>{n.d(t,{xA:()=>d,yg:()=>f});var r=n(4041);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var p=r.createContext({}),l=function(e){var t=r.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},d=function(e){var t=l(e.components);return r.createElement(p.Provider,{value:t},e.children)},s="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},y=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,p=e.parentName,d=c(e,["components","mdxType","originalType","parentName"]),s=l(n),y=a,f=s["".concat(p,".").concat(y)]||s[y]||u[y]||o;return n?r.createElement(f,i(i({ref:t},d),{},{components:n})):r.createElement(f,i({ref:t},d))}));function f(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,i=new Array(o);i[0]=y;var c={};for(var p in t)hasOwnProperty.call(t,p)&&(c[p]=t[p]);c.originalType=e,c[s]="string"==typeof e?e:a,i[1]=c;for(var l=2;l<o;l++)i[l]=n[l];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}y.displayName="MDXCreateElement"}}]);