/**Created by xiaoqi on 2020/2/26*/

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var dbName = 'qihe';

console.time('asp');
MongoClient.connect(url, { useNewUrlParser: true ,useUnifiedTopology: true}, function(err, client) {
    if (err) throw err;
    let db = client.db(dbName);
    console.timeEnd("asp");
    console.log("数据库已创建!");

    db.collection('userinfo').insertOne({name:'wagnwu666',age:111,sex:'male'},(err,data)=>{
        console.log('增加成功');
        client.close();

    })
});