//导入 mongoose
const mongoose = require('mongoose');
//创建文档的结构对象
//设置集合中文档的属性以及属性值的类型


let trademarkList = new mongoose.Schema({
    tmId: Number,
    tmName: String
},)

let attrsList = new mongoose.Schema({
    attrId: Number,
    attrValueList: Array,
    attrName: String
})


let goodsList = new mongoose.Schema({
    id: Number,
    defaultImg: String,
    title: String,
    price: Number,
    createTime: String,
    tmId: Number,
    tmName: String,
    category1Id: String,
    category1Name: String,
    category2Id: String,
    category2Name: String,
    category3Id: String,
    category3Name: String,
    hotScore: Number,
    attrs: String
})

let text1 = new mongoose.Schema({
    trademarkList:[trademarkList],
    attrsList:[attrsList],
    goodsList:[goodsList],
    total: Number,
    pageSize: Number,
    pageNo: Number,
    totalPages: Number
})


//创建模型对象  对文档操作的封装对象
let searchsVuesModel = mongoose.model('searchs', text1);

//暴露模型对象
module.exports = searchsVuesModel;
