"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[2616],{5680:(e,a,n)=>{n.d(a,{xA:()=>c,yg:()=>g});var t=n(6540);function r(e,a,n){return a in e?Object.defineProperty(e,a,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[a]=n,e}function l(e,a){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);a&&(t=t.filter((function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable}))),n.push.apply(n,t)}return n}function o(e){for(var a=1;a<arguments.length;a++){var n=null!=arguments[a]?arguments[a]:{};a%2?l(Object(n),!0).forEach((function(a){r(e,a,n[a])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(n,a))}))}return e}function s(e,a){if(null==e)return{};var n,t,r=function(e,a){if(null==e)return{};var n,t,r={},l=Object.keys(e);for(t=0;t<l.length;t++)n=l[t],a.indexOf(n)>=0||(r[n]=e[n]);return r}(e,a);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(t=0;t<l.length;t++)n=l[t],a.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var i=t.createContext({}),u=function(e){var a=t.useContext(i),n=a;return e&&(n="function"==typeof e?e(a):o(o({},a),e)),n},c=function(e){var a=u(e.components);return t.createElement(i.Provider,{value:a},e.children)},d="mdxType",p={inlineCode:"code",wrapper:function(e){var a=e.children;return t.createElement(t.Fragment,{},a)}},m=t.forwardRef((function(e,a){var n=e.components,r=e.mdxType,l=e.originalType,i=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),d=u(n),m=r,g=d["".concat(i,".").concat(m)]||d[m]||p[m]||l;return n?t.createElement(g,o(o({ref:a},c),{},{components:n})):t.createElement(g,o({ref:a},c))}));function g(e,a){var n=arguments,r=a&&a.mdxType;if("string"==typeof e||r){var l=n.length,o=new Array(l);o[0]=m;var s={};for(var i in a)hasOwnProperty.call(a,i)&&(s[i]=a[i]);s.originalType=e,s[d]="string"==typeof e?e:r,o[1]=s;for(var u=2;u<l;u++)o[u]=n[u];return t.createElement.apply(null,o)}return t.createElement.apply(null,n)}m.displayName="MDXCreateElement"},4866:(e,a,n)=>{n.r(a),n.d(a,{assets:()=>i,contentTitle:()=>o,default:()=>p,frontMatter:()=>l,metadata:()=>s,toc:()=>u});var t=n(8168),r=(n(6540),n(5680));const l={sidebar_position:2,title:"MediatorObservable"},o=void 0,s={unversionedId:"reference/mediatorObservable",id:"reference/mediatorObservable",title:"MediatorObservable",description:"MediatorObservable is a type of Observable that acts as an adapter between one or more source Observables. It allows us to create a new observable stream based on the values of other observables.",source:"@site/docs/reference/mediatorObservable.mdx",sourceDirName:"reference",slug:"/reference/mediatorObservable",permalink:"/obsidian/docs/reference/mediatorObservable",draft:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/reference/mediatorObservable.mdx",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2,title:"MediatorObservable"},sidebar:"reference",previous:{title:"Observable",permalink:"/obsidian/docs/reference/observable"},next:{title:"useObserver",permalink:"/obsidian/docs/reference/useObserver"}},i={},u=[{value:"Reference",id:"reference",level:2},{value:"new MediatorObservable(initialValue?)",id:"new-mediatorobservableinitialvalue",level:3},{value:"Arguments",id:"arguments",level:4},{value:"Caveats",id:"caveats",level:4},{value:"addSource(source, onNext): this",id:"addsourcesource-onnext-this",level:3},{value:"Arguments",id:"arguments-1",level:4},{value:"Returns",id:"returns",level:4},{value:"mapSource(source, mapNext): this",id:"mapsourcesource-mapnext-this",level:3},{value:"Arguments",id:"arguments-2",level:4},{value:"Returns",id:"returns-1",level:4},{value:"addSources(sources, onNext): this",id:"addsourcessources-onnext-this",level:3},{value:"Arguments",id:"arguments-3",level:4},{value:"Returns",id:"returns-2",level:4},{value:"mapSources(sources, mapNext): this",id:"mapsourcessources-mapnext-this",level:3},{value:"Arguments",id:"arguments-4",level:4},{value:"Returns",id:"returns-3",level:4},{value:"async first&lt;T&gt;(): Promise&lt;T&gt;",id:"async-firstt-promiset",level:3},{value:"Usage",id:"usage",level:2},{value:"Observing multiple sources",id:"observing-multiple-sources",level:3},{value:"Conditional rendering of a component",id:"conditional-rendering-of-a-component",level:3}],c={toc:u},d="wrapper";function p(e){let{components:a,...n}=e;return(0,r.yg)(d,(0,t.A)({},c,n,{components:a,mdxType:"MDXLayout"}),(0,r.yg)("p",null,(0,r.yg)("inlineCode",{parentName:"p"},"MediatorObservable")," ",(0,r.yg)("strong",{parentName:"p"},"is a type of")," ",(0,r.yg)("inlineCode",{parentName:"p"},"Observable")," ",(0,r.yg)("strong",{parentName:"p"},"that acts as an adapter between one or more source")," ",(0,r.yg)("inlineCode",{parentName:"p"},"Observable"),(0,r.yg)("strong",{parentName:"p"},"s. It allows us to create a new observable stream based on the values of other observables.")),(0,r.yg)("p",null,"For example, we can create a ",(0,r.yg)("inlineCode",{parentName:"p"},"MediatorObservable")," that observes an Observable of a certain type and emits a new value based on the value of the source observable."),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-ts"},"const user = new Observable<User>();\n\nconst isLoggedIn = new MediatorObservable<boolean>();\nisLoggedIn.add(user, (nextUser) => isLoggedIn.value = nextUser !== undefined);\n")),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("a",{parentName:"li",href:"#reference"},"Reference"),(0,r.yg)("ul",{parentName:"li"},(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("a",{parentName:"li",href:"#new-observableinitialvalue"},"new MediatorObservable(initialValue?)")),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("a",{parentName:"li",href:"#addsourcesource-onnext-this"},"addSource(source, onNext): this")),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("a",{parentName:"li",href:"#mapsourcesource-mapnext-this"},"mapSource(source, mapNext): this")),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("a",{parentName:"li",href:"#addsourcessources-onnext-this"},"addSources(sources, onNext): this")),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("a",{parentName:"li",href:"#mapsourcessources-mapnext-this"},"mapSources(sources, mapNext): this")),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("a",{parentName:"li",href:"#async-firstt-promiset"},"async first","<","T",">","(): Promise","<","T",">")))),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("a",{parentName:"li",href:"#usage"},"Usage"),(0,r.yg)("ul",{parentName:"li"},(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("a",{parentName:"li",href:"#observing-multiple-sources"},"Observing multiple sources")),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("a",{parentName:"li",href:"#conditional-rendering-of-a-component"},"Conditional rendering of a component"))))),(0,r.yg)("hr",null),(0,r.yg)("h2",{id:"reference"},"Reference"),(0,r.yg)("h3",{id:"new-mediatorobservableinitialvalue"},"new MediatorObservable(initialValue?)"),(0,r.yg)("p",null,"Creates a new ",(0,r.yg)("inlineCode",{parentName:"p"},"MediatorObservable")," with an optional initial value."),(0,r.yg)("h4",{id:"arguments"},"Arguments"),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("inlineCode",{parentName:"li"},"initialValue?")," - The initial value of the ",(0,r.yg)("inlineCode",{parentName:"li"},"MediatorObservable"),". Defaults to ",(0,r.yg)("inlineCode",{parentName:"li"},"undefined"),".")),(0,r.yg)("h4",{id:"caveats"},"Caveats"),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},"It's possible to instantiate a ",(0,r.yg)("inlineCode",{parentName:"li"},"MediatorObservable")," without an initial value, but it's not recommended, as its value will be ",(0,r.yg)("inlineCode",{parentName:"li"},"undefined")," until it's set for the first time which can lead to unexpected behavior.")),(0,r.yg)("hr",null),(0,r.yg)("h3",{id:"addsourcesource-onnext-this"},"addSource(source, onNext): this"),(0,r.yg)("p",null,"Starts observing the given source and calls the ",(0,r.yg)("inlineCode",{parentName:"p"},"onNext")," callback when the source emits a new value."),(0,r.yg)("h4",{id:"arguments-1"},"Arguments"),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("inlineCode",{parentName:"li"},"source")," - The source ",(0,r.yg)("inlineCode",{parentName:"li"},"Observable")," to observe."),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("inlineCode",{parentName:"li"},"onNext")," - The callback to be called when the source emits a new value. The ",(0,r.yg)("inlineCode",{parentName:"li"},"onNext")," callback receives the new value of the source as an argument. ",(0,r.yg)("strong",{parentName:"li"},"In order to update the value of the ",(0,r.yg)("inlineCode",{parentName:"strong"},"MediatorObservable"),", call the ",(0,r.yg)("a",{parentName:"strong",href:"observable#set-value"},"value setter")," with the new value"),".")),(0,r.yg)("h4",{id:"returns"},"Returns"),(0,r.yg)("p",null,(0,r.yg)("inlineCode",{parentName:"p"},"addSource")," returns the ",(0,r.yg)("inlineCode",{parentName:"p"},"MediatorObservable")," instance, so it can be chained with other methods."),(0,r.yg)("hr",null),(0,r.yg)("h3",{id:"mapsourcesource-mapnext-this"},"mapSource(source, mapNext): this"),(0,r.yg)("p",null,"Starts observing the given source and calls the ",(0,r.yg)("inlineCode",{parentName:"p"},"onNext")," callback when the source emits a new value."),(0,r.yg)("h4",{id:"arguments-2"},"Arguments"),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("inlineCode",{parentName:"li"},"source")," - The source ",(0,r.yg)("inlineCode",{parentName:"li"},"Observable")," to observe."),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("inlineCode",{parentName:"li"},"mapNext")," - The callback to be called when the source emits a new value. The ",(0,r.yg)("inlineCode",{parentName:"li"},"mapNext")," callback receives the new value of the source as an argument and ",(0,r.yg)("strong",{parentName:"li"},"must return the new value of the ",(0,r.yg)("inlineCode",{parentName:"strong"},"MediatorObservable")),".")),(0,r.yg)("h4",{id:"returns-1"},"Returns"),(0,r.yg)("p",null,(0,r.yg)("inlineCode",{parentName:"p"},"mapSource")," returns the ",(0,r.yg)("inlineCode",{parentName:"p"},"MediatorObservable")," instance, so it can be chained with other methods."),(0,r.yg)("hr",null),(0,r.yg)("h3",{id:"addsourcessources-onnext-this"},"addSources(sources, onNext): this"),(0,r.yg)("p",null,"Similar to ",(0,r.yg)("a",{parentName:"p",href:"#addsourcesource-onnext-this"},"addSource"),", but accepts an array of sources instead of a single source. Use this method when the logic of the ",(0,r.yg)("inlineCode",{parentName:"p"},"onNext")," callback is the same for all sources."),(0,r.yg)("h4",{id:"arguments-3"},"Arguments"),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("inlineCode",{parentName:"li"},"sources")," - An array of source ",(0,r.yg)("inlineCode",{parentName:"li"},"Observable"),"s to observe."),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("inlineCode",{parentName:"li"},"onNext")," - The callback to be called when any of the sources emits a new value. The ",(0,r.yg)("inlineCode",{parentName:"li"},"onNext")," callback receives the current values of all sources as arguments. In order to update the value of the ",(0,r.yg)("inlineCode",{parentName:"li"},"MediatorObservable"),", call the ",(0,r.yg)("a",{parentName:"li",href:"observable#set-value"},"value setter")," with the new value.")),(0,r.yg)("h4",{id:"returns-2"},"Returns"),(0,r.yg)("p",null,(0,r.yg)("inlineCode",{parentName:"p"},"addSources")," returns the ",(0,r.yg)("inlineCode",{parentName:"p"},"MediatorObservable")," instance, so it can be chained with other methods."),(0,r.yg)("hr",null),(0,r.yg)("h3",{id:"mapsourcessources-mapnext-this"},"mapSources(sources, mapNext): this"),(0,r.yg)("p",null,"Similar to ",(0,r.yg)("a",{parentName:"p",href:"#mapsourcesource-mapnext-this"},"mapSource"),", but accepts an array of sources instead of a single source. Use this method when the logic of the ",(0,r.yg)("inlineCode",{parentName:"p"},"mapNext")," callback is the same for all sources."),(0,r.yg)("h4",{id:"arguments-4"},"Arguments"),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("inlineCode",{parentName:"li"},"sources")," - An array of source ",(0,r.yg)("inlineCode",{parentName:"li"},"Observable"),"s to observe."),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("inlineCode",{parentName:"li"},"mapNext")," - The callback to be called when any of the sources emits a new value. The ",(0,r.yg)("inlineCode",{parentName:"li"},"mapNext")," callback receives the current values of all sources as arguments and should return the new value of the ",(0,r.yg)("inlineCode",{parentName:"li"},"MediatorObservable"),".")),(0,r.yg)("h4",{id:"returns-3"},"Returns"),(0,r.yg)("p",null,(0,r.yg)("inlineCode",{parentName:"p"},"mapSources")," returns the ",(0,r.yg)("inlineCode",{parentName:"p"},"MediatorObservable")," instance, so it can be chained with other methods."),(0,r.yg)("hr",null),(0,r.yg)("h3",{id:"async-firstt-promiset"},"async first","<","T",">","(): Promise","<","T",">"),(0,r.yg)("p",null,"See ",(0,r.yg)("a",{parentName:"p",href:"observable#async-firstt-promiset"},"Observable.first()"),"."),(0,r.yg)("h2",{id:"usage"},"Usage"),(0,r.yg)("h3",{id:"observing-multiple-sources"},"Observing multiple sources"),(0,r.yg)("p",null,"Sometimes data is computed from the values of other observables. We can use ",(0,r.yg)("inlineCode",{parentName:"p"},"MediatorObservable")," to create a new observable that observes other observables and emits a new value based on their values."),(0,r.yg)("p",null,"Let's walk through an example to see how this works. Say we're developing a live streaming app and want to change the quality of the stream based on the device's battery level and the network speed. We'll create two observables, ",(0,r.yg)("inlineCode",{parentName:"p"},"batteryLevel")," and ",(0,r.yg)("inlineCode",{parentName:"p"},"networkSpeed"),", and we'll merge their emissions in one new ",(0,r.yg)("inlineCode",{parentName:"p"},"MediatorObservable")," called ",(0,r.yg)("inlineCode",{parentName:"p"},"streamQuality"),". By doing so, ",(0,r.yg)("inlineCode",{parentName:"p"},"batteryLevel")," and ",(0,r.yg)("inlineCode",{parentName:"p"},"networkSpeed")," will become the sources of the new ",(0,r.yg)("inlineCode",{parentName:"p"},"MediatorObservable"),". "),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-ts"},"enum NetworkSpeed { Poor = 150, Moderate = 550, Good = 2000 }\nenum streamQuality { Low, Medium, High }\n\nconst batteryLevel = new Observable<number>();\nconst networkSpeed = new Observable<number>();\n\n// Every time one of the sources emits a new value, the mediator will call the callback function\nconst streamQuality = new MediatorObservable<streamQuality>().mapSources(\n  [batteryLevel, networkSpeed],\n  (batteryLevel, networkSpeed) => {\n    if (batteryLevel < 15 || networkSpeed < NetworkSpeed.Poor) {\n      return streamQuality.Low;\n    }\n\n    if (networkSpeed < NetworkSpeed.Moderate) {\n      return StreamQuality.Medium;\n    }\n\n    return StreamQuality.High;\n  }\n);\n")),(0,r.yg)("p",null,"Now, every time the battery level or the network speed changes, the ",(0,r.yg)("inlineCode",{parentName:"p"},"streamQuality")," observable will emit a new value based on the new values of the sources."),(0,r.yg)("h3",{id:"conditional-rendering-of-a-component"},"Conditional rendering of a component"),(0,r.yg)("p",null,"When optimizing React applications for performance, avoiding unnecessary renders is one of the most important things to do. One way to do this is to use ",(0,r.yg)("inlineCode",{parentName:"p"},"Observable")," to conditionally render a component only when a certain condition is met. We can use ",(0,r.yg)("inlineCode",{parentName:"p"},"MediatorObservable")," to create a new observable that observes another and emits a value only when a condition is met."),(0,r.yg)("p",null,"To illustrate this, let's create a ",(0,r.yg)("inlineCode",{parentName:"p"},"MediatorObservable")," that observes a user's score in a game. The ",(0,r.yg)("inlineCode",{parentName:"p"},"MediatorObservable")," will emit a new value when the user's score is greater than 10. We'll use this observable to conditionally render a component that displays a message when the user wins the game."),(0,r.yg)("p",null,"First, we'll declare the observables that we'll use:"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-tsx"},"// An observable that tracks a user's score in a game\nconst gameScoreObservable = new Observable<number>(0);\n\nconst isWinnerObservable = new MediatorObservable<boolean>(false)\n  .addSource(gameScoreObservable, (score) => {\n    if (score > 10) {\n      gameState.value = true;\n    }\n  });\n")),(0,r.yg)("p",null,"Now we can use the ",(0,r.yg)("inlineCode",{parentName:"p"},"isWinnerObservable")," to conditionally render the game's status:"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-tsx"},"const Game = () => {\n  const [isWinner] = useObserver(isWinnerObservable);\n\n  return (\n    <div>\n      {isWinner && <p>You won!</p>}\n      <GameBoard />\n    </div>\n  )\n}\n")))}p.isMDXComponent=!0}}]);