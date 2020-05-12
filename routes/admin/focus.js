/**Created by xiaoqi on 2020/3/3*/

const router = require('koa-router')();


router.get('/',async (ctx)=>{
    ctx.body = '后台模板===轮播图首页'
});
router.get('/add',async (ctx)=>{
    ctx.body = '后台模板===增加轮播图'
});
router.get('/edit',async (ctx)=>{
    ctx.body = '后台模板===编辑轮播图'
});
router.get('/delete',async (ctx)=>{
    ctx.body = '后台模板===删除轮播图'
});


/**============在模块加载的时候启动路由=============*/
module.exports = router.routes();