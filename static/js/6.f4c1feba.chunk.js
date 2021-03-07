(this["webpackJsonpeshopping-app-client"]=this["webpackJsonpeshopping-app-client"]||[]).push([[6],{228:function(e,n,t){"use strict";var a=t(0),r=t.n(a),c=t(14),l=t(6),i=t(5),o=t(22);function u(){var e=Object(l.a)(["\n  @media only screen and (max-width: 56.25em) {\n    flex: initial;\n  }\n"]);return u=function(){return e},e}function s(){var e=Object(l.a)(["\n  align-items: center;\n  display: flex;\n  flex: 1;\n\n  & > *:not(:last-child) {\n    margin-right: ",";\n  }\n\n  & .name {\n    flex: 2;\n    font-size: ",";\n\n    & > a {\n      transition: color ","s;\n\n      &:hover {\n        color: ",";\n      }\n    }\n  }\n\n  @media only screen and (max-width: 56.25em) {\n    align-items: start;\n    flex-direction: column;\n    justify-content: center;\n\n    & > *:not(:last-child) {\n      margin-right: 0;\n      margin-bottom: ",";\n    }\n\n    & .name {\n      flex: initial;\n    }\n  }\n"]);return s=function(){return e},e}function m(){var e=Object(l.a)(["\n  padding-top: ",";\n\n  &:last-child {\n    padding-bottom: 0;\n  }\n"]);return m=function(){return e},e}var d=Object(i.c)(o.a)(m(),(function(e){return e.theme.spacings.level3})),f=i.c.div(s(),(function(e){return e.theme.spacings.level1}),(function(e){return e.theme.fontSizes.level3}),(function(e){return e.theme.durations.level1}),(function(e){return e.theme.colors.green}),(function(e){return e.theme.spacings.level1})),p=Object(i.c)(o.a)(u()),E=t(19),v=t(82),h=t(9),g=t(2),b=function(e){var n=e.data,t=e.orderId,a=n._id,l=n.name,i=n.price,o=n.quantity,u=n.photo,s=Object(g.j)(i*o);return r.a.createElement(d,{spacing:"2","data-testid":"TransactionAndOrderProdItem"},r.a.createElement(c.Link,{to:"/product/".concat(a),"data-testid":"TransactionAndOrderProdItem-product-link-photo"},r.a.createElement(v.a,{photo:u,alt:l,productId:a,width:"5",height:"5",orderId:t})),r.a.createElement(f,null,r.a.createElement("span",{className:"name"},r.a.createElement(c.Link,{to:"/product/".concat(a),"data-testid":"TransactionAndOrderProdItem-product-link-name"},l)),r.a.createElement(p,{justify:"space-between",align:"center",flex:"1"},r.a.createElement(h.a,{size:"2",color:E.a.colors.light4},"".concat(o," x ").concat(Object(g.d)(i))),r.a.createElement(h.a,{size:"4"},Object(g.d)(s)))))};b.defaultProps={orderId:""};n.a=b},235:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),c=t(4),l=t(14),i=t(26),o=t(6),u=t(5);function s(){var e=Object(o.a)(["\n  max-width: 100%;\n  margin: 0 auto;\n  width: 80rem;\n"]);return s=function(){return e},e}function m(){var e=Object(o.a)(["\n  ","\n"]);return m=function(){return e},e}function d(){var e=Object(o.a)(["\n  & .nav {\n    background-color: ",";\n    position: fixed;\n    top: 6.2rem;\n    left: 0;\n    width: 100%;\n    padding-bottom: ",";\n    z-index: ",";\n  }\n\n  & .nav-list {\n    display: flex;\n    justify-content: center;\n    list-style: none;\n  }\n\n  & .nav-link {\n    border-bottom: 2px solid transparent;\n    display: block;\n    font-size: ",";\n    letter-spacing: 1px;\n    padding: ",";\n    text-transform: uppercase;\n    transition: all ","s;\n\n    &:hover {\n      color: ",";\n    }\n  }\n\n  & .nav-link-active {\n    border-bottom: 2px solid ",";\n    color: ",";\n    cursor: default;\n\n    &:hover {\n      color: ",";\n    }\n  }\n\n  @media only screen and (max-width: 37.5em) {\n    & .nav {\n      top: 10.8rem;\n    }\n\n    & .nav-list {\n      justify-content: center;\n    }\n  }\n\n  @media only screen and (max-width: 24.5em) {\n    & .nav-link {\n      letter-spacing: 0;\n    }\n  }\n\n  @media only screen and (max-width: 22.5em) {\n    & .nav-link {\n      font-size: ",";\n      padding: ",";\n    }\n  }\n"]);return d=function(){return e},e}var f=u.c.div(d(),(function(e){return e.theme.colors.light1}),(function(e){return e.theme.spacings.level1}),(function(e){return e.theme.zIndexes.level3}),(function(e){return e.theme.fontSizes.level2}),(function(e){return e.theme.spacings.level2}),(function(e){return e.theme.durations.level1}),(function(e){return e.theme.colors.green}),(function(e){return e.theme.colors.blue}),(function(e){return e.theme.colors.blue}),(function(e){return e.theme.colors.blue}),(function(e){return e.theme.fontSizes.level1}),(function(e){return e.theme.spacings.level1})),p=u.c.div(m(),(function(e){var n=e.extraMargin,t=e.theme;return n?"\n        margin-top: ".concat(t.spacings.level5,";\n      "):""})),E=u.c.div(s());function v(){var e=Object(o.a)(["\n  @media only screen and (max-width: 37.5em) {\n    & > * {\n      width: 100%;\n    }\n  }\n"]);return v=function(){return e},e}function h(){var e=Object(o.a)(["\n  display: grid;\n  grid-gap: ",";\n  grid-template-columns: repeat(3, 1fr);\n\n  & .change-passwd-btn {\n    grid-area: 3 / 2 / 3 / 3;\n  }\n\n  & .actions {\n    grid-column: 1 / -1;\n  }\n\n  @media only screen and (max-width: 37.5em) {\n    grid-template-columns: repeat(2, 1fr);\n\n    & .change-passwd-btn {\n      grid-area: 4 / 1 / 4 / 3;\n    }\n\n    & .actions > * {\n      flex: 1;\n    }\n  }\n"]);return h=function(){return e},e}var g=u.c.div(h(),(function(e){return e.theme.spacings.level3})),b=(Object(u.c)(l.Link)(v()),t(7)),y=t(1),k=t(81),O=t(22),j=t(21),N=t(15),x=t(9),A=function(e){var n=e.name,t=e.content,a=e.clickHandler,c="";c=n===y.o.ADDRESS?r.a.createElement(O.a,{direction:"column",spacing:"1"},t.map((function(e,n){return r.a.createElement(x.a,{key:n,size:"3",wordBreak:"break-all"},e)}))):n===y.o.CONTACTS?r.a.createElement(O.a,{direction:"column",spacing:"1"},r.a.createElement(x.a,{size:"3",wordBreak:"break-all"},"Email:\xa0",t.email?"visible":"hidden"),r.a.createElement(x.a,{size:"3",wordBreak:"break-all"},"Phone number:\xa0",t.phone?"visible":"hidden")):r.a.createElement(x.a,{size:"3",wordBreak:"break-all"},t);var l=null;return a&&(l=r.a.createElement(N.a,{clicked:a},"Change")),r.a.createElement(O.a,{direction:"column",spacing:"2",align:"start"},r.a.createElement(j.a,{variant:"h4"},n),c,l)};A.defaultProps={clickHandler:void 0};var C=A,D=function(e){var n=e.history,t=Object(c.c)((function(e){return e.auth.profile})),l=Object(c.b)(),i=Object(a.useCallback)((function(e,n){return l(b.B(e,n))}),[l]),o=null,u=null;if(t){var s=t.firstName,m=t.lastName,d=t.username,f=t.email,p=t.street,E=t.zipCode,v=t.city,h=t.country,A=t.phone,D=t.contacts,S="active"===t.status,w=null;t.isAdmin&&(w=r.a.createElement(O.a,{spacing:"3",className:"actions",justify:"center","data-testid":"MyData-admin-content"},r.a.createElement(N.a,{clicked:function(){return i(!0,y.k.ADD_ADMIN)}},"Add admin"),r.a.createElement(N.a,{color:"red",clicked:function(){return i(!0,y.k.REMOVE_ADMIN)}},"Remove admin")));var P=null;S||(P=r.a.createElement(O.a,{spacing:"3",justify:"center",className:"actions","data-testid":"MyData-pending-user-actions"},r.a.createElement(N.a,{clicked:function(){return i(!0,y.k.SEND_VERIFICATION_LINK)}},"Send verification link"),r.a.createElement(N.a,{clicked:function(){return n.push("/logout")}},"Logout"))),o=r.a.createElement(r.a.Fragment,null,r.a.createElement(C,{name:y.o.USERNAME,content:d}),r.a.createElement(C,{name:y.o.NAME,content:"".concat(s," ").concat(m),clickHandler:S?function(){return i(!0,y.k.CHANGE_NAME)}:null}),r.a.createElement(C,{name:y.o.EMAIL,content:f,clickHandler:S?function(){return i(!0,y.k.CHANGE_EMAIL)}:null}),r.a.createElement(C,{name:y.o.ADDRESS,content:[p,"".concat(E," ").concat(v),h],clickHandler:S?function(){return i(!0,y.k.CHANGE_ADDRESS)}:null}),r.a.createElement(C,{name:y.o.CONTACTS,content:D,clickHandler:S?function(){return i(!0,y.k.CHANGE_CONTACTS)}:null}),r.a.createElement(C,{name:y.o.PHONE_NUMBER,content:A,clickHandler:S?function(){return i(!0,y.k.CHANGE_PHONE_NUMBER)}:null}),P,r.a.createElement(O.a,{spacing:"3",className:"actions",justify:"center"},S&&r.a.createElement(N.a,{clicked:function(){return i(!0,y.k.CHANGE_PASSWORD)},"data-testid":"MyData-change-password-btn"},"Change password"),r.a.createElement(N.a,{color:"red",clicked:function(){return i(!0,y.k.DELETE_ACCOUNT)}},"Delete account")),w),S||(u=r.a.createElement(k.a,{"data-testid":"MyData-pending-user-content"},r.a.createElement(x.a,{size:"3",lineHeight:"5"},"You need to activate your account to unlock all app functionalities. Verification link is active for 10 minutes. You can resend it below. If you do not activate your account within 1 hour, account will be deleted permanently.")))}return r.a.createElement(r.a.Fragment,null,r.a.createElement(j.a,{variant:"h3"},"My data"),r.a.createElement(O.a,{direction:"column",spacing:"3"},u,r.a.createElement(k.a,null,r.a.createElement(g,null,o))))},S=t(118),w=function(e){var n=e.userProfile,t=e.location.search,l=Object(c.c)((function(e){return e.ui.productsPerPage})),i=Object(c.b)(),o=Object(a.useCallback)((function(e,n){return i(b.r(e,n))}),[i]);return Object(a.useEffect)((function(){o(t,y.m.MY_PRODUCTS)}),[t,o,l,n]),r.a.createElement(r.a.Fragment,null,r.a.createElement(j.a,{variant:"h3"},"My products"),r.a.createElement(S.a,{page:y.m.MY_PRODUCTS}))},P=t(137),z=t(136);function L(){var e=Object(o.a)(["\n  padding: "," 0;\n  border-bottom: 1px solid ",";\n\n  &:first-child {\n    padding-top: 0;\n  }\n"]);return L=function(){return e},e}function M(){var e=Object(o.a)(["\n  position: relative;\n"]);return M=function(){return e},e}var R=u.c.div(M()),_=u.c.div(L(),(function(e){return e.theme.spacings.level3}),(function(e){return e.theme.colors.light3})),T=t(19),I=t(52),H=t(228),B=t(64),Y=t(2),F=function(e){var n=e.orders,t=e.orderType,a=Object(c.c)((function(e){return e.ui.isDataLoading})),i=n.map((function(e){var n,a,c=t===y.l.PLACED_ORDERS?null===(n=e.seller)||void 0===n?void 0:n.username:null===(a=e.buyer)||void 0===a?void 0:a.username,i=t===y.l.PLACED_ORDERS?"seller ":"buyer ";return r.a.createElement(_,{key:e._id},r.a.createElement(O.a,{justify:"space-between",align:"flex-end",spacing:"3"},r.a.createElement(x.a,{size:"3"},r.a.createElement("span",null,i),c?r.a.createElement(l.Link,{to:"/user/".concat(c,"?p=1"),"data-testid":"OrderList-user-link"},r.a.createElement(I.b,null,c)):r.a.createElement(x.a,{fStyle:"italic","data-testid":"OrderList-account-deleted"},"(account has been deleted)")),r.a.createElement(x.a,{size:"2"},Object(Y.c)(e.createdAt))),e.products.map((function(n){return r.a.createElement(H.a,{key:n._id,data:n,orderId:e._id})})),r.a.createElement(O.a,{mgTop:"3",justify:"space-between",align:"center",spacing:"3"},r.a.createElement(l.Link,{to:"/order/".concat(e._id),"data-testid":"OrderList-order-details-link"},r.a.createElement(N.a,null,"details")),r.a.createElement("div",null,r.a.createElement(x.a,{size:"3",mgRight:"1",spacing:"1px",color:T.a.colors.light4},"TOTAL"),r.a.createElement(x.a,{size:"5"},Object(Y.d)(e.overallPrice)))))})),o=a?r.a.createElement(B.a,null):null;return r.a.createElement(R,null,i,o)},G=t(13),U=t(11),q=t(65),V=t(39),W=t.n(V);function J(){var e=Object(o.a)(["\n  align-items: center;\n  display: flex;\n  flex: 1;\n  margin-right: ",";\n\n  & .label {\n    font-size: ",";\n    margin-right: ",";\n  }\n\n  & .select {\n    font-size: ",";\n    flex: 1;\n    max-width: 22rem;\n    z-index: ",";\n  }\n"]);return J=function(){return e},e}var Q={};Q.Wrapper=u.c.div(J(),(function(e){return e.theme.spacings.level2}),(function(e){return e.theme.fontSizes.level3}),(function(e){return e.theme.spacings.level2}),(function(e){return e.theme.fontSizes.level2}),(function(e){return e.theme.zIndexes.level2}));var K={control:function(e){return Object(U.a)(Object(U.a)({},e),{},{minHeight:"25px"})},dropdownIndicator:function(e){return Object(U.a)(Object(U.a)({},e),{},{padding:"0.6rem"})}},X=function(){var e=Object(a.useState)(y.q[0]),n=Object(G.a)(e,2),t=n[0],c=n[1],l=Object(i.k)(),o=l.location,u=o.search,s=o.pathname;return r.a.createElement(Q.Wrapper,null,r.a.createElement("label",{htmlFor:"sortOption",className:"label"},"Sort"),r.a.createElement(q.a,{options:y.q,value:t,onChange:function(e){if(e.value!==t.value){c(e);var n=Object(Y.g)(u);n.sortBy=e.value;var a=W.a.stringify(n);l.replace("".concat(s,"?").concat(a))}},isSearchable:!1,styles:K,id:"sortOption",className:"select"}))},Z=t(60),$=function(e){var n=e.orders,t=e.type,l=Object(i.k)().location.search,o=Object(c.c)((function(e){return e.auth.orderCount})),u=Object(c.b)(),s=Object(a.useCallback)((function(e,n){return u(b.o(e,n))}),[u]);Object(a.useEffect)((function(){s(l,t)}),[s,t,l]);var m=r.a.createElement(Z.a,{align:"center"});return null===n?m=r.a.createElement(j.a,{variant:"h4",align:"center"},t===y.l.PLACED_ORDERS?"There is a problem to fetch your placed orders":"There is a problem to fetch your sell history"):n&&(n.length<=0?m=r.a.createElement(j.a,{variant:"h4",align:"center"},t===y.l.PLACED_ORDERS?"You don't have any placed orders yet":"Your sell history is empty"):o>0&&(m=r.a.createElement(r.a.Fragment,null,r.a.createElement(k.a,null,r.a.createElement(I.c,null,r.a.createElement(X,null),r.a.createElement(P.a,{itemQuantity:o,quantityPerPage:y.b})),r.a.createElement(F,{orders:n,orderType:t}),r.a.createElement(z.a,{itemQuantity:o,itemsType:y.h.ORDER,quantityPerPage:y.b}))))),m},ee=function(){var e=Object(c.c)((function(e){return e.auth.sellHistory}));return r.a.createElement(E,null,r.a.createElement(j.a,{variant:"h3"},"My sell history"),r.a.createElement($,{orders:e,type:y.l.SELL_HISTORY}))},ne=function(){var e=Object(c.c)((function(e){return e.auth.placedOrders}));return r.a.createElement(E,null,r.a.createElement(j.a,{variant:"h3"},"My placed orders"),r.a.createElement($,{orders:e,type:y.l.PLACED_ORDERS}))};n.default=function(){var e=Object(c.c)((function(e){return e.auth.profile})),n=null;"active"===e.status&&(n=r.a.createElement("nav",{className:"nav","data-testid":"MyAccount-navigation"},r.a.createElement("ul",{className:"nav-list"},r.a.createElement("li",null,r.a.createElement(l.NavLink,{to:"/my-account/data",className:"nav-link",activeClassName:"nav-link-active"},"Data")),r.a.createElement("li",null,r.a.createElement(l.NavLink,{to:"/my-account".concat(y.a),className:"nav-link",activeClassName:"nav-link-active"},"Products")),r.a.createElement("li",null,r.a.createElement(l.NavLink,{to:"/my-account/sell-history?p=1",className:"nav-link",activeClassName:"nav-link-active"},"Sell history")),r.a.createElement("li",null,r.a.createElement(l.NavLink,{to:"/my-account/placed-orders?p=1",className:"nav-link",activeClassName:"nav-link-active"},"Placed orders")))));var t=r.a.createElement(p,{extraMargin:!1,"data-testid":"MyAccount-pending-user-routes"},r.a.createElement(i.g,null,r.a.createElement(i.d,{path:"/my-account/data",exact:!0,component:D}),r.a.createElement(i.c,{to:"/my-account/data"})));return"active"===e.status&&(t=r.a.createElement(p,{extraMargin:!0,"data-testid":"MyAccount-active-user-routes"},r.a.createElement(i.g,null,r.a.createElement(i.d,{path:"/my-account/data",exact:!0,component:D}),r.a.createElement(i.d,{path:"/my-account/products",exact:!0,render:function(n){return r.a.createElement(w,Object.assign({userProfile:e},n))}}),r.a.createElement(i.d,{path:"/my-account/sell-history",exact:!0,component:ee}),r.a.createElement(i.d,{path:"/my-account/placed-orders",exact:!0,component:ne}),r.a.createElement(i.c,{to:"/my-account/data"})))),r.a.createElement(f,null,n,t)}}}]);