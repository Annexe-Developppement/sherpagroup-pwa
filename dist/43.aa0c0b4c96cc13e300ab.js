(window.webpackJsonp=window.webpackJsonp||[]).push([[43],{1112:function(e,t,r){"use strict";r.r(t),r.d(t,"default",(function(){return H}));var n=r(48),a=r.n(n),o=r(22),i=r.n(o),g=r(10),l=r.n(g),s=r(0),c=r.n(s),d=r(14),p=r.n(d),b=r(518),v=r.n(b),m={injectType:"singletonStyleTag",insert:"head",singleton:!0},u=(p()(v.a,m),v.a.locals||{}),y=r(85),h=r(1),O=r(408),f=r(462),k=r(240),w=r(84),T=function(e){return e.preventDefault()},R=function(e){var t=Object(y.a)(u,e.classes),r=Object(s.useState)(!1),n=l()(r,2),o=n[0],g=n[1],d=function(){return g(!o)},p=e.appearance,b=void 0===p?"poster":p,v=e.minHeight,m=e.backgroundColor,h=e.desktopImage,R=e.mobileImage,H=e.backgroundSize,C=e.backgroundPosition,j=e.backgroundAttachment,L=e.backgroundRepeat,B=e.textAlign,E=e.border,I=e.borderColor,N=e.borderWidth,x=e.borderRadius,S=e.content,A=e.showButton,M=e.buttonType,z=e.buttonText,P=e.link,W=e.linkType,_=e.openInNewTab,D=void 0!==_&&_,J=e.showOverlay,q=e.overlayColor,F=e.marginTop,G=e.marginRight,K=e.marginBottom,Q=e.marginLeft,U=e.paddingTop,V=e.paddingRight,X=e.paddingBottom,Y=e.paddingLeft,Z=e.cssClasses,$=void 0===Z?[]:Z,ee=h;R&&window.matchMedia("(max-width: 768px)").matches&&(ee=R);var te={marginTop:F,marginRight:G,marginBottom:K,marginLeft:Q},re={backgroundColor:m,border:E,borderColor:I,borderWidth:N,borderRadius:x,textAlign:B},ne={backgroundColor:"never"!==J?q:null},ae={};if(ee){var oe=Object(k.a)(ee,{type:"image-wysiwyg",quality:85});re.backgroundImage="url(".concat(oe,")"),re.backgroundSize=H,re.backgroundPosition=C,re.backgroundAttachment=j,re.backgroundRepeat=L?"repeat":"no-repeat"}"poster"===b?(re.minHeight=v,ne.minHeight=v,ne.paddingTop=U,ne.paddingRight=V,ne.paddingBottom=X,ne.paddingLeft=Y,ae.width="100%"):(re.minHeight=v,re.paddingTop=U,re.paddingRight=V,re.paddingBottom=X,re.paddingLeft=Y);var ie,ge={poster:t.posterOverlay,"collage-left":t.collageLeftOverlay,"collage-centered":t.collageCenteredOverlay,"collage-right":t.collageRightOverlay},le={poster:t.posterOverlayHover,"collage-left":t.collageLeftOverlayHover,"collage-centered":t.collageCenteredOverlayHover,"collage-right":t.collageRightOverlayHover};if("never"!==A){var se="hover"===A?t.buttonHover:t.button;ie=c.a.createElement("div",{className:se},c.a.createElement(O.a,{priority:{primary:"high",secondary:"normal",link:"low"}[M],type:"button"},z))}var ce,de="hover"!==J||o?ge[b]:le[b],pe=c.a.createElement("div",{className:t.wrapper,style:re},c.a.createElement("div",{className:de,style:ne},c.a.createElement("div",{className:t.content,style:ae,dangerouslySetInnerHTML:(ce=S,{__html:ce})}),ie));if("string"==typeof P){var be=Object(f.a)(P,W),ve=be.to?w.b:"a";pe=c.a.createElement(ve,i()({className:t.link},be,D?{target:"_blank"}:"",{onDragStart:T}),pe)}return c.a.createElement("div",{className:[t.root].concat(a()($)).join(" "),style:te,onMouseEnter:d,onMouseLeave:d},pe)};R.propTypes={classes:Object(h.shape)({root:h.string,link:h.string,wrapper:h.string,overlay:h.string,content:h.string,button:h.string,buttonHover:h.string,posterOverlay:h.string,posterOverlayHover:h.string,collageLeftOverlay:h.string,collageLeftOverlayHover:h.string,collageCenteredOverlay:h.string,collageCenteredOverlayHover:h.string,collageRightOverlay:h.string,collageRightOverlayHover:h.string}),appearance:Object(h.oneOf)(["poster","collage-left","collage-centered","collage-right"]),minHeight:h.string,backgroundColor:h.string,desktopImage:h.string,mobileImage:h.string,backgroundSize:h.string,backgroundPosition:h.string,backgroundAttachment:h.string,backgroundRepeat:h.bool,content:h.string,link:h.string,linkType:Object(h.oneOf)(["default","product","category","page"]),openInNewTab:h.bool,showButton:Object(h.oneOf)(["always","hover","never"]),buttonText:h.string,buttonType:Object(h.oneOf)(["primary","secondary","link"]),showOverlay:Object(h.oneOf)(["always","hover","never"]),overlayColor:h.string,textAlign:h.string,border:h.string,borderColor:h.string,borderWidth:h.string,borderRadius:h.string,marginTop:h.string,marginRight:h.string,marginBottom:h.string,marginLeft:h.string,paddingTop:h.string,paddingRight:h.string,paddingBottom:h.string,cssClasses:Object(h.arrayOf)(h.string)};var H=R}}]);