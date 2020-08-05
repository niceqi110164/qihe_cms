/**Created by xiaoqi on 2020/3/3*/

const router = require('koa-router')(),
        user = require('./admin/user'),
       focus = require('./admin/focus'),
     manager = require('./admin/manager'),
     profile = require('./admin/profile'),
       index = require('./admin/index'),
         nav = require('./admin/nav'),
 siteSetting = require('./admin/siteSetting'),
     aboutUs = require('./admin/aboutUs'),
       error = require('./admin/error'),
 articleCate = require('./admin/articleCate'),
     article = require('./admin/article'),
     ueditor = require('koa2-ueditor'),
         url = require('url'),
       login = require('./admin/login');


/**========配置全局变量===========*/
router.use(async (ctx,next)=>{
    ctx.state.__HOST__ = "http://" + ctx.request.header.host;

    let pathname = url.parse(ctx.request.url).pathname.substring(1);
    //console.log(pathname);
    //console.log(pathname.charAt(pathname.length-1));
    if(pathname !== 'admin/login' && pathname !== 'admin/login/doLogin'){
        if(pathname.charAt(pathname.length-1) !=='/'){
            pathname += '/'
        }
    }

    //console.log(pathname);
    let splitUrl = pathname.split('/');
    //console.log(url.parse(ctx.request.url).pathname.substring(1).split("/"));
    //console.log(splitUrl.length);
    /**配置全局的 G 对象 里面包含用户信息*/
    ctx.state.G = {
        url:splitUrl,
        userInfo:ctx.session.userInfo,
        prevPage : ctx.request.headers['referer'], /**上一页的地址*/
    }
    //console.log(ctx.state.G.url)
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
        if(pathname === "admin/login" || pathname === "admin/login/doLogin"){
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
router.use('/profile',profile);
router.use('/login',login);
router.use('/nav',nav);
router.use('/siteSetting',siteSetting);
router.use('/aboutUs',aboutUs);
router.use('/articleCate',articleCate);
router.use('/article',article);
router.use('*',error);



//注意上传图片的路由   ueditor.config.js配置图片post的地址
router.all('/editorUpload', ueditor(['public', {
    "imageAllowFiles": [".png", ".jpg", ".jpeg"],
    "imagePathFormat": "/upload/ueditor/image/{yyyy}{mm}{dd}/{filename}"  // 保存为原文件名
}]))



/**============在模块加载的时候启动路由=============*/
module.exports = router.routes();