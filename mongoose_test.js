/**Created by xiaoqi on 2020/7/27*/
console.time("stu");
const StuModel = require('./model/stu');
console.timeEnd("stu")


console.time("news");
const NewsModel = require('./model/news');
console.timeEnd("news")
//引入
// const mongoose = require('mongoose');
//链接数据库
//useNewUrlParser这个属性会在url里识别验证用户所需的db,未升级前是不需要指定,升级后必须指定
// mongoose.connect('mongodb://localhost:27017/test008', { useNewUrlParser: true, useUnifiedTopology: true }, (err)=>{
//     if(err){
//         console.log(err);
//         return
//     }
//     console.log("链接数据库成功~~~")
// });

//定义数据库方法
// mongoose.connection.once('open',(err)=>{
//     if(!err){
//         console.log("链接数据空成功~~~~");
//     }
//
// })
// mongoose.connection.once('close',(err)=>{
//     if(!err){
//         console.log("链接数据空关闭成功~~~~");
//     }
// })

//mongoose.disconnect()

//创建Schema (约束/模式)对象
//定义Schema可以理解为表结构的定义
// let stuSchema = new mongoose.Schema({
//     name:String,
//     age:Number,
//     gender:{
//         type:String,
//         default:"male"
//     },
//     addr:String
// })


//创建Model 代表的是数据库中的集合,通过Model才能对数据库进行操作
//mongoose.model(modelName,schema)
//modelName 就是要映射的集合名,mongoose 自动会将集合名变成复数
//如果直接输复数 就不改变
//第三个参数表实要操作的数据库
//let stuModel = mongoose.model("students",stuSchema,'students');

// let stuA = new stuModel({
//     name:"太平洋",
//     age:10000,
//     gender:"male",
//     addr:"地球中间"
// });
//
// stuA.save((err,result)=>{
//     if(err){
//         console.log(err);
//     }
//     console.log(result);
// })


//像数据库插入一个文档
// stuModel.create([
//     {
//         name:"李四",
//         age:28,
//         gender:"female",
//         addr:"故宫"
//     },
//     {
//         name:"王五",
//         age:158,
//         gender:"female",
//         addr:"恭王府"
//     }
// ],(err)=>{
//     if(!err){
//         console.log("插入成功~~~~~~~~~~~~~~");
//     }
// })
/**
    Model.find([conditions],[projection],[options],[callback])
        - 查询符合条件的所有文档  总会返回一个数组
    Model.findById([conditions],[projection],[options],[callback])
        - 根据id查询符合条件的文档   返回一个对象
    Model.findOne([conditions],[projection],[options],[callback])
        - 查询符合条件文档的第一个   返回一个对象
    conditions 查找条件
    projection 投影 要获取的字段
                - 两种表现方式
                    {name:1, age:1}
                    "name age -_id"  不需要_id时在前面加减号(-)
    options 查询选项(skip limit )
                - 以对象形式显示{skip:1,limit:1}
                - skip 跳过
                - limit 显示几个
    callback 回调函数,查询结果会通过回调函数返回
             回调函数必须传,如果不传回调函数,压根不会查询

 * */
// 第二个参数为投影  想要留上面就写什么  不要_id 在_id前加减号(-)
// stuModel.find({},"name age -_id",{skip:1,limit:1},(err,docs)=>{
//    if(!err){
//        console.log(docs);
//    }
// });

/**
 *     用来修改一个或多个文档
     Model.update([conditions ],doc,[option],[callback])
     Model.updateMany([conditions ],doc,[option],[callback])
     Model.updateOne([conditions ],doc,[option],[callback])
        - conditions 查询条件
        - doc   修改后的对象
        - option 配置参数
        - callback 回调函数
 * */
// stuModel.updateOne({name:"李四"},{$set:{age:222}},(err)=>{
//     if(!err){
//         console.log("修改成功");
//     }
// })

// let s = new stuModel({
//     name:'大地',
//     gender:'male',
//     addr:"的愤愤愤愤"
// });
// s.save((err)=>{
//     if(!err){
//         console.log("插入成功");
//     }
// })
//console.log(s)
/**
stuModel.updateOne({"":"dddd"},{$set:{age:555}},(err,raw)=>{
    if(err){
        console.log(err);
    }else{
        console.log("修改成功");
        console.log(raw);
    }
})

db.order.aggregate([
    {
        $lookup:{
            from:"order_item",
            localField:"order_id",
            foreignField:"order_id",
            as:"aaabbb"
        }
    },
    {
        $match:{
            "all_price":{$gte:90}
        }
    }
])

*/
//
// StuModel.find({},(err,docs)=>{
//     if(err){
//         console.log(err);
//         return
//     }
//     console.log(docs);
// });

NewsModel.create([
    {
        title:'北京新增1例大连关联',
        author:"baidu",
        desc:"7月27日0时至24时，我市新增境外输入病例1例、大连市疫情关联病例1例，无新增疑似病例和无症状感染者，治愈出院病例14例。",
        pic:"www.baidu.com"
    },
    {
        title:'杜特尔特:想首批用上',
        author:"baidu",
        desc:"我请求中国，有疫苗了菲律宾能首批用上吗？",
        pic:"https://www.itying.com"
    },
    {
        title:'工地收到通知书的搬砖',
        author:"baidu",
        desc:"工地收到通知书的搬砖男孩成为军官四年前，山村孩子魏凯伦收到了国防科技大学录取通知书，他激动地对着大山喊：“我走出去了！”四年后，魏凯伦从青年学子成长为一名军官，标定了人生航向。",
        pic:"www.px.com"
    }
],(err)=>{
    if(err){
        console.log(err);
        return
    }
    console.log('创建成功');
})


/**
 mongoose 预定义模式修饰符
 * */

NewsModel.findByAuthor("itying",(err,docs)=>{
    if(err){
        console.log(err);
    }
    console.log(docs);
})