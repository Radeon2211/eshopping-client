(this["webpackJsonpeshopping-app-client"]=this["webpackJsonpeshopping-app-client"]||[]).push([[8],{361:function(e,t,r){"use strict";r.r(t);var a=r(0),n=r(5),c=r(10),i=r(23),s=r(51),u=r(12),o=r(108),h=r(2),l=r(24),p=r(1);t.default=function(e){var t=e.match.params.username,r=e.location.search,j=e.history,b=Object(n.c)((function(e){return e.auth.profile})),d=null===b||void 0===b?void 0:b.username,O=Object(n.c)((function(e){return e.auth.otherUser})),m=Object(n.c)((function(e){return e.ui.productsPerPage})),f=Object(n.b)(),g=Object(a.useCallback)((function(e){return f(c.p(e))}),[f]),v=Object(a.useCallback)((function(e){return f(c.D(e))}),[f]),x=Object(a.useCallback)((function(e,t,r){return f(c.r(e,t,r))}),[f]);Object(a.useEffect)((function(){return t===d?j.replace("/my-account/data"):(g(t),x(r,h.m.USER_PRODUCTS,t)),function(){return v(void 0)}}),[t,d,g,x,m,v,r,j]);var w=Object(p.jsx)(s.a,{align:"center"});if(null===O)w=Object(p.jsx)(i.a,{variant:"h4",align:"center",lineHeight:"4",children:"Such user does not exist or problem during fetching occurred"});else if(O){var U=O.username,k=O.email,C=O.phone,P=Object(p.jsx)(i.a,{variant:"h4",mgBottom:"3","data-testid":"OtherUser-data-private",children:"This user has his contact data set to private"});(k||C)&&(P=Object(p.jsxs)(l.a,{wrap:"wrap",mgBottom:"3",spacing:"3",children:[k&&Object(p.jsxs)(u.a,{size:"4","data-testid":"OtherUser-email-wrapper",children:[Object(p.jsx)(u.a,{weight:"700",children:"Email:\xa0"}),k]}),C&&Object(p.jsxs)(u.a,{size:"4","data-testid":"OtherUser-phone-wrapper",children:[Object(p.jsx)(u.a,{weight:"700",children:"Phone number:\xa0"}),C]})]})),w=Object(p.jsxs)(p.Fragment,{children:[Object(p.jsx)(i.a,{variant:"h3",children:U}),P,Object(p.jsx)(o.a,{page:h.m.USER_PRODUCTS})]})}return w}}}]);