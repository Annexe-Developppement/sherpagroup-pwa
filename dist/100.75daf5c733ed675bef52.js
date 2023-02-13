(window.webpackJsonp=window.webpackJsonp||[]).push([[100,121],{1064:function(e,n,i){"use strict";i.r(n);var a=i(0),t=i.n(a),d=i(658),r=i(955),c=i.n(r),s=i(85),l=i(431),o=i(579),u=i(503),m=i.n(u),v=i(176);n.default=function(e){var n=e.product,i=e.title,r=Object(d.a)({query:c.a,visitor_id:localStorage.getItem("visitor_id")?localStorage.getItem("visitor_id"):"",product_id:n.id}),u=Object(v.d)().config,k=r.sliderProduct,f=Object(s.a)(l.a,e.classes),p=Object(a.useMemo)((function(){return k&&k.map((function(e,n){return t.a.createElement(o.a,{key:n,defaultClasses:l.a,value:e,config:u,classes:f})}))}),[u,f,k]);return k&&k.length<3?t.a.createElement("div",null):t.a.createElement(t.a.Fragment,null,k&&t.a.createElement("section",{className:l.a.h_products+" "+l.a.homepage_sections},t.a.createElement("div",{className:"container"},t.a.createElement("div",{className:"row"},t.a.createElement("div",{className:l.a.h_products_column+" col-xs-12 col-lg-12 col-sm-12 col-md-12"},t.a.createElement("div",{className:l.a.section_heading},t.a.createElement("h3",{className:l.a.homepage_section_heading},i)),t.a.createElement(t.a.Fragment,null,k&&void 0!==k&&t.a.createElement(m.a,{className:"owl-theme "+l.a.owl_thme_design,loop:!1,rewind:!0,margin:10,nav:!0,dots:!1,autoplay:!1,autoplayTimeout:2e3,items:4,responsive:{0:{items:2},450:{items:2},600:{items:3},1e3:{items:4}}},p)))))))}},390:function(e,n){var i={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"createCart"},variableDefinitions:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",alias:{kind:"Name",value:"cartId"},name:{kind:"Name",value:"createEmptyCart"},arguments:[],directives:[]}]}}],loc:{start:0,end:193}};i.loc.source={body:"# This mutation will return a masked cart id. If a bearer token is provided for\n# a logged in user it will return the cart id for that user.\nmutation createCart {\n    cartId: createEmptyCart\n}\n",name:"GraphQL request",locationOffset:{line:1,column:1}};var a={};function t(e,n){for(var i=0;i<e.definitions.length;i++){var a=e.definitions[i];if(a.name&&a.name.value==n)return a}}i.definitions.forEach((function(e){if(e.name){var n=new Set;!function e(n,i){if("FragmentSpread"===n.kind)i.add(n.name.value);else if("VariableDefinition"===n.kind){var a=n.type;"NamedType"===a.kind&&i.add(a.name.value)}n.selectionSet&&n.selectionSet.selections.forEach((function(n){e(n,i)})),n.variableDefinitions&&n.variableDefinitions.forEach((function(n){e(n,i)})),n.definitions&&n.definitions.forEach((function(n){e(n,i)}))}(e,n),a[e.name.value]=n}})),e.exports=i,e.exports.createCart=function(e,n){var i={kind:e.kind,definitions:[t(e,n)]};e.hasOwnProperty("loc")&&(i.loc=e.loc);var d=a[n]||new Set,r=new Set,c=new Set;for(d.forEach((function(e){c.add(e)}));c.size>0;){var s=c;c=new Set,s.forEach((function(e){r.has(e)||(r.add(e),(a[e]||new Set).forEach((function(e){c.add(e)})))}))}return r.forEach((function(n){var a=t(e,n);a&&i.definitions.push(a)})),i}(i,"createCart")},395:function(e,n){var i={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"getCartDetails"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"cartId"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},directives:[]}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"cart"},arguments:[{kind:"Argument",name:{kind:"Name",value:"cart_id"},value:{kind:"Variable",name:{kind:"Name",value:"cartId"}}}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"is_virtual"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"available_payment_methods"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"code"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"title"},arguments:[],directives:[]}]}},{kind:"Field",name:{kind:"Name",value:"items"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"prices"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"price"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"value"},arguments:[],directives:[]}]}},{kind:"Field",name:{kind:"Name",value:"row_total"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"value"},arguments:[],directives:[]}]}}]}},{kind:"Field",name:{kind:"Name",value:"product"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"name"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"sku"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"small_image"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"url"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"label"},arguments:[],directives:[]}]}},{kind:"Field",name:{kind:"Name",value:"price"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"regularPrice"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"amount"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"value"},arguments:[],directives:[]}]}}]}},{kind:"Field",name:{kind:"Name",value:"minimalPrice"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"amount"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"currency"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"value"},arguments:[],directives:[]}]}}]}}]}}]}},{kind:"Field",name:{kind:"Name",value:"quantity"},arguments:[],directives:[]},{kind:"InlineFragment",typeCondition:{kind:"NamedType",name:{kind:"Name",value:"ConfigurableCartItem"}},directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"configurable_options"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"option_label"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"value_id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"value_label"},arguments:[],directives:[]}]}}]}}]}},{kind:"Field",name:{kind:"Name",value:"prices"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"grand_total"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"value"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"currency"},arguments:[],directives:[]}]}}]}},{kind:"Field",name:{kind:"Name",value:"validate_quote"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"message"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"success"},arguments:[],directives:[]}]}}]}}]}}],loc:{start:0,end:1418}};i.loc.source={body:"query getCartDetails($cartId: String!) {\n    cart(cart_id: $cartId) {\n        id\n        is_virtual\n        available_payment_methods {\n            code\n            title\n        }\n        items {\n            id\n            prices {\n                price {\n                    value\n                }\n                row_total {\n                    value\n                }\n            }\n            product {\n                id\n                name\n                sku\n                small_image {\n                    url\n                    label\n                }\n                price {\n                    regularPrice {\n                        amount {\n                            value\n                        }\n                    }\n                    minimalPrice {\n                        amount {\n                            currency\n                            value\n                        }\n                    }\n                }\n            }\n            quantity\n            ... on ConfigurableCartItem {\n                configurable_options {\n                    id\n                    option_label\n                    value_id\n                    value_label\n                }\n            }\n        }\n        prices {\n            grand_total {\n                value\n                currency\n            }\n        }\n        validate_quote {\n            message\n            success\n        }\n    }\n}\n",name:"GraphQL request",locationOffset:{line:1,column:1}};var a={};function t(e,n){for(var i=0;i<e.definitions.length;i++){var a=e.definitions[i];if(a.name&&a.name.value==n)return a}}i.definitions.forEach((function(e){if(e.name){var n=new Set;!function e(n,i){if("FragmentSpread"===n.kind)i.add(n.name.value);else if("VariableDefinition"===n.kind){var a=n.type;"NamedType"===a.kind&&i.add(a.name.value)}n.selectionSet&&n.selectionSet.selections.forEach((function(n){e(n,i)})),n.variableDefinitions&&n.variableDefinitions.forEach((function(n){e(n,i)})),n.definitions&&n.definitions.forEach((function(n){e(n,i)}))}(e,n),a[e.name.value]=n}})),e.exports=i,e.exports.getCartDetails=function(e,n){var i={kind:e.kind,definitions:[t(e,n)]};e.hasOwnProperty("loc")&&(i.loc=e.loc);var d=a[n]||new Set,r=new Set,c=new Set;for(d.forEach((function(e){c.add(e)}));c.size>0;){var s=c;c=new Set,s.forEach((function(e){r.has(e)||(r.add(e),(a[e]||new Set).forEach((function(e){c.add(e)})))}))}return r.forEach((function(n){var a=t(e,n);a&&i.definitions.push(a)})),i}(i,"getCartDetails")},431:function(e,n,i){"use strict";var a=i(14),t=i.n(a),d=i(356),r=i.n(d),c={injectType:"singletonStyleTag",insert:"head",singleton:!0};t()(r.a,c);n.a=r.a.locals||{}},437:function(e,n,i){"use strict";i.r(n);var a=i(4),t=i.n(a),d=i(9),r=i.n(d),c=i(10),s=i.n(c),l=i(0),o=i.n(l),u=i(471),m=i.n(u),v=i(472),k=i.n(v),f=i(198),p=i(58),g=i(467),S=i(298),N=i(1032),b=i(342),_=i(481),F=i(479),h=i.n(F),y=i(480),E=i.n(y),w=i(370),D=i.n(w),O=o.a.createElement(S.a,{src:N.a,size:20});n.default=function(e){var n=e.id,i=Object(b.a)().formatMessage,a=Object(l.useState)(!1),d=s()(a,2),c=d[0],u=d[1],v=Object(l.useState)(!1),S=s()(v,2),N=S[0],F=S[1],y=Object(_.b)({query:h.a}),w=y.data,C=y.refetch,I=Object(_.c)({removeCompareMutation:E.a,CustomerQuery:D.a}),j=I.handleRemoveCompare,T=I.removeResponse,P=!1;void 0!==w&&w.items.forEach((function(e){e.product.id==n&&(P=!0)}));var x=Object(_.a)({createCompareMutation:m.a,addToCompareMutation:k.a}),V=x.handleCreateCompare,L=x.createCompareData,q=x.handleAddCompare,M=x.compareResponse,A=Object(f.a)(),R=s()(A,2)[1].addToast;Object(l.useEffect)((function(){void 0!==M&&c&&(R({type:"info",message:i({id:"compare.compareMessage",defaultMessage:"You have added product to compare list."}),timeout:2e3}),u(!1))}),[R,c,M,i]),Object(l.useEffect)((function(){void 0!==T&&N&&(R({type:"info",message:i({id:"compare.removeCompareMessage",defaultMessage:"You have removed product from compare list."}),timeout:2e3}),F(!1))}),[R,i,T,N]);var $=new(0,p.a.BrowserPersistence);L&&L.uid&&!$.getItem("compare_uid")&&$.setItem("compare_uid",L.uid);var Q=function(){var e=r()(t.a.mark((function e(n){return t.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!($.getItem("compare_uid")?$.getItem("compare_uid"):"")){e.next=6;break}return e.next=4,q(n);case 4:e.next=8;break;case 6:return e.next=8,V(n);case 8:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}();return o.a.createElement(o.a.Fragment,null,P?o.a.createElement("button",{className:g.a.add_to_compare+" "+g.a.added_to_compare,title:"Remove from compare",onClick:r()(t.a.mark((function e(){return t.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,j(n);case 2:return e.next=4,C();case 4:F(!0);case 5:case"end":return e.stop()}}),e)})))},O):o.a.createElement("button",{className:g.a.add_to_compare,title:"Add to compare",onClick:r()(t.a.mark((function e(){return t.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Q(n);case 2:u(!0);case 3:case"end":return e.stop()}}),e)})))},O))}},471:function(e,n){var i={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"createCompareList"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"products"}},type:{kind:"NamedType",name:{kind:"Name",value:"ID"}},directives:[]}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"createCompareList"},arguments:[{kind:"Argument",name:{kind:"Name",value:"input"},value:{kind:"ObjectValue",fields:[{kind:"ObjectField",name:{kind:"Name",value:"products"},value:{kind:"ListValue",values:[{kind:"Variable",name:{kind:"Name",value:"products"}}]}}]}}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"uid"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"item_count"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"attributes"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"code"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"label"},arguments:[],directives:[]}]}},{kind:"Field",name:{kind:"Name",value:"items"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"uid"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"product"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"sku"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"name"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"description"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"html"},arguments:[],directives:[]}]}}]}}]}}]}}]}}],loc:{start:0,end:399}};i.loc.source={body:"mutation createCompareList($products: ID) {\n    createCompareList(input: { products: [$products] }) {\n        uid\n        item_count\n        attributes {\n            code\n            label\n        }\n        items {\n            uid\n            product {\n                sku\n                name\n                description {\n                    html\n                }\n            }\n        }\n    }\n}\n",name:"GraphQL request",locationOffset:{line:1,column:1}};var a={};function t(e,n){for(var i=0;i<e.definitions.length;i++){var a=e.definitions[i];if(a.name&&a.name.value==n)return a}}i.definitions.forEach((function(e){if(e.name){var n=new Set;!function e(n,i){if("FragmentSpread"===n.kind)i.add(n.name.value);else if("VariableDefinition"===n.kind){var a=n.type;"NamedType"===a.kind&&i.add(a.name.value)}n.selectionSet&&n.selectionSet.selections.forEach((function(n){e(n,i)})),n.variableDefinitions&&n.variableDefinitions.forEach((function(n){e(n,i)})),n.definitions&&n.definitions.forEach((function(n){e(n,i)}))}(e,n),a[e.name.value]=n}})),e.exports=i,e.exports.createCompareList=function(e,n){var i={kind:e.kind,definitions:[t(e,n)]};e.hasOwnProperty("loc")&&(i.loc=e.loc);var d=a[n]||new Set,r=new Set,c=new Set;for(d.forEach((function(e){c.add(e)}));c.size>0;){var s=c;c=new Set,s.forEach((function(e){r.has(e)||(r.add(e),(a[e]||new Set).forEach((function(e){c.add(e)})))}))}return r.forEach((function(n){var a=t(e,n);a&&i.definitions.push(a)})),i}(i,"createCompareList")},472:function(e,n){var i={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"addProductsToCompareList"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"products"}},type:{kind:"NamedType",name:{kind:"Name",value:"ID"}},directives:[]},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"uid"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"ID"}}},directives:[]}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"addProductsToCompareList"},arguments:[{kind:"Argument",name:{kind:"Name",value:"input"},value:{kind:"ObjectValue",fields:[{kind:"ObjectField",name:{kind:"Name",value:"uid"},value:{kind:"Variable",name:{kind:"Name",value:"uid"}}},{kind:"ObjectField",name:{kind:"Name",value:"products"},value:{kind:"ListValue",values:[{kind:"Variable",name:{kind:"Name",value:"products"}}]}}]}}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"uid"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"item_count"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"attributes"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"code"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"label"},arguments:[],directives:[]}]}},{kind:"Field",name:{kind:"Name",value:"items"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"uid"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"product"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"sku"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"name"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"description"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"html"},arguments:[],directives:[]}]}}]}}]}}]}}]}}],loc:{start:0,end:435}};i.loc.source={body:"mutation addProductsToCompareList($products: ID, $uid: ID!) {\n    addProductsToCompareList(input: { uid: $uid, products: [$products] }) {\n        uid\n        item_count\n        attributes {\n            code\n            label\n        }\n        items {\n            uid\n            product {\n                sku\n                name\n                description {\n                    html\n                }\n            }\n        }\n    }\n}\n",name:"GraphQL request",locationOffset:{line:1,column:1}};var a={};function t(e,n){for(var i=0;i<e.definitions.length;i++){var a=e.definitions[i];if(a.name&&a.name.value==n)return a}}i.definitions.forEach((function(e){if(e.name){var n=new Set;!function e(n,i){if("FragmentSpread"===n.kind)i.add(n.name.value);else if("VariableDefinition"===n.kind){var a=n.type;"NamedType"===a.kind&&i.add(a.name.value)}n.selectionSet&&n.selectionSet.selections.forEach((function(n){e(n,i)})),n.variableDefinitions&&n.variableDefinitions.forEach((function(n){e(n,i)})),n.definitions&&n.definitions.forEach((function(n){e(n,i)}))}(e,n),a[e.name.value]=n}})),e.exports=i,e.exports.addProductsToCompareList=function(e,n){var i={kind:e.kind,definitions:[t(e,n)]};e.hasOwnProperty("loc")&&(i.loc=e.loc);var d=a[n]||new Set,r=new Set,c=new Set;for(d.forEach((function(e){c.add(e)}));c.size>0;){var s=c;c=new Set,s.forEach((function(e){r.has(e)||(r.add(e),(a[e]||new Set).forEach((function(e){c.add(e)})))}))}return r.forEach((function(n){var a=t(e,n);a&&i.definitions.push(a)})),i}(i,"addProductsToCompareList")},579:function(e,n,i){"use strict";var a=i(10),t=i.n(a),d=i(0),r=i.n(d),c=i(240),s=i(84),l=i(393),o=i(405),u=i(390),m=i.n(u),v=i(395),k=i.n(v),f=i(198),p=(i(173),i(431)),g=i(85),S=(i(504),i(505),i(342)),N=i(294),b=i(712),_=i(371),F=i(437),h=r.a.lazy((function(){return Promise.all([i.e(6),i.e(14),i.e(22)]).then(i.bind(null,607))}));n.a=function(e){var n=Object(g.a)(p.a,e.classes),i=e.value,a=e.config,u=e.index,v=Object(d.useState)(!1),y=t()(v,2),E=y[0],w=y[1],D=Object(d.useState)(""),O=t()(D,2),C=O[0],I=O[1],j=Object(f.a)(),T=t()(j,2)[1].addToast,P="",x=Object(c.a)(i.image,{type:"image-product",quality:"85",width:300}),V=Object(l.d)({addSimpleProductToCartMutation:o.d,createCartMutation:m.a,getCartDetailsQuery:k.a,setShowAlertMsg:w}),L=V.handleAddToCart,q=V.isAddingItem,M=V.success,A=V.errorMessage,R=Object(S.a)().formatMessage,$=Object(d.useCallback)((function(){M&&E&&!q&&(T({type:"info",message:i.name+R({id:"cart.message",defaultMessage:" added to the cart."}),dismissable:!0,timeout:2e3}),w(!1)),A&&E&&!q&&(T({type:"error",message:A||"error",dismissable:!0,timeout:2e3}),w(!1))}),[M,E,q,A,T,i.name,R]);return E&&$(),a.product_url_suffix&&"null"!=a.product_url_suffix&&(P=a.product_url_suffix),r.a.createElement("div",{key:u,className:"item"},r.a.createElement("div",{className:p.a.products_grid_item},r.a.createElement("div",{className:p.a.noo_product_item},r.a.createElement("div",{className:p.a.noo_product_inner},r.a.createElement("div",{className:p.a.noo_product_image},r.a.createElement(s.b,{to:Object(c.a)(i.urlkey+P)},r.a.createElement("img",{src:x,alt:i.name,title:i.name,className:"product_image",height:"300",width:"300"})),r.a.createElement(d.Suspense,{fallback:""},r.a.createElement(h,{value:i}))),r.a.createElement("div",{className:p.a.noo_details_wrapper},r.a.createElement("h3",{className:p.a.product_name},r.a.createElement(s.b,{to:Object(c.a)(i.urlkey+P)},i.name)),r.a.createElement("div",{className:p.a.vendor_price_wrap},r.a.createElement("div",{className:p.a.price},r.a.createElement(b.a,{price:i.price_range,optionFlag:!1,product:i,type:i.type}))),!1,r.a.createElement("div",{className:p.a.add_to_cart_Wrap},"simple"==i.type&&r.a.createElement("button",{"aria-label":"Addtocart",className:n.add_to_cart_btn,onClick:function(){L(i),w(!0),I(i.name)}},r.a.createElement(N.a,{id:"home.add_to_cart_btn",defaultMessage:"Add to cart"})),"simple"!=i.type&&r.a.createElement(s.b,{to:Object(c.a)(i.urlkey+P),className:n.add_to_cart_btn},r.a.createElement(N.a,{id:"home.add_to_cart_btn",defaultMessage:"Add to cart"})),r.a.createElement(F.default,{id:i.id}),q&&i.name==C&&r.a.createElement("div",{className:_.a.modal+" "+_.a.modal_active+" "+p.a.modal_active+" "+_.a.galler_modal_active},r.a.createElement("div",{className:_.a.loader_div},r.a.createElement("div",{className:_.a.ball_pulse},r.a.createElement("div",null),r.a.createElement("div",null),r.a.createElement("div",null))))))))))}},658:function(e,n,i){"use strict";i.d(n,"b",(function(){return d})),i.d(n,"a",(function(){return r}));var a=i(0),t=i(17),d=function(e){var n=e.query,i=Object(t.useQuery)(n,{variables:{visitor_id:e.visitor_id}}),d=i.error,r=i.data;return Object(a.useEffect)((function(){d&&console.log(d)}),[d]),{visitor_id:r&&r.visitorId&&r.visitorId.visitor_id}},r=function(e){var n=e.query,i=Object(t.useQuery)(n,{variables:{visitorId:e.visitor_id,productId:e.product_id},fetchPolicy:"network-only"}),d=i.error,r=i.data;return Object(a.useEffect)((function(){d&&console.log(d)}),[d]),{sliderProduct:r&&r.saveRecentProducts&&r.saveRecentProducts.data}}},955:function(e,n){var i={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"saveRecentProducts"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"productId"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},directives:[]},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"visitorId"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},directives:[]}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"saveRecentProducts"},arguments:[{kind:"Argument",name:{kind:"Name",value:"productId"},value:{kind:"Variable",name:{kind:"Name",value:"productId"}}},{kind:"Argument",name:{kind:"Name",value:"visitor_id"},value:{kind:"Variable",name:{kind:"Name",value:"visitorId"}}}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"data"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"name"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"price"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"final_price"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"sku"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"image"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"description"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"urlkey"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"type"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"price_range"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"minimum_price"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"regular_price"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"value"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"currency"},arguments:[],directives:[]}]}},{kind:"Field",name:{kind:"Name",value:"final_price"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"value"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"currency"},arguments:[],directives:[]}]}},{kind:"Field",name:{kind:"Name",value:"discount"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"amount_off"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"percent_off"},arguments:[],directives:[]}]}}]}},{kind:"Field",name:{kind:"Name",value:"maximum_price"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"regular_price"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"value"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"currency"},arguments:[],directives:[]}]}},{kind:"Field",name:{kind:"Name",value:"final_price"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"value"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"currency"},arguments:[],directives:[]}]}},{kind:"Field",name:{kind:"Name",value:"discount"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"amount_off"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"percent_off"},arguments:[],directives:[]}]}}]}}]}}]}}]}}]}}],loc:{start:0,end:1204}};i.loc.source={body:"query saveRecentProducts($productId: Int!, $visitorId: Int!) {\n    saveRecentProducts(productId: $productId, visitor_id: $visitorId) {\n        data {\n            id\n            name\n            price\n            final_price\n            sku\n            image\n            description\n            urlkey\n            type\n            price_range {\n                minimum_price {\n                    regular_price {\n                        value\n                        currency\n                    }\n                    final_price {\n                        value\n                        currency\n                    }\n                    discount {\n                        amount_off\n                        percent_off\n                    }\n                }\n                maximum_price {\n                    regular_price {\n                        value\n                        currency\n                    }\n                    final_price {\n                        value\n                        currency\n                    }\n                    discount {\n                        amount_off\n                        percent_off\n                    }\n                }\n            }\n        }\n    }\n}\n",name:"GraphQL request",locationOffset:{line:1,column:1}};var a={};function t(e,n){for(var i=0;i<e.definitions.length;i++){var a=e.definitions[i];if(a.name&&a.name.value==n)return a}}i.definitions.forEach((function(e){if(e.name){var n=new Set;!function e(n,i){if("FragmentSpread"===n.kind)i.add(n.name.value);else if("VariableDefinition"===n.kind){var a=n.type;"NamedType"===a.kind&&i.add(a.name.value)}n.selectionSet&&n.selectionSet.selections.forEach((function(n){e(n,i)})),n.variableDefinitions&&n.variableDefinitions.forEach((function(n){e(n,i)})),n.definitions&&n.definitions.forEach((function(n){e(n,i)}))}(e,n),a[e.name.value]=n}})),e.exports=i,e.exports.saveRecentProducts=function(e,n){var i={kind:e.kind,definitions:[t(e,n)]};e.hasOwnProperty("loc")&&(i.loc=e.loc);var d=a[n]||new Set,r=new Set,c=new Set;for(d.forEach((function(e){c.add(e)}));c.size>0;){var s=c;c=new Set,s.forEach((function(e){r.has(e)||(r.add(e),(a[e]||new Set).forEach((function(e){c.add(e)})))}))}return r.forEach((function(n){var a=t(e,n);a&&i.definitions.push(a)})),i}(i,"saveRecentProducts")}}]);