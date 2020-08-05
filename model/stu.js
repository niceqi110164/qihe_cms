/**Created by xiaoqi on 2020/7/28*/

let mongoose = require('./mongoose_connect');

//定义Schema

let StuSchema = new mongoose.Schema({
    name:String,
    age:Number,
    gender:{
        type:String,
        default:"male"
    },
    addr:String

});

//定义model

let StuModel = mongoose.model('StuModel',StuSchema,"students");

module.exports = StuModel;