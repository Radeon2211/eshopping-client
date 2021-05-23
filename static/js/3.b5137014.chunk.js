(this["webpackJsonpeshopping-app-client"]=this["webpackJsonpeshopping-app-client"]||[]).push([[3],{346:function(e,n,t){"use strict";var r,i,a,c=t(0),s=t.n(c),o=t(18),l=t(7),d=t(6),u=t(22),h=Object(d.c)(u.a)(r||(r=Object(l.a)(["\n  padding-top: ",";\n\n  &:last-child {\n    padding-bottom: 0;\n  }\n"])),(function(e){return e.theme.spacings.level3})),p=d.c.div(i||(i=Object(l.a)(["\n  align-items: center;\n  display: flex;\n  flex: 1;\n\n  & > *:not(:last-child) {\n    margin-right: ",";\n  }\n\n  & .name {\n    flex: 2;\n    font-size: ",";\n\n    & > a {\n      transition: color ","s;\n\n      &:hover {\n        color: ",";\n      }\n    }\n  }\n\n  @media only screen and (max-width: 56.25em) {\n    align-items: start;\n    flex-direction: column;\n    justify-content: center;\n\n    & > *:not(:last-child) {\n      margin-right: 0;\n      margin-bottom: ",";\n    }\n\n    & .name {\n      flex: initial;\n    }\n  }\n"])),(function(e){return e.theme.spacings.level1}),(function(e){return e.theme.fontSizes.level3}),(function(e){return e.theme.durations.level1}),(function(e){return e.theme.colors.green}),(function(e){return e.theme.spacings.level1})),j=Object(d.c)(u.a)(a||(a=Object(l.a)(["\n  @media only screen and (max-width: 56.25em) {\n    flex: initial;\n  }\n"]))),m=t(19),b=t(77),f=t(13),O=t(5),g=t(1),v=s.a.memo((function(e){var n=e.data,t=e.orderId,r=n._id,i=n.name,a=n.price,c=n.quantity,s=n.photo,l=Object(O.j)(a*c);return Object(g.jsxs)(h,{spacing:"2","data-testid":"TransactionAndOrderProdItem",children:[Object(g.jsx)(o.Link,{to:"/product/".concat(r),"data-testid":"TransactionAndOrderProdItem-product-link-photo",children:Object(g.jsx)(b.a,{photo:s,alt:i,productId:r,width:"5",height:"5",orderId:t})}),Object(g.jsxs)(p,{children:[Object(g.jsx)("span",{className:"name",children:Object(g.jsx)(o.Link,{to:"/product/".concat(r),"data-testid":"TransactionAndOrderProdItem-product-link-name",children:i})}),Object(g.jsxs)(j,{justify:"space-between",align:"center",flex:"1",children:[Object(g.jsx)(f.a,{size:"2",color:m.a.colors.light4,"data-testid":"TransactionAndOrderProdItem-product-price-per-piece",children:"".concat(c," x ").concat(Object(O.d)(a))}),Object(g.jsx)(f.a,{size:"4",children:Object(O.d)(l)})]})]})]})}));v.defaultProps={orderId:""};n.a=v},347:function(e,n,t){"use strict";t.d(n,"a",(function(){return O}));var r,i=t(7),a=t(0),c=t(6),s=t(72),o=t(26);function l(){return(l=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}return e}).apply(this,arguments)}function d(e,n){if(null==e)return{};var t,r,i=function(e,n){if(null==e)return{};var t,r,i={},a=Object.keys(e);for(r=0;r<a.length;r++)t=a[r],n.indexOf(t)>=0||(i[t]=e[t]);return i}(e,n);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)t=a[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(i[t]=e[t])}return i}function u(e,n){var t=e.title,i=e.titleId,c=d(e,["title","titleId"]);return a.createElement("svg",l({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",width:24,height:24,ref:n,"aria-labelledby":i},c),t?a.createElement("title",{id:i},t):null,r||(r=a.createElement("path",{d:"M0 10h24v4H0z"})))}var h,p=a.forwardRef(u),j=(t.p,t(78)),m=t(19),b=t(1),f={};function O(e){var n=e.name,t=e.value,r=e.maxQuantity,i=e.incremented,a=e.decremented,c=e.changed,l=e.blured,d=e.focused;return Object(b.jsxs)(f.Wrapper,{children:[Object(b.jsx)("button",{type:"button",className:"button minus",disabled:t<=1,onClick:a,"data-testid":"ChooseQuantity-minus-btn","aria-label":"Decrease product quantity",children:Object(b.jsx)(o.a,{size:"small",color:t<=1?m.a.colors.light2:"","data-testid":"ChooseQuantity-minus-icon",children:Object(b.jsx)(p,{})})}),Object(b.jsx)(s.a,{name:n,size:"small",value:t,changed:c,blured:l,focused:d}),Object(b.jsx)("button",{type:"button",className:"button plus",disabled:t>=r,onClick:i,"data-testid":"ChooseQuantity-plus-btn","aria-label":"Increase product quantity",children:Object(b.jsx)(o.a,{size:"small",color:t>=r?m.a.colors.light2:"","data-testid":"ChooseQuantity-plus-icon",children:Object(b.jsx)(j.a,{})})})]})}f.Wrapper=c.c.div(h||(h=Object(i.a)(["\n  align-items: stretch;\n  display: flex;\n\n  & .button {\n    background-color: transparent;\n    border: 1px solid ",";\n    border-radius: 1px;\n    cursor: pointer;\n    outline: none;\n    padding: 0 ",";\n\n    &[disabled] {\n      cursor: default;\n    }\n\n    &.minus {\n      border-right: 0;\n    }\n\n    &.plus {\n      border-left: 0;\n    }\n  }\n"])),(function(e){return e.theme.colors.light4}),(function(e){return e.theme.spacings.level2})),O.defaultProps={focused:function(){}}},348:function(e,n,t){"use strict";t.d(n,"a",(function(){return c}));t(0);var r=t(22),i=t(13),a=(t(61),t(1));function c(e){var n=e.data,t=n.firstName,c=n.lastName,s=n.street,o=n.zipCode,l=n.city,d=n.country,u=n.phone,h=["".concat(t," ").concat(c),s,"".concat(o," ").concat(l),d,u];return Object(a.jsx)(r.a,{direction:"column",spacing:"1",children:h.map((function(e,n){return Object(a.jsx)(i.a,{size:"3",wordBreak:"break-all",children:e},n)}))})}},349:function(e,n,t){"use strict";t.d(n,"a",(function(){return u}));var r,i=t(16),a=t(7),c=t(0),s=t(6),o=t(76),l=t(1),d={};function u(e){var n=e.children,t=Object(c.useRef)(null);return Object(c.useEffect)((function(){t.current&&new IntersectionObserver((function(e){var n=Object(i.a)(e,1)[0];return n.target.classList.toggle("is-sticky",n.intersectionRatio<1)}),{threshold:[1]}).observe(t.current)}),[]),Object(l.jsx)(d.Wrapper,{ref:t,children:Object(l.jsx)(o.a,{children:n})})}d.Wrapper=s.c.section(r||(r=Object(a.a)(["\n  position: sticky;\n  top: calc(6.4rem + ",");\n  width: 100%;\n\n  & > *:first-child {\n    transition: padding ","s;\n  }\n\n  &.is-sticky {\n    border-top: 1px solid ",";\n  }\n\n  @media only screen and (max-width: 75em) {\n    bottom: -1px;\n    padding-bottom: 1px;\n\n    & > *:first-child {\n      padding: ",";\n      transition: width ","s;\n    }\n  }\n"])),(function(e){return e.theme.spacings.level3}),(function(e){return e.theme.durations.level2}),(function(e){return e.theme.colors.light3}),(function(e){return e.theme.spacings.level2}),(function(e){return e.theme.durations.level2}))},350:function(e,n,t){"use strict";t.d(n,"a",(function(){return s}));t(0);var r=t(22),i=t(13),a=t(5),c=t(1);function s(e){var n=e.value;return Object(c.jsxs)(r.a,{align:"center",justify:"center",wrap:"wrap",spacing:"1",children:[Object(c.jsx)(i.a,{size:"4",children:"To pay"}),Object(c.jsx)(i.a,{size:"6",spacing:"1px",children:Object(a.d)(n)})]})}},351:function(e,n,t){"use strict";t.d(n,"a",(function(){return A}));var r,i,a=t(8),c=t(16),s=t(7),o=t(0),l=t(4),d=t.n(l),u=t(6),h=t(18),p=t(346),j=t(9),m=t(11),b=u.c.div(r||(r=Object(s.a)(["\n  align-items: center;\n  display: flex;\n  flex-wrap: wrap;\n  padding: calc(1.5 * ",") 0;\n\n  &:not(:last-child) {\n    border-bottom: 1px solid ",";\n  }\n\n  &:last-child {\n    padding-bottom: 0;\n  }\n\n  & .photo-and-name {\n    align-items: center;\n    display: flex;\n  }\n\n  & .name {\n    font-size: ",";\n    margin-left: ",";\n    width: 31rem;\n\n    & > a {\n      transition: color ","s;\n\n      &:hover {\n        color: ",";\n      }\n    }\n  }\n\n  & .mobile-lower-row {\n    align-items: center;\n    display: flex;\n    justify-content: space-between;\n    flex: 1;\n  }\n\n  & .choose-quantity-box {\n    align-items: center;\n    display: flex;\n  }\n\n  & .price-box {\n    align-items: flex-end;\n    display: flex;\n    flex-direction: column;\n    height: ",";\n    justify-content: center;\n  }\n\n  & .remove-icon {\n    cursor: pointer;\n    justify-self: right;\n    margin-left: ",";\n    padding: calc(0.5 * ",");\n  }\n\n  @media only screen and (max-width: 56.25em) {\n    & .mobile-lower-row {\n      margin-top: ",";\n      min-width: 100%;\n      order: 1;\n    }\n\n    & .name {\n      width: auto;\n    }\n\n    & .remove-icon {\n      margin-left: auto;\n      padding-left: calc(\n        0.5 * "," + ","\n      );\n    }\n  }\n\n  @media only screen and (max-width: 37.5em) {\n    & .name {\n      margin-left: ",";\n    }\n  }\n"])),(function(e){return e.theme.spacings.level2}),(function(e){return e.theme.colors.light2}),(function(e){return e.theme.fontSizes.level3}),(function(e){return e.theme.spacings.level3}),(function(e){return e.theme.durations.level1}),(function(e){return e.theme.colors.green}),(function(e){return e.theme.spacings.level4}),(function(e){return e.theme.spacings.level2}),(function(e){return e.theme.spacings.level1}),(function(e){return e.theme.spacings.level2}),(function(e){return e.theme.spacings.level1}),(function(e){return e.theme.spacings.level1}),(function(e){return e.theme.spacings.level2})),f=t(347),O=t(2),g=t(5),v=t(26),x=t(13);function y(){return(y=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}return e}).apply(this,arguments)}function w(e,n){if(null==e)return{};var t,r,i=function(e,n){if(null==e)return{};var t,r,i={},a=Object.keys(e);for(r=0;r<a.length;r++)t=a[r],n.indexOf(t)>=0||(i[t]=e[t]);return i}(e,n);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)t=a[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(i[t]=e[t])}return i}function C(e,n){var t=e.title,r=e.titleId,a=w(e,["title","titleId"]);return o.createElement("svg",y({xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",ref:n,"aria-labelledby":r},a),t?o.createElement("title",{id:r},t):null,i||(i=o.createElement("path",{d:"M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z"})))}var k=o.forwardRef(C),I=(t.p,t(19)),R=t(77),z=t(61),E=t(1);function N(e){var n=e.data,t=e.isCartLoading,r=n._id,i=n.quantity,a=n.product,s=a._id,l=a.name,d=a.price,u=a.photo,p=a.quantity,y=Object(o.useState)(i),w=Object(c.a)(y,2),C=w[0],z=w[1],N=Object(o.useState)(!1),S=Object(c.a)(N,2),T=S[0],q=S[1],A=Object(j.b)(),P=Object(o.useCallback)((function(e,n,t){return A(m.G(e,n,t))}),[A]),L=Object(o.useCallback)((function(e){return A(m.x(e))}),[A]);Object(o.useEffect)((function(){z((function(e){return e===i||t||T?e:i}))}),[i,C,z,T,t]);return Object(E.jsxs)(b,{"data-testid":"CartItem",children:[Object(E.jsxs)("div",{className:"photo-and-name",children:[Object(E.jsx)(h.Link,{to:"/product/".concat(s),"data-testid":"CartItem-product-link-photo",children:Object(E.jsx)(R.a,{photo:u,alt:l,productId:s,width:"7",height:"7"})}),Object(E.jsx)("span",{className:"name",children:Object(E.jsx)(h.Link,{to:"/product/".concat(s),"data-testid":"CartItem-product-link-name",children:l})})]}),Object(E.jsxs)("div",{className:"mobile-lower-row",children:[Object(E.jsxs)("div",{className:"choose-quantity-box",children:[Object(E.jsx)(f.a,{maxQuantity:p,value:C,incremented:function(){z((function(e){return e<p?e+1:e})),P(r,O.x.INCREMENT)},decremented:function(){z((function(e){return e>0?e-1:e})),P(r,O.x.DECREMENT)},name:"quantity",changed:function(e){var n=+e.target.value||"";n||z(n),n<1||n>p||z(n)},blured:function(e){var n=+e.target.value;!n||n<1?(z(1),P(r,O.x.NUMBER,1)):n>p?(z(p),P(r,O.x.NUMBER,p)):n!==i&&P(r,O.x.NUMBER,n),q(!1)},focused:function(){return q(!0)}}),Object(E.jsx)(x.a,{size:"2",mgLeft:"1","data-testid":"CartItem-available-quantity",children:"of ".concat(p)})]}),Object(E.jsxs)("div",{className:"price-box",children:[Object(E.jsx)(x.a,{size:"5","data-testid":"CartItem-total-price",children:Object(g.d)(d*i)}),i>1&&Object(E.jsx)(x.a,{size:"2",textAlign:"right","data-testid":"CartItem-price-per-piece",children:"per piece ".concat(Object(g.d)(d))})]})]}),Object(E.jsx)(v.a,{size:"medium",color:I.a.colors.red,onClick:function(){return L(r)},className:"remove-icon","data-testid":"CartItem-trash-icon",children:Object(E.jsx)(k,{})})]})}var S,T=t(62),q={};function A(e){var n=e.items,t=e.type,r=e.isCartLoading,i=n.reduce((function(e,n){var r=t===O.i.CART?n.product.seller.username:n.seller.username;return e[r]||(e[r]={items:[],sellerUsername:r}),e[r].items.push(n),e}),{});return Object.entries(i).map((function(e){var n=Object(c.a)(e,2),t=n[0],r=n[1];return Object(a.a)({sellerUsername:t},r)})).map((function(e){var n=e.sellerUsername,i=e.items;return Object(E.jsxs)(q.SingleSeller,{"data-testid":"CartAndTransactionItems-item",children:[Object(E.jsxs)(x.a,{size:"3",display:"block",children:[Object(E.jsx)("span",{children:"seller "}),Object(E.jsx)(h.Link,{to:"/user/".concat(n,"?p=1"),"data-testid":"CartAndTransactionItems-item-seller-link",children:Object(E.jsx)(T.a,{children:n})})]}),t===O.i.CART?i.map((function(e){return Object(E.jsx)(N,{data:e,isCartLoading:r},e._id)})):i.map((function(e){return Object(E.jsx)(p.a,{data:e},e._id)}))]},n)}))}q.SingleSeller=u.c.div(S||(S=Object(s.a)(["\n  padding: "," 0;\n\n  &:not(:last-child) {\n    border-bottom: 1px solid ",";\n  }\n\n  &:last-child {\n    padding-bottom: 0;\n  }\n"])),(function(e){return e.theme.spacings.level3}),(function(e){return e.theme.colors.light3})),A.defaultProps={isCartLoading:void 0},A.propTypes={items:d.a.oneOfType([d.a.arrayOf(d.a.shape(z.a).isRequired),d.a.arrayOf(d.a.shape({_id:d.a.string.isRequired,name:d.a.string.isRequired,price:d.a.number.isRequired,quantity:d.a.number.isRequired,photo:d.a.bool.isRequired,seller:d.a.shape({username:d.a.string.isRequired}).isRequired}))]),type:d.a.oneOf([O.i.TRANSACTION,O.i.CART]).isRequired,isCartLoading:d.a.bool}},358:function(e,n,t){"use strict";t.r(n),t.d(n,"default",(function(){return x}));var r=t(0),i=t(9),a=t(27),c=t(11),s=t(31),o=t(22),l=t(76),d=t(349),u=t(2),h=t(25),p=t(17),j=t(348),m=t(1);function b(e){var n=e.onSetModal,t=Object(i.c)((function(e){return e.auth.deliveryAddress}));return Object(m.jsx)(l.a,{"data-testid":"DeliveryAddressSection",children:Object(m.jsxs)(o.a,{direction:"column",align:"start",spacing:"3",children:[Object(m.jsx)(h.a,{variant:"h4",children:"Delivery address"}),Object(m.jsx)(j.a,{data:t}),Object(m.jsx)(p.a,{clicked:function(){return n(u.m.CHANGE_DELIVERY_ADDRESS)},children:"Change address"})]})})}var f=t(350),O=t(351),g=t(5),v=t(115);function x(){var e=Object(a.k)(),n=Object(i.c)((function(e){return e.auth.transaction})),t=Object(i.b)(),j=Object(r.useCallback)((function(e){return t(c.B(e))}),[t]),x=Object(r.useCallback)((function(e){return t(c.F(e))}),[t]);Object(r.useEffect)((function(){Object(g.k)(),(!n||(null===n||void 0===n?void 0:n.length)<=0)&&e.replace("/cart");var t=e.listen((function(e){"/transaction"!==e.pathname&&x(void 0)}));return function(){t()}}),[e,n,x]);var y=null;if((null===n||void 0===n?void 0:n.length)>0){var w=n.reduce((function(e,n){return e+n.price*n.quantity}),0),C=Object(g.j)(w);y=Object(m.jsxs)(m.Fragment,{children:[Object(m.jsx)(h.a,{variant:"h3",children:"Transaction"}),Object(m.jsxs)(s.a,{proportion:"3/1",makeVerticalWhen:1200,children:[Object(m.jsxs)(o.a,{direction:"column",align:"stretch",spacing:"3",children:[Object(m.jsx)(b,{onSetModal:j}),Object(m.jsxs)(l.a,{children:[Object(m.jsx)(h.a,{variant:"h4",children:"Products"}),Object(m.jsx)(O.a,{items:n,type:u.i.TRANSACTION})]})]}),Object(m.jsx)(d.a,{children:Object(m.jsxs)(o.a,{direction:"column",spacing:"2",children:[Object(m.jsx)(f.a,{value:C}),Object(m.jsx)(p.a,{filled:!0,clicked:function(){return j(u.m.BUY_PRODUCTS)},children:"I buy and pay"})]})})]})]})}return Object(m.jsxs)(m.Fragment,{children:[Object(m.jsx)(v.a,{title:"Transaction summary - E-Shopping"}),y]})}}}]);