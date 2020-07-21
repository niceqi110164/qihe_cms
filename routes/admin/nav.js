/**Created by xiaoqi on 2020/6/30*/

const router = require('koa-router')(),
    tools = require('../../model/tools'),
    DB = require('../../model/db');

/**========== 导航管理首页 ============*/
router.get('/',async (ctx)=>{

    let result= await DB.find('nav',{});
    //console.log(result);
    await ctx.render('admin/nav/navIndex',{
        list:result
    });
});


/**========== 增加导航 ============*/
router.get('/navAdd',async (ctx)=>{
    await ctx.render('admin/nav/navAdd');
});

/**========== doNavAdd操作 ============*/
router.post('/doNavAdd', async (ctx)=>{
    /**1.获取表单数据*/
    //console.log(ctx.request.body);
    let json = {
            add_time:tools.getTime()
        };

    json.nav_title = ctx.request.body.nav_title;
    json.nav_url = ctx.request.body.nav_url;
    json.sort = ctx.request.body.sort;
    json.status = ctx.request.body.status;
    /**2.验证表单数据是否合法*/
    if(!/[a-zA-Z0-9\u4e00-\u9fa5_]{2,20}/.test(json.nav_title)){//[a-zA-Z\u4e00-\u9fa5]{4,20}
        /**返回失败数据*/
        ctx.body = {'message':'标题不合法',success:false};
    }else if(!/^\/[a-zA-Z]/.test(json.nav_url)){
        /**返回失败数据*/
        ctx.body = {'message':'地址格式不正确',success:false};
    }else{
        /**3.在数据库查询当前要增加的nav是否存在*/
        let navResult = await DB.find("nav",{"nav_title":json.nav_title});
        if(navResult.length>0){
            /**返回失败数据*/
            ctx.body = {'message':'标题已存在',success:false};
        }else{
            /**4.增加nav*/
            let insertResult = await DB.insert('nav',json);
            //console.log(insertResult);
            if(insertResult.result.ok === 1){
                /**返回成功数据*/
                ctx.body = {'message':'添加成功',success:true};
            }
        }
    }
});



/**========== 编辑管理员 ============*/
router.get('/navEdit',async (ctx)=>{
    /**get 方式获取id*/
    let id = ctx.query.id;
    /**到数据库 managers 表中查询数据*/
    let result = await DB.find('nav',{"_id":DB.getObjectID(id)});
    //console.log(result);
    /**判断是否有数据*/
    if(result.length>0){
        await ctx.render('admin/nav/navEdit',{
            list:result[0]
        });
    }else{
        /**没有数据跳转到错误页面*/
        //await ctx.redirect('')
    }
});

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