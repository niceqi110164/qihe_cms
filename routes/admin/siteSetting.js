/**Created by xiaoqi on 2020/7/8*/

const router = require('koa-router')(),
    tools = require('../../model/tools'),
    //multer = require("@koa/multer"),
    DB = require('../../model/db');


// let storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'public/upload');   /*配置图片上传的目录     注意：图片上传的目录必须存在*/
//     },
//     filename: function (req, file, cb) {   /*图片上传完成重命名*/
//         let fileFormat = (file.originalname).split(".");   /*获取后缀名  分割数组*/
//         cb(null,Date.now() + "." + fileFormat[fileFormat.length - 1]);
//     }
// })
//
// const upload = multer({ storage: storage });

/**========== 网站Logo管理 ============*/
router.get('/Logo',async (ctx)=>{

    let LogoResult= await DB.find('siteLogo',{});
    //console.log(LogoResult);
    if(LogoResult.length>0){
        await ctx.render('admin/siteSetting/Logo',{
            list:LogoResult[0]
        });
    }
});

/**========== 网站Logo管理 ============*/
router.get('/LogoEdit',async (ctx)=>{
    let id = ctx.query.id;
    let LogoEditResult= await DB.find('siteLogo',{});
    //console.log(result);
    if(LogoEditResult.length>0){
        await ctx.render('admin/siteSetting/LogoEdit',{
            list:LogoEditResult[0]
        });
    }
});

/**========== 网站Logo 上传 ============*/
router.post('/LogoUpload',
    tools.uploadImg().fields([{ name: 'header_logo', maxCount: 1}, {name: 'footer_logo', maxCount: 1}]),
    async (ctx) => {
        // console.log('ctx.request.files', ctx.request.files);
        // console.log('ctx.files', ctx.files);
        // console.log('ctx.request.body', ctx.request.body);
        //图片
        //console.log(ctx.request.files); 获取图片文件
        //console.log(ctx.request.body);  //获取文本文件
        let json = {
            add_time:tools.getTime(),
            id:ctx.request.body.id
        };

        if(ctx.request.files.header_logo){
            json.header_logo = ctx.request.files.header_logo[0].filename
        }
        if(ctx.request.files.footer_logo){
            json.footer_logo = ctx.request.files.footer_logo[0].filename
        }


        let upLoadImgResult = await DB.update('siteLogo',{"_id":DB.getObjectID(json.id)},json);
        //console.log(upLoadImgResult.result.ok);
        if(upLoadImgResult.result.ok ===1){
            /**返回成功数据*/
            ctx.body = {'message':'上传成功',success:true};
        }else{
            /**返回成功数据*/
            ctx.body = {'message':'上传失败',success:false};
        }
    }
);


/**========== 网站信息管理 ============*/
router.get('/siteInfo',async (ctx)=>{

    let siteInfoResult= await DB.find('siteInformation',{});
    //console.log(siteInfoResult);
    if(siteInfoResult.length>0){
        await ctx.render('admin/siteSetting/siteInfo',{
            list:siteInfoResult[0]
        });
    }
});


/**========== 网站信息管理 siteInfoEdit  ============*/
router.get('/siteInfoEdit',async (ctx)=>{
    let id = ctx.query.id;
    let siteInfoResult= await DB.find('siteInformation',{"_id":DB.getObjectID(id)});
    //console.log(siteInfoResult);
    if(siteInfoResult.length>0){
        await ctx.render('admin/siteSetting/siteInfoEdit',{
            list:siteInfoResult[0]
        });
    }
});


/**========== 网站信息管理 doSiteInfoEdit  ============*/
router.post('/doSiteInfoEdit',async (ctx)=>{
    //console.log(ctx.request.body);
    let json = ctx.request.body;
    if(json.site_title ===""){
        /**返回失败数据*/
        ctx.body = {'message':'标题不能为空',success:false};
    }else if(json.site_keywords ===""){
        /**返回失败数据*/
        ctx.body = {'message':'关键字不能为空',success:false};
    }else if(json.site_des ===""){
        /**返回失败数据*/
        ctx.body = {'message':'网站描述不能为空',success:false};
    }else if(json.site_recordNum ===""){
        /**返回失败数据*/
        ctx.body = {'message':'备案号不能为空',success:false};
    }else{
        let updataInfoResult = await DB.update('siteInformation',{"_id":DB.getObjectID(json.id)},json)
        if(updataInfoResult.result.ok === 1){
            /**返回失败数据*/
            ctx.body = {'message':'更新成功',success:true};
        }
    }
});



/**========== 网站联系方式管理 ============*/
router.get('/siteContact',async (ctx)=>{
    let siteContactResult= await DB.find('siteContact',{});
    //console.log(result);
    if(siteContactResult.length>0){
        await ctx.render('admin/siteSetting/siteContact',{
            list:siteContactResult[0]
        });
    }
});


/**========== 网站联系方式管理 ============*/
router.get('/siteContactEdit',async (ctx)=>{
    let id = ctx.query.id;
    let siteContactResult= await DB.find('siteContact',{"_id":DB.getObjectID(id)});
    //console.log(result);
    if(siteContactResult.length>0){
        await ctx.render('admin/siteSetting/siteContactEdit',{
            list:siteContactResult[0]
        });
    }
});

/**========== 网站联系方式管理 ============*/
router.post('/doSiteContactEdit',async (ctx)=>{
    //console.log(ctx.request.body);
    let json = ctx.request.body;
    if(!/^1\d{10}$/.test(json.site_tel1)){
        /**返回失败数据*/
        ctx.body = {'message':'电话1位数不对',success:false};
    }else if(!/^1\d{10}$/.test(json.site_tel2)){
        /**返回失败数据*/
        ctx.body = {'message':'电话2位数不对',success:false};
    }else if(!/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(json.site_email1)){
        /**返回失败数据*/
        ctx.body = {'message':'邮箱1格式不对',success:false};
    }else if(!/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(json.site_email2)){
        /**返回失败数据*/
        ctx.body = {'message':'邮箱2格式不对',success:false};
    }else if(json.site_address === ""){
        /**返回失败数据*/
        ctx.body = {'message':'地址不能为空',success:false};
    }else{
        let updataInfoResult = await DB.update('siteContact',{"_id":DB.getObjectID(json.id)},json)
        if(updataInfoResult.result.ok === 1){
            /**返回失败数据*/
            ctx.body = {'message':'更新成功',success:true};
        }
    }
});


/**============在模块加载的时候启动路由=============*/
module.exports = router.routes();