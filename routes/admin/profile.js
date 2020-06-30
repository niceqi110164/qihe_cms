/**Created by xiaoqi on 2020/3/4*/

const router = require('koa-router')(),
      tools = require('../../model/tools'),
      DB = require('../../model/db');

/**========== 管理员首页 ============*/
router.get('/',async (ctx)=>{

    await ctx.render('admin/profile/profile');


    // let result= await DB.find('managers',{});
    // //console.log(result);
    // await ctx.render('admin/manager/index',{
    //     list:result
    // });
});



/**============在模块加载的时候启动路由=============*/
module.exports = router.routes();