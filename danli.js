/**Created by xiaoqi on 2020/2/26*/

class Db{
    /**单例
     * 无论你实例化多少次,构造函数只执行一次
     *  实例化只执行一次
     * */
    static getInstance(){
        if(!Db.instance){
            Db.instance = new Db();
        }
        return Db.instance;
    }
    constructor(){
        console.log('实例化会触发构造函数');
    }
    connect(){
        console.log('连接数据库');
    }
    find(){
        console.log('查询数据库')
    }
}

let myDb = Db.getInstance();
let myDb2 = Db.getInstance();
//
myDb.find();

myDb2.find();
