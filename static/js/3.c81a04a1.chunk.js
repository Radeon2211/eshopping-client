(this["webpackJsonpeshopping-app-client"]=this["webpackJsonpeshopping-app-client"]||[]).push([[3],{359:function(e,n,t){"use strict";t(0);var r,i,c,a=t(16),s=t(9),o=t(8),l=t(21),d=Object(o.c)(l.a)(r||(r=Object(s.a)(["\n  padding-top: ",";\n\n  &:last-child {\n    padding-bottom: 0;\n  }\n"])),(function(e){return e.theme.spacings.level3})),u=o.c.div(i||(i=Object(s.a)(["\n  align-items: center;\n  display: flex;\n  flex: 1;\n\n  & > *:not(:last-child) {\n    margin-right: ",";\n  }\n\n  & .name {\n    flex: 2;\n    font-size: ",";\n\n    & > a {\n      transition: color ","s;\n\n      &:hover {\n        color: ",";\n      }\n    }\n  }\n\n  @media only screen and (max-width: 56.25em) {\n    align-items: start;\n    flex-direction: column;\n    justify-content: center;\n\n    & > *:not(:last-child) {\n      margin-right: 0;\n      margin-bottom: ",";\n    }\n\n    & .name {\n      flex: initial;\n    }\n  }\n"])),(function(e){return e.theme.spacings.level1}),(function(e){return e.theme.fontSizes.level3}),(function(e){return e.theme.durations.level1}),(function(e){return e.theme.colors.green}),(function(e){return e.theme.spacings.level1})),h=Object(o.c)(l.a)(c||(c=Object(s.a)(["\n  @media only screen and (max-width: 56.25em) {\n    flex: initial;\n  }\n"]))),j=t(22),p=t(69),b=t(12),m=t(4),f=t(1),O=function(e){var n=e.data,t=e.orderId,r=n._id,i=n.name,c=n.price,s=n.quantity,o=n.photo,l=Object(m.j)(c*s);return Object(f.jsxs)(d,{spacing:"2","data-testid":"TransactionAndOrderProdItem",children:[Object(f.jsx)(a.Link,{to:"/product/".concat(r),"data-testid":"TransactionAndOrderProdItem-product-link-photo",children:Object(f.jsx)(p.a,{photo:o,alt:i,productId:r,width:"5",height:"5",orderId:t})}),Object(f.jsxs)(u,{children:[Object(f.jsx)("span",{className:"name",children:Object(f.jsx)(a.Link,{to:"/product/".concat(r),"data-testid":"TransactionAndOrderProdItem-product-link-name",children:i})}),Object(f.jsxs)(h,{justify:"space-between",align:"center",flex:"1",children:[Object(f.jsx)(b.a,{size:"2",color:j.a.colors.light4,"data-testid":"TransactionAndOrderProdItem-product-price-per-piece",children:"".concat(s," x ").concat(Object(m.d)(c))}),Object(f.jsx)(b.a,{size:"4",children:Object(m.d)(l)})]})]})]})};O.defaultProps={orderId:""};n.a=O},360:function(e,n,t){"use strict";var r,i=t(9),c=t(0),a=t(8),s=t(65),o=t(24);function l(){return(l=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}return e}).apply(this,arguments)}function d(e,n){if(null==e)return{};var t,r,i=function(e,n){if(null==e)return{};var t,r,i={},c=Object.keys(e);for(r=0;r<c.length;r++)t=c[r],n.indexOf(t)>=0||(i[t]=e[t]);return i}(e,n);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(r=0;r<c.length;r++)t=c[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(i[t]=e[t])}return i}function u(e,n){var t=e.title,i=e.titleId,a=d(e,["title","titleId"]);return c.createElement("svg",l({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",width:24,height:24,ref:n,"aria-labelledby":i},a),t?c.createElement("title",{id:i},t):null,r||(r=c.createElement("path",{d:"M0 10h24v4H0z"})))}var h,j=c.forwardRef(u),p=(t.p,t(70)),b=t(22),m=t(1),f={};f.Wrapper=a.c.div(h||(h=Object(i.a)(["\n  align-items: stretch;\n  display: flex;\n\n  & .button {\n    background-color: transparent;\n    border: 1px solid ",";\n    border-radius: 1px;\n    cursor: pointer;\n    outline: none;\n    padding: 0 ",";\n\n    &[disabled] {\n      cursor: default;\n    }\n\n    &.minus {\n      border-right: 0;\n    }\n\n    &.plus {\n      border-left: 0;\n    }\n  }\n"])),(function(e){return e.theme.colors.light4}),(function(e){return e.theme.spacings.level2}));var O=function(e){var n=e.name,t=e.value,r=e.maxQuantity,i=e.incremented,c=e.decremented,a=e.changed,l=e.blured,d=e.focused;return Object(m.jsxs)(f.Wrapper,{children:[Object(m.jsx)("button",{type:"button",className:"button minus",disabled:t<=1,onClick:c,"data-testid":"ChooseQuantity-minus-btn","aria-label":"Decrease product quantity",children:Object(m.jsx)(o.a,{size:"small",color:t<=1?b.a.colors.light2:"","data-testid":"ChooseQuantity-minus-icon",children:Object(m.jsx)(j,{})})}),Object(m.jsx)(s.a,{name:n,size:"small",value:t,changed:a,blured:l,focused:d}),Object(m.jsx)("button",{type:"button",className:"button plus",disabled:t>=r,onClick:i,"data-testid":"ChooseQuantity-plus-btn","aria-label":"Increase product quantity",children:Object(m.jsx)(o.a,{size:"small",color:t>=r?b.a.colors.light2:"","data-testid":"ChooseQuantity-plus-icon",children:Object(m.jsx)(p.a,{})})})]})};O.defaultProps={focused:function(){}};n.a=O},361:function(e,n,t){"use strict";t(0);var r=t(21),i=t(12),c=t(1);n.a=function(e){var n=e.data,t=n.firstName,a=n.lastName,s=n.street,o=n.zipCode,l=n.city,d=n.country,u=n.phone,h=["".concat(t," ").concat(a),s,"".concat(o," ").concat(l),d,u];return Object(c.jsx)(r.a,{direction:"column",spacing:"1",children:h.map((function(e,n){return Object(c.jsx)(i.a,{size:"3",wordBreak:"break-all",children:e},n)}))})}},362:function(e,n,t){"use strict";var r,i=t(15),c=t(9),a=t(0),s=t(8),o=t(68),l=t(1),d={};d.Wrapper=s.c.section(r||(r=Object(c.a)(["\n  position: sticky;\n  top: calc(6.4rem + ",");\n  width: 100%;\n\n  & > *:first-child {\n    transition: padding ","s;\n  }\n\n  &.is-sticky {\n    border-top: 1px solid ",";\n  }\n\n  @media only screen and (max-width: 75em) {\n    bottom: -1px;\n    padding-bottom: 1px;\n\n    & > *:first-child {\n      padding: ",";\n      transition: width ","s;\n    }\n  }\n"])),(function(e){return e.theme.spacings.level3}),(function(e){return e.theme.durations.level2}),(function(e){return e.theme.colors.light3}),(function(e){return e.theme.spacings.level2}),(function(e){return e.theme.durations.level2}));n.a=function(e){var n=e.children,t=Object(a.useRef)(null);return Object(a.useEffect)((function(){t.current&&new IntersectionObserver((function(e){var n=Object(i.a)(e,1)[0];return n.target.classList.toggle("is-sticky",n.intersectionRatio<1)}),{threshold:[1]}).observe(t.current)}),[]),Object(l.jsx)(d.Wrapper,{ref:t,children:Object(l.jsx)(o.a,{children:n})})}},363:function(e,n,t){"use strict";t(0);var r=t(21),i=t(12),c=t(4),a=t(1);n.a=function(e){var n=e.value;return Object(a.jsxs)(r.a,{align:"center",justify:"center",wrap:"wrap",spacing:"1",children:[Object(a.jsx)(i.a,{size:"4",children:"To pay"}),Object(a.jsx)(i.a,{size:"6",spacing:"1px",children:Object(c.d)(n)})]})}},364:function(e,n,t){"use strict";var r,i,c=t(7),a=t(15),s=t(9),o=t(0),l=t(8),d=t(16),u=t(359),h=t(6),j=t(10),p=l.c.div(r||(r=Object(s.a)(["\n  align-items: center;\n  display: flex;\n  flex-wrap: wrap;\n  padding: calc(1.5 * ",") 0;\n\n  &:not(:last-child) {\n    border-bottom: 1px solid ",";\n  }\n\n  &:last-child {\n    padding-bottom: 0;\n  }\n\n  & .photo-and-name {\n    align-items: center;\n    display: flex;\n  }\n\n  & .name {\n    font-size: ",";\n    margin-left: ",";\n    width: 31rem;\n\n    & > a {\n      transition: color ","s;\n\n      &:hover {\n        color: ",";\n      }\n    }\n  }\n\n  & .mobile-lower-row {\n    align-items: center;\n    display: flex;\n    justify-content: space-between;\n    flex: 1;\n  }\n\n  & .choose-quantity-box {\n    align-items: center;\n    display: flex;\n  }\n\n  & .price-box {\n    align-items: flex-end;\n    display: flex;\n    flex-direction: column;\n    height: ",";\n    justify-content: center;\n  }\n\n  & .remove-icon {\n    cursor: pointer;\n    justify-self: right;\n    margin-left: ",";\n    padding: calc(0.5 * ",");\n  }\n\n  @media only screen and (max-width: 56.25em) {\n    & .mobile-lower-row {\n      margin-top: ",";\n      min-width: 100%;\n      order: 1;\n    }\n\n    & .name {\n      width: auto;\n    }\n\n    & .remove-icon {\n      margin-left: auto;\n      padding-left: calc(\n        0.5 * "," + ","\n      );\n    }\n  }\n\n  @media only screen and (max-width: 37.5em) {\n    & .name {\n      margin-left: ",";\n    }\n  }\n"])),(function(e){return e.theme.spacings.level2}),(function(e){return e.theme.colors.light2}),(function(e){return e.theme.fontSizes.level3}),(function(e){return e.theme.spacings.level3}),(function(e){return e.theme.durations.level1}),(function(e){return e.theme.colors.green}),(function(e){return e.theme.spacings.level4}),(function(e){return e.theme.spacings.level2}),(function(e){return e.theme.spacings.level1}),(function(e){return e.theme.spacings.level2}),(function(e){return e.theme.spacings.level1}),(function(e){return e.theme.spacings.level1}),(function(e){return e.theme.spacings.level2})),b=t(360),m=t(2),f=t(4),O=t(24),g=t(12);function v(){return(v=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}return e}).apply(this,arguments)}function x(e,n){if(null==e)return{};var t,r,i=function(e,n){if(null==e)return{};var t,r,i={},c=Object.keys(e);for(r=0;r<c.length;r++)t=c[r],n.indexOf(t)>=0||(i[t]=e[t]);return i}(e,n);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(r=0;r<c.length;r++)t=c[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(i[t]=e[t])}return i}function y(e,n){var t=e.title,r=e.titleId,c=x(e,["title","titleId"]);return o.createElement("svg",v({xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",ref:n,"aria-labelledby":r},c),t?o.createElement("title",{id:r},t):null,i||(i=o.createElement("path",{d:"M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z"})))}var w,k=o.forwardRef(y),C=(t.p,t(22)),I=t(69),z=t(1),E=function(e){var n=e.data,t=e.isCartLoading,r=n._id,i=n.quantity,c=n.product,s=c._id,l=c.name,u=c.price,v=c.photo,x=c.quantity,y=Object(o.useState)(i),w=Object(a.a)(y,2),E=w[0],N=w[1],S=Object(o.useState)(!1),T=Object(a.a)(S,2),A=T[0],P=T[1],R=Object(h.b)(),L=Object(o.useCallback)((function(e,n,t){return R(j.G(e,n,t))}),[R]),q=Object(o.useCallback)((function(e){return R(j.x(e))}),[R]);Object(o.useEffect)((function(){N((function(e){return e===i||t||A?e:i}))}),[i,E,N,A,t]);return Object(z.jsxs)(p,{"data-testid":"CartItem",children:[Object(z.jsxs)("div",{className:"photo-and-name",children:[Object(z.jsx)(d.Link,{to:"/product/".concat(s),"data-testid":"CartItem-product-link-photo",children:Object(z.jsx)(I.a,{photo:v,alt:l,productId:s,width:"7",height:"7"})}),Object(z.jsx)("span",{className:"name",children:Object(z.jsx)(d.Link,{to:"/product/".concat(s),"data-testid":"CartItem-product-link-name",children:l})})]}),Object(z.jsxs)("div",{className:"mobile-lower-row",children:[Object(z.jsxs)("div",{className:"choose-quantity-box",children:[Object(z.jsx)(b.a,{maxQuantity:x,value:E,incremented:function(){N((function(e){return e<x?e+1:e})),L(r,m.w.INCREMENT)},decremented:function(){N((function(e){return e>0?e-1:e})),L(r,m.w.DECREMENT)},name:"quantity",changed:function(e){var n=+e.target.value||"";n||N(n),n<1||n>x||N(n)},blured:function(e){var n=+e.target.value;!n||n<1?(N(1),L(r,m.w.NUMBER,1)):n>x?(N(x),L(r,m.w.NUMBER,x)):n!==i&&L(r,m.w.NUMBER,n),P(!1)},focused:function(){return P(!0)}}),Object(z.jsx)(g.a,{size:"2",mgLeft:"1","data-testid":"CartItem-available-quantity",children:"of ".concat(x)})]}),Object(z.jsxs)("div",{className:"price-box",children:[Object(z.jsx)(g.a,{size:"5","data-testid":"CartItem-total-price",children:Object(f.d)(u*i)}),i>1&&Object(z.jsx)(g.a,{size:"2",textAlign:"right","data-testid":"CartItem-price-per-piece",children:"per piece ".concat(Object(f.d)(u))})]})]}),Object(z.jsx)(O.a,{size:"medium",color:C.a.colors.red,onClick:function(){return q(r)},className:"remove-icon","data-testid":"CartItem-trash-icon",children:Object(z.jsx)(k,{})})]})},N=t(56),S={};S.SingleSeller=l.c.div(w||(w=Object(s.a)(["\n  padding: "," 0;\n\n  &:not(:last-child) {\n    border-bottom: 1px solid ",";\n  }\n\n  &:last-child {\n    padding-bottom: 0;\n  }\n"])),(function(e){return e.theme.spacings.level3}),(function(e){return e.theme.colors.light3}));var T=function(e){var n=e.items,t=e.type,r=e.isCartLoading,i=n.reduce((function(e,n){var r=t===m.i.CART?n.product.seller.username:n.seller.username;return e[r]||(e[r]={items:[],sellerUsername:r}),e[r].items.push(n),e}),{});return Object.entries(i).map((function(e){var n=Object(a.a)(e,2),t=n[0],r=n[1];return Object(c.a)({sellerUsername:t},r)})).map((function(e){var n=e.sellerUsername,i=e.items;return Object(z.jsxs)(S.SingleSeller,{"data-testid":"CartAndTransactionItems-item",children:[Object(z.jsxs)(g.a,{size:"3",display:"block",children:[Object(z.jsx)("span",{children:"seller "}),Object(z.jsx)(d.Link,{to:"/user/".concat(n,"?p=1"),"data-testid":"CartAndTransactionItems-item-seller-link",children:Object(z.jsx)(N.a,{children:n})})]}),t===m.i.CART?i.map((function(e){return Object(z.jsx)(E,{data:e,isCartLoading:r},e._id)})):i.map((function(e){return Object(z.jsx)(u.a,{data:e},e._id)}))]},n)}))};T.defaultProps={isCartLoading:void 0};n.a=T},371:function(e,n,t){"use strict";t.r(n);var r=t(0),i=t(6),c=t(26),a=t(10),s=t(29),o=t(21),l=t(68),d=t(362),u=t(2),h=t(25),j=t(17),p=t(361),b=t(1),m=function(e){var n=e.onSetModal,t=Object(i.c)((function(e){return e.auth.deliveryAddress}));return Object(b.jsx)(l.a,{"data-testid":"DeliveryAddressSection",children:Object(b.jsxs)(o.a,{direction:"column",align:"start",spacing:"3",children:[Object(b.jsx)(h.a,{variant:"h4",children:"Delivery address"}),Object(b.jsx)(p.a,{data:t}),Object(b.jsx)(j.a,{clicked:function(){return n(u.m.CHANGE_DELIVERY_ADDRESS)},children:"Change address"})]})})},f=t(363),O=t(364),g=t(4),v=t(109);n.default=function(){var e=Object(c.k)(),n=Object(i.c)((function(e){return e.auth.transaction})),t=Object(i.b)(),p=Object(r.useCallback)((function(e){return t(a.B(e))}),[t]),x=Object(r.useCallback)((function(e){return t(a.F(e))}),[t]);Object(r.useEffect)((function(){Object(g.k)(),(!n||(null===n||void 0===n?void 0:n.length)<=0)&&e.replace("/cart");var t=e.listen((function(e){"/transaction"!==e.pathname&&x(void 0)}));return function(){t()}}),[e,n,x]);var y=null;if((null===n||void 0===n?void 0:n.length)>0){var w=n.reduce((function(e,n){return e+n.price*n.quantity}),0),k=Object(g.j)(w);y=Object(b.jsxs)(b.Fragment,{children:[Object(b.jsx)(h.a,{variant:"h3",children:"Transaction"}),Object(b.jsxs)(s.a,{proportion:"3/1",makeVerticalWhen:1200,children:[Object(b.jsxs)(o.a,{direction:"column",align:"stretch",spacing:"3",children:[Object(b.jsx)(m,{onSetModal:p}),Object(b.jsxs)(l.a,{children:[Object(b.jsx)(h.a,{variant:"h4",children:"Products"}),Object(b.jsx)(O.a,{items:n,type:u.i.TRANSACTION})]})]}),Object(b.jsx)(d.a,{children:Object(b.jsxs)(o.a,{direction:"column",spacing:"2",children:[Object(b.jsx)(f.a,{value:k}),Object(b.jsx)(j.a,{filled:!0,clicked:function(){return p(u.m.BUY_PRODUCTS)},children:"I buy and pay"})]})})]})]})}return Object(b.jsxs)(b.Fragment,{children:[Object(b.jsx)(v.a,{title:"Transaction summary - E-Shopping"}),y]})}}}]);