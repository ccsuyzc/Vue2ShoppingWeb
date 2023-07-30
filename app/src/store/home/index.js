import  {getTypeNav,getListSwiper,getFloor}  from '../../api/index'

const state = {
    // 三级导航数据
    TypeNavData:[],

    // 三级导航轮播图数据
    ListSwiperData:[],

    // 楼层图数据
    FloorData:[]
}

const mutations={
    // 三级导航
    TYPENAV(state,value){
         state.TypeNavData = value
    },

    // 三级导航中的轮播图
    LISTSWIPER(state,value){
        state.ListSwiperData = value
    },

    // 楼层图
    FLOOR(state,value){
        state.FloorData = value
    }
}

const actions = {
  async TypeNav(ministore){
     await getTypeNav().then((val)=>{
           ministore.commit('TYPENAV',val.data)
   }).catch(()=>{})
  },

  async listswiper(ministore){
    await getListSwiper().then((val)=>{
         ministore.commit('LISTSWIPER',val.data)
    }).catch()         
  },

 async Floor(ministore){
       await getFloor().then((val)=>{
        // console.log(val);
        ministore.commit('FLOOR',val.data)
       }).catch()
  }
}

const getters = {
}





export default {
    state,mutations,actions,getters
}