import Vue from "vue";
import Vuex from "vuex";

// 导入home小仓库
import home from "./home";
// 导入search小仓库
import search from "./Search"
// 导入想起小仓库
import detail from "./detail/index"
// 导入购物车小仓库
import cart from "./cart/index"
// 导入用户小仓库
import user from "./User"
// 导入订单详情小仓库
import pay from './pay'

Vue.use(Vuex)

const state = {

}

const mutations={

}

const actions = {

}

const getters = {

}





export default new Vuex.Store({
    state,mutations,actions,getters,
    modules:{     //设置小仓库
        home,
        search,
        detail,
        cart,
        user,
        pay
    }
})