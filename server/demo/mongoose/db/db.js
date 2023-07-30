module.exports = function(success,error){
  if(typeof error !== 'function'){
    error= ()=>{
         console.log("链接失败!");
         return
    }
  }

  const mongoose = require('mongoose');

  mongoose.set('strictQuery', true);

  const {DBHOST, DBPORT, DBNAME} = require('../config/index.js');

  mongoose.connect(`mongodb://${DBHOST}:${DBPORT}/${DBNAME}`);
  
  mongoose.connection.once('open', () => {
    console.log('数据库连接成功');
    success();
  });

  mongoose.connection.on('error', () => {
    error();
    return
  });

  mongoose.connection.on('close', () => {
    console.log('连接关闭');
  });
}