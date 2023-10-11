(this["webpackJsonpeshopping-app-client"]=this["webpackJsonpeshopping-app-client"]||[]).push([[6],{346:function(e,n,t){"use strict";var c,a,r,i=t(0),s=t.n(i),o=t(18),l=t(7),d=t(6),u=t(22),j=Object(d.c)(u.a)(c||(c=Object(l.a)(["\n  padding-top: ",";\n\n  &:last-child {\n    padding-bottom: 0;\n  }\n"])),(function(e){return e.theme.spacings.level3})),h=d.c.div(a||(a=Object(l.a)(["\n  align-items: center;\n  display: flex;\n  flex: 1;\n\n  & > *:not(:last-child) {\n    margin-right: ",";\n  }\n\n  & .name {\n    flex: 2;\n    font-size: ",";\n\n    & > a {\n      transition: color ","s;\n\n      &:hover {\n        color: ",";\n      }\n    }\n  }\n\n  @media only screen and (max-width: 56.25em) {\n    align-items: start;\n    flex-direction: column;\n    justify-content: center;\n\n    & > *:not(:last-child) {\n      margin-right: 0;\n      margin-bottom: ",";\n    }\n\n    & .name {\n      flex: initial;\n    }\n  }\n"])),(function(e){return e.theme.spacings.level1}),(function(e){return e.theme.fontSizes.level3}),(function(e){return e.theme.durations.level1}),(function(e){return e.theme.colors.green}),(function(e){return e.theme.spacings.level1})),b=Object(d.c)(u.a)(r||(r=Object(l.a)(["\n  @media only screen and (max-width: 56.25em) {\n    flex: initial;\n  }\n"]))),O=t(19),p=t(77),m=t(13),x=t(5),f=t(1),v=s.a.memo((function(e){var n=e.data,t=e.orderId,c=n._id,a=n.name,r=n.price,i=n.quantity,s=n.photo,l=Object(x.j)(r*i);return Object(f.jsxs)(j,{spacing:"2","data-testid":"TransactionAndOrderProdItem",children:[Object(f.jsx)(o.Link,{to:"/product/".concat(c),"data-testid":"TransactionAndOrderProdItem-product-link-photo",children:Object(f.jsx)(p.a,{photo:s,alt:a,productId:c,width:"5",height:"5",orderId:t})}),Object(f.jsxs)(h,{children:[Object(f.jsx)("span",{className:"name",children:Object(f.jsx)(o.Link,{to:"/product/".concat(c),"data-testid":"TransactionAndOrderProdItem-product-link-name",children:a})}),Object(f.jsxs)(b,{justify:"space-between",align:"center",flex:"1",children:[Object(f.jsx)(m.a,{size:"2",color:O.a.colors.light4,"data-testid":"TransactionAndOrderProdItem-product-price-per-piece",children:"".concat(i," x ").concat(Object(x.d)(r))}),Object(f.jsx)(m.a,{size:"4",children:Object(x.d)(l)})]})]})]})}));v.defaultProps={orderId:""};n.a=v},354:function(e,n,t){"use strict";t.r(n),t.d(n,"default",(function(){return ie}));var c,a,r,i,s,o=t(8),l=t(0),d=t(9),u=t(18),j=t(27),h=t(7),b=t(6),O=b.c.div(c||(c=Object(h.a)(["\n  & .nav {\n    background-color: ",";\n    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);\n    left: 0;\n    padding-bottom: ",";\n    position: fixed;\n    top: 6.2rem;\n    width: 100%;\n    z-index: ",";\n  }\n\n  & .nav-list {\n    display: flex;\n    justify-content: center;\n    list-style: none;\n  }\n\n  & .nav-link {\n    border-bottom: 2px solid transparent;\n    display: block;\n    font-size: ",";\n    letter-spacing: 1px;\n    padding: ",";\n    text-transform: uppercase;\n    transition: all ","s;\n\n    &:hover {\n      color: ",";\n    }\n  }\n\n  & .nav-link-active {\n    border-bottom: 2px solid ",";\n    color: ",";\n    cursor: default;\n\n    &:hover {\n      color: ",";\n    }\n  }\n\n  @media only screen and (max-width: 37.5em) {\n    & .nav {\n      top: 10.8rem;\n    }\n\n    & .nav-list {\n      justify-content: center;\n    }\n  }\n\n  @media only screen and (max-width: 24.5em) {\n    & .nav-link {\n      letter-spacing: 0;\n    }\n  }\n\n  @media only screen and (max-width: 22.5em) {\n    & .nav-link {\n      font-size: ",";\n      padding: ",";\n    }\n  }\n"])),(function(e){return e.theme.colors.light1}),(function(e){return e.theme.spacings.level1}),(function(e){return e.theme.zIndexes.level3}),(function(e){return e.theme.fontSizes.level2}),(function(e){return e.theme.spacings.level2}),(function(e){return e.theme.durations.level1}),(function(e){return e.theme.colors.green}),(function(e){return e.theme.colors.blue}),(function(e){return e.theme.colors.blue}),(function(e){return e.theme.colors.blue}),(function(e){return e.theme.fontSizes.level1}),(function(e){return e.theme.spacings.level1})),p=b.c.div(a||(a=Object(h.a)(["\n  ","\n"])),(function(e){var n=e.extraMargin,t=e.theme;return n?"\n        margin-top: ".concat(t.spacings.level5,";\n      "):""})),m=b.c.div(r||(r=Object(h.a)(["\n  max-width: 100%;\n  margin: 0 auto;\n  width: 80rem;\n"]))),x=b.c.div(i||(i=Object(h.a)(["\n  display: grid;\n  grid-gap: ",";\n  grid-template-columns: repeat(3, 1fr);\n\n  & .change-passwd-btn {\n    grid-area: 3 / 2 / 3 / 3;\n  }\n\n  & .actions {\n    grid-column: 1 / -1;\n  }\n\n  @media only screen and (max-width: 37.5em) {\n    grid-template-columns: repeat(2, 1fr);\n\n    & .change-passwd-btn {\n      grid-area: 4 / 1 / 4 / 3;\n    }\n\n    & .actions > * {\n      flex: 1;\n    }\n  }\n"])),(function(e){return e.theme.spacings.level3})),f=(Object(b.c)(u.Link)(s||(s=Object(h.a)(["\n  @media only screen and (max-width: 37.5em) {\n    & > * {\n      width: 100%;\n    }\n  }\n"]))),t(11)),v=t(2),g=t(76),y=t(22),k=t(25),E=t(17),A=t(13),N=t(1);function C(e){var n=e.name,t=e.content,c=e.clickHandler,a="";a=n===v.t.ADDRESS?Object(N.jsx)(y.a,{direction:"column",spacing:"1",children:t.map((function(e,n){return Object(N.jsx)(A.a,{size:"3",wordBreak:"break-all",children:e},n)}))}):n===v.t.CONTACTS?Object(N.jsxs)(y.a,{direction:"column",spacing:"1",children:[Object(N.jsxs)(A.a,{size:"3",wordBreak:"break-all",children:["Email:\xa0",t.email?"visible":"hidden"]}),Object(N.jsxs)(A.a,{size:"3",wordBreak:"break-all",children:["Phone number:\xa0",t.phone?"visible":"hidden"]})]}):Object(N.jsx)(A.a,{size:"3",wordBreak:"break-all",children:t});var r=null;return c&&(r=Object(N.jsx)(E.a,{clicked:c,"data-testid":"SingleInfo-".concat(n,"-btn"),children:"Change"})),Object(N.jsxs)(y.a,{direction:"column",spacing:"2",align:"start","data-testid":"SingleInfo-".concat(n),children:[Object(N.jsx)(k.a,{variant:"h4",children:n}),a,r]})}C.defaultProps={clickHandler:void 0};var S=t(5),D=t(115);function L(e){var n=e.history,t=Object(d.c)((function(e){return e.auth.profile})),c=Object(d.b)(),a=Object(l.useCallback)((function(e){return c(f.B(e))}),[c]);Object(l.useEffect)((function(){Object(S.k)()}),[]);var r=null,i=null;if(t){var s=t.firstName,o=t.lastName,u=t.username,j=t.email,h=t.street,b=t.zipCode,O=t.city,p=t.country,m=t.phone,L=t.contacts,w=t.status,z=t.isAdmin,M=w===v.z.ACTIVE,P=null;z&&(P=Object(N.jsxs)(y.a,{spacing:"3",className:"actions",justify:"center","data-testid":"MyData-admin-content",children:[Object(N.jsx)(E.a,{clicked:function(){return a(v.m.ADD_ADMIN)},children:"Add admin"}),Object(N.jsx)(E.a,{color:"red",clicked:function(){return a(v.m.REMOVE_ADMIN)},children:"Remove admin"})]}));var T=null;M||(T=Object(N.jsxs)(y.a,{spacing:"3",justify:"center",className:"actions","data-testid":"MyData-pending-user-actions",children:[Object(N.jsx)(E.a,{clicked:function(){return a(v.m.SEND_VERIFICATION_LINK)},children:"Send verification link"}),Object(N.jsx)(E.a,{clicked:function(){return n.push("/logout")},children:"Logout"})]})),r=Object(N.jsxs)(N.Fragment,{children:[Object(N.jsx)(C,{name:v.t.USERNAME,content:u}),Object(N.jsx)(C,{name:v.t.NAME,content:"".concat(s," ").concat(o),clickHandler:M?function(){return a(v.m.CHANGE_NAME)}:null}),Object(N.jsx)(C,{name:v.t.EMAIL,content:j,clickHandler:M?function(){return a(v.m.CHANGE_EMAIL)}:null}),Object(N.jsx)(C,{name:v.t.ADDRESS,content:[h,"".concat(b," ").concat(O),p],clickHandler:M?function(){return a(v.m.CHANGE_ADDRESS)}:null}),Object(N.jsx)(C,{name:v.t.CONTACTS,content:L,clickHandler:M?function(){return a(v.m.CHANGE_CONTACTS)}:null}),Object(N.jsx)(C,{name:v.t.PHONE_NUMBER,content:m,clickHandler:M?function(){return a(v.m.CHANGE_PHONE_NUMBER)}:null}),T,Object(N.jsxs)(y.a,{spacing:"3",className:"actions",justify:"center",children:[M&&Object(N.jsx)(E.a,{clicked:function(){return a(v.m.CHANGE_PASSWORD)},children:"Change password"}),Object(N.jsx)(E.a,{color:"red",clicked:function(){return a(v.m.DELETE_ACCOUNT)},children:"Delete account"})]}),P]}),M||(i=Object(N.jsx)(g.a,{"data-testid":"MyData-pending-user-content",children:Object(N.jsx)(A.a,{size:"3",lineHeight:"5",children:"You need to activate your account to unlock all app functionalities. Verification link is active for 10 minutes. You can resend it below. If you do not activate your account within 1 hour, account will be deleted permanently."})}))}return Object(N.jsxs)(N.Fragment,{children:[Object(N.jsx)(D.a,{title:"Your account data - E-Shopping",description:"Check out your account informations"}),Object(N.jsx)(k.a,{variant:"h3",children:"My data"}),Object(N.jsxs)(y.a,{direction:"column",spacing:"3",children:[i,Object(N.jsx)(g.a,{children:Object(N.jsx)(x,{children:r})})]})]})}var w=t(52),z=t(116);function M(e){var n=e.userProfile,t=e.location.search,c=Object(w.useLastLocation)(),a=Object(d.c)((function(e){return e.ui.productsPerPage})),r=Object(d.b)(),i=Object(l.useCallback)((function(e,n){return r(f.q(e,n))}),[r]);return Object(l.useEffect)((function(){i(t,v.p.MY_PRODUCTS),(null===c||void 0===c?void 0:c.pathname.startsWith("/product/"))||Object(S.k)()}),[t,i,a,n,c]),Object(N.jsxs)(N.Fragment,{children:[Object(N.jsx)(D.a,{title:"Your offers - E-Shopping",description:"Check out your offers"}),Object(N.jsx)(k.a,{variant:"h3",children:"My products"}),Object(N.jsx)(z.a,{page:v.p.MY_PRODUCTS})]})}var P,T,I=t(4),R=t.n(I),_=t(157),H=t(156),Y=b.c.div(P||(P=Object(h.a)(["\n  position: relative;\n"]))),B=b.c.div(T||(T=Object(h.a)(["\n  padding: "," 0;\n  border-bottom: 1px solid ",";\n\n  &:first-child {\n    padding-top: 0;\n  }\n"])),(function(e){return e.theme.spacings.level3}),(function(e){return e.theme.colors.light3})),G=t(19),U=t(62),V=t(346),W=t(63),q=t(61);function F(e){var n=e.orders,t=e.orderType,c=Object(d.c)((function(e){return e.ui.isDataLoading})),a=n.map((function(e){var n,c,a=t===v.n.PLACED_ORDERS?null===(n=e.seller)||void 0===n?void 0:n.username:null===(c=e.buyer)||void 0===c?void 0:c.username,r=t===v.n.PLACED_ORDERS?"seller ":"buyer ";return Object(N.jsxs)(B,{children:[Object(N.jsxs)(y.a,{justify:"space-between",align:"flex-end",spacing:"3",children:[Object(N.jsxs)(A.a,{size:"3",children:[Object(N.jsx)("span",{children:r}),a?Object(N.jsx)(u.Link,{to:"/user/".concat(a,"?p=1"),"data-testid":"OrderList-user-link",children:Object(N.jsx)(U.a,{children:a})}):Object(N.jsx)(A.a,{fStyle:"italic","data-testid":"OrderList-account-deleted",children:"(account has been deleted)"})]}),Object(N.jsx)(A.a,{size:"2",children:Object(S.c)(e.createdAt)})]}),e.products.map((function(n){return Object(N.jsx)(V.a,{data:n,orderId:e._id},n._id)})),Object(N.jsxs)(y.a,{mgTop:"3",justify:"space-between",align:"center",spacing:"3",children:[Object(N.jsx)(u.Link,{to:"/order/".concat(e._id),"data-testid":"OrderList-order-details-link",children:Object(N.jsx)(E.a,{children:"details"})}),Object(N.jsxs)("div",{children:[Object(N.jsx)(A.a,{size:"3",mgRight:"1",spacing:"1px",color:G.a.colors.light4,children:"TOTAL"}),Object(N.jsx)(A.a,{size:"5",children:Object(S.d)(e.overallPrice)})]})]})]},e._id)})),r=c?Object(N.jsx)(W.a,{}):null;return Object(N.jsxs)(Y,{children:[a,r]})}var J,Q=t(16),K=t(64),X=t(37),Z=t.n(X),$={};$.Wrapper=b.c.div(J||(J=Object(h.a)(["\n  align-items: center;\n  display: flex;\n  flex: 1;\n  margin-right: ",";\n\n  & .label {\n    font-size: ",";\n    margin-right: ",";\n  }\n\n  & .select {\n    font-size: ",";\n    flex: 1;\n    max-width: 22rem;\n    z-index: ",";\n  }\n"])),(function(e){return e.theme.spacings.level2}),(function(e){return e.theme.fontSizes.level3}),(function(e){return e.theme.spacings.level2}),(function(e){return e.theme.fontSizes.level2}),(function(e){return e.theme.zIndexes.level2}));var ee={control:function(e){return Object(o.a)(Object(o.a)({},e),{},{minHeight:"25px"})},dropdownIndicator:function(e){return Object(o.a)(Object(o.a)({},e),{},{padding:"0.6rem"})}};function ne(){var e=Object(l.useState)(v.v[0]),n=Object(Q.a)(e,2),t=n[0],c=n[1],a=Object(j.k)(),r=a.location,i=r.search,s=r.pathname;return Object(N.jsxs)($.Wrapper,{children:[Object(N.jsx)("label",{htmlFor:"sortOption",className:"label",children:"Sort"}),Object(N.jsx)(K.a,{options:v.v,value:t,onChange:function(e){if(e.value!==t.value){c(e);var n=Object(S.g)(i);n.sortBy=e.value;var r=Z.a.stringify(n);a.replace("".concat(s,"?").concat(r))}},isSearchable:!1,styles:ee,id:"sortOption",className:"select"})]})}var te=t(55);function ce(e){var n=e.orders,t=e.type,c=Object(j.l)().search,a=Object(d.c)((function(e){return e.auth.orderCount})),r=Object(d.b)(),i=Object(l.useCallback)((function(e,n){return r(f.n(e,n))}),[r]);Object(l.useEffect)((function(){i(c,t)}),[i,t,c]);var s=Object(N.jsx)(te.a,{align:"center"});return null===n?s=Object(N.jsx)(k.a,{variant:"h4",align:"center","data-testid":"Orders-error",children:t===v.n.PLACED_ORDERS?"There is a problem to fetch your placed orders":"There is a problem to fetch your sell history"}):n&&(n.length<=0?s=Object(N.jsx)(k.a,{variant:"h4",align:"center","data-testid":"Orders-no-orders-info",children:t===v.n.PLACED_ORDERS?"You don't have any placed orders yet":"Your sell history is empty"}):a>0&&(s=Object(N.jsxs)(g.a,{children:[Object(N.jsxs)(U.b,{children:[Object(N.jsx)(ne,{}),Object(N.jsx)(_.a,{itemQuantity:a,quantityPerPage:v.d})]}),Object(N.jsx)(F,{orders:n,orderType:t}),Object(N.jsx)(H.a,{itemQuantity:a,itemsType:v.j.ORDER,quantityPerPage:v.d})]}))),s}function ae(){var e=Object(w.useLastLocation)(),n=Object(d.c)((function(e){return e.auth.sellHistory}));return Object(l.useEffect)((function(){(null===e||void 0===e?void 0:e.pathname.startsWith("/order/"))||Object(S.k)()}),[e]),Object(N.jsxs)(m,{children:[Object(N.jsx)(D.a,{title:"Your sell history - E-Shopping",description:"Check out your sell history"}),Object(N.jsx)(k.a,{variant:"h3",children:"My sell history"}),Object(N.jsx)(ce,{orders:n,type:v.n.SELL_HISTORY})]})}function re(){var e=Object(w.useLastLocation)(),n=Object(d.c)((function(e){return e.auth.placedOrders}));return Object(l.useEffect)((function(){(null===e||void 0===e?void 0:e.pathname.startsWith("/order/"))||Object(S.k)()}),[e]),Object(N.jsxs)(m,{children:[Object(N.jsx)(D.a,{title:"Your placed orders - E-Shopping",description:"Check out orders that you placed"}),Object(N.jsx)(k.a,{variant:"h3",children:"My placed orders"}),Object(N.jsx)(ce,{orders:n,type:v.n.PLACED_ORDERS})]})}function ie(){var e=Object(d.c)((function(e){return e.auth.profile})),n=null;e.status===v.z.ACTIVE&&(n=Object(N.jsx)("nav",{className:"nav","data-testid":"MyAccount-navigation",children:Object(N.jsxs)("ul",{className:"nav-list",children:[Object(N.jsx)("li",{children:Object(N.jsx)(u.NavLink,{to:"/my-account/data",className:"nav-link",activeClassName:"nav-link-active","data-testid":"MyAccount-data-link",children:"Data"})}),Object(N.jsx)("li",{children:Object(N.jsx)(u.NavLink,{to:"/my-account".concat(v.b),className:"nav-link",activeClassName:"nav-link-active","data-testid":"MyAccount-products-link",children:"Products"})}),Object(N.jsx)("li",{children:Object(N.jsx)(u.NavLink,{to:"/my-account/sell-history?p=1",className:"nav-link",activeClassName:"nav-link-active","data-testid":"MyAccount-sell-history-link",children:"Sell history"})}),Object(N.jsx)("li",{children:Object(N.jsx)(u.NavLink,{to:"/my-account/placed-orders?p=1",className:"nav-link",activeClassName:"nav-link-active","data-testid":"MyAccount-placed-orders-link",children:"Placed orders"})})]})}));var t=Object(N.jsx)(p,{extraMargin:!1,"data-testid":"MyAccount-pending-user-routes",children:Object(N.jsxs)(j.g,{children:[Object(N.jsx)(j.d,{path:"/my-account/data",exact:!0,component:L}),Object(N.jsx)(j.c,{to:"/my-account/data"})]})});return e.status===v.z.ACTIVE&&(t=Object(N.jsx)(p,{extraMargin:!0,"data-testid":"MyAccount-active-user-routes",children:Object(N.jsxs)(j.g,{children:[Object(N.jsx)(j.d,{path:"/my-account/data",exact:!0,component:L}),Object(N.jsx)(j.d,{path:"/my-account/products",exact:!0,render:function(n){return Object(N.jsx)(M,Object(o.a)({userProfile:e},n))}}),Object(N.jsx)(j.d,{path:"/my-account/sell-history",exact:!0,component:ae}),Object(N.jsx)(j.d,{path:"/my-account/placed-orders",exact:!0,component:re}),Object(N.jsx)(j.c,{to:"/my-account/data"})]})})),Object(N.jsxs)(O,{children:[n,t]})}ce.propTypes={orders:R.a.arrayOf(R.a.shape(q.b)),type:R.a.string.isRequired}}}]);
//# sourceMappingURL=6.f1fc0735.chunk.js.map