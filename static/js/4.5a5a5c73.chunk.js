(this["webpackJsonpeshopping-app-client"]=this["webpackJsonpeshopping-app-client"]||[]).push([[4],{222:function(e,n,t){"use strict";var r=t(4),a=t(0),c=t.n(a),i=t(3),l=t(79),o=t(19);function u(){return(u=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}return e}).apply(this,arguments)}function s(e,n){if(null==e)return{};var t,r,a=function(e,n){if(null==e)return{};var t,r,a={},c=Object.keys(e);for(r=0;r<c.length;r++)t=c[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(r=0;r<c.length;r++)t=c[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var m=c.a.createElement("path",{d:"M0 10h24v4H0z"}),f=function(e){var n=e.svgRef,t=e.title,r=s(e,["svgRef","title"]);return c.a.createElement("svg",u({viewBox:"0 0 24 24",width:24,height:24,ref:n},r),t?c.a.createElement("title",null,t):null,m)},d=c.a.forwardRef((function(e,n){return c.a.createElement(f,u({svgRef:n},e))})),p=(t.p,t(83)),v=t(43);function h(){var e=Object(r.a)(["\n  align-items: stretch;\n  display: flex;\n\n  & .button {\n    background-color: transparent;\n    border: 1px solid ",";\n    border-radius: 1px;\n    cursor: pointer;\n    outline: none;\n    padding: 0 ",";\n\n    &[disabled] {\n      cursor: default;\n    }\n\n    &.minus {\n      border-right: 0;\n    }\n\n    &.plus {\n      border-left: 0;\n    }\n  }\n"]);return h=function(){return e},e}var g={};g.Wrapper=i.c.div(h(),(function(e){return e.theme.colors.light4}),(function(e){return e.theme.spacings.level2}));var b=function(e){var n=e.name,t=e.value,r=e.maxQuantity,a=e.incremented,i=e.decremented,u=e.changed,s=e.blured,m=e.focused;return c.a.createElement(g.Wrapper,null,c.a.createElement("button",{type:"button",className:"button minus",disabled:t<=1,onClick:i},c.a.createElement(o.a,{size:"small",color:t<=1?v.a.colors.light2:""},c.a.createElement(d,null))),c.a.createElement(l.a,{name:n,size:"small",value:t,changed:u,blured:s,focused:m,focusable:!1}),c.a.createElement("button",{type:"button",className:"button plus",disabled:t>=r,onClick:a},c.a.createElement(o.a,{size:"small",color:t>=r?v.a.colors.light2:""},c.a.createElement(p.a,null))))};b.defaultProps={focused:function(){}};n.a=b},223:function(e,n,t){"use strict";var r=t(0),a=t.n(r),c=t(13),i=t(4),l=t(3),o=t(25);function u(){var e=Object(i.a)(["\n  @media only screen and (max-width: 56.25em) {\n    flex: initial;\n  }\n"]);return u=function(){return e},e}function s(){var e=Object(i.a)(["\n  align-items: center;\n  display: flex;\n  flex: 1;\n\n  & > *:not(:last-child) {\n    margin-right: ",";\n  }\n\n  & .name {\n    flex: 2;\n    font-size: ",";\n\n    & > a {\n      transition: color ","s;\n\n      &:hover {\n        color: ",";\n      }\n    }\n  }\n\n  & .overall-price {\n    font-size: ",";\n  }\n\n  & .price-per-piece {\n    font-size: ",";\n  }\n\n  @media only screen and (max-width: 56.25em) {\n    align-items: start;\n    flex-direction: column;\n    justify-content: center;\n\n    & > *:not(:last-child) {\n      margin-right: 0;\n      margin-bottom: ",";\n    }\n\n    & .name {\n      flex: initial;\n    }\n  }\n"]);return s=function(){return e},e}function m(){var e=Object(i.a)(["\n  padding-top: ",";\n\n  &:last-child {\n    padding-bottom: 0;\n  }\n"]);return m=function(){return e},e}var f=Object(l.c)(o.a)(m(),(function(e){return e.theme.spacings.level3})),d=l.c.div(s(),(function(e){return e.theme.spacings.level1}),(function(e){return e.theme.fontSizes.level3}),(function(e){return e.theme.durations.level1}),(function(e){return e.theme.colors.green}),(function(e){return e.theme.fontSizes.level4}),(function(e){return e.theme.fontSizes.level2}),(function(e){return e.theme.spacings.level1})),p=Object(l.c)(o.a)(u()),v=t(82),h=t(78),g=t(5),b=function(e){var n=e.data,t=e.orderId,r=n._id,i=n.name,l=n.price,o=n.quantity,u=n.photo,s=Object(g.h)(l*o);return a.a.createElement(f,null,a.a.createElement(c.Link,{to:"/product/".concat(r),"data-test":"product-link"},a.a.createElement(v.a,{photo:u,alt:i,productId:r,width:5,height:5,orderId:t})),a.a.createElement(d,null,a.a.createElement("span",{className:"name"},a.a.createElement(c.Link,{to:"/product/".concat(r),"data-test":"product-link"},i)),a.a.createElement(p,{justify:"space-between",align:"center",flex:"1"},a.a.createElement(h.b,{className:"price-per-piece"},"".concat(o," x ").concat(Object(g.c)(l))),a.a.createElement("span",{className:"overall-price"},Object(g.c)(s)))))};b.defaultProps={orderId:""};n.a=b},224:function(e,n,t){"use strict";var r=t(12),a=t(4),c=t(0),i=t.n(c),l=t(3),o=t(81);function u(){var e=Object(a.a)(["\n  position: sticky;\n  top: calc(6.5rem + ",");\n  width: 100%;\n\n  & > *:first-child {\n    transition: padding ","s;\n  }\n\n  &.is-sticky {\n    border-top: 1px solid ",";\n  }\n\n  @media only screen and (max-width: 75em) {\n    bottom: -1px;\n    padding-bottom: 1px;\n\n    & > *:first-child {\n      padding: ",";\n      transition: width ","s;\n    }\n  }\n"]);return u=function(){return e},e}var s={};s.Wrapper=l.c.section(u(),(function(e){return e.theme.spacings.level3}),(function(e){return e.theme.durations.level2}),(function(e){return e.theme.colors.light3}),(function(e){return e.theme.spacings.level2}),(function(e){return e.theme.durations.level2}));n.a=function(e){var n=e.children,t=Object(c.useRef)(null);return Object(c.useEffect)((function(){t.current&&new IntersectionObserver((function(e){var n=Object(r.a)(e,1)[0];return n.target.classList.toggle("is-sticky",n.intersectionRatio<1)}),{threshold:[1]}).observe(t.current)}),[]),i.a.createElement(s.Wrapper,{ref:t},i.a.createElement(o.a,null,n))}},225:function(e,n,t){"use strict";var r=t(4),a=t(0),c=t.n(a),i=t(3),l=t(25),o=t(5);function u(){var e=Object(r.a)(["\n  font-size: ",";\n\n  & .value {\n    font-size: ",";\n    letter-spacing: 1px;\n  }\n"]);return u=function(){return e},e}var s={};s.Wrapper=Object(i.c)(l.a)(u(),(function(e){return e.theme.fontSizes.level4}),(function(e){return e.theme.fontSizes.level6}));n.a=function(e){var n=e.value;return c.a.createElement(s.Wrapper,{align:"center",justify:"center",wrap:"wrap",spacing:"level1"},c.a.createElement("span",null,"To pay"),c.a.createElement("span",{className:"value"},Object(o.c)(n)))}},226:function(e,n,t){"use strict";var r=t(10),a=t(12),c=t(4),i=t(0),l=t.n(i),o=t(3),u=t(13),s=t(223),m=t(6),f=t(8);function d(){var e=Object(c.a)(["\n  align-items: center;\n  display: flex;\n  flex-wrap: wrap;\n  padding: calc(1.5 * ",") 0;\n\n  &:not(:last-child) {\n    border-bottom: 1px solid ",";\n  }\n\n  &:last-child {\n    padding-bottom: 0;\n  }\n\n  & .photo-and-name {\n    align-items: center;\n    display: flex;\n  }\n\n  & .name {\n    font-size: ",";\n    margin-left: ",";\n    width: 31rem;\n\n    & > a {\n      transition: color ","s;\n\n      &:hover {\n        color: ",";\n      }\n    }\n  }\n\n  & .mobile-lower-row {\n    align-items: center;\n    display: flex;\n    justify-content: space-between;\n    flex: 1;\n  }\n\n  & .choose-quantity-box {\n    align-items: center;\n    display: flex;\n  }\n\n  & .quantity-number {\n    font-size: ",";\n    margin-left: ",";\n  }\n\n  & .price-box {\n    align-items: flex-end;\n    display: flex;\n    flex-direction: column;\n    height: ",";\n    justify-content: center;\n  }\n\n  & .overall-price {\n    font-size: ",";\n  }\n\n  & .price-per-piece {\n    font-size: ",";\n    text-align: right;\n  }\n\n  & .remove-icon {\n    cursor: pointer;\n    justify-self: right;\n    margin-left: ",";\n    padding: calc(0.5 * ",");\n  }\n\n  @media only screen and (max-width: 56.25em) {\n    & .mobile-lower-row {\n      margin-top: ",";\n      min-width: 100%;\n      order: 1;\n    }\n\n    & .name {\n      width: auto;\n    }\n\n    & .remove-icon {\n      margin-left: auto;\n      padding-left: calc(\n        0.5 * "," + ","\n      );\n    }\n  }\n\n  @media only screen and (max-width: 37.5em) {\n    & .name {\n      margin-left: ",";\n    }\n  }\n"]);return d=function(){return e},e}var p=o.c.div(d(),(function(e){return e.theme.spacings.level2}),(function(e){return e.theme.colors.light2}),(function(e){return e.theme.fontSizes.level3}),(function(e){return e.theme.spacings.level3}),(function(e){return e.theme.durations.level1}),(function(e){return e.theme.colors.green}),(function(e){return e.theme.fontSizes.level2}),(function(e){return e.theme.spacings.level1}),(function(e){return e.theme.spacings.level4}),(function(e){return e.theme.fontSizes.level5}),(function(e){return e.theme.fontSizes.level2}),(function(e){return e.theme.spacings.level2}),(function(e){return e.theme.spacings.level1}),(function(e){return e.theme.spacings.level2}),(function(e){return e.theme.spacings.level1}),(function(e){return e.theme.spacings.level1}),(function(e){return e.theme.spacings.level2})),v=t(222),h=t(1),g=t(5),b=t(78),E=t(19);function y(){return(y=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}return e}).apply(this,arguments)}function O(e,n){if(null==e)return{};var t,r,a=function(e,n){if(null==e)return{};var t,r,a={},c=Object.keys(e);for(r=0;r<c.length;r++)t=c[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(r=0;r<c.length;r++)t=c[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var j=l.a.createElement("path",{d:"M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z"}),x=function(e){var n=e.svgRef,t=e.title,r=O(e,["svgRef","title"]);return l.a.createElement("svg",y({width:24,height:24,viewBox:"0 0 24 24",ref:n},r),t?l.a.createElement("title",null,t):null,j)},w=l.a.forwardRef((function(e,n){return l.a.createElement(x,y({svgRef:n},e))})),k=(t.p,t(43)),z=t(82),N=function(e){var n=e.data,t=e.isCartLoading,r=n._id,c=n.quantity,o=n.product,s=o._id,d=o.name,y=o.price,O=o.photo,j=o.quantity,x=Object(i.useState)(c),N=Object(a.a)(x,2),S=N[0],R=N[1],C=Object(i.useState)(!1),I=Object(a.a)(C,2),L=I[0],P=I[1],q=Object(m.b)(),T=Object(i.useCallback)((function(e,n,t){return q(f.y(e,n,t))}),[q]),U=Object(i.useCallback)((function(e){return q(f.u(e))}),[q]);Object(i.useEffect)((function(){R((function(e){return e===c||t||L?e:c}))}),[c,S,R,L,t]);return l.a.createElement(p,null,l.a.createElement("div",{className:"photo-and-name"},l.a.createElement(u.Link,{to:"/product/".concat(s),"data-test":"product-link"},l.a.createElement(z.a,{photo:O,alt:d,productId:s,width:7,height:7})),l.a.createElement("span",{className:"name"},l.a.createElement(u.Link,{to:"/product/".concat(s),"data-test":"product-link"},d))),l.a.createElement("div",{className:"mobile-lower-row"},l.a.createElement("div",{className:"choose-quantity-box"},l.a.createElement(v.a,{maxQuantity:j,value:S,incremented:function(){R((function(e){return e<j?e+1:e})),T(r,h.s.INCREMENT)},decremented:function(){R((function(e){return e>0?e-1:e})),T(r,h.s.DECREMENT)},name:"quantity",changed:function(e){var n=+e.target.value||"";n||R(n),n<1||n>j||R(n)},blured:function(e){var n=+e.target.value;!n||n<1?(R(1),T(r,h.s.NUMBER,1)):n>j?(R(j),T(r,h.s.NUMBER,j)):n!==c&&T(r,h.s.NUMBER,n),P(!1)},focused:function(){return P(!0)}}),l.a.createElement("span",{className:"quantity-number"},"of ".concat(j))),l.a.createElement("div",{className:"price-box"},l.a.createElement("span",{className:"overall-price"},Object(g.c)(y*c)),c>1&&l.a.createElement(b.b,{className:"price-per-piece"},"per piece ".concat(Object(g.c)(y))))),l.a.createElement(E.a,{size:"medium",color:k.a.colors.red,onClick:function(){return U(r)},className:"remove-icon"},l.a.createElement(w,null)))};function S(){var e=Object(c.a)(["\n  padding: "," 0;\n\n  &:not(:last-child) {\n    border-bottom: 1px solid ",";\n  }\n\n  &:last-child {\n    padding-bottom: 0;\n  }\n\n  & .seller {\n    font-size: ",";\n  }\n"]);return S=function(){return e},e}var R={};R.SingleSeller=o.c.div(S(),(function(e){return e.theme.spacings.level3}),(function(e){return e.theme.colors.light3}),(function(e){return e.theme.fontSizes.level3}));var C=function(e){var n=e.items,t=e.type,c=e.isCartLoading,i=n.reduce((function(e,n){var r=t===h.g.CART?n.product.seller.username:n.seller.username;return e[r]||(e[r]={items:[],sellerUsername:r}),e[r].items.push(n),e}),{});return Object.entries(i).map((function(e){var n=Object(a.a)(e,2),t=n[0],c=n[1];return Object(r.a)({sellerUsername:t},c)})).map((function(e){var n=e.sellerUsername,r=e.items;return l.a.createElement(R.SingleSeller,{key:n},l.a.createElement("div",{className:"seller"},l.a.createElement("span",null,"seller "),l.a.createElement(u.Link,{to:"/user/".concat(n,"?p=1"),"data-test":"user-link"},l.a.createElement(b.c,null,n))),t===h.g.CART?r.map((function(e){return l.a.createElement(N,{key:e._id,data:e,isCartLoading:c})})):r.map((function(e){return l.a.createElement(s.a,{key:e._id,data:e})})))}))};C.defaultProps={isCartLoading:void 0};n.a=C},233:function(e,n,t){"use strict";t.r(n);var r=t(0),a=t.n(r),c=t(6),i=t(24),l=t(8),o=t(29),u=t(25),s=t(81),m=t(224),f=t(1),d=t(20),p=t(15),v=t(78),h=function(){var e=Object(c.c)((function(e){return e.auth.deliveryAddress})),n=e.firstName,t=e.lastName,i=e.street,o=e.zipCode,m=e.city,h=e.country,g=e.phone,b=Object(c.b)(),E=Object(r.useCallback)((function(e,n){return b(l.v(e,n))}),[b]),y=["".concat(n," ").concat(t),i,"".concat(o," ").concat(m),h,g];return a.a.createElement(s.a,null,a.a.createElement(u.a,{direction:"column",align:"start"},a.a.createElement(d.a,{variant:"h4"},"Delivery address"),a.a.createElement(u.a,{direction:"column",spacing:"level1"},y.map((function(e,n){return a.a.createElement(v.e,{key:n},e)}))),a.a.createElement(p.a,{clicked:function(){return E(!0,f.k.CHANGE_DELIVERY_ADDRESS)}},"Change address")))},g=t(225),b=t(226),E=t(5);n.default=function(){var e=Object(i.k)(),n=Object(c.c)((function(e){return e.auth.transaction})),t=Object(c.b)(),v=Object(r.useCallback)((function(e,n){return t(l.v(e,n))}),[t]);Object(r.useEffect)((function(){(!n||(null===n||void 0===n?void 0:n.length)<=0)&&(e.length>2?e.goBack():e.replace("/cart"))}),[e,n]);var y=null;if((null===n||void 0===n?void 0:n.length)>0){var O=n.reduce((function(e,n){return e+n.price*n.quantity}),0),j=Object(E.h)(O);y=a.a.createElement(a.a.Fragment,null,a.a.createElement(d.a,{variant:"h3"},"Transaction"),a.a.createElement(o.a,{proportion:"3/1",makeVerticalWhen:1200},a.a.createElement(u.a,{direction:"column",align:"stretch"},a.a.createElement(h,null),a.a.createElement(s.a,null,a.a.createElement(d.a,{variant:"h4"},"Products"),a.a.createElement(b.a,{items:n,type:f.g.TRANSACTION}))),a.a.createElement(m.a,null,a.a.createElement(u.a,{direction:"column",spacing:"level2"},a.a.createElement(g.a,{value:j}),a.a.createElement(p.a,{filled:!0,clicked:function(){return v(!0,f.k.BUY_PRODUCTS)}},"I buy and pay")))))}return y}}}]);