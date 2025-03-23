"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[3481],{95:(e,n,t)=>{t.d(n,{A:()=>j});var a=t(4041),i=t(3640),s=t(5245),r=t(6090),o=t(3190),l=t(838),c=t(6423),d=t(3996);function h(e){return a.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,a.isValidElement)(e)&&function(e){const{props:n}=e;return!!n&&"object"==typeof n&&"value"in n}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}function p(e){const{values:n,children:t}=e;return(0,a.useMemo)((()=>{const e=n??function(e){return h(e).map((e=>{let{props:{value:n,label:t,attributes:a,default:i}}=e;return{value:n,label:t,attributes:a,default:i}}))}(t);return function(e){const n=(0,c.XI)(e,((e,n)=>e.value===n.value));if(n.length>0)throw new Error(`Docusaurus error: Duplicate values "${n.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[n,t])}function u(e){let{value:n,tabValues:t}=e;return t.some((e=>e.value===n))}function g(e){let{queryString:n=!1,groupId:t}=e;const i=(0,r.W6)(),s=function(e){let{queryString:n=!1,groupId:t}=e;if("string"==typeof n)return n;if(!1===n)return null;if(!0===n&&!t)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return t??null}({queryString:n,groupId:t});return[(0,l.aZ)(s),(0,a.useCallback)((e=>{if(!s)return;const n=new URLSearchParams(i.location.search);n.set(s,e),i.replace({...i.location,search:n.toString()})}),[s,i])]}function m(e){const{defaultValue:n,queryString:t=!1,groupId:i}=e,s=p(e),[r,l]=(0,a.useState)((()=>function(e){let{defaultValue:n,tabValues:t}=e;if(0===t.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(n){if(!u({value:n,tabValues:t}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${n}" but none of its children has the corresponding value. Available values are: ${t.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return n}const a=t.find((e=>e.default))??t[0];if(!a)throw new Error("Unexpected error: 0 tabValues");return a.value}({defaultValue:n,tabValues:s}))),[c,h]=g({queryString:t,groupId:i}),[m,f]=function(e){let{groupId:n}=e;const t=function(e){return e?`docusaurus.tab.${e}`:null}(n),[i,s]=(0,d.Dv)(t);return[i,(0,a.useCallback)((e=>{t&&s.set(e)}),[t,s])]}({groupId:i}),b=(()=>{const e=c??m;return u({value:e,tabValues:s})?e:null})();(0,o.A)((()=>{b&&l(b)}),[b]);return{selectedValue:r,selectValue:(0,a.useCallback)((e=>{if(!u({value:e,tabValues:s}))throw new Error(`Can't select invalid tab value=${e}`);l(e),h(e),f(e)}),[h,f,s]),tabValues:s}}var f=t(1310);const b={tabList:"tabList_M0Dn",tabItem:"tabItem_ysIP"};var x=t(1085);function w(e){let{className:n,block:t,selectedValue:a,selectValue:r,tabValues:o}=e;const l=[],{blockElementScrollPositionUntilNextRender:c}=(0,s.a_)(),d=e=>{const n=e.currentTarget,t=l.indexOf(n),i=o[t].value;i!==a&&(c(n),r(i))},h=e=>{let n=null;switch(e.key){case"Enter":d(e);break;case"ArrowRight":{const t=l.indexOf(e.currentTarget)+1;n=l[t]??l[0];break}case"ArrowLeft":{const t=l.indexOf(e.currentTarget)-1;n=l[t]??l[l.length-1];break}}n?.focus()};return(0,x.jsx)("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,i.A)("tabs",{"tabs--block":t},n),children:o.map((e=>{let{value:n,label:t,attributes:s}=e;return(0,x.jsx)("li",{role:"tab",tabIndex:a===n?0:-1,"aria-selected":a===n,ref:e=>{l.push(e)},onKeyDown:h,onClick:d,...s,className:(0,i.A)("tabs__item",b.tabItem,s?.className,{"tabs__item--active":a===n}),children:t??n},n)}))})}function v(e){let{lazy:n,children:t,selectedValue:s}=e;const r=(Array.isArray(t)?t:[t]).filter(Boolean);if(n){const e=r.find((e=>e.props.value===s));return e?(0,a.cloneElement)(e,{className:(0,i.A)("margin-top--md",e.props.className)}):null}return(0,x.jsx)("div",{className:"margin-top--md",children:r.map(((e,n)=>(0,a.cloneElement)(e,{key:n,hidden:e.props.value!==s})))})}function y(e){const n=m(e);return(0,x.jsxs)("div",{className:(0,i.A)("tabs-container",b.tabList),children:[(0,x.jsx)(w,{...n,...e}),(0,x.jsx)(v,{...n,...e})]})}function j(e){const n=(0,f.A)();return(0,x.jsx)(y,{...e,children:h(e.children)},String(n))}},1184:(e,n,t)=>{t.d(n,{R:()=>r,x:()=>o});var a=t(4041);const i={},s=a.createContext(i);function r(e){const n=a.useContext(s);return a.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:r(e.components),a.createElement(s.Provider,{value:n},e.children)}},6816:(e,n,t)=>{t.d(n,{A:()=>r});t(4041);var a=t(3640);const i={tabItem:"tabItem_OMyP"};var s=t(1085);function r(e){let{children:n,hidden:t,className:r}=e;return(0,s.jsx)("div",{role:"tabpanel",className:(0,a.A)(i.tabItem,r),hidden:t,children:n})}},9482:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>d,contentTitle:()=>c,default:()=>u,frontMatter:()=>l,metadata:()=>a,toc:()=>h});const a=JSON.parse('{"id":"guides/configurableApplications","title":"Configurable applications","description":"Designing applications to be flexible and configurable makes them more tolerable to changing requirements. The ability to change code frequently and quickly is one of the most important KPIs of any development team. This is generally made possible by a design that facilitates small pull requests, that modify a minimal amount of code across a minimal number of files.","source":"@site/docs/guides/configurableApplications.mdx","sourceDirName":"guides","slug":"/guides/configurableApplications","permalink":"/obsidian/docs/guides/configurableApplications","draft":false,"unlisted":false,"editUrl":"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/guides/configurableApplications.mdx","tags":[{"inline":true,"label":"Testing","permalink":"/obsidian/docs/tags/testing"},{"inline":true,"label":"Architecture","permalink":"/obsidian/docs/tags/architecture"}],"version":"current","sidebarPosition":2,"frontMatter":{"sidebar_position":2,"title":"Configurable applications","toc_max_heading_level":4,"tags":["Testing","Architecture"]},"sidebar":"guides","previous":{"title":" Avoiding prop drilling","permalink":"/obsidian/docs/guides/avoidingPropDrilling"},"next":{"title":"Mocking dependencies in unit tests","permalink":"/obsidian/docs/guides/mockDependencies"}}');var i=t(1085),s=t(1184),r=t(95),o=t(6816);const l={sidebar_position:2,title:"Configurable applications",toc_max_heading_level:4,tags:["Testing","Architecture"]},c=void 0,d={},h=[{value:"Configuring applications with providers",id:"configuring-applications-with-providers",level:2},{value:"Example 1: Interchangeable dependencies according to external configurations",id:"example-1-interchangeable-dependencies-according-to-external-configurations",level:3},{value:"Step 1: Declare a graph",id:"step-1-declare-a-graph",level:4},{value:"Step 2: Implement another HTTP client",id:"step-2-implement-another-http-client",level:4},{value:"Step 3: Make the clients interchangeable",id:"step-3-make-the-clients-interchangeable",level:4},{value:"Step 4: Return the correct client according to the configuration",id:"step-4-return-the-correct-client-according-to-the-configuration",level:4},{value:"Conclusion and after thoughts",id:"conclusion-and-after-thoughts",level:4},{value:"Example 2: Mocking dependencies in acceptance/integration tests",id:"example-2-mocking-dependencies-in-acceptanceintegration-tests",level:3},{value:"Step 1: Declare a graph",id:"step-1-declare-a-graph-1",level:4},{value:"Step 2: Mock the HTTP client",id:"step-2-mock-the-http-client",level:4},{value:"Step 3: Use the graph in the test",id:"step-3-use-the-graph-in-the-test",level:4}];function p(e){const n={a:"a",admonition:"admonition",code:"code",h2:"h2",h3:"h3",h4:"h4",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,s.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.p,{children:"Designing applications to be flexible and configurable makes them more tolerable to changing requirements. The ability to change code frequently and quickly is one of the most important KPIs of any development team. This is generally made possible by a design that facilitates small pull requests, that modify a minimal amount of code across a minimal number of files."}),"\n",(0,i.jsx)(n.p,{children:"The Dependency Injection pattern helps us write flexible code that is more tolerable to change by addressing three key concerns:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["How can a class be ",(0,i.jsx)("ins",{children:"independent"})," from the creation of the objects it depends on?"]}),"\n",(0,i.jsxs)(n.li,{children:["How can an application, and the objects it uses support different ",(0,i.jsx)("ins",{children:"configurations"}),"?"]}),"\n",(0,i.jsxs)(n.li,{children:["How can the ",(0,i.jsx)("ins",{children:"behavior"})," of a piece of code be changed without editing it directly?"]}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:"In this article we will learn how Obsidian can help us address these concerns."}),"\n",(0,i.jsx)(n.h2,{id:"configuring-applications-with-providers",children:"Configuring applications with providers"}),"\n",(0,i.jsxs)(n.p,{children:["When using Obsidian, dependencies are declared and constructed in classes called Graphs. Each dependency is constructed by a method called a provider which acts as a ",(0,i.jsx)(n.strong,{children:"Seam"}),". Lets see how we can leverage them to make our apps flexible and configurable."]}),"\n",(0,i.jsxs)(n.admonition,{title:"What are Seams?",type:"tip",children:[(0,i.jsx)(n.p,{children:"A seam is a place where you can alter behavior in your program without editing in that place."}),(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.a,{href:"https://www.amazon.com/Working-Effectively-Legacy-Michael-Feathers/dp/0131177052",children:"Working Effectively with Legacy Code"})," by Michael Feathers"]})]}),"\n",(0,i.jsx)(n.h3,{id:"example-1-interchangeable-dependencies-according-to-external-configurations",children:"Example 1: Interchangeable dependencies according to external configurations"}),"\n",(0,i.jsx)(n.p,{children:"In this example we'll learn how to change the concrete object returned by a provider according to an external configuration. In a real life scenario, the external configuration would represent an A/B test or a feature toggle."}),"\n",(0,i.jsx)(n.h4,{id:"step-1-declare-a-graph",children:"Step 1: Declare a graph"}),"\n",(0,i.jsx)(n.p,{children:"Lets declare a simple graph that provides a single dependency: an HTTP client used to make network requests."}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-ts",children:"@singleton() @graph()\nclass ApplicationGraph extends ObjectGraph {\n  @provides()\n  httpClient(): HttpClient {\n    return new HttpClient();\n  }\n}\n"})}),"\n",(0,i.jsxs)(n.p,{children:["Our ",(0,i.jsx)(n.code,{children:"HttpClient"})," is using the standard ",(0,i.jsx)(n.code,{children:"fetch"})," API to make network requests and for the sake of simplicity, it only supports ",(0,i.jsx)(n.code,{children:"GET"})," and ",(0,i.jsx)(n.code,{children:"POST"})," requests."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-ts",children:"class HttpClient {\n  async get(url: string): Promise<any> {\n    const response = await fetch(url, { method: 'GET' });\n    return await response.json();\n  }\n\n  async post(url: string, body: any): Promise<any> {\n    const response = fetch(url, { method: 'POST', body: JSON.stringify(body) });\n    return await response.json();\n  }\n}\n"})}),"\n",(0,i.jsx)(n.h4,{id:"step-2-implement-another-http-client",children:"Step 2: Implement another HTTP client"}),"\n",(0,i.jsxs)(n.p,{children:["Just like our current HTTP client, the new client will only support ",(0,i.jsx)(n.code,{children:"GET"})," and ",(0,i.jsx)(n.code,{children:"POST"})," requests. The only difference is that it will use the ",(0,i.jsx)(n.code,{children:"axios"})," library to make network requests."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-ts",children:"class AxiosClient {\n  async get(url: string): Promise<any> {\n    const response = await axios.get(url);\n    return response.data;\n  }\n\n  async post(url: string, body: any): Promise<any> {\n    const response = await axios.post(url, body);\n    return response.data;\n  }\n}\n"})}),"\n",(0,i.jsx)(n.h4,{id:"step-3-make-the-clients-interchangeable",children:"Step 3: Make the clients interchangeable"}),"\n",(0,i.jsxs)(n.p,{children:["To easily switch between the two clients, we'll use a well known principle called ",(0,i.jsx)(n.a,{href:"https://en.wikipedia.org/wiki/Dependency_inversion_principle",children:"Dependency Inversion"}),". This principle states that high-level modules should not depend on low-level modules. Both the ",(0,i.jsx)(n.code,{children:"HttpClient"})," and the ",(0,i.jsx)(n.code,{children:"AxiosClient"})," are low-level modules, so we'll make the ",(0,i.jsx)(n.code,{children:"ApplicationGraph"})," depend on an abstraction called ",(0,i.jsx)(n.code,{children:"NetworkClient"})," instead."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-ts",children:"interface NetworkClient {\n  get(url: string): Promise<any>;\n  post(url: string, body: any): Promise<any>;\n}\n"})}),"\n",(0,i.jsx)(n.p,{children:"The two network clients will implement this interface:"}),"\n",(0,i.jsxs)(r.A,{children:[(0,i.jsx)(o.A,{value:"http",label:"HttpClient",default:!0,children:(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-ts",children:"class HttpClient implements NetworkClient {\n  override async get(url: string): Promise<any> {\n    const response = await fetch(url, { method: 'GET' });\n    return await response.json();\n  }\n\n  override async post(url: string, body: any): Promise<any> {\n    const response = fetch(url, { method: 'POST', body: JSON.stringify(body) });\n    return await response.json();\n  }\n}\n"})})}),(0,i.jsx)(o.A,{value:"axios",label:"AxiosClient",children:(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-ts",children:"class AxiosClient implements NetworkClient {\n  override async get(url: string): Promise<any> {\n    const response = await axios.get(url);\n    return response.data.json;\n  }\n\n  override async post(url: string, body: any): Promise<any> {\n    const response = await axios.post(url, body);\n    return response.data.json;\n  }\n}\n"})})})]}),"\n",(0,i.jsx)(n.h4,{id:"step-4-return-the-correct-client-according-to-the-configuration",children:"Step 4: Return the correct client according to the configuration"}),"\n",(0,i.jsxs)(n.p,{children:["To determine which client to return, we'll use a new dependency called ",(0,i.jsx)(n.code,{children:"AppConfig"})," which will be used to access the application's configuration."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-ts",children:"@singleton() @graph()\nclass ApplicationGraph extends ObjectGraph {\n  @provides()\n  httpClient(appConfig: AppConfig): NetworkClient {\n    return appConfig.shouldUseAxiosClient() ? new AxiosClient() : new HttpClient();\n  }\n\n  @provides()\n  appConfig(): AppConfig {\n    return new AppConfig();\n  }\n}\n"})}),"\n",(0,i.jsx)(n.p,{children:"We're done! Now we can easily control which network client to use according the application's configuration."}),"\n",(0,i.jsx)(n.h4,{id:"conclusion-and-after-thoughts",children:"Conclusion and after thoughts"}),"\n",(0,i.jsx)(n.p,{children:"In this example we learned how to make dependencies interchangeable, and how to control which dependency to use according to an external configuration. This is a very common use case in large scale applications where we need an extra layer of assurance that changes can be easily rolled back in case of a bug."}),"\n",(0,i.jsx)(n.p,{children:"Two important things to note about this example:"}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsxs)(n.li,{children:["The provider's return type was changed to ",(0,i.jsx)(n.code,{children:"NetworkClient"})," instead of ",(0,i.jsx)(n.code,{children:"HttpClient"}),". This change could lead to further changes in the codebase, but it's a small price to pay for the flexibility it provides."]}),"\n",(0,i.jsxs)(n.li,{children:["We wanted to keep the example short and easy to follow, so the two HTTP clients are simplified implementations of an actual client. They also share the same API which made it easy to implement the ",(0,i.jsx)(n.code,{children:"NetworkClient"})," interface and have the two clients implement it. If the two clients had different APIs, perhaps because they supported typed request options and responses, then we would have to create common interfaces that would represent the common parts of the two APIs and adapters that would convert the two clients' APIs to the common API and vice versa."]}),"\n"]}),"\n",(0,i.jsx)(n.h3,{id:"example-2-mocking-dependencies-in-acceptanceintegration-tests",children:"Example 2: Mocking dependencies in acceptance/integration tests"}),"\n",(0,i.jsx)(n.p,{children:"Acceptance and integration tests are a great way to test how an application behaves as a whole. In these type of tests, objects aren't mocked since we're testing how the objects behave when they interact with each other. But because tests also need to be predictable and stable, there are some operations that we do want to simulate. For example, we might want to mock a network client so that we don't make real network requests during the test as that would add an unwanted layer of unpredictability to the test."}),"\n",(0,i.jsx)(n.p,{children:"In this example we'll learn how to mock a dependency and how to use that mocked instance across all objects involved in the test."}),"\n",(0,i.jsx)(n.h4,{id:"step-1-declare-a-graph-1",children:"Step 1: Declare a graph"}),"\n",(0,i.jsx)(n.p,{children:"As in the previous example, we'll declare a simple graph that provides a single dependency: an HTTP client used to make network requests."}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-ts",children:"@singleton() @graph()\nexport class ApplicationGraph extends ObjectGraph {\n  @provides()\n  httpClient(): HttpClient {\n    return new HttpClient();\n  }\n}\n"})}),"\n",(0,i.jsx)(n.h4,{id:"step-2-mock-the-http-client",children:"Step 2: Mock the HTTP client"}),"\n",(0,i.jsxs)(n.p,{children:["To provide a mocked HTTP client to all objects involved in the test, we'll create a new graph that extends the ",(0,i.jsx)(n.code,{children:"ApplicationGraph"})," and overrides the ",(0,i.jsx)(n.code,{children:"httpClient"})," provider. In the next step we'll learn how to use this graph in our tests."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-ts",children:"import { mock } from 'jest-mock-extended';\n\n@singleton() @graph()\nexport class ApplicationGraphForTests extends ApplicationGraph {\n  @provides()\n  override httpClient(): HttpClient {\n    return mock<HttpClient>();\n  }\n}\n"})}),"\n",(0,i.jsx)(n.h4,{id:"step-3-use-the-graph-in-the-test",children:"Step 3: Use the graph in the test"}),"\n",(0,i.jsxs)(n.p,{children:["To use the graph in the test, we'll use Obsidian's test kit to use the ",(0,i.jsx)(n.code,{children:"ApplicationGraphForTests"})," instead of the ",(0,i.jsx)(n.code,{children:"ApplicationGraph"})," whenever it's needed."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-ts",children:"import {mockGraphs} from 'react-obsidian';\n\ndescribe('Test suite', () => {\n  beforeEach(() => {\n    mockGraphs({\n      // Instruct Obsidian to use the ApplicationGraphForTests instead of the ApplicationGraph\n      ApplicationGraph: ApplicationGraphForTests,\n    });\n  });\n\n  it('should do something', () => {\n    // ...\n  });\n});\n"})})]})}function u(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(p,{...e})}):p(e)}}}]);