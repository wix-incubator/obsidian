"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[6969],{8858:(e,t,a)=>{a.d(t,{A:()=>p});var n=a(9575),r=a(4041),i=a(9546),l=a(7917),c=a(2768),s=a(7923),o=a(2915),m=a(3915),d=a(1915);function u(e){return r.createElement("svg",(0,n.A)({viewBox:"0 0 24 24"},e),r.createElement("path",{d:"M10 19v-5h4v5c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-7h1.7c.46 0 .68-.57.33-.87L12.67 3.6c-.38-.34-.96-.34-1.34 0l-8.36 7.53c-.34.3-.13.87.33.87H5v7c0 .55.45 1 1 1h3c.55 0 1-.45 1-1z",fill:"currentColor"}))}const h={breadcrumbsContainer:"breadcrumbsContainer_zCmv",breadcrumbHomeIcon:"breadcrumbHomeIcon_tMMf"};function b(e){let{children:t,href:a,isLast:n}=e;const i="breadcrumbs__link";return n?r.createElement("span",{className:i,itemProp:"name"},t):a?r.createElement(o.A,{className:i,href:a,itemProp:"item"},r.createElement("span",{itemProp:"name"},t)):r.createElement("span",{className:i},t)}function v(e){let{children:t,active:a,index:l,addMicrodata:c}=e;return r.createElement("li",(0,n.A)({},c&&{itemScope:!0,itemProp:"itemListElement",itemType:"https://schema.org/ListItem"},{className:(0,i.A)("breadcrumbs__item",{"breadcrumbs__item--active":a})}),t,r.createElement("meta",{itemProp:"position",content:String(l+1)}))}function g(){const e=(0,m.A)("/");return r.createElement("li",{className:"breadcrumbs__item"},r.createElement(o.A,{"aria-label":(0,d.T)({id:"theme.docs.breadcrumbs.home",message:"Home page",description:"The ARIA label for the home page in the breadcrumbs"}),className:(0,i.A)("breadcrumbs__link",h.breadcrumbsItemLink),href:e},r.createElement(u,{className:h.breadcrumbHomeIcon})))}function p(){const e=(0,c.OF)(),t=(0,s.Dt)();return e?r.createElement("nav",{className:(0,i.A)(l.G.docs.docBreadcrumbs,h.breadcrumbsContainer),"aria-label":(0,d.T)({id:"theme.docs.breadcrumbs.navAriaLabel",message:"Breadcrumbs",description:"The ARIA label for the breadcrumbs"})},r.createElement("ul",{className:"breadcrumbs",itemScope:!0,itemType:"https://schema.org/BreadcrumbList"},t&&r.createElement(g,null),e.map(((t,a)=>{const n=a===e.length-1;return r.createElement(v,{key:a,active:n,index:a,addMicrodata:!!t.href},r.createElement(b,{href:t.href,isLast:n},t.label))})))):null}},7221:(e,t,a)=>{a.r(t),a.d(t,{default:()=>x});var n=a(4041),r=a(941),i=a(2768),l=a(3915),c=a(9546),s=a(2915),o=a(7216),m=a(1915);const d={cardContainer:"cardContainer_Shn5",cardTitle:"cardTitle_h48N",cardDescription:"cardDescription_CytT"};function u(e){let{href:t,children:a}=e;return n.createElement(s.A,{href:t,className:(0,c.A)("card padding--lg",d.cardContainer)},a)}function h(e){let{href:t,icon:a,title:r,description:i}=e;return n.createElement(u,{href:t},n.createElement("h2",{className:(0,c.A)("text--truncate",d.cardTitle),title:r},a," ",r),i&&n.createElement("p",{className:(0,c.A)("text--truncate",d.cardDescription),title:i},i))}function b(e){let{item:t}=e;const a=(0,i._o)(t);return a?n.createElement(h,{href:a,icon:"\ud83d\uddc3\ufe0f",title:t.label,description:(0,m.T)({message:"{count} items",id:"theme.docs.DocCard.categoryDescription",description:"The default description for a category card in the generated index about how many items this category includes"},{count:t.items.length})}):null}function v(e){let{item:t}=e;const a=(0,o.A)(t.href)?"\ud83d\udcc4\ufe0f":"\ud83d\udd17",r=(0,i.cC)(t.docId??void 0);return n.createElement(h,{href:t.href,icon:a,title:t.label,description:r?.description})}function g(e){let{item:t}=e;switch(t.type){case"link":return n.createElement(v,{item:t});case"category":return n.createElement(b,{item:t});default:throw new Error(`unknown item type ${JSON.stringify(t)}`)}}function p(e){let{className:t}=e;const a=(0,i.$S)();return n.createElement(E,{items:a.items,className:t})}function E(e){const{items:t,className:a}=e;if(!t)return n.createElement(p,e);const r=(0,i.d1)(t);return n.createElement("section",{className:(0,c.A)("row",a)},r.map(((e,t)=>n.createElement("article",{key:t,className:"col col--6 margin-bottom--lg"},n.createElement(g,{item:e})))))}var f=a(5),A=a(9968),N=a(6521),k=a(8858),T=a(1527);const _={generatedIndexPage:"generatedIndexPage_ak01",list:"list_iQEt",title:"title_AulG"};function L(e){let{categoryGeneratedIndex:t}=e;return n.createElement(r.be,{title:t.title,description:t.description,keywords:t.keywords,image:(0,l.A)(t.image)})}function y(e){let{categoryGeneratedIndex:t}=e;const a=(0,i.$S)();return n.createElement("div",{className:_.generatedIndexPage},n.createElement(A.A,null),n.createElement(k.A,null),n.createElement(N.A,null),n.createElement("header",null,n.createElement(T.A,{as:"h1",className:_.title},t.title),t.description&&n.createElement("p",null,t.description)),n.createElement("article",{className:"margin-top--lg"},n.createElement(E,{items:a.items,className:_.list})),n.createElement("footer",{className:"margin-top--lg"},n.createElement(f.A,{previous:t.navigation.previous,next:t.navigation.next})))}function x(e){return n.createElement(n.Fragment,null,n.createElement(L,e),n.createElement(y,e))}},5:(e,t,a)=>{a.d(t,{A:()=>c});var n=a(9575),r=a(4041),i=a(1915),l=a(3932);function c(e){const{previous:t,next:a}=e;return r.createElement("nav",{className:"pagination-nav docusaurus-mt-lg","aria-label":(0,i.T)({id:"theme.docs.paginator.navAriaLabel",message:"Docs pages navigation",description:"The ARIA label for the docs pagination"})},t&&r.createElement(l.A,(0,n.A)({},t,{subLabel:r.createElement(i.A,{id:"theme.docs.paginator.previous",description:"The label used to navigate to the previous doc"},"Previous")})),a&&r.createElement(l.A,(0,n.A)({},a,{subLabel:r.createElement(i.A,{id:"theme.docs.paginator.next",description:"The label used to navigate to the next doc"},"Next"),isNext:!0})))}},6521:(e,t,a)=>{a.d(t,{A:()=>s});var n=a(4041),r=a(9546),i=a(1915),l=a(7917),c=a(1398);function s(e){let{className:t}=e;const a=(0,c.r)();return a.badge?n.createElement("span",{className:(0,r.A)(t,l.G.docs.docVersionBadge,"badge badge--secondary")},n.createElement(i.A,{id:"theme.docs.versionBadge.label",values:{versionLabel:a.label}},"Version: {versionLabel}")):null}},9968:(e,t,a)=>{a.d(t,{A:()=>g});var n=a(4041),r=a(9546),i=a(5456),l=a(2915),c=a(1915),s=a(4027),o=a(7917),m=a(9235),d=a(1398);const u={unreleased:function(e){let{siteTitle:t,versionMetadata:a}=e;return n.createElement(c.A,{id:"theme.docs.versions.unreleasedVersionLabel",description:"The label used to tell the user that he's browsing an unreleased doc version",values:{siteTitle:t,versionLabel:n.createElement("b",null,a.label)}},"This is unreleased documentation for {siteTitle} {versionLabel} version.")},unmaintained:function(e){let{siteTitle:t,versionMetadata:a}=e;return n.createElement(c.A,{id:"theme.docs.versions.unmaintainedVersionLabel",description:"The label used to tell the user that he's browsing an unmaintained doc version",values:{siteTitle:t,versionLabel:n.createElement("b",null,a.label)}},"This is documentation for {siteTitle} {versionLabel}, which is no longer actively maintained.")}};function h(e){const t=u[e.versionMetadata.banner];return n.createElement(t,e)}function b(e){let{versionLabel:t,to:a,onClick:r}=e;return n.createElement(c.A,{id:"theme.docs.versions.latestVersionSuggestionLabel",description:"The label used to tell the user to check the latest version",values:{versionLabel:t,latestVersionLink:n.createElement("b",null,n.createElement(l.A,{to:a,onClick:r},n.createElement(c.A,{id:"theme.docs.versions.latestVersionLinkLabel",description:"The label used for the latest version suggestion link label"},"latest version")))}},"For up-to-date documentation, see the {latestVersionLink} ({versionLabel}).")}function v(e){let{className:t,versionMetadata:a}=e;const{siteConfig:{title:l}}=(0,i.A)(),{pluginId:c}=(0,s.vT)({failfast:!0}),{savePreferredVersionName:d}=(0,m.g1)(c),{latestDocSuggestion:u,latestVersionSuggestion:v}=(0,s.HW)(c),g=u??(p=v).docs.find((e=>e.id===p.mainDocId));var p;return n.createElement("div",{className:(0,r.A)(t,o.G.docs.docVersionBanner,"alert alert--warning margin-bottom--md"),role:"alert"},n.createElement("div",null,n.createElement(h,{siteTitle:l,versionMetadata:a})),n.createElement("div",{className:"margin-top--md"},n.createElement(b,{versionLabel:v.label,to:g.path,onClick:()=>d(v.name)})))}function g(e){let{className:t}=e;const a=(0,d.r)();return a.banner?n.createElement(v,{className:t,versionMetadata:a}):null}},1527:(e,t,a)=>{a.d(t,{A:()=>o});var n=a(9575),r=a(4041),i=a(9546),l=a(1915),c=a(6140);const s={anchorWithStickyNavbar:"anchorWithStickyNavbar_fF9Z",anchorWithHideOnScrollNavbar:"anchorWithHideOnScrollNavbar_Yh18"};function o(e){let{as:t,id:a,...o}=e;const{navbar:{hideOnScroll:m}}=(0,c.p)();return"h1"!==t&&a?r.createElement(t,(0,n.A)({},o,{className:(0,i.A)("anchor",m?s.anchorWithHideOnScrollNavbar:s.anchorWithStickyNavbar),id:a}),o.children,r.createElement("a",{className:"hash-link",href:`#${a}`,title:(0,l.T)({id:"theme.common.headingLinkTitle",message:"Direct link to heading",description:"Title for link to heading"})},"\u200b")):r.createElement(t,(0,n.A)({},o,{id:void 0}))}},3932:(e,t,a)=>{a.d(t,{A:()=>l});var n=a(4041),r=a(9546),i=a(2915);function l(e){const{permalink:t,title:a,subLabel:l,isNext:c}=e;return n.createElement(i.A,{className:(0,r.A)("pagination-nav__link",c?"pagination-nav__link--next":"pagination-nav__link--prev"),to:t},l&&n.createElement("div",{className:"pagination-nav__sublabel"},l),n.createElement("div",{className:"pagination-nav__label"},a))}}}]);