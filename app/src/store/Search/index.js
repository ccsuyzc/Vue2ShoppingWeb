import  {postSearch}  from '../../api/index'

const state = {
    SearchAllData:{}
}

const mutations={
    GETSEARCHALLDATA(state,value){
        // console.log("1",value);
            state.SearchAllData = value
    }
}

const actions = {
 async  getSearchAllData(ministore,val){
     await postSearch(val).then(
            (value)=>{
                // console.log("3",value);
                // console.log("5",value.data);
               ministore.commit("GETSEARCHALLDATA",value.data)
            }
        ).catch()
    }
}

const getters = {
    trademarkList(state){
        return  state.SearchAllData.trademarkList || {}
    },
    goodsList(){
        return  state.SearchAllData.goodsList || {}
    },
    attrsList(){
        return  state.SearchAllData.attrsList || {}
    }
}



export default {
    state,mutations,actions,getters
}