webpackJsonp([11],{KQ4G:function(e,t){},NHnr:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});i("j1ja");var n=i("7+uW"),a={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{attrs:{id:"app"}},[t("router-view")],1)},staticRenderFns:[]};var o=i("VU/8")({name:"App"},a,!1,function(e){i("KQ4G")},null,null).exports,r=i("mvHQ"),u=i.n(r),s=i("NYxO"),d=i("woOf"),l=i.n(d),c={addToBasket:function(e,t){var i=l()({},e.products.find(function(e){return e.id===t.id}),t),n=e.basket.findIndex(function(e){var t=i.id,n=i.size,a=i.color;return e.id===t&&e.size===n&&e.color===a});n>=0?e.basket[n].count+=i.count:e.basket.push(l()({},i,{basketID:Date.now()}))},deleteFromBasket:function(e,t){e.basket=e.basket.filter(function(e){return e.basketID!==t})}};var m=[{id:1,name:"Stolik",dimensions:{height:40,width:30,depth:20},weight:20,material:"Бетон",description:"Ахуенный столи что бы колоть орехи на вечеринках и соло",article:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi.",image:{desktop:"desktop.jpg",mobile:"mobile.jpg"},price:4500,colors:[1,2,3,4]},{id:2,name:"Samurai",dimensions:{height:20,width:30,depth:40},weight:30,material:"Бетон",description:"Ахуенный столи что бы колоть орехи на вечеринках и соло",article:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi.",inverted:{mobile:{main:!0,inner:!1},desktop:{main:!0,inner:!1}},image:{desktop:"desktop.jpg",mobile:"mobile.jpg"},price:2500,sizes:{s:2500,m:5500,l:11700,xl:20500},colors:[1,4]},{id:3,name:"Konusoobra",dimensions:{height:100,width:30,depth:90},weight:50,material:"Стекло",description:"Ахуенный столи что бы колоть орехи на вечеринках и соло",article:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi.",inverted:{mobile:{main:!0,inner:!1},desktop:{main:!0,inner:!1}},image:{desktop:"desktop.jpg",mobile:"mobile.jpg"},price:7500}];var p=[{id:1,orderID:"697-501-576-26",username:"dfadf",email:"dfa@adad.da",products:[],phone:"12341234123",details:"dafadsf"},{id:2,orderID:"697-501-576-26",username:"adf",email:"324df@adad.da",products:[],phone:"89996009090",details:"dafaadfadfaf213424 wer34 dsf"}];n.a.use(s.a);var f={products:m,orders:p,basket:JSON.parse(localStorage.getItem("basket"))||[]},h=new s.a.Store({strict:!1,state:f,getters:{product:function(e){return function(t){return e.products.find(function(e){return e.id===t})}}},actions:{},mutations:c});h.watch(function(e){return e.basket},function(e){try{localStorage.setItem("basket",u()(e))}catch(e){e==QUOTA_EXCEEDED_ERR&&console.log("localStorage is full")}},{deep:!0});var b=h,v=i("/ocq");n.a.use(v.a);var g=new v.a({routes:[{path:"/",component:function(){return Promise.all([i.e(0),i.e(1)]).then(i.bind(null,"seJV"))},children:[{path:"/",name:"List",component:function(){return Promise.all([i.e(0),i.e(2)]).then(i.bind(null,"G8IT"))}},{path:"/product/:id",name:"Product",component:function(){return Promise.all([i.e(0),i.e(3)]).then(i.bind(null,"T7LP"))}}]},{path:"/admin",name:"Admin",component:function(){return Promise.all([i.e(0),i.e(4)]).then(i.bind(null,"XDC8"))},beforeEnter:function(e,t,i){console.log(e),console.log(t),i()},children:[{path:"orders",name:"OrderList",component:function(){return i.e(7).then(i.bind(null,"VUwJ"))}},{path:"orders/:id",name:"EditOrder",component:function(){return i.e(6).then(i.bind(null,"SDrG"))}},{path:"products",name:"ProductList",component:function(){return Promise.all([i.e(0),i.e(5)]).then(i.bind(null,"eMmo"))}},{path:"products/:id",name:"EditProduct",component:function(){return i.e(8).then(i.bind(null,"yZlR"))}}]},{path:"*",name:"NotFound",component:function(){return i.e(9).then(i.bind(null,"fdhC"))}}],mode:"history"});g.beforeEach(function(e,t,i){i()});var q=g;n.a.filter("formatNumber",function(e){return e&&(e+"").replace(/\B(?=(\d{3})+(?!\d))/g," ")}),n.a.config.productionTip=!1,new n.a({el:"#app",router:q,store:b,template:"<App/>",components:{App:o}})}},["NHnr"]);
//# sourceMappingURL=app.92cc6bbf97d89f4caa4d.js.map