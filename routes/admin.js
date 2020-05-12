/**Created by xiaoqi on 2020/3/3*/

const router = require('koa-router')(),
        user = require('./admin/user'),
       focus = require('./admin/focus'),
      manager = require('./admin/manager'),
      index = require('./admin/index'),
       login = require('./admin/login');


/**========配置全局变量===========*/
router.use(async (ctx,next)=>{
    ctx.state.__HOST__ = "http://" + ctx.request.header.host;


    /**
     * 登录权限判断
     * 如果session中存在userInfo 就向下匹配
     * 如果session中不存userInfo 就在判断url
     *                              如果url为 /admin/login 就继续向下匹配
     *                              如果url不是 /admin/login 就需要重定向到 /admin/login
     * */
    if(ctx.session.userInfo){

        await next();
    }else{
        if(ctx.url === "/admin/login" || ctx.url === "/admin/login/doLogin"){
            await next();
        }else{
            ctx.redirect('/admin/login')
        }

    }



});



router.use(index);
router.use('/user',user);
router.use('/focus',focus);
router.use('/manager',manager);
router.use('/login',login);



/**============在模块加载的时候启动路由=============*/
module.exports = router.routes();