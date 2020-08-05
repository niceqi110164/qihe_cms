/**Created by xiaoqi on 2020/3/8*/

const md5 = require('md5'),
   multer = require("@koa/multer");


let tools = {
    //配置图片上传 -->在哪里用到配置到哪里
    uploadImg(){
        let storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, 'public/upload');   /*配置图片上传的目录     注意：图片上传的目录必须存在*/
            },
            filename: function (req, file, cb) {   /*图片上传完成重命名*/
                //console.log(file);
                /** 对象
                 {    fieldname: 'header_logo',
                 originalname: 'newlogo.png',
                 encoding: '7bit',
                 mimetype: 'image/png' }
                 */
                let fileFormat = (file.originalname).split(".");   /*获取后缀名  分割数组*/
                cb(null,Date.now() + "." + fileFormat[fileFormat.length - 1]);
            }
        })
        let upload = multer({ storage: storage });
        return upload;
    },
    getMd5(str){
        return md5(str);

    },
    getTime(){
        return new Date();
    },
    /** 分类*/
    articleCateList(data){
        /** 循环获取一级分类*/
        let firstArr = [];
        for(let i=0;i<data.length;i++){
            if(data[i].pid ==="0"){
                firstArr.push(data[i])
            }
        }

        /** 把耳机分裂放到一级分类下*/
        for(let i=0; i<firstArr.length; i++){
            firstArr[i].list = [];
            for(let j=0; j<data.length; j++){
                /** */
                if(firstArr[i]._id.toString() === data[j].pid.toString()){
                    firstArr[i].list.push(data[j])
                }
            }
        }
        /** 返回处理完的数据*/
        return firstArr;
    }
};


module.exports = tools;