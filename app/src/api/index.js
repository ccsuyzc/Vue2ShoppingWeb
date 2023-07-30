import requists from "./request";

/*  封装获取数据的函数  */


export const getTypeNav = () => {
   return requists({
      method: 'GET',
      url: 'http://localhost:8080/product/getBaseCategoryList'
   })
}

export const getListSwiper = () => {
   return requists(
      {
         method: 'get',
         url: 'http://localhost:8080/product/slideshowsModel'
      })
}

export const getFloor = ()=>{
   return requists({
      method:'get',
      url:'http://localhost:8080/product/floorVuesModel'
   })
}

export const postSearch = (val)=>{
   return requists.post(
      'http://localhost:8080/product/searchsVuesModel'
   ,val)
}

export const getdetail = (val)=>{
    return requists.get(`http://localhost:8080/product/detail/${val}`)
    
}


export const postAddCart = (id,val)=>{
   return requists.post(`http://localhost:8080/product/cart/addToCart/${id}/${val}`)
}


export const getCartList = ()=>{
   return requists.get('http://localhost:8080/product/cart/cartList')
}

export const deleteCart = (id)=>{
   return requists.delete(`http://localhost:8080/product/cart/deleteCart/${id}`)
}

export const ischecked = (id,ischecked2)=>{
   console.log('ywt',id,ischecked2);
   return requists.get(`http://localhost:8080/product/cart/checkCart/${id}/${ischecked2}`)
}

// 获取验证码
export const register = (phone)=>{
   return requists.get(`http://gmall-h5-api.atguigu.cn/api/user/passport/sendCode/${phone}`)
}
// 注册
export const postregister = (body)=>{
   return requists.post('http://gmall-h5-api.atguigu.cn/api/user/passport/register',body)
}

// 登录
export const postLogin = (body)=>{
   return requists.post('http://gmall-h5-api.atguigu.cn/api/user/passport/login',body)
}

// 退出登录
export const NoLogin = ()=>{
   return requists.get('http://gmall-h5-api.atguigu.cn/api/user/passport/logout')
}

// 获取订单详情页
export const getPay = ()=>{
   return requists({url:'http://gmall-h5-api.atguigu.cn/api/order/auth/trade',
method:'GET'})
}

// 提交订单
export const postPay = (tradeNo,body)=>{
   return requists.post(`http://gmall-h5-api.atguigu.cn/api/order/auth/submitOrder?tradeNo=${tradeNo}`,body)
}

// 获取订单支付信息
export const getpaydata = (orderId)=>{
   return requists.get(`http://gmall-h5-api.atguigu.cn/api/payment/weixin/createNative/${orderId}`)
}

// 查询订单的支付状态
export const getcode = (orderId)=>{
  return requists({method:"get",url:`http://gmall-h5-api.atguigu.cn/api/payment/weixin/queryPayStatus/${orderId}`})
}

// 获取个人中心我的订单列表
export const getOrder = (page,limit)=>{
  return requists({method:'get',url:`http://gmall-h5-api.atguigu.cn/api/order/auth/${page}/${limit}`})
} 