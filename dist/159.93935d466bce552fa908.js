(window.webpackJsonp=window.webpackJsonp||[]).push([[159],{1029:function(e,a,t){"use strict";t.r(a);var s=t(10),i=t.n(s),c=t(0),n=t.n(c),l=t(198),m=t(243),o=t(294),r=t(85),u=t(200),b=t(201),_=t(204),d=t(83),E=t(62),g=t(1030),h=t(345),f=t(341),p=t(1028),w=t(298),N=n.a.createElement(w.a,{src:g.a,size:18}),j=n.a.createElement(w.a,{src:h.a,size:18}),v=n.a.createElement(w.a,{src:f.a,size:18}),O=n.a.createElement(w.a,{src:p.a,size:18});a.default=function(e){var a=Object(c.useState)("home"),t=i()(a,2),s=t[0],g=t[1],h=Object(d.b)(),f=i()(h,1)[0],p=f.currentUser,w=f.isSignedIn,k=Object(c.useState)(!1),C=i()(k,2),M=C[0],y=C[1],S=function(){M||y(!0)};Object(c.useEffect)((function(){return document.addEventListener("scroll",S),function(){document.removeEventListener("scroll",S)}}));var z=e.isMasked,A=Object(r.a)(u.a,e.classes),U=Object(c.useState)(!1),H=i()(U,2),P=H[0],J=H[1],L=Object(l.a)(),I=i()(L,2)[1].addToast;Object(c.useEffect)((function(){P&&!w&&I({type:"info",message:"Please Register or Signin to create your wishlist.",dismissable:!0,timeout:4e3}),J(!1)}),[I,w,P]);var R=Object(E.g)(),T=Object(_.a)().handleOpenNavigation,W=p.wishlist&&p.wishlist.items_count?p.wishlist.items_count:0;Object(m.a)(z);return n.a.createElement("div",{className:u.a.bottom_toolbar},n.a.createElement("div",{className:u.a.bottom_tool_inner},n.a.createElement("button",{onClick:function(){R.push("/"),g("home")},className:u.a.toolbar_items+" "+("home"==s?u.a.active:"")},n.a.createElement("span",{className:u.a.language_switch_image+" "+A.header_Actions_image,title:"Home"},N),n.a.createElement("p",{className:u.a.images_label},n.a.createElement(o.a,{id:"main.Home",defaultMessage:"Home"}))),n.a.createElement("button",{onClick:T,className:u.a.toolbar_items},n.a.createElement("span",{className:u.a.language_switch_image+" "+A.header_Actions_image,title:"Contact Us"},O),n.a.createElement("p",{className:u.a.images_label},n.a.createElement(o.a,{id:"main.Country",defaultMessage:"Contact Us"}))),n.a.createElement("button",{onClick:function(){J(!0),w?(R.push("/wishlist"),g("wishlist")):T()},className:u.a.toolbar_items+" "+("wishlist"==s?u.a.active:"")},n.a.createElement("span",{className:u.a.wishlist_image+" "+A.header_Actions_image,title:"My projects"},v,n.a.createElement("span",{className:b.a.wishlist_counter},W)),n.a.createElement("p",{className:u.a.images_label},n.a.createElement(o.a,{id:"main.Wishlist",defaultMessage:"My projects"}))),n.a.createElement("button",{onClick:function(){w?(R.push("/account"),g("profile")):T()},className:u.a.toolbar_items+" "+("profile"==s?u.a.active:"")},n.a.createElement("span",{className:u.a.user_icon_image+" "+A.header_Actions_image,title:"User"},j),n.a.createElement("p",{className:u.a.images_label},n.a.createElement(o.a,{id:"main.Profile",defaultMessage:"Profile"})))))}}}]);