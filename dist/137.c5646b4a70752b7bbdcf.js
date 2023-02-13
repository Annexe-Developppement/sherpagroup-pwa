(window.webpackJsonp=window.webpackJsonp||[]).push([[137],{552:function(e,t,a){"use strict";var n=a(14),r=a.n(n),c=a(399),o=a.n(c),s={injectType:"singletonStyleTag",insert:"head",singleton:!0};r()(o.a,s);t.a=o.a.locals||{}},755:function(e,t,a){"use strict";a.r(t);var n,r,c=a(6),o=a.n(c),s=a(0),l=a.n(s),i=a(1),u=a(1028),g=(a(10),a(17)),m=a(62),f=a(114),d=new(a(36).a),b=function(e){var t=e.queries,a=t.getStoreConfigData,n=t.getAvailableStoresData,r=Object(m.g)(),c=Object(f.a)(),o=c.elementRef,l=c.expanded,i=c.setExpanded,u=c.triggerRef,b=Object(g.useQuery)(a,{fetchPolicy:"cache-and-network",nextFetchPolicy:"cache-first"}).data,h=Object(g.useQuery)(n,{fetchPolicy:"cache-and-network",nextFetchPolicy:"cache-first"}).data,p=Object(s.useMemo)((function(){if(b)return b.storeConfig.store_name}),[b]),v=Object(s.useMemo)((function(){if(b)return b.storeConfig.allow_guest_checkout}),[b]),w=Object(s.useMemo)((function(){return b&&h&&(e=b.storeConfig,t=h.availableStores,a=e.code,t.reduce((function(e,t){var n=t.code,r=t.default_display_currency_code,c=t.locale,o=t.store_name,s={currency:r,isCurrent:n===a,locale:c,storeName:o};return e.set(n,s)}),new Map));var e,t,a}),[b,h]),_=Object(s.useCallback)((function(e){w.has(e)&&(d.removeItem("nav_details"),d.setItem("store_view_code",e),d.setItem("store_view_currency",w.get(e).currency),r.go(0))}),[r,w]),y=Object(s.useCallback)((function(){i((function(e){return!e}))}),[i]);return{currentStoreName:p,allowGuestCheckout:v,availableStores:w,storeMenuRef:o,storeMenuTriggerRef:u,storeMenuIsOpen:l,handleTriggerClick:y,handleSwitchStore:_}},h=a(85),p=a(552),v=a(587),w=a(80),_=a.n(w),y={queries:{getStoreConfigData:Object(g.gql)(n||(n=_()(["\n    query getStoreConfigData {\n        storeConfig {\n            id\n            code\n            store_name\n            allow_guest_checkout\n        }\n    }\n"]))),getAvailableStoresData:Object(g.gql)(r||(r=_()(["\n    query getAvailableStoresData {\n        availableStores {\n            code\n            default_display_currency_code\n            id\n            locale\n            store_name\n        }\n    }\n"])))}},C=a(298),S=a(173),k=a(174),O=a(58),j=function(e){var t=b(o()({},y)),a=t.handleSwitchStore,n=t.allowGuestCheckout,r=t.currentStoreName,c=t.availableStores,s=t.storeMenuRef,i=t.storeMenuTriggerRef,g=t.storeMenuIsOpen,m=t.handleTriggerClick,f=Object(h.a)(p.a,e.classes),d=g?f.menu_open:f.menu,w=new(0,O.a.BrowserPersistence);if(n&&null!=n&&w.setItem("allowGuestCheckout",n),!c||c.size<=1)return null;var _=[];return c.forEach((function(e,t){_.push(l.a.createElement("li",{key:t,className:f.menuItem},l.a.createElement(v.a,{active:e.isCurrent,onClick:a,option:t},e.storeName)))})),l.a.createElement("div",{className:f.root},l.a.createElement("button",{"aria-label":"store-language-switch",onClick:m,ref:i},l.a.createElement("span",{className:f.trigger},l.a.createElement(C.a,{src:u.a}),l.a.createElement("span",{className:f.label},r),l.a.createElement("span",{className:f.select_img},l.a.createElement(S.a,{icon:k.a})))),l.a.createElement("div",{ref:s,className:d},l.a.createElement("ul",null,_)),l.a.createElement("div",{className:f.overlay}))};t.default=j;j.propTypes={classes:Object(i.shape)({root:i.string,trigger:i.string,menu:i.string,menu_open:i.string,menuItem:i.string})}}}]);