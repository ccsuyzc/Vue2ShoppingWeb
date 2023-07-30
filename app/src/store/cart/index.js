import { postAddCart, getCartList, deleteCart, ischecked } from '../../api/index'
import CreateId from '../../tool/uuid'

let state = {
  cartDate: [],
  ShortTimeId: CreateId(),
  msg: 0
};

let mutations = {
  GETCART(state, val) {
    state.cartDate = val
  }
};

let actions = {
  /* 自己的常用写法 */
  // 添加到购物车
  async addCartDate(ministore, datas) {
    let { id, val } = datas
    await postAddCart(id, val).then(
      (val) => {
        console.log(val);
        //  ministore.commit('ADDCARTDATE',val)
      }
    ).catch(
      (error) => {
        console.log('购物车跳转页', error);
        return
      }
    )
  },

  /* 根据响应码来判断 */
  // async addCartDate(ministore,datas){
  //     console.log('addCartDate触发了');
  //     let {data,id,val} = datas
  //   let result=  await  postAddCart(data,id,val)
  //   if(result.code == 200){
  //     return "ok111"
  //   }else {
  //     return Promise.reject();
  //   }
  // }

  /* 获取购物车列表 */
  async getCart(ministore) {
    await getCartList().then(
      (datas) => {
        state.msg = datas.code
        // console.log('2',datas.data[0]);
        // console.log('1',datas.data[0].cartInfoList);
        ministore.commit('GETCART', datas.data[0].cartInfoList)
      }
    ).catch(
      (err) => {
        console.log(err);
      }
    )
  },

  /* 删除购物车单个列表 */
  async deleteCartData(ministore, id) {
    await deleteCart(id).then((data) => {
      console.log("删除成功", data);
    }).catch((error) => {
      console.log("删除失败", error);
    })
  },

  /* 切换状态 */
  async checkCart(ministore, data) {
    console.log('checkCart', data);
    await ischecked(data.id, data.isChecked).then((val) => {
      console.log('切换状态成功', val);
    }).catch((val) => {
      console.log('切换状态失败', val);
    })
  },

  /* 删除购物车整体 */
 async deleteCartAll(ministore) {
     ministore.state.cartDate.forEach(element =>{
          if(element.isChecked){
            ministore.dispatch("deleteCartData",element.skuId)
          }
     })
    ministore.dispatch('getCart')
  },

  /* 全选 */
 async selectAll(ministore, newval) {
    ministore.state.cartDate.forEach(element => {
      console.log('dispatch',element.skuId, Number(newval));
      const data = {
        id: element.skuId,
        isChecked: Number(newval)
      }
      ministore.dispatch('checkCart', data)
    });
   await ministore.dispatch('getCart')
  }
};

let getters = {

};

export default { state, mutations, actions, getters }
