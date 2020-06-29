/**Created by xiaoqi on 2020/6/29*/

const router = require('koa-router')(),
    tools = require('../../model/tools'),
    DB = require('../../model/db');

/**========== 管理员首页 ============*/
router.get('*',async (ctx)=>{

    await ctx.render('admin/error/404');
});


/**============在模块加载的时候启动路由=============*/
module.exports = router.routes();