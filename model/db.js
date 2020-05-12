/**Created by xiaoqi on 2020/2/26*/

//DB库
const MongoDB = require('mongodb');
const MongoClient = MongoDB.MongoClient;
const ObjectID = MongoDB.ObjectID;
let config = require('./config');


/**
 * 1.数据库多次连接的问题
 * 2.多次实例不共享的问题
 * */

class Db {
    /**使用Db的静态属性来解决多次实例共享*/
    static getIntence(){
        if(!Db.instance){
            Db.instance = new Db();
        }
        return Db.instance;
    }
    constructor(){
        this.dbClient = ""; /**属性存放db对象*/
        this.connect();  /**实例化就连接数据库*/
    }
    /**连接数据库*/
    connect(){ /**使用Promise把数据发送出去*/
        return new Promise((resolve,reject)=>{
            if(!this.dbClient){
                MongoClient.connect(config.dbUrl, { useNewUrlParser: true ,useUnifiedTopology: true}, (err, client)=>{
                    if (err){
                        reject(err)
                    }
                    /** 让this.dbClient属性保存 db对象 */
                    this.dbClient = client.db(config.dbName);
                    console.log("数据库已创建!");
                    resolve(this.dbClient);
                })
            }else{
                resolve(this.dbClient);
            }
        });
    }
    //
    find(collectionName,json){
        /**
         * find()方法里想要使用 connect()方法里的数据
         * 想要获取数据就i要使用异步回调
         * 在这里使用 Promise()
         * */
        return new Promise((resolve,reject)=>{
            this.connect().then((db)=>{
                let result = db.collection(collectionName).find(json);
                result.toArray((err,docs)=>{
                    if(err){
                        reject(err);
                    }
                    resolve(docs);
                })
            })
        })
    }
    //
    insert(collectionName,json){
        return new Promise((resolve,reject)=>{
            this.connect().then((db)=>{
                db.collection(collectionName).insertOne(json,(err,data)=>{
                    if(err){
                        reject(err)
                    }
                    resolve(data);
                })
            })
        })
    }

    update(collectionName,json1,json2){
        return new Promise((resolve,reject)=>{
            this.connect().then((db)=>{
                db.collection(collectionName).updateOne(json1,{$set:json2},(err,result)=>{
                    if(err){
                        reject(err)
                    }
                    resolve(result);
                })
            })
        })
    }
    //
    delete(collectionName,json){
        return new Promise((resolve,reject)=>{
            this.connect().then((db)=>{
                db.collection(collectionName).removeOne(json,(err,result)=>{
                    if(err){
                        reject(err)
                    }
                    resolve(result)
                })
            })
        })
    }

    getObjectID(id){ /**mongodb里面查询 _id 把字符串转换成对象*/
        return new ObjectID(id)
    }
}


module.exports = Db.getIntence();