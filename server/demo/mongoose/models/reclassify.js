//导入 mongoose
const mongoose = require('mongoose');
//创建文档的结构对象
//设置集合中文档的属性以及属性值的类型
let text3 = new mongoose.Schema({
  categoryName:String,
  categoryId:Number
})

let text2 = new mongoose.Schema({
  categoryChild:[text3],
  categoryName:String,
  categoryId:Number
})

let text1 = new mongoose.Schema({
  categoryChild:[text2],
  categoryName:String,
  categoryId:Number
})




// let BookSchema = new mongoose.Schema({
//   name: String,
//   author: String,
//   price: Number
// });

//创建模型对象  对文档操作的封装对象
let textModel = mongoose.model('texts', text1);

//暴露模型对象
module.exports = textModel;
