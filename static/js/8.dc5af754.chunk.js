(this["webpackJsonpeshopping-app-client"]=this["webpackJsonpeshopping-app-client"]||[]).push([[8],{361:function(e,t,r){"use strict";r.r(t);var a=r(0),n=r(5),c=r(10),i=r(24),s=r(51),u=r(12),o=r(108),h=r(2),l=r(20),p=r(4),j=r(1);t.default=function(e){var t=e.match.params.username,r=e.location.search,b=e.history,d=Object(n.c)((function(e){return e.auth.profile})),O=null===d||void 0===d?void 0:d.username,f=Object(n.c)((function(e){return e.auth.otherUser})),m=Object(n.c)((function(e){return e.ui.productsPerPage})),g=Object(n.b)(),v=Object(a.useCallback)((function(e){return g(c.o(e))}),[g]),x=Object(a.useCallback)((function(e){return g(c.D(e))}),[g]),w=Object(a.useCallback)((function(e,t,r){return g(c.q(e,t,r))}),[g]);Object(a.useEffect)((function(){return t===O?b.replace("/my-account/data"):(v(t),w(r,h.p.USER_PRODUCTS,t),Object(p.k)()),function(){return x(void 0)}}),[t,O,v,w,m,x,r,b]);var U=Object(j.jsx)(s.a,{align:"center"});if(null===f)U=Object(j.jsx)(i.a,{variant:"h4",align:"center",lineHeight:"4",children:"Such user does not exist or problem during fetching occurred"});else if(f){var k=f.username,C=f.email,P=f.phone,S=Object(j.jsx)(i.a,{variant:"h4",mgBottom:"3","data-testid":"OtherUser-data-private",children:"This user has his contact data set to private"});(C||P)&&(S=Object(j.jsxs)(l.a,{wrap:"wrap",mgBottom:"3",spacing:"3",children:[C&&Object(j.jsxs)(u.a,{size:"4","data-testid":"OtherUser-email-wrapper",children:[Object(j.jsx)(u.a,{weight:"700",children:"Email:\xa0"}),C]}),P&&Object(j.jsxs)(u.a,{size:"4","data-testid":"OtherUser-phone-wrapper",children:[Object(j.jsx)(u.a,{weight:"700",children:"Phone number:\xa0"}),P]})]})),U=Object(j.jsxs)(j.Fragment,{children:[Object(j.jsx)(i.a,{variant:"h3",children:k}),S,Object(j.jsx)(o.a,{page:h.p.USER_PRODUCTS})]})}return U}}}]);