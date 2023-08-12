import{s as O,n as w,o as T,b}from"../chunks/scheduler.e108d1fd.js";import{S as E,i as I,g as y,s as x,h as v,y as L,c as A,k as S,a as _,f as g}from"../chunks/index.0719bd3d.js";var U=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},p={},W=U&&U.__extends||function(){var r=function(e,t){return r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,o){n.__proto__=o}||function(n,o){for(var a in o)o.hasOwnProperty(a)&&(n[a]=o[a])},r(e,t)};return function(e,t){r(e,t);function n(){this.constructor=e}e.prototype=t===null?Object.create(t):(n.prototype=t.prototype,new n)}}();Object.defineProperty(p,"__esModule",{value:!0});var s=256,B=function(){function r(e){e===void 0&&(e="="),this._paddingCharacter=e}return r.prototype.encodedLength=function(e){return this._paddingCharacter?(e+2)/3*4|0:(e*8+5)/6|0},r.prototype.encode=function(e){for(var t="",n=0;n<e.length-2;n+=3){var o=e[n]<<16|e[n+1]<<8|e[n+2];t+=this._encodeByte(o>>>3*6&63),t+=this._encodeByte(o>>>2*6&63),t+=this._encodeByte(o>>>1*6&63),t+=this._encodeByte(o>>>0*6&63)}var a=e.length-n;if(a>0){var o=e[n]<<16|(a===2?e[n+1]<<8:0);t+=this._encodeByte(o>>>3*6&63),t+=this._encodeByte(o>>>2*6&63),a===2?t+=this._encodeByte(o>>>1*6&63):t+=this._paddingCharacter||"",t+=this._paddingCharacter||""}return t},r.prototype.maxDecodedLength=function(e){return this._paddingCharacter?e/4*3|0:(e*6+7)/8|0},r.prototype.decodedLength=function(e){return this.maxDecodedLength(e.length-this._getPaddingLength(e))},r.prototype.decode=function(e){if(e.length===0)return new Uint8Array(0);for(var t=this._getPaddingLength(e),n=e.length-t,o=new Uint8Array(this.maxDecodedLength(n)),a=0,d=0,c=0,f=0,h=0,u=0,i=0;d<n-4;d+=4)f=this._decodeChar(e.charCodeAt(d+0)),h=this._decodeChar(e.charCodeAt(d+1)),u=this._decodeChar(e.charCodeAt(d+2)),i=this._decodeChar(e.charCodeAt(d+3)),o[a++]=f<<2|h>>>4,o[a++]=h<<4|u>>>2,o[a++]=u<<6|i,c|=f&s,c|=h&s,c|=u&s,c|=i&s;if(d<n-1&&(f=this._decodeChar(e.charCodeAt(d)),h=this._decodeChar(e.charCodeAt(d+1)),o[a++]=f<<2|h>>>4,c|=f&s,c|=h&s),d<n-2&&(u=this._decodeChar(e.charCodeAt(d+2)),o[a++]=h<<4|u>>>2,c|=u&s),d<n-3&&(i=this._decodeChar(e.charCodeAt(d+3)),o[a++]=u<<6|i,c|=i&s),c!==0)throw new Error("Base64Coder: incorrect characters for decoding");return o},r.prototype._encodeByte=function(e){var t=e;return t+=65,t+=25-e>>>8&0-65-26+97,t+=51-e>>>8&26-97-52+48,t+=61-e>>>8&52-48-62+43,t+=62-e>>>8&62-43-63+47,String.fromCharCode(t)},r.prototype._decodeChar=function(e){var t=s;return t+=(42-e&e-44)>>>8&-s+e-43+62,t+=(46-e&e-48)>>>8&-s+e-47+63,t+=(47-e&e-58)>>>8&-s+e-48+52,t+=(64-e&e-91)>>>8&-s+e-65+0,t+=(96-e&e-123)>>>8&-s+e-97+26,t},r.prototype._getPaddingLength=function(e){var t=0;if(this._paddingCharacter){for(var n=e.length-1;n>=0&&e[n]===this._paddingCharacter;n--)t++;if(e.length<4||t>2)throw new Error("Base64Coder: incorrect padding")}return t},r}();p.Coder=B;var C=new B;function q(r){return C.encode(r)}p.encode=q;function H(r){return C.decode(r)}p.decode=H;var k=function(r){W(e,r);function e(){return r!==null&&r.apply(this,arguments)||this}return e.prototype._encodeByte=function(t){var n=t;return n+=65,n+=25-t>>>8&0-65-26+97,n+=51-t>>>8&26-97-52+48,n+=61-t>>>8&52-48-62+45,n+=62-t>>>8&62-45-63+95,String.fromCharCode(n)},e.prototype._decodeChar=function(t){var n=s;return n+=(44-t&t-46)>>>8&-s+t-45+62,n+=(94-t&t-96)>>>8&-s+t-95+63,n+=(47-t&t-58)>>>8&-s+t-48+52,n+=(64-t&t-91)>>>8&-s+t-65+0,n+=(96-t&t-123)>>>8&-s+t-97+26,n},e}(B);p.URLSafeCoder=k;var D=new k;function M(r){return D.encode(r)}var V=p.encodeURLSafe=M;function G(r){return D.decode(r)}p.decodeURLSafe=G;p.encodedLength=function(r){return C.encodedLength(r)};p.maxDecodedLength=function(r){return C.maxDecodedLength(r)};p.decodedLength=function(r){return C.decodedLength(r)};function N(r){let e,t="Welcome to Secure Bookmark Warp Wallet",n,o,a="Drag me into tab bar",d,c,f="Data URL copied to clipboard. Paste it into your browser's address bar.",h,u;return{c(){e=y("h1"),e.textContent=t,n=x(),o=y("a"),o.textContent=a,d=x(),c=y("div"),c.textContent=f,h=x(),u=y("br"),this.h()},l(i){e=v(i,"H1",{["data-svelte-h"]:!0}),L(e)!=="svelte-prl4ax"&&(e.textContent=t),n=A(i),o=v(i,"A",{id:!0,class:!0,["data-svelte-h"]:!0}),L(o)!=="svelte-1quxaip"&&(o.textContent=a),d=A(i),c=v(i,"DIV",{id:!0,["data-svelte-h"]:!0}),L(c)!=="svelte-x55ntl"&&(c.textContent=f),h=A(i),u=v(i,"BR",{}),this.h()},h(){S(o,"id","el_link"),S(o,"class","installer"),S(c,"id","el_notification"),c.hidden=!0},m(i,l){_(i,e,l),_(i,n,l),_(i,o,l),r[2](o),_(i,d,l),_(i,c,l),r[3](c),_(i,h,l),_(i,u,l)},p:w,i:w,o:w,d(i){i&&(g(e),g(n),g(o),g(d),g(c),g(h),g(u)),r[2](null),r[3](null)}}}function Y(r,e,t){let n,o,a,d,c,f;T(async()=>{const i=await fetch("/wallet.js").then(m=>m.text());let l="SHA-256";const R=await crypto.subtle.digest(l,new TextEncoder().encode(i));c=new Uint8Array(R),f=l.toLowerCase().replace("-","")+`-${V(c)}`,n=window.location.origin+window.location.pathname.replace("index.html","").replace(/\/$/,""),o=`data:text/html,<script src="${n}/wallet.js" integrity="${f}" crossorigin><\/script><!--`,t(0,a.href=o,a);const P=/^((?!chrome|android).)*safari/i.test(navigator.userAgent),j=navigator.userAgent.toLowerCase().indexOf("android")>-1;if(P){t(0,a.textContent="Click to open app",a);return}if(t(0,a.onclick=m=>{m.preventDefault(),navigator.clipboard.writeText(o),t(1,d.hidden=!1,d),setTimeout(z=>t(1,d.hidden=!0,d),5e3)},a),j){t(0,a.textContent="Click to copy link",a);return}t(0,a.textContent="Drag me into tab bar",a)});function h(i){b[i?"unshift":"push"](()=>{a=i,t(0,a)})}function u(i){b[i?"unshift":"push"](()=>{d=i,t(1,d)})}return[a,d,h,u]}class K extends E{constructor(e){super(),I(this,e,Y,N,O,{})}}export{K as component};
