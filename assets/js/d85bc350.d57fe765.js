"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[5615],{6404:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>s,contentTitle:()=>l,default:()=>c,frontMatter:()=>i,metadata:()=>o,toc:()=>u});var a=t(9575),r=(t(4041),t(2247));const i={sidebar_position:1,title:"Observable"},l=void 0,o={unversionedId:"reference/observable",id:"reference/observable",title:"Observable",description:"Observable is a class that represents a stream of values. It is similar to Promise in that it is a container for a value that will be available in the future. However, unlike Promise, Observable can emit multiple values over time.",source:"@site/docs/reference/observable.mdx",sourceDirName:"reference",slug:"/reference/observable",permalink:"/obsidian/docs/reference/observable",draft:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/reference/observable.mdx",tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1,title:"Observable"},sidebar:"reference",next:{title:"MediatorObservable",permalink:"/obsidian/docs/reference/mediatorObservable"}},s={},u=[{value:"Reference",id:"reference",level:3},{value:"new Observable(initialValue?)",id:"new-observableinitialvalue",level:4},{value:"Arguments",id:"arguments",level:4},{value:"Caveats",id:"caveats",level:4},{value:"subscribe(onNext)",id:"subscribeonnext",level:3},{value:"Arguments",id:"arguments-1",level:4},{value:"Returns",id:"returns",level:4},{value:"unsubscribe(onNext)",id:"unsubscribeonnext",level:3},{value:"Arguments",id:"arguments-2",level:4},{value:"set value",id:"set-value",level:3},{value:"get value",id:"get-value",level:3},{value:"async first&lt;T&gt;(): Promise&lt;T&gt;",id:"async-firstt-promiset",level:3},{value:"Returns",id:"returns-1",level:4},{value:"Usage",id:"usage",level:2},{value:"Conditional rendering of a component",id:"conditional-rendering-of-a-component",level:3}],g={toc:u},p="wrapper";function c(e){let{components:n,...t}=e;return(0,r.yg)(p,(0,a.A)({},g,t,{components:n,mdxType:"MDXLayout"}),(0,r.yg)("p",null,(0,r.yg)("inlineCode",{parentName:"p"},"Observable")," ",(0,r.yg)("strong",{parentName:"p"},"is a class that represents a stream of values. It is similar to")," ",(0,r.yg)("inlineCode",{parentName:"p"},"Promise")," ",(0,r.yg)("strong",{parentName:"p"},"in that it is a container for a value that will be available in the future. However, unlike "),(0,r.yg)("inlineCode",{parentName:"p"},"Promise"),(0,r.yg)("strong",{parentName:"p"},", "),(0,r.yg)("inlineCode",{parentName:"p"},"Observable"),(0,r.yg)("strong",{parentName:"p"}," can emit multiple values over time.")),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-ts"},"const isLoggedIn = new Observable(false);\nisLoggedIn.subscribe((nextValue: boolean) => {\n  if (nextValue) {\n    console.log('User is logged in');\n  } else {\n    console.log('User is logged out');\n  }\n});\n")),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("a",{parentName:"li",href:"#reference"},"Reference"),(0,r.yg)("ul",{parentName:"li"},(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("a",{parentName:"li",href:"#new-observableinitialvalue"},"new Observable(initialValue?)")),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("a",{parentName:"li",href:"#subscribeonnext"},"subscribe(onNext)")),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("a",{parentName:"li",href:"#unsubscribeonnext"},"unsubscribe(onNext)")),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("a",{parentName:"li",href:"#set-value"},"set value")),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("a",{parentName:"li",href:"#get-value"},"get value")),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("a",{parentName:"li",href:"#async-firstt-promiset"},"async first","<","T",">","(): Promise","<","T",">")))),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("a",{parentName:"li",href:"#usage"},"Usage"),(0,r.yg)("ul",{parentName:"li"},(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("a",{parentName:"li",href:"#conditional-rendering-of-a-component"},"Conditional rendering of a component"))))),(0,r.yg)("hr",null),(0,r.yg)("h3",{id:"reference"},"Reference"),(0,r.yg)("h4",{id:"new-observableinitialvalue"},"new Observable(initialValue?)"),(0,r.yg)("p",null,"Creates a new ",(0,r.yg)("inlineCode",{parentName:"p"},"Observable")," instance with an optional initial value."),(0,r.yg)("h4",{id:"arguments"},"Arguments"),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("inlineCode",{parentName:"li"},"initialValue?")," - The initial value of the ",(0,r.yg)("inlineCode",{parentName:"li"},"Observable"),". Defaults to ",(0,r.yg)("inlineCode",{parentName:"li"},"undefined"),".")),(0,r.yg)("h4",{id:"caveats"},"Caveats"),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},"It's possible to instantiate an ",(0,r.yg)("inlineCode",{parentName:"li"},"Observable")," without an initial value, but it's not recommended, as its value will be ",(0,r.yg)("inlineCode",{parentName:"li"},"undefined")," until it's set for the first time which can lead to unexpected behavior.")),(0,r.yg)("hr",null),(0,r.yg)("h3",{id:"subscribeonnext"},"subscribe(onNext)"),(0,r.yg)("p",null,"The ",(0,r.yg)("inlineCode",{parentName:"p"},"subscribe")," method is used to listen for changes to the ",(0,r.yg)("inlineCode",{parentName:"p"},"Observable"),"'s value. It returns a function that can be used to unsubscribe from the ",(0,r.yg)("inlineCode",{parentName:"p"},"Observable"),"."),(0,r.yg)("h4",{id:"arguments-1"},"Arguments"),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("inlineCode",{parentName:"li"},"onNext")," - A function that will be called whenever the ",(0,r.yg)("inlineCode",{parentName:"li"},"Observable"),"'s value changes. It receives the new value as an argument.")),(0,r.yg)("h4",{id:"returns"},"Returns"),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("inlineCode",{parentName:"li"},"unsubscribe")," - A function that can be used to unsubscribe from the ",(0,r.yg)("inlineCode",{parentName:"li"},"Observable"),".")),(0,r.yg)("hr",null),(0,r.yg)("h3",{id:"unsubscribeonnext"},"unsubscribe(onNext)"),(0,r.yg)("p",null,"The ",(0,r.yg)("inlineCode",{parentName:"p"},"unsubscribe")," method is used to unsubscribe from the ",(0,r.yg)("inlineCode",{parentName:"p"},"Observable")," a specific ",(0,r.yg)("inlineCode",{parentName:"p"},"onNext")," callback."),(0,r.yg)("h4",{id:"arguments-2"},"Arguments"),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("inlineCode",{parentName:"li"},"onNext")," - The ",(0,r.yg)("inlineCode",{parentName:"li"},"onNext")," callback to unsubscribe.")),(0,r.yg)("hr",null),(0,r.yg)("h3",{id:"set-value"},"set value"),(0,r.yg)("p",null,"The ",(0,r.yg)("inlineCode",{parentName:"p"},"value")," property is used to set the ",(0,r.yg)("inlineCode",{parentName:"p"},"Observable"),"'s value. Changing the value will trigger all subscribers and will trigger a rerender if the ",(0,r.yg)("inlineCode",{parentName:"p"},"Observable")," is used in a Component or a Hook."),(0,r.yg)("hr",null),(0,r.yg)("h3",{id:"get-value"},"get value"),(0,r.yg)("p",null,"The ",(0,r.yg)("inlineCode",{parentName:"p"},"value")," property is used to get the ",(0,r.yg)("inlineCode",{parentName:"p"},"Observable"),"'s current value."),(0,r.yg)("hr",null),(0,r.yg)("h3",{id:"async-firstt-promiset"},"async first","<","T",">","(): Promise","<","T",">"),(0,r.yg)("p",null,"The ",(0,r.yg)("inlineCode",{parentName:"p"},"first")," method is used to get the ",(0,r.yg)("inlineCode",{parentName:"p"},"Observable"),"'s first value. If the ",(0,r.yg)("inlineCode",{parentName:"p"},"Observable")," has no value, it will wait for the first value to be set and return it."),(0,r.yg)("h4",{id:"returns-1"},"Returns"),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("inlineCode",{parentName:"li"},"Promise")," - A ",(0,r.yg)("inlineCode",{parentName:"li"},"Promise")," that resolves to the ",(0,r.yg)("inlineCode",{parentName:"li"},"Observable"),"'s current value if it has one, or waits for the first value to be set and resolves to it.")),(0,r.yg)("h2",{id:"usage"},"Usage"),(0,r.yg)("h3",{id:"conditional-rendering-of-a-component"},"Conditional rendering of a component"),(0,r.yg)("p",null,"See ",(0,r.yg)("a",{parentName:"p",href:"./mediatorObservable#conditional-rendering-of-a-component"},"Conditional rendering of a component")," for a detailed explanation of this example."))}c.isMDXComponent=!0},2247:(e,n,t)=>{t.d(n,{xA:()=>g,yg:()=>m});var a=t(4041);function r(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function i(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function l(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?i(Object(t),!0).forEach((function(n){r(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function o(e,n){if(null==e)return{};var t,a,r=function(e,n){if(null==e)return{};var t,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)t=i[a],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)t=i[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var s=a.createContext({}),u=function(e){var n=a.useContext(s),t=n;return e&&(t="function"==typeof e?e(n):l(l({},n),e)),t},g=function(e){var n=u(e.components);return a.createElement(s.Provider,{value:n},e.children)},p="mdxType",c={inlineCode:"code",wrapper:function(e){var n=e.children;return a.createElement(a.Fragment,{},n)}},b=a.forwardRef((function(e,n){var t=e.components,r=e.mdxType,i=e.originalType,s=e.parentName,g=o(e,["components","mdxType","originalType","parentName"]),p=u(t),b=r,m=p["".concat(s,".").concat(b)]||p[b]||c[b]||i;return t?a.createElement(m,l(l({ref:n},g),{},{components:t})):a.createElement(m,l({ref:n},g))}));function m(e,n){var t=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var i=t.length,l=new Array(i);l[0]=b;var o={};for(var s in n)hasOwnProperty.call(n,s)&&(o[s]=n[s]);o.originalType=e,o[p]="string"==typeof e?e:r,l[1]=o;for(var u=2;u<i;u++)l[u]=t[u];return a.createElement.apply(null,l)}return a.createElement.apply(null,t)}b.displayName="MDXCreateElement"}}]);