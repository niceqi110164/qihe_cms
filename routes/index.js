/**Created by xiaoqi on 2020/3/3*/

const router = require('koa-router')(),
          DB = require('../model/db'),
       tools = require('../model/tools'),
         url = require('url');


/**========配置全路由中间件===========*/
router.use(async (ctx,next)=>{
    // Inner Banner Title
    const innerBannerTitle = {
        "news":"News",
        "news-details":"News-Details",
        "services":"Services",
        "service-details":"Service-details",
        "case":"Case",
        "case-details":"Case-Details",
        "about":"About",
        "contact":"Contact Us"
    }

    /**获取Footer信息* */
    let siteContact = await DB.find('siteContact',{});
    let siteLogo = await DB.find('siteLogo',{});
    let siteInformation = await DB.find('siteInformation',{});
    ctx.state.siteContact = siteContact[0];
    ctx.state.siteLogo = siteLogo[0];
    ctx.state.siteInformation = siteInformation[0];
    /**End 获取Footer信息* */

    /**获取Team信息* */
    let aboutUsTeamListResult = await DB.find('teamList',{});
    ctx.state.teamList = aboutUsTeamListResult
    /**End 获取Team信息* */

    //获取前台路径
    let pathname = url.parse(ctx.request.url).pathname;
    let innerBannerPath = pathname.substring(1);
    //console.log(innerBannerPath);
    let splitUrl = innerBannerPath.split('/');
    //console.log(splitUrl);

    //查询导航
    let navResult = await DB.find('nav', {'status': '1'}, {}, {
        sort: {'sort': 1}
    });
    //console.log(navResult);

    //配置全局的nav
    ctx.state.nav = navResult;
    //配置前台路径
    ctx.state.pathname = pathname;

    //处理路径配置到 Inner Banner
    // ctx.state.innerBanner = innerBannerTitle[innerBannerPath];
    ctx.state.innerBanner = innerBannerTitle[splitUrl[0]];
    await next();
})

/**========首页 index.html ===========*/
router.get('/',async (ctx)=>{
    await ctx.render("default/index");
});


/**======== services.html =============*/
router.get('/services',async (ctx)=>{
    await ctx.render("default/services");
});

/**======== service-details.html =============*/
router.get('/service-details',async (ctx)=>{
    await ctx.render("default/service-details");
});

/**======== 案例作品 case.html =============*/
router.get('/case',async (ctx)=>{
    await ctx.render("default/case");
});


/**======== 案例作品 case-details.html =============*/
router.get('/case-details/:id',async (ctx)=>{
    let id = ctx.params.id;
    console.log(id);
    await ctx.render("default/case-details");
});


/**========新闻咨询 news.html =============*/
router.get('/news',async (ctx)=>{
    let newsResult = await DB.find('news',{});
    console.log(newsResult);
    if(newsResult.length>0){
        await ctx.render("default/news",{
            list:newsResult
        });
    }

});

/**========新闻详情页 news-details.html =============*/
router.get("/news-details/:cid", async (ctx)=>{
    //获取cid
    let cid = ctx.params.cid;
    //console.log(cid);
    await ctx.render("default/news-details");
})



/**========关于我们 about.html =============*/
router.get('/about',async (ctx)=>{

    let aboutUsResult = await DB.find('aboutUs',{});
    let aboutUsTeamListResult = await DB.find('teamList',{});
    //console.log(aboutUsTeamListResult);
    if(aboutUsResult.length>0 && aboutUsTeamListResult.length>0){
        await ctx.render("default/about",{
            list:aboutUsResult[0],
            teamList:aboutUsTeamListResult
        });
    }

});



/**========联系我们 contact.html ===========*/
router.get('/contact',async (ctx)=>{
    await ctx.render("default/contact");
});



/**============在模块加载的时候启动路由=============*/
module.exports = router.routes();