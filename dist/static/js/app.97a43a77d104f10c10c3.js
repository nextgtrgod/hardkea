webpackJsonp([11],{KQ4G:function(e,t){},NHnr:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});n("j1ja");var o=n("7+uW"),i={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{attrs:{id:"app"}},[t("router-view")],1)},staticRenderFns:[]};var r=n("VU/8")({name:"App"},i,!1,function(e){n("KQ4G")},null,null).exports,a=n("mvHQ"),d=n.n(a),s=n("NYxO"),u=n("woOf"),c=n.n(u),l={addToBasket:function(e,t){var n=c()({},e.products.find(function(e){return e.id===t.id}),t),o=e.basket.findIndex(function(e){var t=n.id,o=n.size,i=n.color;return e.id===t&&e.size===o&&e.color===i});o>=0?e.basket[o].count+=n.count:e.basket.push(c()({},n,{basketID:Date.now()}))},deleteFromBasket:function(e,t){e.basket=e.basket.filter(function(e){return e.basketID!==t})}};var m=[{id:1,name:"Stolik",dimensions:{height:40,width:30,depth:20},weight:20,material:"Бетон",description:"Ахуенный столи что бы колоть орехи на вечеринках и соло",text:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",image:{desktop:"desktop.jpg",mobile:"mobile.jpg"},price:4500,colors:[1,2,3,4]},{id:2,name:"Samurai",dimensions:{height:20,width:30,depth:40},weight:30,material:"Бетон",description:"Ахуенный столи что бы колоть орехи на вечеринках и соло",text:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",inverted:{mobile:{main:!0,inner:!1},desktop:{main:!0,inner:!1}},image:{desktop:"desktop.jpg",mobile:"mobile.jpg"},price:2500,sizes:{s:2500,m:5500,l:11700,xl:20500},colors:[1,4]},{id:3,name:"Konusoobra",dimensions:{height:100,width:30,depth:90},weight:50,material:"Стекло",description:"Ахуенный столи что бы колоть орехи на вечеринках и соло",text:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",inverted:{mobile:{main:!0,inner:!1},desktop:{main:!0,inner:!1}},image:{desktop:"desktop.jpg",mobile:"mobile.jpg"},price:7500}];var p=[{id:1,orderID:"697-501-576-26",username:"dfadf",email:"dfa@adad.da",products:[],phone:"12341234123",details:"dafadsf"},{id:2,orderID:"697-501-576-26",username:"adf",email:"324df@adad.da",products:[],phone:"89996009090",details:"dafaadfadfaf213424 wer34 dsf"}];o.a.use(s.a);var f={products:m,orders:p,basket:JSON.parse(localStorage.getItem("basket"))||[]},h=new s.a.Store({strict:!1,state:f,getters:{product:function(e){return function(t){return e.products.find(function(e){return e.id===t})}}},actions:{},mutations:l});h.watch(function(e){return e.basket},function(e){try{localStorage.setItem("basket",d()(e))}catch(e){e==QUOTA_EXCEEDED_ERR&&console.log("localStorage is full")}},{deep:!0});var b=h,g=n("/ocq");o.a.use(g.a);var k=new g.a({routes:[{path:"/",name:"Public",component:function(){return Promise.all([n.e(0),n.e(1)]).then(n.bind(null,"seJV"))},children:[{path:"/",name:"List",component:function(){return Promise.all([n.e(0),n.e(2)]).then(n.bind(null,"G8IT"))}},{path:"/product/:id",name:"Product",component:function(){return Promise.all([n.e(0),n.e(3)]).then(n.bind(null,"T7LP"))}}]},{path:"/admin",name:"Admin",component:function(){return Promise.all([n.e(0),n.e(4)]).then(n.bind(null,"XDC8"))},beforeEnter:function(e,t,n){console.log(e),console.log(t),n()},children:[{path:"orders",name:"OrderList",component:function(){return n.e(7).then(n.bind(null,"VUwJ"))}},{path:"orders/:id",name:"EditOrder",component:function(){return n.e(6).then(n.bind(null,"SDrG"))}},{path:"products",name:"ProductList",component:function(){return Promise.all([n.e(0),n.e(5)]).then(n.bind(null,"eMmo"))}},{path:"products/:id",name:"EditProduct",component:function(){return n.e(8).then(n.bind(null,"yZlR"))}}]},{path:"*",name:"NotFound",component:function(){return n.e(9).then(n.bind(null,"fdhC"))}}],mode:"history"});k.beforeEach(function(e,t,n){n()});var v=k;o.a.filter("formatNumber",function(e){return e&&(e+"").replace(/\B(?=(\d{3})+(?!\d))/g," ")}),o.a.config.productionTip=!1,new o.a({el:"#app",router:v,store:b,template:"<App/>",components:{App:r}})}},["NHnr"]);
//# sourceMappingURL=app.97a43a77d104f10c10c3.js.map