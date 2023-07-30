//导入 mongoose
const mongoose = require('mongoose');
//创建文档的结构对象
//设置集合中文档的属性以及属性值的类型


let navList = new mongoose.Schema( {
    url: String,
    text: String
},)

let carouselList = new mongoose.Schema({
        id: Number,
        imgUrl: String
})

let text1 = new mongoose.Schema( {
    id: Number,
    name: String,
    keywords:Array,
    imgUrl:String,
    navList: [navList],
    carouselList: [carouselList],
    recommendList:Array,
    bigImg: String
})


//创建模型对象  对文档操作的封装对象
let floorVuesModel = mongoose.model('floorVues', text1);

//暴露模型对象
module.exports = floorVuesModel;
