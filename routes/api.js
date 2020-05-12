/**Created by xiaoqi on 2020/3/3*/

const router = require('koa-router')();

router.get('/', async (ctx)=>{
    ctx.body = {"title":"这是一个api"}
});

router.get('/newsList', async (ctx)=>{
    ctx.body = {"title":"这是一个新闻列表api"}
});


/**============在模块加载的时候启动路由=============*/
module.exports = router.routes();