System.register(["./index-legacy-b7e74208.js"],(function(t,e){"use strict";var n,r,i;return{setters:[function(t){n=t.s,r=t.v,i=t.x}],execute:function(){
/*!
       * (C) Ionic http://ionicframework.com - MIT License
       */
t("createSwipeBackGesture",(function(t,e,u,a,o){var c=t.ownerDocument.defaultView,s=n(t),f=function(t){return s?-t.deltaX:t.deltaX};return r({el:t,gestureName:"goback-swipe",gesturePriority:40,threshold:10,canStart:function(r){return s=n(t),function(t){var e=t.startX;return s?e>=c.innerWidth-50:e<=50}(r)&&e()},onStart:u,onMove:function(t){var e=f(t)/c.innerWidth;a(e)},onEnd:function(t){var e=f(t),n=c.innerWidth,r=e/n,u=function(t){return s?-t.velocityX:t.velocityX}(t),a=u>=0&&(u>.2||e>n/2),v=(a?1-r:r)*n,d=0;if(v>5){var l=v/Math.abs(u);d=Math.min(l,540)}o(a,r<=0?.01:i(0,r,.9999),d)}})}))}}}));
