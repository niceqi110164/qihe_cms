/**Created by xiaoqi on 2020/3/5*/

const router = require('koa-router')();
const tools = require('../../model/tools');
const DB = require('../../model/db');
const moment = require('moment');

/**========== 登录页面 ==========*/
router.get('/', async (ctx)=>{
    /**
     moment().format('MMMM Do YYYY, h:mm:ss a'); // 三月 5日 2020, 10:25:55 晚上
     moment().format('dddd');                    // 星期四
     moment().format("MMM Do YY");               // 3月 5日 20
     moment().format('YYYY [escaped] YYYY');     // 2020 escaped 2020
     moment().format();                          // 2020-03-05T22:25:55+08:00
     * */

    //ctx.body = moment().format();
    //ctx.body = moment().format('YYYY-M-d | h:mm:ss');
    await ctx.render('admin/login/login')
});

/**========== 登录执行 post提交 ==========*/
router.post('/doLogin', async (ctx)=>{
    //console.log(ctx.request.body); { username: 'admin', password: '123456' }
    let username = ctx.request.body.username;
    let password = tools.getMd5(ctx.request.body.password);
    //console.log(password);

    //去数据库查询
    let result = await DB.find('managers',{"username":username,"password":password});
    //console.log(result);
    if(result.length>0){
        console.log("成功");
        ctx.session.userInfo = result[0];
        ctx.redirect(ctx.state.__HOST__+'/admin');
        //ctx.redirect('/admin');
    }else{

        console.log('失败');
    }
});


/**============在模块加载的时候启动路由=============*/
module.exports = router.routes();