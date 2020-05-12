/**Created by xiaoqi on 2020/3/3*/

const router = require('koa-router')();


router.get('/',async (ctx)=>{
    await ctx.render("default/index");
});
router.get('/case',async (ctx)=>{
    ctx.body = "案例";
});
router.get('/about',async (ctx)=>{
    ctx.body = "关于我们";
});

/**============在模块加载的时候启动路由=============*/
module.exports = router.routes();