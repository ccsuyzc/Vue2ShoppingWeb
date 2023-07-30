import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter)

import store from '@/store'
// import {postLogin} from"../api/index"

// import routes from "./routerdata"
// 像这样引入的话，会直接引入了，建议不要这么引
// import SearchView from "../view/search/index.vue"
// import HomeView from "@/view/Home/HomeView.vue";
// import Detail from "@/view/Detail/index.vue"
// import AddCartSuccess from '@/view/AddCartSuccess/index.vue'
// import shopcart from "@/view/ShopCart/index.vue"
// import login from "@/view/Login/index.vue"
// import register from "@/view/Register"
// import trade from "@/view/pays/Trade"
// import pay from "@/view/pays/Pay"
// import PaySuccess from "@/view/pays/PaySuccess"
// import center from "@/view/pays/Center/index.vue"
// import MyRoders from "@/view/pays/Center/Myroders.vue"
// import Group from "@/view/pays/Center/group.vue"
// 在根本上解决编程式路由重复点击报错的问题

// 1.先缓存原始的push和replace的原型函数
const originalPush = VueRouter.prototype.push
const originalReplace = VueRouter.prototype.Replace

// 2.重写push
VueRouter.prototype.push = function (location, ok, no) {
    if (ok === undefined && no === undefined) {
        return originalPush.call(this, location).catch(() => { })
    } else {
        return originalPush.call(this, location, ok, no)
    }
}

// 3.重写replace
VueRouter.prototype.replace = function (location, ok, no) {
    if (ok === undefined && no === undefined) {
        return originalReplace.call(this, location).catch(() => { })
    } else {
        return originalReplace.call(this, location, ok, no)
    }
}



const router = new VueRouter({
    scrollBehavior() {
        // 始终滚动到顶部
        return { top: 0 }
      },
    routes:[
        {
            name: 'center',
            path: '/center',
            component: ()=>import('@/view/pays/Center/index.vue'),
            children:[
                // 设置默认二级路由展示
                {
                    path: '/center',
                    redirect: 'Myroders'
                },
               {
                name:'Myroders',
                path:'myroders', //千万不要写成/myroders
                component:()=>import('@/view/pays/Center/Myroders.vue'),  //这样是路由懒加载，有利于优化性能
                meta: {
                    login: true,
                }
               },
               {
                name:'Group',
                path:'group',
                component:()=>import('@/view/pays/Center/group.vue'),
                meta: {
                    login: true,
                }
               },
            ],
            meta: {
                show: true,
                login: true,
            }
        },
        {
            name: 'PaySuccess',
            path: '/PaySuccess',
            component: ()=>import('@/view/pays/PaySuccess'),
            meta: {
                show: true,
                login: true,
            }
        },
        {
            name: 'pay',
            path: '/pay',
            component: ()=>import("@/view/pays/Pay"),
            meta: {
                show: true,
                login: true,
            }
        },
        {
            name: 'trade',
            path: '/trade',
            component: ()=>import("@/view/pays/Trade"),
            meta: {
                show: true,
                login: true,
            }
        },
        // 注册  
        { 
            name: 'register',
            path: '/register',
            component: ()=>import("@/view/Register"),
            meta: {
                show: true,
                login: true,
            }
        },
        // 登录
        {
            name: 'login',
            path: '/login',
            component: ()=>import("@/view/Login/index.vue"),
            meta: {
                show: true,
                login: true
            },
            // beforeEnter(to,from){  //路由独享守卫
            // }
        },
        // 购物车
        {
            name: 'ShopCart',
            path: '/shopcart',
            component: ()=>import("@/view/ShopCart/index.vue"),
            meta: {
                show: true,
                token: true
            }
        },
        // 购物中转
        {
            name: 'AddCartSuccess',
            path: '/AddCartSuccess',
            component: ()=>import('@/view/AddCartSuccess/index.vue'),
            meta: {
                show: true,
                token: true
            }
        },
        // 主页
        {
            name: 'home',
            path: '/home',
            component:()=>import("@/view/Home/HomeView.vue"),
            meta: {
                show: true
            }
    
        },
        // 搜索
        {
            name: 'search',
            path: '/search/:value?',
            component: ()=>import("../view/search/index.vue"),
            meta: {
                show: false
            }
        },
   
        // 商品详细信息
        {
            name: 'details',
            path: '/details/:id?',
            component: ()=>import("@/view/Detail/index.vue"),
            meta: {
                show: true
            }
        },     // 路由重定向
        {
            path: '/',
            redirect: '/home',
        },
    ]
})

// 路由前卫
router.beforeEach((to, from, next) => {
    next()
    if (to.meta.token) {
        if (!localStorage.getItem('token')) {
            next({ name: 'login' })
            return
        }else{
            store.dispatch('postlogin',)
        }
    }
    if (to.meta.login) {
        if (localStorage.getItem('token')) {
            next(false)
            return
        }
    }
    // next()
})

export default router