webpackJsonp([7],{"6Is7":function(t,e){},G8IT:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n("Dd8w"),r=n.n(i),s=(n("n/Yi"),n("NYxO")),o=n("Mt0/"),c=n("Sxp6"),d={name:"List",mixins:[o.a,c.a],data:function(){return{blur:!1}},computed:r()({},Object(s.b)({products:function(t){return t.products}})),created:function(){},methods:{checkInverted:function(t){return console.log(t),!!t.inverted&&("desktop"===this.device?t.inverted.desktop.main:t.inverted.mobile.main)}}},a={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{class:{blur:t.blur},attrs:{id:"list"}},t._l(t.products,function(e){return n("section",{key:e.id,class:{inverted:t.checkInverted(e)}},[n("router-link",{attrs:{to:"/product/"+e.id}},["desktop"===t.device?n("img",{attrs:{src:e.image.desktop}}):n("img",{attrs:{src:e.image.mobile}})]),t._v(" "),n("div",{staticClass:"text"},[n("h3",[t._v(t._s(e.name))]),t._v(" "),n("p",{domProps:{innerHTML:t._s(e.description)}}),t._v(" "),n("button",{on:{click:function(n){t.openDetails(e.id)}}},[t._v("\n\t\t\t\t"+t._s(t._f("formatNumber")(e.price))+" ₽\n\t\t\t")])])],1)}))},staticRenderFns:[]};var u=n("VU/8")(d,a,!1,function(t){n("6Is7")},"data-v-2e69fcd0",null);e.default=u.exports},Sxp6:function(t,e,n){"use strict";var i=n("n/Yi"),r={methods:{openDetails:function(t){i.a.$emit("modal-open",{name:"details",productID:t})}}};e.a=r}});
//# sourceMappingURL=7.8e12108f7b4f71e50369.js.map