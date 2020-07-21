/**Created by xiaoqi on 2020/6/30*/

const router = require('koa-router')(),
    tools = require('../../model/tools'),
    DB = require('../../model/db');

/**========== aboutUs 首页 ============*/
router.get('/',async (ctx)=>{

    let aboutUsResult= await DB.find('aboutUs',{});
    //console.log(aboutUsResult);
    if(aboutUsResult.length>0){
        await ctx.render('admin/aboutUs/aboutUsIndex',{
            list:aboutUsResult[0]
        });
    }

});


/**========== aboutUs 管理 ============*/
router.get('/aboutUsEdit',async (ctx)=>{
    let id = ctx.query.id;
    let aboutUsEditResult= await DB.find('aboutUs',{});
    //console.log(aboutUsEditResult);
    if(aboutUsEditResult.length>0){
        await ctx.render('admin/aboutUs/aboutUsEdit',{
            list:aboutUsEditResult[0]
        });
    }
});


/**========== aboutUs 上传 ============*/
router.post('/aboutUsUpload',
    tools.uploadImg().fields([{ name: 'aboutUs_banner', maxCount: 1}, {name: 'aboutUs_smallPic', maxCount: 1}]),
    async (ctx) => {
        //console.log('ctx.request.files', ctx.request.files);
        // console.log('ctx.files', ctx.files);
        //console.log('ctx.request.body', ctx.request.body);
        //图片
        //console.log(ctx.request.files); 获取图片文件
        //console.log(ctx.request.body);  //获取文本文件

        let json = {
            add_time:tools.getTime(),
            id:ctx.request.body.id,
            aboutUs_title:ctx.request.body.aboutUs_title,
            aboutUs_des:ctx.request.body.aboutUs_des,
            aboutUs_film:ctx.request.body.aboutUs_film,
            aboutUs_TV:ctx.request.body.aboutUs_TV,
            aboutUs_develop:ctx.request.body.aboutUs_develop
        };

        if(ctx.request.files.aboutUs_banner){
            json.aboutUs_banner = ctx.request.files.aboutUs_banner[0].filename
        }
        if(ctx.request.files.aboutUs_smallPic){
            json.aboutUs_smallPic = ctx.request.files.aboutUs_smallPic[0].filename
        }


        let upLoadAboutUsResult = await DB.update('aboutUs',{"_id":DB.getObjectID(json.id)},json);
        //console.log(upLoadImgResult.result.ok);
        if(upLoadAboutUsResult.result.ok ===1){
            /**返回成功数据*/
            ctx.body = {'message':'上传成功',success:true};
        }else{
            /**返回成功数据*/
            ctx.body = {'message':'上传失败',success:false};
        }
    }
);





/**========== doEdit操作 ============*/
router.post('/doNavEdit',async (ctx)=>{
    //console.log(ctx.request.body);
    //{ nav_title: 'lolddd', nav_url: '/lolddd', sort: '82', status: '1' }
    //1.获取表单数据
    let json = {
        add_time:tools.getTime()
    };
    json.nav_title = ctx.request.body.nav_title;
    json.nav_url = ctx.request.body.nav_url;
    json.sort = ctx.request.body.sort;
    json.status = ctx.request.body.status;
    json.id = ctx.request.body.id;
    /**2.验证表单数据是否合法*/
    if(!/[a-zA-Z0-9\u4e00-\u9fa5_]{2,20}/.test(json.nav_title)){//[a-zA-Z\u4e00-\u9fa5]{4,20}
        /**返回失败数据*/
        ctx.body = {'message':'标题不合法',success:false};
    }else if(!/^\/([a-zA-Z])*/.test(json.nav_url)){
        /**返回失败数据*/
        ctx.body = {'message':'链接地址格式不正确',success:false};
    }else {
        /**3.在数据库修改当前nav*/
        let updateResult = await DB.update("nav",{'_id': DB.getObjectID(json.id)},json);
        //console.log(updateResult);
        if(updateResult.result.ok === 1){
            /**返回成功数据*/
            ctx.body = {'message':'修改成功',success:true};
        }
    }
});



/**============在模块加载的时候启动路由=============*/
module.exports = router.routes();