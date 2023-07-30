const textModel = require('../../mongoose/models/reclassify')
const slideshowsModel = require('../../mongoose/models/home/slideshow')
const floorVuesModel = require('../../mongoose/models/home/floorVue')
const searchsVuesModel = require('../../mongoose/models/home/Searchdata.js')

const axios = require('axios')

const express = require('express')

const router = express.Router()

const {data} = require('../../../搜索界面.json')

// 存入原始数据
// router.post('/product',(req,res)=>{
//   searchsVuesModel.insertMany(data).then((data)=>{
//     console.log('ok',data);
//   }).catch((error)=>{
//        console.log(失败);
//        console.log(error);
//   })
// res.send('ok')
// })

//三级分类全部数据,本地存的数据
router.get('/product/getBaseCategoryList',function(req, res, next) {
      textModel.find().then(
        (datas)=>{
           res.json({
            code:'0000',
            msg:'获取三级分类数据成功',
            data:datas
           }) 
           console.log('三级分类数据发送成功');
        }
      ).catch((error)=>{
          res.json(
            {
              code:'2003',
              msg:'获取失败',
              data:null
            }
          )
          return
      })
     
    });

//轮播图url数据，本地
router.get('/product/slideshowsModel',(req,res)=>{
  slideshowsModel.find().then(
    (datas)=>{
       res.json({
        code:'0000',
        msg:'获取轮播图数据成功',
        data:datas
       }) 
       console.log('轮播图数据发送成功');
    }
  ).catch((error)=>{
      res.json(
        {
          code:'2003',
          msg:'获取失败',
          data:null
        }
      )
      return
  })
})

//轮播图图片数据，本地
router.get('/public/images/:value',(req,res)=>{
    //  console.log('D:/wzzy/VUESGGSPH/Mycode/server/demo'+req.path);
     res.sendFile('D:/wzzy/VUESGGSPH/Mycode/server/demo'+req.path)
})

// 首页楼层图数据，本地
router.get('/product/floorVuesModel',(req,res)=>{
  floorVuesModel.find().then(
    (datas)=>{
       res.json({
        code:'0000',
        msg:'获取首页楼层图数据成功',
        data:datas
       }) 
       console.log('首页楼层图数据数据发送成功');
    }
  ).catch((error)=>{
      res.json(
        {
          code:'2003',
          msg:'获取失败',
          data:null
        }
      )
      return
  })
})

// 获取搜索页的数据，获取的
router.post('/product/searchsVuesModel',(req,res)=>{
  console.log(req.body);
  axios.post('http://gmall-h5-api.atguigu.cn/api/list',{...req.body}).then(
    (win)=>{
        console.log("搜索页数据发送成功"); 
        res.json(win.data)
    }
  ).catch(
    (nowin)=>{
      console.log("搜索页数据发送失败");
      res.json({
        code:'0000',
        msg:'获取失败'
       })
    }
  )
 // 以下是从自己的数据库获取
  // console.log(req.body)
  // searchsVuesModel.find().then(
  //   (datas)=>{
  //      res.json({
  //       code:'0000',
  //       msg:'获取全部数据成功',
  //       data:datas
  //      }) 
  //      console.log('搜索页的数据发送成功');
  //   }
  // ).catch((error)=>{
  //     res.json(
  //       {
  //         code:'2003',
  //         msg:'获取失败',
  //         data:null
  //       }
  //     )
  //     return
  // })
})

// 获取单个商品的详细信息，获取的
router.get('/product/detail/:id',(rep,res)=>{
    axios.get(`http://gmall-h5-api.atguigu.cn/api/item/${rep.params.id}`).then(
      (value)=>{
        console.log('单个商品数据发送成功');
             res.json(value.data);
      }
    ).catch(
      (error)=>{
        console.log(error);
        return
      }
    )
 
})

// 添加数据到购物车，获取的
router.post('/product/cart/addToCart/:id/:val',(req,res)=>{
  console.log('添加数据到购物车');
  const userTempId = req.headers.usertempid;
  const token = req.headers.token;
  console.log('1',userTempId);
     console.log(req.params.id,req.params.val);
    axios.post(`http://gmall-h5-api.atguigu.cn/api/cart/addToCart/${req.params.id}/${req.params.val}`,req.body,{
      headers:{
        userTempId:userTempId,
        token:token
      }
    }).then(
      (win)=>{
          console.log("添加数据到购物车成功"); 
          res.json(win.data)
      }
    ).catch(
      (nowin)=>{
        console.log("添加数据到购物车失败");
        res.json({
          code:'0000',
          msg:'获取失败'
         })
      }
    )
})

// 获取购物车数据，获取的
router.get('/product/cart/cartList',(req,res)=>{
  console.log('获取购物车列表');
  // console.log(req.headers.userTempId); // 不知道为什么得不到
  const userTempId = req.headers.usertempid;
  const token = req.headers.token;
  console.log('2',userTempId);
    axios.get('http://gmall-h5-api.atguigu.cn/api/cart/cartList',{
      headers:{
        userTempId:userTempId,
        token:token
      }
    }).then(
      (win)=>{
          console.log("获取购物车列表成功"); 
          res.json(win.data)
          // console.log('成功了',win.data);
      }
    ).catch(
      (nowin)=>{
        console.log("获取购物车列表失败");
        console.log(nowin);
        res.json({
          code:'0000',
          msg:'获取失败',
          data:nowin
         })
      }
    )
})

// 删除购物车数据，获取的
router.delete('/product/cart/deleteCart/:id',(req,res)=>{
  console.log('删除购物车列表');
  // console.log(req.headers.userTempId); // 不知道为什么得不到
  // 得到身份码
  const userTempId = req.headers.usertempid;
  const token = req.headers.token;
  console.log(req.params.id);
  /* 没有axios.delete的方法 */
    // axios.delete(`http://gmall-h5-api.atguigu.cn/api/cart/deleteCart/${req.params.id}}`,{
    //   headers:{
    //     userTempId:userTempId
    //   }
    // })

    axios.request({
      method: 'delete',
      url: `http://gmall-h5-api.atguigu.cn/api/cart/deleteCart/${req.params.id}`,
      headers: {
        userTempId: userTempId,
        token:token
      }}).then(
      (win)=>{
          console.log("删除购物车列表成功"); 
          res.json(win.data)
      }
    ).catch(
      (nowin)=>{
        console.log("删除购物车列表失败");
        console.log(nowin);
        res.json({
          code:'0000',
          msg:'获取失败',
          data:nowin
         })
      }
    )
})

// 切换状态，获取的
router.get('/product/cart/checkCart/:id/:ischecked',(req,res)=>{
  console.log('切换状态');
  // console.log(req.headers.userTempId); // 不知道为什么得不到
  const userTempId = req.headers.usertempid;
  const token = req.headers.token;
  console.log(token);
  console.log(req.params);
    axios.get(`http://gmall-h5-api.atguigu.cn/api/cart/checkCart/${req.params.id}/${req.params.ischecked}`,{
      headers:{
        userTempId:userTempId,
        token:token
      }
    }).then(
      (win)=>{
          console.log("切换状态成功"); 
          res.json(win.data)
          // console.log('成功了',win.data);
      }
    ).catch(
      (nowin)=>{
        console.log("切换状态失败");
        console.log(nowin);
        res.json({
          code:'0000',
          msg:'获取失败',
          data:nowin
         })
      }
    )
})

module.exports = router