/**Created by xiaoqi on 2020/3/4*/

const router = require('koa-router')(),
      tools = require('../../model/tools'),
      DB = require('../../model/db');

/**========== 管理员首页 ============*/
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

/**========== doAdd操作 ============*/
router.post('/doAdd', async (ctx)=>{
    /**1.获取表单数据*/
    console.log(ctx.request.body);
    let json = {
        status:"1",
        last_time:new Date()
    };

    json.username = ctx.request.body.username;
   // json.password = tools.getMd5(ctx.request.body.password);
    json.password = ctx.request.body.password;
    json.rpassword = ctx.request.body.rpassword;
    /**2.验证表单数据是否合法*/
    if(!/^([a-zA-Z\u4E00-\u9FA5]*?)$/.test(json.username)){
        /**返回失败数据*/
        ctx.body = {'message':'用户名不合法',success:false};
    }else if(ctx.request.body.password.length<6 ||ctx.request.body.password.length>20){
        /**返回失败数据*/
        ctx.body = {'message':'密码长度为6~20',success:false};
    }else if(ctx.request.body.password !== ctx.request.body.rpassword){
        /**返回失败数据*/
        ctx.body = {'message':'两次密码不一致',success:false};
    }else{
        /**3.在数据库查询当前要增加的管理员是否存在*/
        let managerResult = await DB.find("managers",{"username":json.username});
        if(managerResult.length>0){
            /**返回失败数据*/
            ctx.body = {'message':'用户已存在',success:false};
        }else{
            /**4.增加管理员*/
            let insertResult = await DB.insert('managers',json);
            //console.log(insertResult);
            if(insertResult.result.ok === 1){
                /**返回成功数据*/
                ctx.body = {'message':'添加成功',success:true};
            }
        }
    }
});



/**========== 编辑管理员 ============*/
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

/**========== doEdit操作 ============*/
router.post('/doEdit',async (ctx)=>{
    //console.log(ctx.request.body);
    //{ username: '奔驰', password: '123456', rpassword: '123456' }
    //1.获取表单数据
    let id = ctx.request.body.id;
    /**2.验证表单数据是否合法*/
    if(ctx.request.body.password !== ""){//当密码部位空的时候向下执行
        if(ctx.request.body.password.length>20 || ctx.request.body.password.length<6){
            /**返回失败数据*/
            ctx.body = {'message':'密码长度为6~20',success:false};
        }else if(ctx.request.body.password !== ctx.request.body.rpassword){
            /**返回失败数据*/
            ctx.body = {'message':'两次密码不一致',success:false};
        }else{
            let updateResult =await DB.update("managers",{"_id":DB.getObjectID(id)},{
                username:ctx.request.body.username,
                password:ctx.request.body.password
            });
            if(updateResult.result.ok === 1){
                /**返回成功数据*/
                ctx.body = {'message':'修改成功',success:true};
            }
        }
    }
});






router.get('/delete',async (ctx)=>{
    ctx.body = '后台模板===删除用户'
});










/**============在模块加载的时候启动路由=============*/
module.exports = router.routes();