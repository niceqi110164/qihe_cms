/**Created by xiaoqi on 2020/3/8*/

const md5 = require('md5');


let tools = {

    getMd5(str){
        return md5(str)

    }
};


module.exports = tools;