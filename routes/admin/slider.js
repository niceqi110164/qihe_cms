/**Created by xiaoqi on 2020/6/30*/

const router = require('koa-router')(),
    tools = require('../../model/tools'),
    DB = require('../../model/db');

/**========== 轮播图管理首页 ============*/
router.get('/',async (ctx)=>{
    /** 获取轮播图内容信息*/
    let sliderResult= await DB.find('slider',{});
    console.log(sliderResult);
    if(sliderResult.length>0){
        await ctx.render('admin/slider/sliderIndex',{
            list:sliderResult
        });
    }

});


/**========== 增加轮播图 ============*/
router.get('/sliderAdd',async (ctx)=>{
    await ctx.render('admin/slider/sliderAdd');
});

/**========== doNavAdd操作 ============*/
router.post('/doSliderAdd', async (ctx)=>{
    /**1.获取表单数据*/
    //console.log(ctx.request.body);
    let json = {
            last_time:tools.getTime()
        };

    json.slider_title = ctx.request.body.slider_title;
    json.slider_content = ctx.request.body.slider_content;
    json.sort = ctx.request.body.sort;
    json.status = ctx.request.body.status;
    /**2.验证表单数据是否合法*/
    if(!/[a-zA-Z0-9\u4e00-\u9fa5_]{2,20}/.test(json.slider_title)){//[a-zA-Z\u4e00-\u9fa5]{4,20}
        /**返回失败数据*/
        ctx.body = {'message':'标题不合法',success:false};
    }else{
        /**3.在数据库查询当前要增加的nav是否存在*/
        let sliderResult = await DB.find("slider",{"slider_title":json.slider_title});
        if(sliderResult.length>0){
            /**返回失败数据*/
            ctx.body = {'message':'标题已存在',success:false};
        }else{
            /**4.增加slider*/
            let insertSliderResult = await DB.insert('slider',json);
            //console.log(insertResult);
            if(insertSliderResult.result.ok === 1){
                /**返回成功数据*/
                ctx.body = {'message':'添加成功',success:true};
            }
        }
    }
});



/**========== 编辑管理员 ============*/
router.get('/sliderEdit',async (ctx)=>{
    /**get 方式获取id*/
    let id = ctx.query.id;
    /**到数据库 managers 表中查询数据*/
    let sliderResult = await DB.find('slider',{"_id":DB.getObjectID(id)});
    console.log(sliderResult);
    /**判断是否有数据*/
    if(sliderResult.length>0){
        await ctx.render('admin/slider/sliderEdit',{
            list:sliderResult[0]
        });
    }else{
        /**没有数据跳转到错误页面*/
        //await ctx.redirect('')
    }
});

/**========== doEdit操作 ============*/
router.post('/doSliderEdit',async (ctx)=>{
    //console.log(ctx.request.body);
    //{ nav_title: 'lolddd', nav_url: '/lolddd', sort: '82', status: '1' }
    //1.获取表单数据
    let json = {
        last_time:tools.getTime()
    };
    json.slider_title = ctx.request.body.slider_title;
    json.slider_content = ctx.request.body.slider_content;
    json.sort = ctx.request.body.sort;
    json.status = ctx.request.body.status;
    json.id = ctx.request.body.id;
    /**2.验证表单数据是否合法*/
    if(!/[a-zA-Z0-9\u4e00-\u9fa5_]{2,20}/.test(json.slider_title)){//[a-zA-Z\u4e00-\u9fa5]{4,20}
        /**返回失败数据*/
        ctx.body = {'message':'标题不合法',success:false};
    }else {
        /**3.在数据库修改当前slider*/
        let updateResult = await DB.update("slider",{'_id': DB.getObjectID(json.id)},json);
        //console.log(updateResult);
        if(updateResult.result.ok === 1){
            /**返回成功数据*/
            ctx.body = {'message':'修改成功',success:true};
        }
    }
});



/**============在模块加载的时候启动路由=============*/
module.exports = router.routes();