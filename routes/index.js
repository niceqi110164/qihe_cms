/**Created by xiaoqi on 2020/3/3*/

const router = require('koa-router')(),
          DB = require('../model/db'),
       tools = require('../model/tools'),
         url = require('url');


/**========配置全路由中间件===========*/
router.use(async (ctx,next)=>{
    /** Inner Banner Title*/
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
    ctx.state.innerBanner = innerBannerTitle[splitUrl[0]]
    await next();
})

/**========首页 index.html ===========*/
router.get('/',async (ctx)=>{
    /** 获取services模块*/
    let servicesResult = await DB.find("articleCate",{});
    /**处理数据*/
    servicesResult = tools.articleCateList(servicesResult);
    /** 获取我们想要的数据*/
    servicesResult = tools.getArticleCate(servicesResult,"服务系列")

    /** 获取轮播内容*/
    let sliderResult = await DB.find("slider",{});

    //console.log(sliderResult);
    /** 获取新闻模块*/
    let page = ctx.query.page || 1,
        pageSize = 6;
    let newsResult = await DB.find('article',{"catename":"新闻咨询"},{},{
        page,
        pageSize,
        sort:{"add_time":-1}
    });
    let courseNewsResult = newsResult.slice(3,4);
    //console.log(courseNewsResult);

    /**获取作品案例*/
    let caseResult = await DB.find('article',{"catename":"案例作品"});
    //console.log(caseResult);
    newsResult.length = 3;

    /** 渲染页面*/
    await ctx.render("default/index",{
        newsList:newsResult,  /** 新闻模块*/
        courseNewsResult:courseNewsResult[0],  /** 另一处新闻模块*/
        courseCaseResult:caseResult[0],  /** 另一处新闻模块*/
        servicesList:servicesResult, /** services模块*/
        sliderList:sliderResult  /** slider模块*/
    });
});


/**======== services.html =============*/
router.get('/services',async (ctx)=>{
    // 服务系列 _id : 5f20ecff2c196b16d001922c
    /**获取 articleCate 中所有数据*/
    let servicesResult = await DB.find("articleCate",{});
    /**处理数据*/
    servicesResult = tools.articleCateList(servicesResult);
    /** 获取我们想要的数据*/
    let result = tools.getArticleCate(servicesResult,"服务系列")
    //console.log(result);
    /**获取队员数据*/
    let teamResult = await DB.find('teamList',{});

    await ctx.render("default/services",{
        list:result,
        teamList:teamResult
    });
});

/**======== service-details.html =============*/
router.get('/service-details/:cid',async (ctx)=>{
    //console.log(ctx.params); //_id :5f20ed6e2c196b16d001922d
    let id = ctx.params.cid; //pid :5f20ecff2c196b16d001922c
    /** 获取 article 表中 pid = id 的数据 */
    let serviceDetailsResult = await DB.find('article',{"pid":id});
    //console.log(serviceDetailsResult);
    if(serviceDetailsResult.length>0){
        await ctx.render("default/service-details",{
            list:serviceDetailsResult[0]
        });
    }
});


/**========新闻咨询 news.html =============*/
router.get('/news',async (ctx)=>{

    let page = ctx.query.page || 1,
        pageSize = 6;

    let newsResult = await DB.find('article',{"catename":"新闻咨询"},{},{
        page,
        pageSize,
        sort:{"add_time":-1}
    });
    //console.log(newsResult);
    /** 获取数据总数 */
    let count = await DB.count('article',{"catename":"新闻咨询"});
    /** 获取总页数 */
    let totalPage = Math.ceil(count/pageSize);

    //console.log(count);
    /**渲染页面 */
    if(newsResult.length>0){
        await ctx.render("default/news",{
            list:newsResult,
            totalPage:totalPage, /** 总页数 */
            pageSize:pageSize,   /** 每页显示的数量 */
            page:page            /** 当前第几页 */
        });
    }

});

/**========新闻详情页 news-details.html =============*/
router.get("/news-details/:cid", async (ctx)=>{
    /** 获取cid */
    let cid = ctx.params.cid;
    //console.log(cid); //5f2a5953d61c52375ce33247

    /** 获取 article 表中 pid = id 的数据 */
    let newsDetailsResult = await DB.find('article',{"_id":DB.getObjectID(cid)});

    if(newsDetailsResult.length>0){
        await ctx.render("default/news-details",{
            list:newsDetailsResult[0]
        });
    }
})

/**======== 案例作品 case.html =============*/
router.get('/case',async (ctx)=>{

    let page = ctx.query.page || 1,
        pageSize = 6;

    let caseResult = await DB.find('article',{"catename":"案例作品"},{},{
        page,
        pageSize,
        sort:{"add_time":-1}
    });
    //console.log(caseResult);

    /** 获取数据总数 */
    let count = await DB.count('article',{"catename":"案例作品"});
    /** 获取总页数 */
    let totalPage = Math.ceil(count/pageSize);

    //console.log(count);
    /**渲染页面 */
    if(caseResult.length>0){
        await ctx.render("default/case",{
            list:caseResult,
            totalPage:totalPage, /** 总页数 */
            pageSize:pageSize,   /** 每页显示的数量 */
            page:page            /** 当前第几页 */
        });
    }
});

/**======== 案例作品 case-details.html =============*/
router.get('/case-details/:cid',async (ctx)=>{
    /** 获取cid */
    let cid = ctx.params.cid;
    //console.log(cid); //5f2a5953d61c52375ce33247

    /** 获取 article 表中 pid = id 的数据 */
    let caseDetailsResult = await DB.find('article',{"_id":DB.getObjectID(cid)});
    //console.log(caseDetailsResult);
    if(caseDetailsResult.length>0){
        await ctx.render("default/case-details",{
            list:caseDetailsResult[0]
        });
    }

    // let id = ctx.params.id;
    // console.log(id);
    // await ctx.render("default/case-details");
});



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
    let contactUsResult = await DB.find('siteContact',{});
    //console.log(contactUsResult);
    if(contactUsResult.length>0){
        await ctx.render("default/contact",{
            list:contactUsResult[0]
        });
    }

});



/**============在模块加载的时候启动路由=============*/
module.exports = router.routes();