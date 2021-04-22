(this["webpackJsonpeshopping-app-client"]=this["webpackJsonpeshopping-app-client"]||[]).push([[5],{359:function(e,t,n){"use strict";n(0);var i,c,r,a=n(16),s=n(9),d=n(8),l=n(21),o=Object(d.c)(l.a)(i||(i=Object(s.a)(["\n  padding-top: ",";\n\n  &:last-child {\n    padding-bottom: 0;\n  }\n"])),(function(e){return e.theme.spacings.level3})),j=d.c.div(c||(c=Object(s.a)(["\n  align-items: center;\n  display: flex;\n  flex: 1;\n\n  & > *:not(:last-child) {\n    margin-right: ",";\n  }\n\n  & .name {\n    flex: 2;\n    font-size: ",";\n\n    & > a {\n      transition: color ","s;\n\n      &:hover {\n        color: ",";\n      }\n    }\n  }\n\n  @media only screen and (max-width: 56.25em) {\n    align-items: start;\n    flex-direction: column;\n    justify-content: center;\n\n    & > *:not(:last-child) {\n      margin-right: 0;\n      margin-bottom: ",";\n    }\n\n    & .name {\n      flex: initial;\n    }\n  }\n"])),(function(e){return e.theme.spacings.level1}),(function(e){return e.theme.fontSizes.level3}),(function(e){return e.theme.durations.level1}),(function(e){return e.theme.colors.green}),(function(e){return e.theme.spacings.level1})),h=Object(d.c)(l.a)(r||(r=Object(s.a)(["\n  @media only screen and (max-width: 56.25em) {\n    flex: initial;\n  }\n"]))),b=n(22),O=n(69),u=n(12),x=n(4),m=n(1),p=function(e){var t=e.data,n=e.orderId,i=t._id,c=t.name,r=t.price,s=t.quantity,d=t.photo,l=Object(x.j)(r*s);return Object(m.jsxs)(o,{spacing:"2","data-testid":"TransactionAndOrderProdItem",children:[Object(m.jsx)(a.Link,{to:"/product/".concat(i),"data-testid":"TransactionAndOrderProdItem-product-link-photo",children:Object(m.jsx)(O.a,{photo:d,alt:c,productId:i,width:"5",height:"5",orderId:n})}),Object(m.jsxs)(j,{children:[Object(m.jsx)("span",{className:"name",children:Object(m.jsx)(a.Link,{to:"/product/".concat(i),"data-testid":"TransactionAndOrderProdItem-product-link-name",children:c})}),Object(m.jsxs)(h,{justify:"space-between",align:"center",flex:"1",children:[Object(m.jsx)(u.a,{size:"2",color:b.a.colors.light4,children:"".concat(s," x ").concat(Object(x.d)(r))}),Object(m.jsx)(u.a,{size:"4",children:Object(x.d)(l)})]})]})]})};p.defaultProps={orderId:""};t.a=p},361:function(e,t,n){"use strict";n(0);var i=n(21),c=n(12),r=n(1);t.a=function(e){var t=e.data,n=t.firstName,a=t.lastName,s=t.street,d=t.zipCode,l=t.city,o=t.country,j=t.phone,h=["".concat(n," ").concat(a),s,"".concat(d," ").concat(l),o,j];return Object(r.jsx)(i.a,{direction:"column",spacing:"1",children:h.map((function(e,t){return Object(r.jsx)(c.a,{size:"3",wordBreak:"break-all",children:e},t)}))})}},370:function(e,t,n){"use strict";n.r(t);var i,c=n(0),r=n(6),a=n(26),s=n(16),d=n(10),l=n(9),o=n(8).c.div(i||(i=Object(l.a)(["\n  font-size: ",";\n  margin: 0 auto;\n  max-width: 100%;\n  width: 80rem;\n"])),(function(e){return e.theme.fontSizes.level3})),j=n(68),h=n(25),b=n(51),O=n(12),u=n(21),x=n(359),m=n(361),p=n(4),g=n(56),f=n(22),v=n(109),k=n(1);t.default=function(){var e=Object(a.m)().id,t=Object(r.c)((function(e){return e.auth.orderDetails})),n=Object(r.b)(),i=Object(c.useCallback)((function(e){return n(d.m(e))}),[n]),l=Object(c.useCallback)((function(){return n(d.C())}),[n]);Object(c.useEffect)((function(){return i(e),Object(p.k)(),function(){return l()}}),[e,i,l]);var y=Object(k.jsx)(b.a,{align:"center"});if(null===t)y=Object(k.jsx)(h.a,{variant:"h4",align:"center",lineHeight:"4","data-testid":"OrderDetails-error",children:"There is a problem to fetch order details or given order does not exist"});else if(t){var w=t._id,z=t.seller,D=t.buyer,I=t.deliveryAddress,T=t.products,A=t.overallPrice,P=t.createdAt,B=Object(k.jsxs)("div",{"data-testid":"OrderDetails-general-info-section",children:[Object(k.jsx)(h.a,{variant:"h4",mgBottom:"2",children:"General info"}),Object(k.jsxs)(u.a,{direction:"column",spacing:"1",children:[Object(k.jsxs)("div",{children:[Object(k.jsx)(O.a,{weight:"700",children:"Order number:\xa0"}),Object(k.jsx)(O.a,{size:"3",children:w})]}),Object(k.jsxs)("div",{children:[Object(k.jsx)(O.a,{weight:"700",children:"Transaction date:\xa0"}),Object(k.jsx)(O.a,{size:"3",children:Object(p.c)(P)})]}),Object(k.jsxs)("div",{children:[Object(k.jsx)(O.a,{weight:"700",children:"Buyer:\xa0"}),Object(k.jsx)(O.a,{size:"3",children:D?Object(k.jsx)(s.Link,{to:"/user/".concat(D.username,"?p=1"),"data-testid":"OrderDetails-buyer-link",children:Object(k.jsx)(g.a,{children:D.username})}):Object(k.jsx)("i",{"data-testid":"OrderDetails-buyer-deleted",children:"(account has been deleted)"})})]})]})]}),L=Object(k.jsxs)("div",{"data-testid":"OrderDetails-info-about-seller",children:[Object(k.jsx)(h.a,{variant:"h4",mgBottom:"2",children:"Info about seller"}),z?Object(k.jsxs)(u.a,{direction:"column",spacing:"1","data-test":"OrderDetails-seller-info",children:[Object(k.jsxs)("div",{children:[Object(k.jsx)(O.a,{weight:"700",children:"Username:\xa0"}),Object(k.jsx)(O.a,{size:"3",children:Object(k.jsx)(s.Link,{to:"/user/".concat(z.username,"?p=1"),"data-testid":"OrderDetails-seller-link",children:Object(k.jsx)(g.a,{children:z.username})})})]}),Object(k.jsxs)("div",{children:[Object(k.jsx)(O.a,{weight:"700",children:"Email:\xa0"}),Object(k.jsx)(O.a,{size:"3",children:z.email})]}),Object(k.jsxs)("div",{children:[Object(k.jsx)(O.a,{weight:"700",children:"Phone:\xa0"}),Object(k.jsx)(O.a,{size:"3",children:z.phone})]})]}):Object(k.jsx)("i",{"data-testid":"OrderDetails-seller-deleted",children:"(account has been deleted)"})]}),C=Object(k.jsxs)("div",{"data-testid":"OrderDetails-delivery-address-section",children:[Object(k.jsx)(h.a,{variant:"h4",mgBottom:"2",children:"Delivery address"}),Object(k.jsx)(m.a,{data:I})]}),E=Object(k.jsxs)(k.Fragment,{children:[Object(k.jsx)(h.a,{variant:"h4",mgTop:"3",children:"Products"}),T.map((function(e){return Object(k.jsx)(x.a,{data:e,orderId:w},e._id)})),Object(k.jsxs)(O.a,{display:"block",mgTop:"3",textAlign:"right",children:[Object(k.jsx)(O.a,{color:f.a.colors.light4,spacing:"1px",mgRight:"1",children:"TOTAL"}),Object(k.jsx)(O.a,{size:"5",children:Object(p.d)(A)})]})]});y=Object(k.jsx)(o,{children:Object(k.jsxs)(j.a,{children:[Object(k.jsxs)(u.a,{direction:"column",spacing:"3",children:[B,L,C]}),E]})})}return Object(k.jsxs)(k.Fragment,{children:[Object(k.jsx)(v.a,{title:"Order details - E-Shopping"}),y]})}}}]);