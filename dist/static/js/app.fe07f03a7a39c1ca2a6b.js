webpackJsonp([11],{"2uFj":function(e,t,n){"use strict";n.d(t,"b",function(){return r}),n.d(t,"a",function(){return a});var r="http://88.212.254.100:4000",a={base:r,sendOrder:r+"/api/orders/new",products:r+"/api/products",orders:r+"/api/orders",categories:r+"/api/categories"}},IcnI:function(e,t,n){"use strict";var r=n("mvHQ"),a=n.n(r),o=n("7+uW"),s=n("NYxO"),i=n("Xxa5"),u=n.n(i),c=n("exGp"),d=n.n(c),l=n("2uFj"),p=n("M0ix"),f={loadProducts:function(e){var t=this,n=e.commit;return d()(u.a.mark(function e(){var r;return u.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,Object(p.a)({method:"GET",url:l.a.products});case 3:r=e.sent,n("setProducts",r.data),e.next=11;break;case 7:e.prev=7,e.t0=e.catch(0),console.log("damn! loading products error"),console.log(e.t0);case 11:case"end":return e.stop()}},e,t,[[0,7]])}))()},loadOrders:function(e){var t=this,n=e.commit;return d()(u.a.mark(function e(){var r;return u.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,Object(p.a)({method:"GET",url:l.a.orders});case 3:r=e.sent,n("setOrders",r.data),e.next=11;break;case 7:e.prev=7,e.t0=e.catch(0),console.log("damn! loading orders error"),console.log(e.t0);case 11:case"end":return e.stop()}},e,t,[[0,7]])}))()},loadCategories:function(e){var t=this,n=e.commit;return d()(u.a.mark(function e(){var r;return u.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,Object(p.a)({method:"GET",url:l.a.categories});case 3:r=e.sent,n("setCategories",r.data),e.next=11;break;case 7:e.prev=7,e.t0=e.catch(0),console.log("damn! loading categories error"),console.log(e.t0);case 11:case"end":return e.stop()}},e,t,[[0,7]])}))()}},m=n("woOf"),h=n.n(m),v={setProducts:function(e,t){e.products=t},setOrders:function(e,t){e.orders=t},setCategories:function(e,t){e.categories=t},addToBasket:function(e,t){var n=h()({},e.products.find(function(e){return e.id===t.id}),t),r=e.basket.findIndex(function(e){var t=n.id,r=n.size,a=n.color;return e.id===t&&e.size===r&&e.color===a});r>=0?e.basket[r].count+=n.count:e.basket.push(h()({},t,{basketID:Date.now()}))},deleteFromBasket:function(e,t){e.basket=e.basket.filter(function(e){return e.basketID!==t})}};var g={1:"Кашпо и вазоны",2:"Освещение",3:"Раковины",4:"Мебель",5:"Столешницы",6:"Плитка",7:"Аксессуары"};o.a.use(s.a);var b={categories:g,orders:[],basket:JSON.parse(localStorage.getItem("basket"))||[]},w=new s.a.Store({strict:!1,state:b,getters:{product:function(e){return function(t){return e.products.find(function(e){return e.id===t})}}},actions:f,mutations:v});w.watch(function(e){return e.basket},function(e){try{localStorage.setItem("basket",a()(e))}catch(e){e==QUOTA_EXCEEDED_ERR&&console.log("localStorage is full")}},{deep:!0});t.a=w},M0ix:function(e,t,n){"use strict";t.a=function(e){var t=e.method,n=void 0===t?"POST":t,r=e.url,o=e.data;return new s.a(function(e,t){i.a.$emit("api-loading");var s=new XMLHttpRequest;"GET"===n?s.open("GET",r+(/\?/.test(r)?"&":"?")+(new Date).getTime(),!0):s.open(n,r),"POST"===n&&s.setRequestHeader("Content-Type","application/json; charset=utf-8"),s.onload=function(){this.status>=200&&this.status<300?(i.a.$emit("api-loaded"),e(JSON.parse(s.response))):(i.a.$emit("api-loaded"),t({status:s.status,statusText:s.statusText}))},s.onerror=function(){i.a.$emit("api-loaded"),t({status:s.status,statusText:s.statusText})},"POST"===n&&o?s.send(a()(o)):s.send()})};var r=n("mvHQ"),a=n.n(r),o=n("//Fk"),s=n.n(o),i=n("n/Yi")},NHnr:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});n("j1ja");var r=n("7+uW"),a=n("Xxa5"),o=n.n(a),s=n("exGp"),i=n.n(s),u=(n("n/Yi"),n("IcnI")),c={name:"App",components:{uiSpinner:n("W1Kg").a},data:function(){return{loaded:!1}},mounted:function(){var e=this;return i()(o.a.mark(function t(){return o.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,u.a.dispatch("loadProducts");case 2:e.loaded=!0;case 3:case"end":return t.stop()}},t,e)}))()}},d={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{attrs:{id:"app"}},[this.loaded?t("router-view"):t("ui-spinner",{staticClass:"preload"})],1)},staticRenderFns:[]};var l=n("VU/8")(c,d,!1,function(e){n("XlVw")},null,null).exports,p=n("/ocq");r.a.use(p.a);var f=new p.a({routes:[{path:"/",component:function(){return Promise.all([n.e(0),n.e(3)]).then(n.bind(null,"seJV"))},children:[{path:"/",name:"List",component:function(){return Promise.all([n.e(0),n.e(6)]).then(n.bind(null,"G8IT"))}},{path:"/product/:id",name:"Product",component:function(){return Promise.all([n.e(0),n.e(7)]).then(n.bind(null,"T7LP"))}}]},{path:"/auth",name:"Auth",component:function(){return Promise.all([n.e(0),n.e(9)]).then(n.bind(null,"o5vO"))}},{path:"/admin",name:"Admin",component:function(){return Promise.all([n.e(0),n.e(4)]).then(n.bind(null,"XDC8"))},beforeEnter:function(e,t,n){"Admin"===e.name&&f.replace({name:"ProductList"}),n()},children:[{path:"orders",name:"OrderList",component:function(){return Promise.all([n.e(0),n.e(2)]).then(n.bind(null,"VUwJ"))}},{path:"products",name:"ProductList",component:function(){return Promise.all([n.e(0),n.e(8)]).then(n.bind(null,"eMmo"))}},{path:"products/:id",name:"EditProduct",component:function(){return Promise.all([n.e(0),n.e(1)]).then(n.bind(null,"yZlR"))}}]},{path:"*",name:"NotFound",component:function(){return Promise.all([n.e(0),n.e(5)]).then(n.bind(null,"fdhC"))}}],mode:"history"});f.beforeEach(function(e,t,n){n()});var m=f;r.a.filter("formatNumber",function(e){return e&&(e+"").replace(/\B(?=(\d{3})+(?!\d))/g," ")}),r.a.filter("getDate",function(e){return new Date(e).getDate()}),r.a.filter("getTime",function(e){var t=new Date(e),n=t.getHours(),r=t.getMinutes();return("0"+n).slice(-2)+":"+("0"+r).slice(-2)}),r.a.filter("getMonthName",function(e){return["января","февраля","марта","апреля","мая","июня","июля","августа","сентября","октября","ноября","декабря"][new Date(e).getMonth()]}),r.a.filter("getYear",function(e){return new Date(e).getFullYear()});var h=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;return(e+="").length>=t?e:new Array(t-e.length+1).join(n)+e};r.a.filter("pad",function(e){return h(e,2)});var v=n("Ine4"),g=n.n(v);r.a.config.productionTip=!1,r.a.use(g.a.default),new r.a({el:"#app",router:m,store:u.a,template:"<App/>",components:{App:l}})},W1Kg:function(e,t,n){"use strict";var r={render:function(){var e=this.$createElement,t=this._self._c||e;return t("svg",{staticClass:"spinner",attrs:{xmlns:"http://www.w3.org/2000/svg",version:"1.1",fill:"none",stroke:"#333",viewbox:"0 0 60 60"}},[t("circle",{attrs:{cx:"30",cy:"30",r:"25"}})])},staticRenderFns:[]};var a=n("VU/8")({name:"uiSpinner"},r,!1,function(e){n("YJXl")},"data-v-300602d9",null);t.a=a.exports},XlVw:function(e,t){},YJXl:function(e,t){},"n/Yi":function(e,t,n){"use strict";var r=n("7+uW");t.a=new r.a}},["NHnr"]);
//# sourceMappingURL=app.fe07f03a7a39c1ca2a6b.js.map