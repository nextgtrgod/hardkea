import Vue from "vue"
import Router from "vue-router"

// pages
import MainPage from "@/components/MainPage"
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
            path: "/tables",
            name: "MainPage",
            component: MainPage
        }
    ],
    mode: "history"
})
