/**Created by xiaoqi on 2020/3/3*/

const router = require('koa-router')();


router.get('/',async (ctx)=>{
    await ctx.render('admin/user/index');
});
router.get('/add',async (ctx)=>{
    await ctx.render('admin/user/add');
});
router.get('/edit',async (ctx)=>{
    await ctx.render('admin/user/edit');
});
router.get('/delete',async (ctx)=>{
    ctx.body = '后台模板===删除用户'
});










/**============在模块加载的时候启动路由=============*/
module.exports = router.routes();