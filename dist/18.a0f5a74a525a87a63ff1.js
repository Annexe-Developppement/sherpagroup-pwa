(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{592:function(e,t,r){"use strict";var a=r(0),i=function(){return(i=Object.assign||function(e){for(var t,r=1,a=arguments.length;r<a;r++)for(var i in t=arguments[r])Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e}).apply(this,arguments)};var n=function(){return Math.random().toString(36).substring(2)},o=function(e){var t=e.rtl,r=e.speed,o=e.interval,l=e.style,c=e.width,s=e.height,p=e.baseUrl,y=e.gradientRatio,u=e.animate,m=e.ariaLabel,d=e.children,f=e.className,b=e.uniquekey,O=e.primaryColor,h=e.primaryOpacity,j=e.secondaryColor,v=e.secondaryOpacity,g=e.preserveAspectRatio,w=function(e,t){var r={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.indexOf(a)<0&&(r[a]=e[a]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var i=0;for(a=Object.getOwnPropertySymbols(e);i<a.length;i++)t.indexOf(a[i])<0&&Object.prototype.propertyIsEnumerable.call(e,a[i])&&(r[a[i]]=e[a[i]])}return r}(e,["rtl","speed","interval","style","width","height","baseUrl","gradientRatio","animate","ariaLabel","children","className","uniquekey","primaryColor","primaryOpacity","secondaryColor","secondaryOpacity","preserveAspectRatio"]),E=b?b+"-idClip":n(),C=b?b+"-idGradient":n(),k=t?{transform:"scaleX(-1)"}:{},R="0; "+o+"; 1",x=r+"s";return Object(a.createElement)("svg",i({role:"img",style:i(i({},l),k),className:f,"aria-label":m||null,viewBox:"0 0 "+c+" "+s,preserveAspectRatio:g},w),m?Object(a.createElement)("title",null,m):null,Object(a.createElement)("rect",{x:"0",y:"0",width:c,height:s,clipPath:"url("+p+"#"+E+")",style:{fill:"url("+p+"#"+C+")"}}),Object(a.createElement)("defs",null,Object(a.createElement)("clipPath",{id:E},d),Object(a.createElement)("linearGradient",{id:C},Object(a.createElement)("stop",{offset:"0%",stopColor:O,stopOpacity:h},u&&Object(a.createElement)("animate",{attributeName:"offset",values:-y+"; "+-y+"; 1",keyTimes:R,dur:x,repeatCount:"indefinite"})),Object(a.createElement)("stop",{offset:"50%",stopColor:j,stopOpacity:v},u&&Object(a.createElement)("animate",{attributeName:"offset",values:-y/2+"; "+-y/2+"; "+(1+y/2),keyTimes:R,dur:x,repeatCount:"indefinite"})),Object(a.createElement)("stop",{offset:"100%",stopColor:O,stopOpacity:h},u&&Object(a.createElement)("animate",{attributeName:"offset",values:"0; 0; "+(1+y),keyTimes:R,dur:x,repeatCount:"indefinite"})))))},l={animate:!0,ariaLabel:"Loading interface...",baseUrl:"",gradientRatio:2,height:130,interval:.25,preserveAspectRatio:"none",primaryColor:"#f0f0f0",primaryOpacity:1,rtl:!1,secondaryColor:"#e0e0e0",secondaryOpacity:1,speed:2,style:{},width:400},c=function(e){return Object(a.createElement)("rect",{x:"0",y:"0",rx:"5",ry:"5",width:e.width,height:e.height})},s=function(e){var t=i(i({},l),e);return Object(a.createElement)(o,i({},t),e.children||Object(a.createElement)(c,i({},t)))};t.a=s}}]);