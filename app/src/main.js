import Vue from "vue";
import App from './App.vue'
import router from "./router";
import store from "./store";

// 导入图片懒加载
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload)

// 全局化组件
import TypeNavVue from "./view/Home/components/TypeNav.vue";
import TypeSearch from "./components/home/HomeView.vue"
import PagNation from "./components/Pagination/PagiNation.vue"
Vue.component('TypeNav',TypeNavVue)
Vue.component('TypeSearch',TypeSearch)
Vue.component('PagNation',PagNation)

// 局部导入饿了么ui组件
import {MessageBox}from 'element-ui';
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

// 导入网络请求文件
import * as api from "./api/index"


Vue.config.productionTip = false
new Vue({
    el:'#app',
    render:h=>h(App),
    beforeCreate(){
        Vue.prototype.$bus = this,
        Vue.prototype.$api = api
    },
    router,
    store
})