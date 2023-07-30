// import SearchView from "../view/search/index.vue"
// import HomeView from "@/view/Home/HomeView.vue";
// import Detail from "@/view/Detail/index.vue"
// import AddCartSuccess from '@/view/AddCartSuccess/index.vue'
// import shopcart from "@/view/ShopCart/index.vue"
// import login from "@/view/Login/index.vue"
// import register from "@/view/Register"
// import trade from "@/view/pays/Trade"

// export default [
//     {
//         name: 'trade',
//         path: '/trade',
//         component: trade,
//         meta: {
//             show: true,
//             login: true,
//         }
//     },
//     // 注册  
//     { 
//         name: 'register',
//         path: '/register',
//         component: register,
//         meta: {
//             show: true,
//             login: true,
//         }
//     },
//     // 登录
//     {
//         name: 'login',
//         path: '/login',
//         component: login,
//         meta: {
//             show: true,
//             login: true
//         }
//     },
//     // 购物车
//     {
//         name: 'ShopCart',
//         path: '/shopcart',
//         component: shopcart,
//         meta: {
//             show: true,
//             token: true
//         }
//     },
//     // 购物中转
//     {
//         name: 'AddCartSuccess',
//         path: '/AddCartSuccess',
//         component: AddCartSuccess,
//         meta: {
//             show: true,
//             token: true
//         }
//     },
//     // 主页
//     {
//         name: 'home',
//         path: '/home',
//         component: HomeView,
//         meta: {
//             show: true
//         }

//     },
//     // 搜索
//     {
//         name: 'search',
//         path: '/search/:value?',
//         component: SearchView,
//         meta: {
//             show: false
//         }
//     },
//     // 路由重定向
//     {
//         path: '/',
//         redirect: '/home',
//     },
//     // 商品详细信息
//     {
//         name: 'details',
//         path: '/details/:id?',
//         component: Detail,
//         meta: {
//             show: true
//         }
//     }
// ]