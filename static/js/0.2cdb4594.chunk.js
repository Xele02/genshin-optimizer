(this["webpackJsonpgenshin-optimizer"]=this["webpackJsonpgenshin-optimizer"]||[]).push([[0],{206:function(e,t,a){"use strict";a.d(t,"a",(function(){return o}));var n=a(20),c=a(25),r=a(10),i=a(1),s=function(){return Object(i.jsx)(r.a,{icon:c.A})},o=function(e){var t=e.stars,a=e.colored,c=void 0!==a&&a;return Object(i.jsx)("span",{className:c?"text-5star":"",children:t?Object(n.a)(Array(t).keys()).map((function(e,t){return Object(i.jsx)(s,{},t)})):null})}},207:function(e,t,a){"use strict";var n={weaponTypes:{bow:a.p+"static/media/Weapon-class-bow-icon.b8e7b5ca.png",catalyst:a.p+"static/media/Weapon-class-catalyst-icon.2cbef800.png",claymore:a.p+"static/media/Weapon-class-claymore-icon.17418b20.png",polearm:a.p+"static/media/Weapon-class-polearm-icon.a4e7fffc.png",sword:a.p+"static/media/Weapon-class-sword-icon.4470b487.png"},resin:{fragile:a.p+"static/media/Item_Fragile_Resin.f9ec8223.png",condensed:a.p+"static/media/Item_Condensed_Resin.1cecf64a.png"},exp_books:{advice:a.p+"static/media/Item_Wanderer's_Advice.58c62cf7.png",wit:a.p+"static/media/Item_Hero's_Wit.a79e36d0.png",experience:a.p+"static/media/Item_Adventurer's_Experience.92b5d195.png"}};t.a=n},208:function(e,t,a){"use strict";a.d(t,"b",(function(){return N})),a.d(t,"a",(function(){return T})),a.d(t,"c",(function(){return I}));var n=a(20),c=a(4),r=a(25),i=a(10),s=a(0),o=a(143),l=a(126),u=a(223),d=a(544),j=a(188),b=a(127),v=a(72),f=a(537),h=a(330),O=a(189),m=a(187),p=a(207),y=a(123),g=a(35),x=a(14),S=a(86),w=a(206),_=a(124),k=a(209),E=a(121),K=a(122),A=a(1);function N(e){var t=e.onSelect,a=e.weaponTypeKey,n=Object(s.useContext)(g.b),c=Object(S.b)(y.b.getAll(),[]);return Object(A.jsx)(A.Fragment,{children:n._getCharKeys().filter((function(e){var t;return!a||(null===c||void 0===c||null===(t=c[e])||void 0===t?void 0:t.weaponTypeKey)===a})).sort().map((function(e){return Object(A.jsx)(C,{characterKey:e,onSelect:t},e)}))})}function C(e){var t=e.characterKey,a=e.onSelect,n=Object(S.b)(y.b.get(t),[t]);return n?Object(A.jsx)(m.a.Item,{onClick:function(){return a(t)},children:n.nameWIthIcon}):null}function T(e){var t=e.characterSheet,a=e.onSelect,n=e.filter,r=Object(s.useState)(!1),i=Object(c.a)(r,2),d=i[0],j=i[1],b=t?Object(A.jsxs)("span",{children:[Object(A.jsx)(o.a,{src:t.thumbImg,className:"thumb-small my-n1 ml-n2",roundedCircle:!0}),Object(A.jsxs)("h6",{className:"d-inline",children:[" ",t.name," "]})]}):Object(A.jsx)("span",{children:"Select a Character"});return Object(A.jsxs)(A.Fragment,{children:[Object(A.jsx)(l.a,{as:u.a,onClick:function(){return j(!0)},children:b}),Object(A.jsx)(I,{show:d,onHide:function(){return j(!1)},onSelect:a,filter:n})]})}var W={rarity:"Rarity",level:"Level",name:"Name"};function B(e,t){return t===e?"":t}function I(e){var t=e.show,a=e.onHide,O=e.onSelect,m=e.filter,w=void 0===m?function(){return!0}:m,k=Object(s.useContext)(g.b),E=Object(s.useState)((function(){return Object.keys(W)[0]})),K=Object(c.a)(E,2),N=K[0],C=K[1],T=Object(s.useReducer)(B,""),I=Object(c.a)(T,2),M=I[0],F=I[1],H=Object(s.useReducer)(B,""),R=Object(c.a)(H,2),L=R[0],D=R[1],q=Object(S.b)(y.b.getAll(),[]),P=function(e){var t,a;return null!==(t=null===(a=k._getChar(e))||void 0===a?void 0:a.level)&&void 0!==t?t:0},z=function(e){var t;return null===q||void 0===q||null===(t=q[e])||void 0===t?void 0:t.star},G=q?Object(n.a)(new Set(x.c)).filter((function(e){return w(k._getChar(e),q[e])})).filter((function(e){var t,a;return(!M||M===(null===q||void 0===q||null===(t=q[e])||void 0===t?void 0:t.elementKey))&&(!L||L===(null===q||void 0===q||null===(a=q[e])||void 0===a?void 0:a.weaponTypeKey))})).sort((function(e,t){if("name"===N)return e<t?-1:e>t?1:0;if("level"===N){var a=P(t)-P(e);return a||z(t)-z(e)}var n=z(t)-z(e);return n||P(t)-P(e)})):[];return q?Object(A.jsx)(d.a,{show:t,size:"xl",contentClassName:"bg-transparent",onHide:a,children:Object(A.jsxs)(j.a,{bg:"lightcontent",text:"lightfont",children:[Object(A.jsx)(j.a.Header,{children:Object(A.jsxs)(b.a,{children:[Object(A.jsx)(v.a,{xs:"auto",children:Object(A.jsx)(u.a,{children:x.d.map((function(e){return Object(A.jsx)(l.a,{variant:M&&M!==e?"secondary":e,className:"py-1 px-2 text-white",onClick:function(){return F(e)},children:Object(A.jsx)("h3",{className:"mb-0",children:_.b[e]})},e)}))})}),Object(A.jsx)(v.a,{children:Object(A.jsx)(u.a,{children:x.j.map((function(e){var t;return Object(A.jsx)(l.a,{variant:L&&L!==e?"secondary":"success",className:"py-1 px-2",onClick:function(){return D(e)},children:Object(A.jsx)("h3",{className:"mb-0",children:Object(A.jsx)(o.a,{src:null===(t=p.a.weaponTypes)||void 0===t?void 0:t[e],className:"inline-icon"})})},e)}))})}),Object(A.jsxs)(v.a,{xs:"auto",children:[Object(A.jsx)("span",{children:"Sort by: "}),Object(A.jsx)(f.a,{type:"radio",name:"level",value:N,onChange:C,children:Object.entries(W).map((function(e){var t=Object(c.a)(e,2),a=t[0],n=t[1];return Object(A.jsx)(h.a,{value:a,variant:N===a?"success":"primary",children:Object(A.jsx)("h6",{className:"mb-0",children:n})},a)}))})]}),Object(A.jsx)(v.a,{xs:"auto",children:Object(A.jsx)(l.a,{onClick:a,variant:"danger",children:Object(A.jsx)(i.a,{icon:r.B})})})]})}),Object(A.jsx)(j.a.Body,{children:Object(A.jsx)(b.a,{children:G.map((function(e){return Object(A.jsx)(V,{characterKey:e,onClick:function(){a(),O(e)}},e)}))})})]})}):null}function V(e){var t,a=e.onClick,n=e.characterKey,c=Object(s.useContext)(g.b),r=c._getChar(n),i=Object(S.b)(y.b.get(n),[n]),u=(null===r||void 0===r?void 0:r.equippedWeapon)?c._getWeapon(r.equippedWeapon):void 0,d=Object(S.b)(u?E.a.get(u.key):void 0,[null===u||void 0===u?void 0:u.key]),j=Object(S.b)(K.a.getAll(),[]),f=Object(s.useMemo)((function(){return r&&i&&d&&j&&k.a.calculateBuild(r,c,i,d,j)}),[r,i,d,j,c]);return i?Object(A.jsx)(v.a,{lg:3,md:4,className:"mb-2",children:Object(A.jsxs)(l.a,{className:"w-100",variant:"darkcontent",onClick:a,children:[Object(A.jsx)("h5",{children:i.name}),Object(A.jsxs)(b.a,{children:[Object(A.jsx)(v.a,{xs:"auto",className:"pr-0",children:Object(A.jsx)(o.a,{src:i.thumbImg,className:"thumb-big grad-".concat(i.star,"star p-0"),thumbnail:!0})}),Object(A.jsxs)(v.a,{children:[f&&r?Object(A.jsxs)(A.Fragment,{children:[Object(A.jsxs)("h5",{className:"mb-0",children:["Lv. ",k.a.getLevelString(r)," ","C".concat(r.constellation)]}),Object(A.jsxs)("h6",{className:"mb-0",children:[Object(A.jsx)(O.a,{variant:"secondary",children:Object(A.jsx)("strong",{className:"mx-1",children:f.tlvl.auto+1})})," ",Object(A.jsx)(O.a,{variant:"secondary",children:Object(A.jsx)("strong",{className:"mx-1",children:f.tlvl.skill+1})})," ",Object(A.jsx)(O.a,{variant:"secondary",children:Object(A.jsx)("strong",{className:"mx-1",children:f.tlvl.burst+1})})]})]}):Object(A.jsx)(A.Fragment,{children:Object(A.jsx)("h4",{children:Object(A.jsx)(O.a,{variant:"primary",children:"NEW"})})}),Object(A.jsx)("h6",{className:"mb-0",children:Object(A.jsx)(w.a,{stars:i.star,colored:!0})}),Object(A.jsxs)("h3",{className:"mb-0",children:[i.elementKey&&_.a[i.elementKey]," ",Object(A.jsx)(o.a,{src:null===(t=p.a.weaponTypes)||void 0===t?void 0:t[i.weaponTypeKey],className:"inline-icon"})]})]})]})]})},n):null}},209:function(e,t,a){"use strict";a.d(t,"a",(function(){return y}));var n=a(141),c=a(69),r=a(20),i=a(9),s=a(4),o=a(19),l=a(70),u=a(122),d=a(110),j=a(40),b=a(87),v=a(43),f=a(229),h=a(14),O=a(12),m=a(49),p=a(230),y=function e(){if(Object(o.a)(this,e),this instanceof e)throw Error("A static class cannot be instantiated.")};y.getElementalName=function(e){return b.a[e].name},y.getLevelString=function(e){return"".concat(e.level,"/").concat(j.b[e.ascension])},y.getTalentFieldValue=function(e,t){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"";return e[t]?Object(O.f)(e[t],a):n},y.hasOverride=function(e,t){return"finalHP"===t?y.hasOverride(e,"hp")||y.hasOverride(e,"hp_")||y.hasOverride(e,"characterHP"):"finalDEF"===t?y.hasOverride(e,"def")||y.hasOverride(e,"def_")||y.hasOverride(e,"characterDEF"):"finalATK"===t?y.hasOverride(e,"atk")||y.hasOverride(e,"atk_")||y.hasOverride(e,"characterATK"):!!(null===e||void 0===e?void 0:e.baseStatOverrides)&&t in e.baseStatOverrides},y.getBaseStatValue=function(e,t,a,n){return"enemyLevel"===n?e.level:n.includes("enemyRes_")?10:n in j.c?j.c[n]:0},y.getStatValueWithOverride=function(e,t,a,n){var c,r;return y.hasOverride(e,n)?null!==(c=null===(r=e.baseStatOverrides)||void 0===r?void 0:r[n])&&void 0!==c?c:0:y.getBaseStatValue(e,t,a,n)},y.calculateBuild=function(e,t,a,n,c){var r=arguments.length>5&&void 0!==arguments[5]?arguments[5]:0,i=Object.fromEntries(Object.entries(e.equippedArtifacts).map((function(e){var a=Object(s.a)(e,2),n=a[0],c=a[1];return[n,t._getArt(c)]}))),o=y.createInitialStats(e,t,a,n);return o.mainStatAssumptionLevel=r,y.calculateBuildwithArtifact(o,i,c)},y.calculateBuildwithArtifact=function(e,t,a){var n,c=l.a.setToSlots(t),r=u.a.setEffectsStats(a,e,c),o=Object(O.d)(e);Object.values(t).forEach((function(e){e&&(o[e.mainStatKey]=(o[e.mainStatKey]||0)+l.a.mainStatValue(e.mainStatKey,e.rarity,Math.max(Math.min(o.mainStatAssumptionLevel,4*e.rarity),e.level)),e.substats.forEach((function(e){return e&&e.key&&(o[e.key]=(o[e.key]||0)+e.value)})))})),Object(m.a)(o,r),d.a.parseConditionalValues({artifact:null===o||void 0===o||null===(n=o.conditionalValues)||void 0===n?void 0:n.artifact},(function(e,t,a){var n,r,i=Object(s.a)(a,3),l=i[1],u=i[2];if(!(parseInt(u)>(null!==(n=null===c||void 0===c||null===(r=c[l])||void 0===r?void 0:r.length)&&void 0!==n?n:0))){var j=d.a.resolve(e,o,t).stats;Object(m.a)(o,j)}})),o.equippedArtifacts=Object.fromEntries(Object.entries(t).map((function(e){var t=Object(s.a)(e,2),a=t[0],n=t[1];return[a,null===n||void 0===n?void 0:n.id]}))),o.setToSlots=c;var j=Object(f.a)(o,null===o||void 0===o?void 0:o.modifiers),b=Object(v.c)(j,o),h=b.initialStats;return(0,b.formula)(h),Object(i.a)(Object(i.a)({},o),h)},y.createInitialStats=function(e,t,a,o){var l,u,b,v,f=e=Object(O.d)(e),g=f.key,x=f.elementKey,S=f.level,w=f.ascension,_=f.hitMode,k=f.infusionAura,E=f.reactionMode,K=f.talent,A=f.constellation,N=f.equippedArtifacts,C=f.conditionalValues,T=void 0===C?{}:C,W=f.equippedWeapon,B=null!==(l=t._getWeapon(W))&&void 0!==l?l:Object(p.a)(a.weaponTypeKey),I=["enemyLevel"].concat(Object(r.a)(Object.keys(j.c))),V=Object.fromEntries(I.map((function(t){return[t,y.getStatValueWithOverride(e,a,o,t)]})));V.characterHP=a.getBase("hp",S,w),V.characterDEF=a.getBase("def",S,w),V.characterATK=a.getBase("atk",S,w),V.characterLevel=S,V.characterEle=null!==(u=null!==(b=a.elementKey)&&void 0!==b?b:x)&&void 0!==u?u:"anemo",V.characterKey=g,V.hitMode=_,V.infusionAura=k,V.reactionMode=E,V.conditionalValues=T,V.weaponType=a.weaponTypeKey,V.tlvl=Object.fromEntries(Object.entries(null!==K&&void 0!==K?K:{}).map((function(e){var t=Object(s.a)(e,2);return[t[0],t[1]-1]}))),V.constellation=A,V.ascension=w,V.weapon={key:B.key,refineIndex:B.refine-1},V.equippedArtifacts=N,["physical"].concat(Object(r.a)(h.d)).forEach((function(t){var n="".concat(t,"_enemyRes_");V[n]=y.getStatValueWithOverride(e,a,o,n),n="".concat(t,"_enemyImmunity"),V[n]=y.getStatValueWithOverride(e,a,o,n)}));var M=(null===(v=e)||void 0===v?void 0:v.baseStatOverrides)||{};Object.entries(M).forEach((function(e){var t=Object(s.a)(e,2),a=t[0],n=t[1];V.hasOwnProperty(a)||(V[a]=n)}));var F=a.getSpecializedStat(w);if(F){var H=a.getSpecializedStatVal(w);Object(m.a)(V,Object(c.a)({},F,H))}for(var R in a.getTalentStatsAll(V,V.characterEle).forEach((function(e){return Object(m.a)(V,e)})),V.tlvl){var L;V.tlvl[R]+=null!==(L=V["".concat(R,"Boost")])&&void 0!==L?L:0}var D=o.getMainStatValue(B.level,B.ascension);V.weaponATK=D;var q=o.getSubStatKey();q&&Object(m.a)(V,Object(c.a)({},q,o.getSubStatValue(B.level,B.ascension))),Object(m.a)(V,o.stats(V));T.artifact;var P=T.weapon,z=Object(n.a)(T,["artifact","weapon"]);return d.a.parseConditionalValues(Object(i.a)(Object(i.a)({},B.key&&{weapon:Object(c.a)({},B.key,null===P||void 0===P?void 0:P[B.key])}),z),(function(e,t,a){if(("character"!==a[0]||"talents"!==a[3]||a[4]===x)&&d.a.canShow(e,V)){var n=d.a.resolve(e,V,t).stats;Object(m.a)(V,n)}})),V},y.getDisplayStatKeys=function(e,t){var a=t.characterSheet,n=t.weaponSheet,c=t.artifactSheets,r=e.characterEle,o=["finalHP","finalATK","finalDEF","eleMas","critRate_","critDMG_","heal_","enerRech_","".concat(r,"_dmg_")];a.isAutoElemental||o.push("physical_dmg_");var l=Object(O.d)(v.a[r]),u=a.weaponTypeKey;l.includes("shattered_hit")||"claymore"!==u||l.push("shattered_hit");var j={},b=a.getTalent(r),f=function(t,a){return t.forEach((function(t){var n;t.formula&&(null===t||void 0===t||null===(n=t.canShow)||void 0===n?void 0:n.call(t,e))&&(j[a]||(j[a]=[]),j[a].push(t.formula.keys))}))},h=function(t,a){if(t.conditional&&d.a.canShow(t.conditional,e)){var n=d.a.resolve(t.conditional,e,null).fields;n&&f(n,a)}t.fields&&f(t.fields,a)};b&&Object.entries(b.sheets).forEach((function(e){var t=Object(s.a)(e,2),a=t[0],n=t[1].sections;"normal"!==a&&"charged"!==a&&"plunging"!==a||(a="auto"),n.forEach((function(e){return h(e,"talentKey_".concat(a))}))}));var m="weapon_".concat(e.weapon.key);return n.document&&n.document.map((function(e){return h(e,m)})),e.setToSlots&&Object.entries(e.setToSlots).map((function(e){var t=Object(s.a)(e,2);return[t[0],t[1].length]})).forEach((function(e){var t=Object(s.a)(e,2),a=t[0],n=t[1],r=c[a];r&&Object.entries(r.setEffects).forEach((function(e){var t=Object(s.a)(e,2),c=t[0],r=t[1].document;n<parseInt(c)||r&&r.map((function(e){return h(e,"artifact_".concat(a,"_").concat(c))}))}))})),Object(i.a)(Object(i.a)({basicKeys:o},j),{},{transReactions:l})}},229:function(e,t,a){"use strict";a.d(t,"a",(function(){return l}));var n=a(4),c=a(20),r=a(73),i=a(43);function s(e){var t=new Set;return e(new Proxy({},{get:function(e,a,n){t.add(a.toString())}})),Object(c.a)(t)}var o=Object.freeze(Object.fromEntries(Object.entries(i.b).map((function(e){var t=Object(n.a)(e,2);return[t[0],s(t[1])]}))));function l(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:Object.keys(i.d),n=new Set,r=[new Set,new Set];return a.forEach((function(a){return u(e,a,t,r,n)})),r.flatMap((function(e){return Object(c.a)(e)}))}function u(e,t,a,n,c){var s,l;c.has(t)||(c.add(t),null===(s=o[t])||void 0===s||s.forEach((function(t){return u(e,t,a,n,c)})),(null!==(l=a[t])&&void 0!==l?l:[]).forEach((function(t){return r.a.getCurrent(t,e)[1].forEach((function(t){return u(e,t,a,n,c)}))})),n[Object(i.e)(t)].add(t))}},230:function(e,t,a){"use strict";a.d(t,"a",(function(){return n})),a.d(t,"b",(function(){return c}));var n=function(e){return c(function(e){switch(e){case"sword":return"DullBlade";case"bow":return"HuntersBow";case"claymore":return"WasterGreatsword";case"polearm":return"BeginnersProtector";case"catalyst":return"ApprenticesNotes";default:return"DullBlade"}}(e))},c=function(e){return{id:"",key:e,level:1,ascension:0,refine:1,location:""}}}}]);
//# sourceMappingURL=0.2cdb4594.chunk.js.map