(this["webpackJsonpeshopping-app-client"]=this["webpackJsonpeshopping-app-client"]||[]).push([[6],{355:function(e,n,t){"use strict";t(0);var c,a,i,r=t(16),s=t(8),l=t(7),o=t(24),d=Object(l.c)(o.a)(c||(c=Object(s.a)(["\n  padding-top: ",";\n\n  &:last-child {\n    padding-bottom: 0;\n  }\n"])),(function(e){return e.theme.spacings.level3})),u=l.c.div(a||(a=Object(s.a)(["\n  align-items: center;\n  display: flex;\n  flex: 1;\n\n  & > *:not(:last-child) {\n    margin-right: ",";\n  }\n\n  & .name {\n    flex: 2;\n    font-size: ",";\n\n    & > a {\n      transition: color ","s;\n\n      &:hover {\n        color: ",";\n      }\n    }\n  }\n\n  @media only screen and (max-width: 56.25em) {\n    align-items: start;\n    flex-direction: column;\n    justify-content: center;\n\n    & > *:not(:last-child) {\n      margin-right: 0;\n      margin-bottom: ",";\n    }\n\n    & .name {\n      flex: initial;\n    }\n  }\n"])),(function(e){return e.theme.spacings.level1}),(function(e){return e.theme.fontSizes.level3}),(function(e){return e.theme.durations.level1}),(function(e){return e.theme.colors.green}),(function(e){return e.theme.spacings.level1})),j=Object(l.c)(o.a)(i||(i=Object(s.a)(["\n  @media only screen and (max-width: 56.25em) {\n    flex: initial;\n  }\n"]))),h=t(21),b=t(68),O=t(12),m=t(4),p=t(1),x=function(e){var n=e.data,t=e.orderId,c=n._id,a=n.name,i=n.price,s=n.quantity,l=n.photo,o=Object(m.j)(i*s);return Object(p.jsxs)(d,{spacing:"2","data-testid":"TransactionAndOrderProdItem",children:[Object(p.jsx)(r.Link,{to:"/product/".concat(c),"data-testid":"TransactionAndOrderProdItem-product-link-photo",children:Object(p.jsx)(b.a,{photo:l,alt:a,productId:c,width:"5",height:"5",orderId:t})}),Object(p.jsxs)(u,{children:[Object(p.jsx)("span",{className:"name",children:Object(p.jsx)(r.Link,{to:"/product/".concat(c),"data-testid":"TransactionAndOrderProdItem-product-link-name",children:a})}),Object(p.jsxs)(j,{justify:"space-between",align:"center",flex:"1",children:[Object(p.jsx)(O.a,{size:"2",color:h.a.colors.light4,children:"".concat(s," x ").concat(Object(m.d)(i))}),Object(p.jsx)(O.a,{size:"4",children:Object(m.d)(o)})]})]})]})};x.defaultProps={orderId:""};n.a=x},362:function(e,n,t){"use strict";t.r(n);var c,a,i,r,s,l=t(9),o=t(0),d=t(5),u=t(16),j=t(25),h=t(8),b=t(7),O=b.c.div(c||(c=Object(h.a)(["\n  & .nav {\n    background-color: ",";\n    position: fixed;\n    top: 6.2rem;\n    left: 0;\n    width: 100%;\n    padding-bottom: ",";\n    z-index: ",";\n  }\n\n  & .nav-list {\n    display: flex;\n    justify-content: center;\n    list-style: none;\n  }\n\n  & .nav-link {\n    border-bottom: 2px solid transparent;\n    display: block;\n    font-size: ",";\n    letter-spacing: 1px;\n    padding: ",";\n    text-transform: uppercase;\n    transition: all ","s;\n\n    &:hover {\n      color: ",";\n    }\n  }\n\n  & .nav-link-active {\n    border-bottom: 2px solid ",";\n    color: ",";\n    cursor: default;\n\n    &:hover {\n      color: ",";\n    }\n  }\n\n  @media only screen and (max-width: 37.5em) {\n    & .nav {\n      top: 10.8rem;\n    }\n\n    & .nav-list {\n      justify-content: center;\n    }\n  }\n\n  @media only screen and (max-width: 24.5em) {\n    & .nav-link {\n      letter-spacing: 0;\n    }\n  }\n\n  @media only screen and (max-width: 22.5em) {\n    & .nav-link {\n      font-size: ",";\n      padding: ",";\n    }\n  }\n"])),(function(e){return e.theme.colors.light1}),(function(e){return e.theme.spacings.level1}),(function(e){return e.theme.zIndexes.level3}),(function(e){return e.theme.fontSizes.level2}),(function(e){return e.theme.spacings.level2}),(function(e){return e.theme.durations.level1}),(function(e){return e.theme.colors.green}),(function(e){return e.theme.colors.blue}),(function(e){return e.theme.colors.blue}),(function(e){return e.theme.colors.blue}),(function(e){return e.theme.fontSizes.level1}),(function(e){return e.theme.spacings.level1})),m=b.c.div(a||(a=Object(h.a)(["\n  ","\n"])),(function(e){var n=e.extraMargin,t=e.theme;return n?"\n        margin-top: ".concat(t.spacings.level5,";\n      "):""})),p=b.c.div(i||(i=Object(h.a)(["\n  max-width: 100%;\n  margin: 0 auto;\n  width: 80rem;\n"]))),x=b.c.div(r||(r=Object(h.a)(["\n  display: grid;\n  grid-gap: ",";\n  grid-template-columns: repeat(3, 1fr);\n\n  & .change-passwd-btn {\n    grid-area: 3 / 2 / 3 / 3;\n  }\n\n  & .actions {\n    grid-column: 1 / -1;\n  }\n\n  @media only screen and (max-width: 37.5em) {\n    grid-template-columns: repeat(2, 1fr);\n\n    & .change-passwd-btn {\n      grid-area: 4 / 1 / 4 / 3;\n    }\n\n    & .actions > * {\n      flex: 1;\n    }\n  }\n"])),(function(e){return e.theme.spacings.level3})),f=(Object(b.c)(u.Link)(s||(s=Object(h.a)(["\n  @media only screen and (max-width: 37.5em) {\n    & > * {\n      width: 100%;\n    }\n  }\n"]))),t(10)),v=t(2),g=t(67),y=t(24),k=t(23),N=t(17),E=t(12),A=t(1),C=function(e){var n=e.name,t=e.content,c=e.clickHandler,a="";a=n===v.o.ADDRESS?Object(A.jsx)(y.a,{direction:"column",spacing:"1",children:t.map((function(e,n){return Object(A.jsx)(E.a,{size:"3",wordBreak:"break-all",children:e},n)}))}):n===v.o.CONTACTS?Object(A.jsxs)(y.a,{direction:"column",spacing:"1",children:[Object(A.jsxs)(E.a,{size:"3",wordBreak:"break-all",children:["Email:\xa0",t.email?"visible":"hidden"]}),Object(A.jsxs)(E.a,{size:"3",wordBreak:"break-all",children:["Phone number:\xa0",t.phone?"visible":"hidden"]})]}):Object(A.jsx)(E.a,{size:"3",wordBreak:"break-all",children:t});var i=null;return c&&(i=Object(A.jsx)(N.a,{clicked:c,children:"Change"})),Object(A.jsxs)(y.a,{direction:"column",spacing:"2",align:"start",children:[Object(A.jsx)(k.a,{variant:"h4",children:n}),a,i]})};C.defaultProps={clickHandler:void 0};var D,S,w,P=C,z=function(e){var n=e.history,t=Object(d.c)((function(e){return e.auth.profile})),c=Object(d.b)(),a=Object(o.useCallback)((function(e,n){return c(f.B(e,n))}),[c]),i=null,r=null;if(t){var s=t.firstName,l=t.lastName,u=t.username,j=t.email,h=t.street,b=t.zipCode,O=t.city,m=t.country,p=t.phone,C=t.contacts,D="active"===t.status,S=null;t.isAdmin&&(S=Object(A.jsxs)(y.a,{spacing:"3",className:"actions",justify:"center","data-testid":"MyData-admin-content",children:[Object(A.jsx)(N.a,{clicked:function(){return a(!0,v.k.ADD_ADMIN)},children:"Add admin"}),Object(A.jsx)(N.a,{color:"red",clicked:function(){return a(!0,v.k.REMOVE_ADMIN)},children:"Remove admin"})]}));var w=null;D||(w=Object(A.jsxs)(y.a,{spacing:"3",justify:"center",className:"actions","data-testid":"MyData-pending-user-actions",children:[Object(A.jsx)(N.a,{clicked:function(){return a(!0,v.k.SEND_VERIFICATION_LINK)},children:"Send verification link"}),Object(A.jsx)(N.a,{clicked:function(){return n.push("/logout")},children:"Logout"})]})),i=Object(A.jsxs)(A.Fragment,{children:[Object(A.jsx)(P,{name:v.o.USERNAME,content:u}),Object(A.jsx)(P,{name:v.o.NAME,content:"".concat(s," ").concat(l),clickHandler:D?function(){return a(!0,v.k.CHANGE_NAME)}:null}),Object(A.jsx)(P,{name:v.o.EMAIL,content:j,clickHandler:D?function(){return a(!0,v.k.CHANGE_EMAIL)}:null}),Object(A.jsx)(P,{name:v.o.ADDRESS,content:[h,"".concat(b," ").concat(O),m],clickHandler:D?function(){return a(!0,v.k.CHANGE_ADDRESS)}:null}),Object(A.jsx)(P,{name:v.o.CONTACTS,content:C,clickHandler:D?function(){return a(!0,v.k.CHANGE_CONTACTS)}:null}),Object(A.jsx)(P,{name:v.o.PHONE_NUMBER,content:p,clickHandler:D?function(){return a(!0,v.k.CHANGE_PHONE_NUMBER)}:null}),w,Object(A.jsxs)(y.a,{spacing:"3",className:"actions",justify:"center",children:[D&&Object(A.jsx)(N.a,{clicked:function(){return a(!0,v.k.CHANGE_PASSWORD)},"data-testid":"MyData-change-password-btn",children:"Change password"}),Object(A.jsx)(N.a,{color:"red",clicked:function(){return a(!0,v.k.DELETE_ACCOUNT)},children:"Delete account"})]}),S]}),D||(r=Object(A.jsx)(g.a,{"data-testid":"MyData-pending-user-content",children:Object(A.jsx)(E.a,{size:"3",lineHeight:"5",children:"You need to activate your account to unlock all app functionalities. Verification link is active for 10 minutes. You can resend it below. If you do not activate your account within 1 hour, account will be deleted permanently."})}))}return Object(A.jsxs)(A.Fragment,{children:[Object(A.jsx)(k.a,{variant:"h3",children:"My data"}),Object(A.jsxs)(y.a,{direction:"column",spacing:"3",children:[r,Object(A.jsx)(g.a,{children:Object(A.jsx)(x,{children:i})})]})]})},L=t(108),M=function(e){var n=e.userProfile,t=e.location.search,c=Object(d.c)((function(e){return e.ui.productsPerPage})),a=Object(d.b)(),i=Object(o.useCallback)((function(e,n){return a(f.r(e,n))}),[a]);return Object(o.useEffect)((function(){i(t,v.m.MY_PRODUCTS)}),[t,i,c,n]),Object(A.jsxs)(A.Fragment,{children:[Object(A.jsx)(k.a,{variant:"h3",children:"My products"}),Object(A.jsx)(L.a,{page:v.m.MY_PRODUCTS})]})},R=t(150),_=t(149),T=b.c.div(D||(D=Object(h.a)(["\n  position: relative;\n"]))),I=b.c.div(S||(S=Object(h.a)(["\n  padding: "," 0;\n  border-bottom: 1px solid ",";\n\n  &:first-child {\n    padding-top: 0;\n  }\n"])),(function(e){return e.theme.spacings.level3}),(function(e){return e.theme.colors.light3})),H=t(21),B=t(46),Y=t(355),F=t(56),G=t(4),U=function(e){var n=e.orders,t=e.orderType,c=Object(d.c)((function(e){return e.ui.isDataLoading})),a=n.map((function(e){var n,c,a=t===v.l.PLACED_ORDERS?null===(n=e.seller)||void 0===n?void 0:n.username:null===(c=e.buyer)||void 0===c?void 0:c.username,i=t===v.l.PLACED_ORDERS?"seller ":"buyer ";return Object(A.jsxs)(I,{children:[Object(A.jsxs)(y.a,{justify:"space-between",align:"flex-end",spacing:"3",children:[Object(A.jsxs)(E.a,{size:"3",children:[Object(A.jsx)("span",{children:i}),a?Object(A.jsx)(u.Link,{to:"/user/".concat(a,"?p=1"),"data-testid":"OrderList-user-link",children:Object(A.jsx)(B.b,{children:a})}):Object(A.jsx)(E.a,{fStyle:"italic","data-testid":"OrderList-account-deleted",children:"(account has been deleted)"})]}),Object(A.jsx)(E.a,{size:"2",children:Object(G.c)(e.createdAt)})]}),e.products.map((function(n){return Object(A.jsx)(Y.a,{data:n,orderId:e._id},n._id)})),Object(A.jsxs)(y.a,{mgTop:"3",justify:"space-between",align:"center",spacing:"3",children:[Object(A.jsx)(u.Link,{to:"/order/".concat(e._id),"data-testid":"OrderList-order-details-link",children:Object(A.jsx)(N.a,{children:"details"})}),Object(A.jsxs)("div",{children:[Object(A.jsx)(E.a,{size:"3",mgRight:"1",spacing:"1px",color:H.a.colors.light4,children:"TOTAL"}),Object(A.jsx)(E.a,{size:"5",children:Object(G.d)(e.overallPrice)})]})]})]},e._id)})),i=c?Object(A.jsx)(F.a,{}):null;return Object(A.jsxs)(T,{children:[a,i]})},q=t(14),V=t(57),W=t(34),J=t.n(W),Q={};Q.Wrapper=b.c.div(w||(w=Object(h.a)(["\n  align-items: center;\n  display: flex;\n  flex: 1;\n  margin-right: ",";\n\n  & .label {\n    font-size: ",";\n    margin-right: ",";\n  }\n\n  & .select {\n    font-size: ",";\n    flex: 1;\n    max-width: 22rem;\n    z-index: ",";\n  }\n"])),(function(e){return e.theme.spacings.level2}),(function(e){return e.theme.fontSizes.level3}),(function(e){return e.theme.spacings.level2}),(function(e){return e.theme.fontSizes.level2}),(function(e){return e.theme.zIndexes.level2}));var K={control:function(e){return Object(l.a)(Object(l.a)({},e),{},{minHeight:"25px"})},dropdownIndicator:function(e){return Object(l.a)(Object(l.a)({},e),{},{padding:"0.6rem"})}},X=function(){var e=Object(o.useState)(v.q[0]),n=Object(q.a)(e,2),t=n[0],c=n[1],a=Object(j.k)(),i=a.location,r=i.search,s=i.pathname;return Object(A.jsxs)(Q.Wrapper,{children:[Object(A.jsx)("label",{htmlFor:"sortOption",className:"label",children:"Sort"}),Object(A.jsx)(V.a,{options:v.q,value:t,onChange:function(e){if(e.value!==t.value){c(e);var n=Object(G.g)(r);n.sortBy=e.value;var i=J.a.stringify(n);a.replace("".concat(s,"?").concat(i))}},isSearchable:!1,styles:K,id:"sortOption",className:"select"})]})},Z=t(51),$=function(e){var n=e.orders,t=e.type,c=Object(j.k)().location.search,a=Object(d.c)((function(e){return e.auth.orderCount})),i=Object(d.b)(),r=Object(o.useCallback)((function(e,n){return i(f.o(e,n))}),[i]);Object(o.useEffect)((function(){r(c,t)}),[r,t,c]);var s=Object(A.jsx)(Z.a,{align:"center"});return null===n?s=Object(A.jsx)(k.a,{variant:"h4",align:"center",children:t===v.l.PLACED_ORDERS?"There is a problem to fetch your placed orders":"There is a problem to fetch your sell history"}):n&&(n.length<=0?s=Object(A.jsx)(k.a,{variant:"h4",align:"center",children:t===v.l.PLACED_ORDERS?"You don't have any placed orders yet":"Your sell history is empty"}):a>0&&(s=Object(A.jsx)(A.Fragment,{children:Object(A.jsxs)(g.a,{children:[Object(A.jsxs)(B.c,{children:[Object(A.jsx)(X,{}),Object(A.jsx)(R.a,{itemQuantity:a,quantityPerPage:v.b})]}),Object(A.jsx)(U,{orders:n,orderType:t}),Object(A.jsx)(_.a,{itemQuantity:a,itemsType:v.h.ORDER,quantityPerPage:v.b})]})}))),s},ee=function(){var e=Object(d.c)((function(e){return e.auth.sellHistory}));return Object(A.jsxs)(p,{children:[Object(A.jsx)(k.a,{variant:"h3",children:"My sell history"}),Object(A.jsx)($,{orders:e,type:v.l.SELL_HISTORY})]})},ne=function(){var e=Object(d.c)((function(e){return e.auth.placedOrders}));return Object(A.jsxs)(p,{children:[Object(A.jsx)(k.a,{variant:"h3",children:"My placed orders"}),Object(A.jsx)($,{orders:e,type:v.l.PLACED_ORDERS})]})};n.default=function(){var e=Object(d.c)((function(e){return e.auth.profile})),n=null;"active"===e.status&&(n=Object(A.jsx)("nav",{className:"nav","data-testid":"MyAccount-navigation",children:Object(A.jsxs)("ul",{className:"nav-list",children:[Object(A.jsx)("li",{children:Object(A.jsx)(u.NavLink,{to:"/my-account/data",className:"nav-link",activeClassName:"nav-link-active",children:"Data"})}),Object(A.jsx)("li",{children:Object(A.jsx)(u.NavLink,{to:"/my-account".concat(v.a),className:"nav-link",activeClassName:"nav-link-active",children:"Products"})}),Object(A.jsx)("li",{children:Object(A.jsx)(u.NavLink,{to:"/my-account/sell-history?p=1",className:"nav-link",activeClassName:"nav-link-active",children:"Sell history"})}),Object(A.jsx)("li",{children:Object(A.jsx)(u.NavLink,{to:"/my-account/placed-orders?p=1",className:"nav-link",activeClassName:"nav-link-active",children:"Placed orders"})})]})}));var t=Object(A.jsx)(m,{extraMargin:!1,"data-testid":"MyAccount-pending-user-routes",children:Object(A.jsxs)(j.g,{children:[Object(A.jsx)(j.d,{path:"/my-account/data",exact:!0,component:z}),Object(A.jsx)(j.c,{to:"/my-account/data"})]})});return"active"===e.status&&(t=Object(A.jsx)(m,{extraMargin:!0,"data-testid":"MyAccount-active-user-routes",children:Object(A.jsxs)(j.g,{children:[Object(A.jsx)(j.d,{path:"/my-account/data",exact:!0,component:z}),Object(A.jsx)(j.d,{path:"/my-account/products",exact:!0,render:function(n){return Object(A.jsx)(M,Object(l.a)({userProfile:e},n))}}),Object(A.jsx)(j.d,{path:"/my-account/sell-history",exact:!0,component:ee}),Object(A.jsx)(j.d,{path:"/my-account/placed-orders",exact:!0,component:ne}),Object(A.jsx)(j.c,{to:"/my-account/data"})]})})),Object(A.jsxs)(O,{children:[n,t]})}}}]);