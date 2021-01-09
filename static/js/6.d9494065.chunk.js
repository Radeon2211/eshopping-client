(this["webpackJsonpeshopping-app-client"]=this["webpackJsonpeshopping-app-client"]||[]).push([[6],{222:function(e,n,t){"use strict";var a=t(4),r=t(0),l=t.n(r),c=t(3),i=t(79),o=t(19);function u(){return(u=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var a in t)Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a])}return e}).apply(this,arguments)}function s(e,n){if(null==e)return{};var t,a,r=function(e,n){if(null==e)return{};var t,a,r={},l=Object.keys(e);for(a=0;a<l.length;a++)t=l[a],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,n);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(a=0;a<l.length;a++)t=l[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var d=l.a.createElement("path",{d:"M0 10h24v4H0z"}),m=function(e){var n=e.svgRef,t=e.title,a=s(e,["svgRef","title"]);return l.a.createElement("svg",u({viewBox:"0 0 24 24",width:24,height:24,ref:n},a),t?l.a.createElement("title",null,t):null,d)},f=l.a.forwardRef((function(e,n){return l.a.createElement(m,u({svgRef:n},e))})),p=(t.p,t(83)),v=t(43);function h(){var e=Object(a.a)(["\n  align-items: stretch;\n  display: flex;\n\n  & .button {\n    background-color: transparent;\n    border: 1px solid ",";\n    border-radius: 1px;\n    cursor: pointer;\n    outline: none;\n    padding: 0 ",";\n\n    &[disabled] {\n      cursor: default;\n    }\n\n    &.minus {\n      border-right: 0;\n    }\n\n    &.plus {\n      border-left: 0;\n    }\n  }\n"]);return h=function(){return e},e}var b={};b.Wrapper=c.c.div(h(),(function(e){return e.theme.colors.light4}),(function(e){return e.theme.spacings.level2}));var g=function(e){var n=e.name,t=e.value,a=e.maxQuantity,r=e.incremented,c=e.decremented,u=e.changed,s=e.blured,d=e.focused;return l.a.createElement(b.Wrapper,null,l.a.createElement("button",{type:"button",className:"button minus",disabled:t<=1,onClick:c},l.a.createElement(o.a,{size:"small",color:t<=1?v.a.colors.light2:""},l.a.createElement(f,null))),l.a.createElement(i.a,{name:n,size:"small",value:t,changed:u,blured:s,focused:d,focusable:!1}),l.a.createElement("button",{type:"button",className:"button plus",disabled:t>=a,onClick:r},l.a.createElement(o.a,{size:"small",color:t>=a?v.a.colors.light2:""},l.a.createElement(p.a,null))))};g.defaultProps={focused:function(){}};n.a=g},230:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),l=t(64),c=t(13),i=t(6),o=t(1),u=t(8),s=t(4),d=t(3);function m(){var e=Object(s.a)(["\n  & .photo-section {\n    align-items: center;\n    display: flex;\n    height: 45rem;\n    justify-content: center;\n    margin-right: ",";\n    padding: "," ",";\n    width: 100%;\n  }\n\n  & .photo {\n    object-fit: cover;\n    max-height: 100%;\n    max-width: 100%;\n  }\n\n  & .data-section {\n    align-self: stretch;\n    display: flex;\n    flex-direction: column;\n  }\n\n  & .seller {\n    font-size: ",";\n    margin-top: ",";\n  }\n\n  & .condition {\n    font-size: ",";\n    margin-top: ",";\n  }\n\n  & .price {\n    font-size: ",";\n    letter-spacing: 1px;\n    margin: "," 0;\n  }\n\n  & .quantity-sold {\n    font-size: ",";\n    margin-bottom: ",";\n  }\n\n  & .description-content {\n    font-size: ",";\n    line-height: 1.35;\n  }\n\n  @media only screen and (max-width: 56.25em) {\n    & .photo-section {\n      margin-right: ",";\n    }\n  }\n"]);return m=function(){return e},e}var f=d.c.div(m(),(function(e){return e.theme.spacings.level5}),(function(e){return e.theme.spacings.level1}),(function(e){return e.theme.spacings.level2}),(function(e){return e.theme.fontSizes.level2}),(function(e){return e.theme.spacings.level2}),(function(e){return e.theme.fontSizes.level2}),(function(e){return e.theme.spacings.level2}),(function(e){return e.theme.fontSizes.level6}),(function(e){return e.theme.spacings.level3}),(function(e){return e.theme.fontSizes.level2}),(function(e){return e.theme.spacings.level3}),(function(e){return e.theme.fontSizes.level3}),(function(e){return e.theme.spacings.level3})),p=t(58),v=t(81),h=t(20),b=t(29),g=t(12),E=t(24);function y(){var e=Object(s.a)(["\n  display: flex;\n  flex-direction: column;\n\n  & > button:not(:last-child) {\n    margin-bottom: ",";\n  }\n\n  & .choose-quantity-box {\n    align-items: center;\n    margin-bottom: ",";\n    display: flex;\n  }\n\n  & .quantity-number {\n    font-size: ",";\n    margin-left: ",";\n  }\n\n  & .quantity-info {\n    font-size: ",";\n  }\n"]);return y=function(){return e},e}var O=d.c.div(y(),(function(e){return e.theme.spacings.level2}),(function(e){return e.theme.spacings.level3}),(function(e){return e.theme.fontSizes.level2}),(function(e){return e.theme.spacings.level1}),(function(e){return e.theme.fontSizes.level2})),j=t(15),k=t(222),x=t(78),z=function(e){var n=e.productId,t=e.productQuantity,l=e.productSellerId,s=e.onSetModal,d=e.userProfile,m=Object(E.k)(),f=Object(a.useState)(1),p=Object(g.a)(f,2),v=p[0],b=p[1],y=Object(i.c)((function(e){return e.auth.cart})),z=Object(i.c)((function(e){return e.ui.isCartLoading})),S=Object(i.b)(),q=Object(a.useCallback)((function(e){return S(u.a(e))}),[S]),N=Object(a.useCallback)((function(e,n){return S(u.q(e,n))}),[S]),w=r.a.createElement(r.a.Fragment,null,r.a.createElement("span",{className:"quantity-info gray-text"},"Quantity: ".concat(t)),r.a.createElement(h.a,{variant:"h4",mgTop:"level3","data-test":"info-to-seller"},"You are the seller of this product"));if((null===d||void 0===d?void 0:d._id)!==l){var C,P,I=null;y&&(I=y.find((function(e){return e.product._id===n})));var T=r.a.createElement(j.a,{filled:!0,stretch:!0,clicked:function(){d?q({quantity:v,product:n}):s(!0,o.k.LOGIN)},isLoading:z},"Add to cart");(null===(C=I)||void 0===C?void 0:C.quantity)>=t&&(T=r.a.createElement(h.a,{variant:"h4",align:"center",mgBottom:"level2","data-test":"not-able-to-add"},"You have added all pieces to\xa0",r.a.createElement(c.Link,{to:"/cart"},r.a.createElement(x.c,null,"cart")))),w=r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"choose-quantity-box"},r.a.createElement(k.a,{name:"quantity",maxQuantity:t,value:v,incremented:function(){v<t&&b((function(e){return e+1}))},decremented:function(){v>1&&b((function(e){return e-1}))},changed:function(e){var n=+e.target.value||"";n&&(n<1||n>t)||b(n)},blured:function(e){var n=+e.target.value;b(!n||n<1?1:n>t?t:n)}}),r.a.createElement("span",{className:"quantity-number"},"of ".concat(t," piece").concat(t>1?"s":""),r.a.createElement(x.b,null,I?" (".concat(null===(P=I)||void 0===P?void 0:P.quantity," in cart)"):""))),T,r.a.createElement(j.a,{filled:!0,stretch:!0,clicked:function(){d?N(m,{product:n,quantity:v}):s(!0,o.k.LOGIN)},isLoading:z},"buy now"))}return r.a.createElement(O,null,w)};z.defaultProps={productSellerId:void 0,userProfile:null};var S=z,q=t(109),N=t.n(q),w=t(14),C=t(25),P=t(5);n.default=function(e){var n=e.match.params.id,t=Object(l.a)(),s=Object(i.c)((function(e){return e.auth.profile})),d=Object(i.c)((function(e){return e.product.productDetails})),m=Object(i.b)(),g=Object(a.useCallback)((function(e){return m(u.n(e))}),[m]),E=Object(a.useCallback)((function(){return m(u.x())}),[m]),y=Object(a.useCallback)((function(e,n){return m(u.v(e,n))}),[m]);Object(a.useEffect)((function(){return g(n),function(){return E()}}),[n,g,E]);var O=r.a.createElement(p.a,{align:"center"});if(null===d)O=r.a.createElement(h.a,{variant:"h4",align:"center","data-test":"not-found"},"Such product does not exist or has already been sold");else if(d){var k=d.condition,z=d.description,q=d.name,I=d.photo,T=d.price,_=d.quantity,L=d.quantitySold,D=d.buyerQuantity,Q=d.seller,R=d._id,B="not_applicable"!==k?k:"not applicable",M=null;L>=1&&(M=r.a.createElement(x.b,{className:"quantity-sold"},1===D?"1 person":"".concat(D," people")," bought ",L," ",1===L?"unit":"units"));var U=r.a.createElement(h.a,{variant:"h4",mgTop:"level3","data-test":"no-description"},"This product has no description");z&&(U=r.a.createElement("section",null,r.a.createElement(h.a,{variant:"h4",mgBottom:"level2",mgTop:"level3"},"Description"),r.a.createElement("p",{className:"description-content"},z)));var W=(null===s||void 0===s?void 0:s._id)===Q._id,A=null,F=null;W&&(A=r.a.createElement(j.a,{color:"blue",clicked:function(){return y(!0,o.k.EDIT_PRODUCT)},"data-test":"edit-button"},"Edit offer")),(W||(null===s||void 0===s?void 0:s.isAdmin))&&(F=r.a.createElement(j.a,{color:"red",clicked:function(){return y(!0,o.k.DELETE_PRODUCT)},"data-test":"delete-button"},"Delete offer"));var G=null;(F||A)&&(G=r.a.createElement(C.a,{mgTop:"level5",justify:"center"},A,F)),O=r.a.createElement(v.a,null,r.a.createElement(f,null,r.a.createElement(b.a,{proportion:t<=900?"1/1":"3/2",makeVerticalWhen:600},r.a.createElement("section",{className:"photo-section"},r.a.createElement("img",{src:I?"".concat(w.a,"/products/").concat(R,"/photo"):N.a,alt:"product",className:"photo"})),r.a.createElement("section",{className:"data-section"},r.a.createElement(h.a,{variant:"h4"},q),r.a.createElement("span",{className:"seller"},r.a.createElement(x.b,null,"from "),r.a.createElement(c.Link,{to:"/user/".concat(Q.username,"?p=1")},r.a.createElement(x.c,null,Q.username))),r.a.createElement("span",{className:"condition"},r.a.createElement(x.b,null,"Condition: "),"".concat(B.slice(0,1).toUpperCase()).concat(B.slice(1))),r.a.createElement("span",{className:"price"},Object(P.c)(T)),M,r.a.createElement(S,{productId:n,productQuantity:_,productSellerId:Q._id,onSetModal:y,userProfile:s}))),U,G))}return O}}}]);