import {register,postregister,postLogin,NoLogin} from "../../api/index"

const state = {
   code:'',
   usermsg:{
   },
   token:localStorage.getItem('token') || ""
}

const mutations={
    GETREGISTER(state,value){
       state.code = value
    },
    POSTREGISTERDATA(state,value){
       state.usermsg = value
    },
    NOLOGIN(state){
       state.usermsg = ''
       state.token = ''
    }
}

const actions = {
    // 获取验证码
  async getRegister(minisotre,data){
        console.log('到这边了',data);
       await register(data).then((value)=>{
              console.log('成功',value);
              minisotre.commit('GETREGISTER',value.data)
            //   单独在js文件this没有指向Vue,所以不能用
            //   this.$bus.$emit('code',value)
        }).catch(
            (value)=>{
                console.log('失败',value);
            }
        )
    },

    // 注册
    async postRegisterdata(minisotre,data){
        console.log('触发了');
     let i = await postregister(data)
     console.log('i',i);
    if(i.code == 200){
        return 'ok'
    }else{
        return Promise.reject('error')
    }
},

// 登录
async postlogin(minisotre,datas){
    console.log('登录触发了');
    let i= await postLogin(datas)
    console.log('i',i);
    if(i.code == 200){
            minisotre.commit('POSTREGISTERDATA',i.data)
            localStorage.setItem('token',i.data.token)
            return 'ok'
        }else{
            return Promise.reject('error')
        }
    },

    /* 退出登录 */
async nologin(minisotre){
    console.log("dispath派发");
    let i = await NoLogin()
    if(i.code == 200){
        minisotre.commit('NOLOGIN')
        localStorage.removeItem("token")
        // 刷新界面
        location.reload()
        return 'ok'
    }else{
        return Promise.reject('error')
    }
}
}

const getters = {
     
}





export default  {
    state,mutations,actions,getters
}