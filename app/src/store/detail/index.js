import  { getdetail }  from '../../api/index'

const state = {
    detailData:{}
}

const mutations={
    GETDETAILDATA(state,value){
           state.detailData = value
    }
}

const actions = {
   async getdetailData(ministore,value){
       await getdetail(value).then(
            (value)=>{
                ministore.commit('GETDETAILDATA',value.data)
                // console.log('11',value);
            }
        ).catch(
            (value)=>{
                console.log('获取detail失败',value);
                return
            }
        )
    }
}

const getters = {
    categoryView(state){
        return state.detailData.categoryView || {};
    },
    skuInfo(state){
        return state.detailData.skuInfo || {};
    },
    spuSaleAttrList(state){
        return state.detailData.spuSaleAttrList || [];
    },
    valuesSkuJson(state){
        return state.detailData.valuesSkuJson || {};
    }
}





export default {
    state,mutations,actions,getters
}