
import { getPay} from "../../api/index"
const state = {
pay:{}
}
const mutations = {
    GETPAYDATA(state,value){
        state.pay = value
    }
}
const actions = {
   async getpaydata(ministote){
       let i = await getPay()
       if(i.code == 200){
        console.log(i.data);
        ministote.commit('GETPAYDATA',i.data)
       }else{
        console.log('请求详情页出错',i);
        return
       }
    }
}

const getters = {

}

export default {
    state,actions,mutations,getters
}