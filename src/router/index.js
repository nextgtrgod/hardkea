import Vue from "vue"
import Router from "vue-router"

// pages
import MainPage from "@/components/MainPage"
import ProductPage from "@/components/ProductPage"
//

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: "/",
            name: "MainPage",
            component: MainPage
        },
        {
            path: "/product/:id",
            name: "ProductPage",
            component: ProductPage
        }
    ],
    mode: "history"
})
