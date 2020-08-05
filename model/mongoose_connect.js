/**Created by xiaoqi on 2020/7/28*/
//引入
const mongoose = require('mongoose');
//链接数据库
//useNewUrlParser这个属性会在url里识别验证用户所需的db,未升级前是不需要指定,升级后必须指定
mongoose.connect('mongodb://localhost:27017/test008', { useNewUrlParser: true, useUnifiedTopology: true }, (err)=>{
    if(err){
        console.log(err);
        return
    }
    console.log("链接数据库成功~~~")
});

module.exports = mongoose;