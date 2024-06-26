"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[8177],{5680:(e,t,r)=>{r.d(t,{xA:()=>c,yg:()=>m});var n=r(6540);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function s(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var l=n.createContext({}),p=function(e){var t=n.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):s(s({},t),e)),r},c=function(e){var t=p(e.components);return n.createElement(l.Provider,{value:t},e.children)},u="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},g=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,l=e.parentName,c=i(e,["components","mdxType","originalType","parentName"]),u=p(r),g=a,m=u["".concat(l,".").concat(g)]||u[g]||d[g]||o;return r?n.createElement(m,s(s({ref:t},c),{},{components:r})):n.createElement(m,s({ref:t},c))}));function m(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,s=new Array(o);s[0]=g;var i={};for(var l in t)hasOwnProperty.call(t,l)&&(i[l]=t[l]);i.originalType=e,i[u]="string"==typeof e?e:a,s[1]=i;for(var p=2;p<o;p++)s[p]=r[p];return n.createElement.apply(null,s)}return n.createElement.apply(null,r)}g.displayName="MDXCreateElement"},919:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>l,contentTitle:()=>s,default:()=>d,frontMatter:()=>o,metadata:()=>i,toc:()=>p});var n=r(8168),a=(r(6540),r(5680));const o={sidebar_position:5,title:"Model"},s=void 0,i={unversionedId:"reference/model",id:"reference/model",title:"Model",description:"Model is an abstract utility class that provides an easy way to observe specific properties of an object.",source:"@site/docs/reference/model.mdx",sourceDirName:"reference",slug:"/reference/model",permalink:"/obsidian/docs/reference/model",draft:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/reference/model.mdx",tags:[],version:"current",sidebarPosition:5,frontMatter:{sidebar_position:5,title:"Model"},sidebar:"reference",previous:{title:"useObservers",permalink:"/obsidian/docs/reference/useObservers"},next:{title:"TestKit",permalink:"/obsidian/docs/category/testkit"}},l={},p=[{value:"Reference",id:"reference",level:2},{value:"use()",id:"use",level:3},{value:"Returns",id:"returns",level:4},{value:"Usage",id:"usage",level:2},{value:"Observing properties",id:"observing-properties",level:3}],c={toc:p},u="wrapper";function d(e){let{components:t,...r}=e;return(0,a.yg)(u,(0,n.A)({},c,r,{components:t,mdxType:"MDXLayout"}),(0,a.yg)("p",null,(0,a.yg)("inlineCode",{parentName:"p"},"Model")," ",(0,a.yg)("strong",{parentName:"p"},"is an abstract utility class that provides an easy way to observe specific properties of an object.")),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("a",{parentName:"li",href:"#reference"},"Reference"),(0,a.yg)("ul",{parentName:"li"},(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("a",{parentName:"li",href:"#use"},"use()")))),(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("a",{parentName:"li",href:"#usage"},"Usage"),(0,a.yg)("ul",{parentName:"li"},(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("a",{parentName:"li",href:"#observing-properties"},"Observing properties"))))),(0,a.yg)("h2",{id:"reference"},"Reference"),(0,a.yg)("h3",{id:"use"},"use()"),(0,a.yg)("p",null,"The ",(0,a.yg)("inlineCode",{parentName:"p"},"use")," method is used to observe the properties of a model. It's intended to be used only in hooks."),(0,a.yg)("h4",{id:"returns"},"Returns"),(0,a.yg)("p",null,"An object containing all of the model's observable properties."),(0,a.yg)("h2",{id:"usage"},"Usage"),(0,a.yg)("h3",{id:"observing-properties"},"Observing properties"),(0,a.yg)("p",null,"Since ",(0,a.yg)("inlineCode",{parentName:"p"},"Model")," is an abstract class, you'll need to extend it to use it. Let's say you have an app state that looks like this:"),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-ts"},"class AppState {\n  public user = new Observable<User>();\n  public isLoggedIn = new Observable<boolean>();\n}\n")),(0,a.yg)("p",null,"You can use ",(0,a.yg)("inlineCode",{parentName:"p"},"Model")," to observe the properties of ",(0,a.yg)("inlineCode",{parentName:"p"},"AppState")," like this:"),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-ts"},"import { injectHook, Model } from 'react-obsidian';\n\n// 1. Make AppState extend Model\nclass AppState extends Model {\n  public user = new Observable<User>(); // { firstName: string; lastName: string;}\n  public isLoggedIn = new Observable<boolean>();\n}\n\n// 2. `appState` is injected into the hook\nconst _useUserName = (appState: AppState) => {\n  // 3. Use `appState.use()` to observe the properties\n  const {user, isLoggedIn} = user.use();\n\n  return `${user.firstName} is ${isLoggedIn ? '' : 'not '}logged in`;\n};\n\nexport const useUserName = injectHook(_useUserName, /* SomeGraph */);\n")))}d.isMDXComponent=!0}}]);