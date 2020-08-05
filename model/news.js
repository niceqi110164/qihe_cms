/**Created by xiaoqi on 2020/7/28*/

let mongoose = require('./mongoose_connect');

//定义Schema

let NewsSchema = new mongoose.Schema({
    title:String,
    author:String,
    desc:String,
    pic:{
            type:String,
            set(params){
                if(!params){
                    return ""
                }else{
                    if(params.indexOf("http://")!==0 && params.indexOf("https://")!==0){
                        return 'http://'+params;
                    }else{
                        return params;
                    }
                }

            }
        },
    status:{
        type:Number,
        default:1
    }
});


//静态方法
NewsSchema.statics.findByAuthor = function(name,cb){
    console.log(this)
    console.log("this")

    this.find({"author":name},(err,docs)=>{
        cb(err,docs)
    })
}

//定义 model

module.exports = mongoose.model("NewsModel",NewsSchema,"news");

