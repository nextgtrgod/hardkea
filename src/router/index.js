import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
    routes: [

        // public
        {
            path: '/',
            // name: 'Public',
            component: () => import('@/components/public/Index'),
            children: [
                {
                    path: '/',
                    name: 'List',
                    component: () => import('@/components/public/List')
                },
                {
                    path: '/product/:id',
                    name: 'Product',
                    component: () => import('@/components/public/Product')
                }
            ],
        },

        // admin
        {
            path: '/admin',
            name: 'Admin',
            component: () => import('@/components/admin/Index'),
            beforeEnter: (to, from, next) => {
                console.log(to)
                console.log(from)

                next()
            },
            children: [
                {
                    path: 'orders',
                    name: 'OrderList',
                    component: () => import('@/components/admin/OrderList'),
                },
                {
                    path: 'orders/:id',
                    name: 'EditOrder',
                    component: () => import('@/components/admin/Order'),
                },
                {
                    path: 'products',
                    name: 'ProductList',
                    component: () => import('@/components/admin/ProductList'),
                },
                {
                    path: 'products/:id',
                    name: 'EditProduct',
                    component: () => import('@/components/admin/Product'),
                }, 
            ]
        },

        // 404
        {
            path: '*',
            name: 'NotFound',
            component: () => import('@/components/public/NotFound'),
        },

    ],
    mode: 'history',
})

router.beforeEach((to, from, next) => {
    // console.log(to)
    // console.log(from)

    next()
})

export default router
