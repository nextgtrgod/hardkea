import Vue from 'vue'
import Router from 'vue-router'

// public
import MainPage from '@/components/public/Index'
import ProductPage from '@/components/ProductPage'
//

Vue.use(Router)

const router =  new Router({
    routes: [
        {
            path: '/',
            name: 'MainPage',
            component: MainPage
        },
        {
            path: '/product/:id',
            name: 'ProductPage',
            component: ProductPage
        },
        {
            path: '/admin',
            component: () => import('@/components/admin/Index'),
            beforeEnter: (to, from, next) => {
                console.log(to)
                console.log(from)

                next()
            },
            children: [
                {
                    path: 'orders',
                    component: () => import('@/components/admin/OrderList'),
                },
                {
                    path: 'orders/:id',
                    component: () => import('@/components/admin/Order'),
                },
                {
                    path: 'products',
                    component: () => import('@/components/admin/ProductList'),
                },
                {
                    path: 'products/:id',
                    component: () => import('@/components/admin/Product'),
                }, 
            ]
        },

    ],
    mode: 'history',
})

router.beforeEach((to, from, next) => {
    console.log(to)
    console.log(from)

    next()
})

export default router
