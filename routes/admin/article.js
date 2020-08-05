/**Created by xiaoqi on 2020/3/4*/

const router = require('koa-router')(),
      tools = require('../../model/tools'),
      DB = require('../../model/db');

/**========== 内容管理首页 ============*/
router.get('/',async (ctx)=>{

    let page = ctx.query.page || 1,
        pageSize = 7;
    /** 获取数据*/
    let articleResult = await DB.find('article', {},{},{
        page,
        pageSize,
        sort:{"add_time":-1}

    });
    /** 获取数据总数 */
    let count = await DB.count('article',{});

    let totalPage = Math.ceil(count/pageSize);

    //console.log(totalPage);
    //console.log(Math.ceil(5.0882324)) 向上取整数
    // //articleCateResult =  tools.articleCateList(articleCateResult)
    await ctx.render('admin/article/articleIndex', {
        list: articleResult,
        totalPage:totalPage,
        page:page,
        pageSize:pageSize,
        //prevPage:ctx.state.G.prevPage /*获取上一页的地址*/
    })
});


router.get('/ueditor', async (ctx)=>{
    await ctx.render('admin/article/ueditor')
})



/**========== 增加文章 ============*/
router.get('/articleAdd',async (ctx)=>{
    let articleCateResult= await DB.find('articleCate',{});
    //console.log(tools.articleCateList(articleCateResult));
    await ctx.render('admin/article/articleAdd',{
        list:tools.articleCateList(articleCateResult)
    });
});


/**========== doArticleAdd 操作 ============*/
router.post('/doArticleAdd', tools.uploadImg().single('img_url'), async (ctx)=>{
    /**1.获取表单数据*/
    //单图片上传用
    //console.log('ctx.request.file', ctx.request.file);
    //console.log('ctx.request.body', ctx.request.body);

    let json = {
        add_time:new Date()
    };

    json.title = ctx.request.body.title;
    json.pid = ctx.request.body.pid;
    json.catename = ctx.request.body.catename;
    json.keywords = ctx.request.body.keywords;
    json.description = ctx.request.body.description;
    json.author = ctx.request.body.author;
    json.sort = ctx.request.body.sort;
    json.content = ctx.request.body.content;
    json.status = ctx.request.body.status;

    if(ctx.request.file){
        json.img_url = ctx.request.file.filename
    }

    /**2.验证表单数据是否合法*/
    if(!/[a-zA-Z\u4e00-\u9fa5]{2,20}/.test(json.title)){//[a-zA-Z\u4e00-\u9fa5]{4,20}
        /**返回失败数据*/
        ctx.body = {'message':'分类名称不合法',success:false};
    }else{
        /**3.在数据库查询当前要增加的管理员是否存在*/
        let articleResult = await DB.find("article",{"article_title":json.title});
        if(articleResult.length>0){
            /**返回失败数据*/
            ctx.body = {'message':'文章名称已存在',success:false};
        }else{
            /**4.增加分类*/
            let insertArticleResult = await DB.insert('article',json);
            //console.log(insertResult);
            if(insertArticleResult.result.ok === 1){
                /**返回成功数据*/
                ctx.body = {'message':'添加成功',success:true};
            }
        }
    }
});


/**========== articleEdit 操作 ============*/
router.get('/articleEdit',async (ctx)=>{
    let id = ctx.query.id;
    let articleResult= await DB.find('article',{'_id':DB.getObjectID(id)});
    //console.log(articleResult);
    let articleCateResultAll= await DB.find('articleCate',{});
    //console.log(tools.articleCateList(articleCateResultAll));
    // console.log(articleCateResult);
    if(articleResult.length>0){
         await ctx.render('admin/article/articleEdit',{
             list:articleResult[0],
             cateListAll:tools.articleCateList(articleCateResultAll)
         });
    }
});


/**========== doArticleEdit 操作 ============*/
router.post('/doArticleEdit' ,tools.uploadImg().single('img_url'),async (ctx)=>{
    //单图片上传用
    //console.log('ctx.request.file', ctx.request.file);
    //console.log('ctx.request.body', ctx.request.body);
    let id = ctx.request.body.id;
    let json = {
        add_time:new Date()
    };

    json.title = ctx.request.body.title;
    json.id = ctx.request.body.id;
    json.pid = ctx.request.body.pid;
    json.catename = ctx.request.body.catename;
    json.keywords = ctx.request.body.keywords;
    json.description = ctx.request.body.description;
    json.author = ctx.request.body.author;
    json.sort = ctx.request.body.sort;
    json.content = ctx.request.body.content;
    json.status = ctx.request.body.status;

    if(ctx.request.file){
        json.img_url = ctx.request.file.filename
    }

    /**2.验证表单数据是否合法*/
    if(!/[a-zA-Z\u4e00-\u9fa5]{2,20}/.test(json.title)){//[a-zA-Z\u4e00-\u9fa5]{4,20}
        /**返回失败数据*/
        ctx.body = {'message':'分类名称不合法',success:false};
    }else{
        /**3.在数据库查询当前要增加的管理员是否存在*/
        let updateResult =await DB.update("article",{"_id":DB.getObjectID(id)},json);
        if(updateResult.result.ok === 1){
            /**返回成功数据*/
            ctx.body = {'message':'修改成功',success:true};
        }else{
            /**返回成功数据*/
            ctx.body = {'message':'修改失败',success:false};
        }
    }
});



/**========== doArticleCateEdit 操作 ============*/
router.post('/doArticleCateEdit',async (ctx)=>{
    //console.log(ctx.request.body);
    //1.获取表单数据
    let id = ctx.request.body.id;
    let json = {
        last_time:new Date()
    }

    json.articleCate_title = ctx.request.body.articleCate_title;
    json.pid = ctx.request.body.pid;
    json.id = ctx.request.body.id;
    json.articleCate_keywords = ctx.request.body.articleCate_keywords;
    json.articleCate_description = ctx.request.body.articleCate_description;
    json.status = ctx.request.body.status;

    /**2.验证表单数据是否合法*/
    if(!/[a-zA-Z\u4e00-\u9fa5]{2,20}/.test(ctx.request.body.articleCate_title)){//[a-zA-Z\u4e00-\u9fa5]{4,20}
        /**返回失败数据*/
        ctx.body = {'message':'分类名称不合法',success:false};
    }else{
        /**3.在数据库查询当前要增加的管理员是否存在*/
        let updateResult =await DB.update("articleCate",{"_id":DB.getObjectID(id)},json);
        if(updateResult.result.ok === 1){
            /**返回成功数据*/
            ctx.body = {'message':'修改成功',success:true};
        }else{
            /**返回成功数据*/
            ctx.body = {'message':'修改失败',success:false};
        }
    }
});








/**============在模块加载的时候启动路由=============*/
module.exports = router.routes();