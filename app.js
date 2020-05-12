/**Created by xiaoqi on 2020/2/23*/
/**========== 引入koa ===================================*/
const Koa = require('koa'),
/**========== 引入koa-router (路由) ======================*/
      router = require('koa-router')(),
/**========== 引入模板引擎 ===============================*/
      views = require('koa-views'),
/**========== 引入bodyparser =============================*/
      bodyParser = require('koa-bodyparser'),
/**========== 引入koa-static =============================*/
      static = require('koa-static'),
/**========== 引入koa-art-template =======================*/
      render = require('koa-art-template'),
/**========== 引入koa-session ============================*/
      session = require('koa-session'),
/**========== 引入db操作数据库 ============================*/
      db = require('./model/db'),
/**========== 引入path ===================================*/
      path = require('path'),
/**========== 引入koa-jsonp ==============================*/
      jsonp = require('koa-jsonp'),
/**========== 引入 子模块 =================================*/
      admin = require('./routes/admin'),
      api = require('./routes/api');
      index = require('./routes/index');



/**========== 实例化Koa ===================================*/
const app = new Koa();


/**========== 配置模板引擎 第一种方式 模板的后缀名为 .html====*/
/**
    app.use(views('views', {
        map: {
            html: 'ejs' //模板的后缀名为 .html
        }
    }));
 */

/**========== 配置bodyParser中间件 ========================*/
app.use(jsonp());

/**========== 配置模板引擎 第二种方式 模板的后缀名为 .ejs=====*/
app.use(views('views', { extension: 'ejs' }));

/**========== 配置bodyParser中间件 ========================*/
app.use(bodyParser());

/**========== 配置静态支援中间件 ===========================*/
app.use(static('static'));
app.use(static('public'));


/**========== 配置art-template中间件 ======================*/
render(app, {
    root: path.join(__dirname, 'views'),
    extname: '.html',
    debug: process.env.NODE_ENV !== 'production'
});

/**========== 配置koa-session中间件 =======================*/
app.keys = ['some secret hurr'];

const CONFIG = {
    key: 'koa:sess', /** (string) cookie key (default is koa:sess) */
    /** (number || 'session') maxAge in ms (default is 1 days) */
    /** 'session' will result in a cookie that expires when session/browser is closed */
    /** Warning: If a session cookie is stolen, this cookie will never expire */
    maxAge: 86400000,
    autoCommit: true, /** (boolean) automatically commit headers (default true) */
    overwrite: true, /** (boolean) can overwrite or not (default true) */
    httpOnly: true, /** (boolean) httpOnly or not (default true) */
    signed: true, /** (boolean) signed or not (default true) */
    rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
    renew: true, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
    sameSite: null, /** (string) session cookie sameSite options (default null, don't set it) */
};
app.use(session(CONFIG, app));


/**========== 配置路由 --- 后台 ===========================*/
router.use('/admin',admin);

/**========== 配置路由 --- api ===========================*/
router.use('/api',api);

/**========== 配置路由 --- index ==========================*/
router.use(index);


/**========== 配置路由 --- 首页 ==========================
router.get('/', async (ctx)=>{
    //设置cookies
    //let userinfo = Buffer.from('里斯').toString('base64');

    //ctx.cookies.set('userinfo',userinfo);

    let result =await db.find('userinfo',{});
    //console.log(result);

    await ctx.render('index',{
        list:result

    });
});=*/
/**========== 配置路由 --- 新闻 ===========================
router.get('/news', async (ctx)=>{*/
    /**
     * koa2中GET传值通过request接收,但是接收的方法有两种: query 和 querystring
        query:返回的是格式化好的参数对象
        querystring:返回的是请求字符串
     *
    //console.log(ctx.request);
    //console.log(ctx.response);
    //console.log("这个是news路由03");


    //let data = ctx.cookies.get('userinfo');
    //let userinfo = Buffer.from(data, 'base64').toString();
    //let userinfo = ctx.cookies.get('userinfo');
    //ctx.body = "新闻" + userinfo;
    let nn = ctx.session.views;
    ctx.body = 'views' + nn;
});*/
/**========== 配置路由 --- 音乐 ===========================
router.get('/music', async (ctx)=>{
    //ctx.body = "音乐"
    let num = 103;
    await ctx.render('music',{
        num
    });
});
*/

/**========== /add 增加用户 ===================
router.get('/add',async (ctx)=>{
    await ctx.render('add')
});*/
/**========== /doAdd 增加用户 ===================
router.get('/doAdd',async (ctx)=>{

    let json = ctx.query;
    let data = await db.insert('userinfo',json);

    if(data.result.ok == 1){
        ctx.redirect('/');
    }else{
        ctx.redirect('/add');
    }
});

router.get('/edit', async (ctx)=>{

    let _id = ctx.query.id;

    let data = await db.find('userinfo',{"_id":db.getObjectID(_id)});

    //console.log(data);
    await ctx.render('edit',{
        list:data[0]
    });
});

router.post('/doEdit', async (ctx)=>{
    //console.log(ctx.request.body);
    let name = ctx.request.body.name;
    let age = ctx.request.body.age;
    let sex = ctx.request.body.sex;
    let id = ctx.request.body.id;
    let data = await db.update('userinfo',{"_id":db.getObjectID(id)},{name,age,sex});
    //console.log(data);
    if(data.result.ok === 1){
        ctx.redirect("/")
    }
    //ctx.body = "doEdit" ;
});
*/



/**========== 配置路由 --- 音乐/二级路由 ===================
router.get('/music/:channel', async (ctx)=>{
    ctx.body = ctx.params.channel;
});*/

/**========== 配置路由 --- /doAdd =========================
router.post('/doAdd', async (ctx)=>{
    console.log(ctx.request.body);
    ctx.body = 'doAdd'
});*/


/**========== 启动路由 ====================================*/
app.use(router.routes());
app.use(router.allowedMethods());


/**========== 监听端口 ====================================*/
app.listen(3007,()=>{
    console.log("http://127.0.0.1:3007");
});