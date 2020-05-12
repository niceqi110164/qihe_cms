/**Created by xiaoqi on 2020/3/4*/

const router = require('koa-router')(),
      tools = require('../../model/tools'),
      DB = require('../../model/db');

router.get('/',async (ctx)=>{

    let result= await DB.find('managers',{});
    //console.log(result);
    await ctx.render('admin/manager/index',{
        list:result
    });
});


/**========== 增加管理员 ============*/
router.get('/add',async (ctx)=>{
    await ctx.render('admin/manager/add');
});

router.post('/doAdd', async (ctx)=>{
    /**1.获取表单数据*/
    console.log(ctx.request.body);
    let json = {
        status:"1",
        last_time:new Date()
    };
    json.username = ctx.request.body.username;
    json.password = tools.getMd5(ctx.request.body.password);
    json.rpassword = ctx.request.body.rpassword;
    /**2.验证表单数据是否合法*/
    if(!/[a-zA-Z\u4e00-\u9fa5]{4,20}/.test(json.username)){
        await ctx.render("admin/error/error",{
            message: '用户名不合法',
            redirect: ctx.state.__HOST__ + '/admin/manager/add'
        })
    }else if(ctx.request.body.password.length<6 ||ctx.request.body.password.length>20){
        await ctx.render('admin/error', {
            message: '密码长度为6~20为之间',
            redirect: ctx.state.__HOST__ + '/admin/manager/add'
        });
    }else if(ctx.request.body.password !== ctx.request.body.rpassword){
        await ctx.render('admin/error',{
            message:'两次输入的密码不一致',
            redirect:ctx.state.__HOST__+'/admin/manager/add'
        });
    }else{
        /**3.在数据库查询当前要增加的管理员是否存在*/
        let managerResult = await DB.find("managers",{"username":json.username});
        if(managerResult.length>0){
            await ctx.render('admin/error',{
                message:'用户名已存在',
                redirect:ctx.state.__HOST__+'/admin/manager/add'
            })
        }else{
            /**4.增加管理员*/
            let insertResult = await DB.insert('managers',json);
            //console.log(insertResult);
            if(insertResult.result.ok === 1){
                //await ctx.redirect('/admin/manager/index')
                await ctx.redirect(ctx.state.__HOST__+'/admin/manager')
            }
        }
    }


    //await DB.insert('managers')
});




/**编辑页面*/
router.get('/edit',async (ctx)=>{
    /**get 方式获取id*/
    let id = ctx.query.id;
    /**到数据库 managers 表中查询数据*/
    let result = await DB.find('managers',{"_id":DB.getObjectID(id)});
    /**判断是否有数据*/
    if(result.length>0){
        await ctx.render('admin/manager/edit',{
            list:result[0]
        });
    }else{
        /**没有数据跳转到错误页面*/
        //await ctx.redirect('')
    }
});

/**编辑页面*/
router.post('/doEdit',async (ctx)=>{
    console.log(ctx.request.body);
    ctx.body = "doEdit";
});


router.get('/delete',async (ctx)=>{
    ctx.body = '后台模板===删除用户'
});










/**============在模块加载的时候启动路由=============*/
module.exports = router.routes();