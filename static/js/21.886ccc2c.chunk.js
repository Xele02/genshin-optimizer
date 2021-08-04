(this["webpackJsonpgenshin-optimizer"]=this["webpackJsonpgenshin-optimizer"]||[]).push([[21],{500:function(e,a,t){"use strict";t.r(a),t.d(a,"default",(function(){return D}));var c=t(40),n=t.n(c),r=t(58),s=t(4),i=t(14),l=t(52),o=t(0),j=t.n(o),u=t(172),b=t(61),d=t(30),h=t(27),O=t(187),m=t(195),x=t(57),f=t(200),v=t(268),p=t(210),y=t(45),g=t(48),C=t(194),N=t(213),w=t(12),k=t(78),K=t(9),B=t(269),S=t(112),T=t(102),E=t(42),z=t(1),A=j.a.lazy((function(){return t.e(22).then(t.bind(null,498))})),F=Object(o.lazy)((function(){return Promise.all([t.e(2),t.e(1)]).then(t.bind(null,219))})),R={level:"Level",rarity:"Rarity",name:"Name"};function _(e,a){return a===e?"":a}function D(e){var a,t=Object(o.useState)(""),c=Object(s.a)(t,2),g=c[0],D=c[1],P=Object(o.useState)((function(){return Object.keys(R)[0]})),Y=Object(s.a)(P,2),J=Y[0],L=Y[1],M=Object(o.useReducer)(_,""),q=Object(s.a)(M,2),G=q[0],H=q[1],V=Object(o.useReducer)(_,""),Q=Object(s.a)(V,2),U=Q[0],W=Q[1],X=Object(o.useState)(!1),Z=Object(s.a)(X,2),$=Z[0],ee=Z[1],ae=Object(k.a)(),te=Object(s.a)(ae,2)[1],ce=Object(o.useRef)(null);Object(o.useEffect)((function(){y.a.pageview("/character");var e=Object(K.l)("CharacterDisplay.state");if(e){var a=e.charIdToEdit,t=e.sortBy,c=e.elementalFilter,n=e.weaponFilter;D(a),L(t),w.d.includes(c)&&H(c),w.j.includes(n)&&W(n)}return E.a.followAnyChar(te)}),[te]);var ne=null!==(a=Object(k.b)(S.b.getAll(),[]))&&void 0!==a?a:{},re=function(e){var a,t;return null!==(a=null===(t=E.a._getChar(e))||void 0===t?void 0:t.level)&&void 0!==a?a:0},se=function(e){var a;return null===(a=ne[e])||void 0===a?void 0:a.star};Object(o.useEffect)((function(){var e={charIdToEdit:g,sortBy:J,elementalFilter:G,weaponFilter:U};Object(K.p)("CharacterDisplay.state",e)}),[g,J,G,U]);var ie=Object(o.useCallback)(function(){var e=Object(r.a)(n.a.mark((function e(a){var t,c;return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,S.b.get(a);case 2:if(t=e.sent,"object"===typeof(c=null===t||void 0===t?void 0:t.name)&&(c=T.a.t("char_".concat(a,"_gen:name"))),window.confirm("Are you sure you want to remove ".concat(c,"?"))){e.next=7;break}return e.abrupt("return");case 7:E.a.removeChar(a),g===a&&D("");case 9:case"end":return e.stop()}}),e)})));return function(a){return e.apply(this,arguments)}}(),[g,D]),le=Object(o.useCallback)((function(e){D(e),setTimeout((function(){var e;null===(e=ce.current)||void 0===e||e.scrollIntoView({behavior:"smooth"})}),500)}),[D,ce]),oe=Object(o.useCallback)((function(){D(""),ee(!1)}),[D]),je=E.a._getCharKeys().filter((function(e){var a,t;return(!G||G===(null===(a=ne[e])||void 0===a?void 0:a.elementKey))&&(!U||U===(null===(t=ne[e])||void 0===t?void 0:t.weaponTypeKey))})).sort((function(e,a){if("name"===J)return e<a?-1:e>a?1:0;if("level"===J){var t=re(a)-re(e);return t||se(a)-se(e)}var c=se(a)-se(e);return c||re(a)-re(e)})),ue=Boolean(g||$);return Object(z.jsxs)(u.a,{ref:ce,className:"mt-2",children:[Object(z.jsx)(N.a,{pageKey:"characterPage",modalTitle:"Character Management Page Guide",text:["Every character will be tested with in-game numbers for maximum accuracy.","You can see the details of the calculations of every number.","You need to manually enable auto infusion for characters like Choungyun or Noelle.",'You can change character constellations in both "Character" tab and in "Talents" tab.',"Modified character Stats show up in yellow."],children:Object(z.jsx)(A,{})}),ue?Object(z.jsx)(b.a,{className:"mt-2",children:Object(z.jsx)(d.a,{children:Object(z.jsx)(j.a.Suspense,{fallback:Object(z.jsx)(h.a,{bg:"darkcontent",text:"lightfont",children:Object(z.jsx)(h.a.Body,{children:Object(z.jsxs)("h3",{className:"text-center",children:["Loading... ",Object(z.jsx)(O.a,{animation:"border",variant:"primary"})]})})}),children:Object(z.jsx)(F,{character:void 0,newBuild:void 0,tabName:void 0,editable:!0,setCharacterKey:le,characterKey:g,onClose:oe,footer:Object(z.jsx)(I,{onClose:oe,characterKey:g})})})})}):null,Object(z.jsx)(h.a,{bg:"darkcontent",text:"lightfont",className:"mt-2",children:Object(z.jsx)(h.a.Body,{className:"p-2",children:Object(z.jsxs)(b.a,{children:[Object(z.jsx)(d.a,{xs:"auto",children:Object(z.jsx)(m.a,{children:w.d.map((function(e){var a;return Object(z.jsx)(x.a,{variant:G&&G!==e?"primary":"success",className:"py-1 px-2",onClick:function(){return H(e)},children:Object(z.jsx)("h4",{className:"mb-0",children:Object(z.jsx)(f.a,{src:null===(a=C.a.elements)||void 0===a?void 0:a[e],className:"inline-icon"})})},e)}))})}),Object(z.jsx)(d.a,{children:Object(z.jsx)(m.a,{children:w.j.map((function(e){var a;return Object(z.jsx)(x.a,{variant:U&&U!==e?"primary":"success",className:"py-1 px-2",onClick:function(){return W(e)},children:Object(z.jsx)("h4",{className:"mb-0",children:Object(z.jsx)(f.a,{src:null===(a=C.a.weaponTypes)||void 0===a?void 0:a[e],className:"inline-icon"})})},e)}))})}),Object(z.jsxs)(d.a,{xs:"auto",children:[Object(z.jsx)("span",{children:"Sort by: "}),Object(z.jsx)(v.a,{type:"radio",name:"level",value:J,onChange:L,children:Object.entries(R).map((function(e){var a=Object(s.a)(e,2),t=a[0],c=a[1];return Object(z.jsx)(p.a,{value:t,variant:J===t?"success":"primary",children:c},t)}))})]})]})})}),Object(z.jsxs)(b.a,{className:"mt-2",children:[!ue&&Object(z.jsx)(d.a,{lg:4,md:6,className:"mb-2",children:Object(z.jsxs)(h.a,{className:"h-100",bg:"darkcontent",text:"lightfont",children:[Object(z.jsx)(h.a.Header,{className:"pr-2",children:Object(z.jsx)("span",{children:"Add New Character"})}),Object(z.jsx)(h.a.Body,{className:"d-flex flex-column justify-content-center",children:Object(z.jsx)(b.a,{className:"d-flex flex-row justify-content-center",children:Object(z.jsx)(d.a,{xs:"auto",children:Object(z.jsx)(x.a,{onClick:function(){return ee(!0)},children:Object(z.jsx)("h1",{children:Object(z.jsx)(l.a,{icon:i.q,className:"fa-fw"})})})})})})]})}),je.map((function(e){return Object(z.jsx)(d.a,{lg:4,md:6,className:"mb-2",children:Object(z.jsx)(B.a,{header:void 0,cardClassName:"h-100",characterKey:e,onDelete:ie,onEdit:le,footer:!0})},e)}))]})]})}function I(e){var a=e.onClose,t=e.characterKey;return Object(z.jsxs)(b.a,{children:[Object(z.jsx)(d.a,{children:Object(z.jsxs)(x.a,{variant:"info",as:g.b,to:{pathname:"/flex",characterKey:t},children:[Object(z.jsx)(l.a,{icon:i.m})," Share Character"]})}),Object(z.jsx)(d.a,{xs:"auto",children:Object(z.jsx)(x.a,{variant:"danger",onClick:a,children:"Close"})})]})}}}]);
//# sourceMappingURL=21.886ccc2c.chunk.js.map