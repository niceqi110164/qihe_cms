/**Created by xiaoqi on 2020/3/4*/

const router = require('koa-router')(),
      tools = require('../../model/tools'),
      DB = require('../../model/db');

/**========== 分类管理首页 ============*/
router.get('/',async (ctx)=>{

    let articleCateResult= await DB.find('articleCate',{});
    //console.log(articleCateResult);
    //articleCateResult =  tools.articleCateList(articleCateResult)
    await ctx.render('admin/articleCate/articleCateIndex',{
        list:tools.articleCateList(articleCateResult)
    })
});


/**========== 增加分类   ============*/
router.get('/articleCateAdd',async (ctx)=>{

    let articleCateAddResult = await DB.find("articleCate",{"pid":"0"});
    //console.log(articleCateAddResult);
    await ctx.render('admin/articleCate/articleCateAdd',{
        list:articleCateAddResult
    });
});


/**========== doAdd操作 ============*/
router.post('/doArticleCateAdd', async (ctx)=>{
    /**1.获取表单数据*/
    //console.log(ctx.request.body);
    let json = {
        last_time:new Date()
    };

    json.articleCate_title = ctx.request.body.articleCate_title;
    json.pid = ctx.request.body.pid;
    json.articleCate_keywords = ctx.request.body.articleCate_keywords;
    json.articleCate_description = ctx.request.body.articleCate_description;
    json.status = ctx.request.body.status;

    /**2.验证表单数据是否合法*/
    if(!/[a-zA-Z\u4e00-\u9fa5]{2,20}/.test(json.articleCate_title)){//[a-zA-Z\u4e00-\u9fa5]{4,20}
        /**返回失败数据*/
        ctx.body = {'message':'分类名称不合法',success:false};
    }else{
        /**3.在数据库查询当前要增加的管理员是否存在*/
        let articleCateResult = await DB.find("articleCate",{"articleCate_title":json.articleCate_title});
        if(articleCateResult.length>0){
            /**返回失败数据*/
            ctx.body = {'message':'分类名称已存在',success:false};
        }else{
            /**4.增加分类*/
            let insertArticleCateResult = await DB.insert('articleCate',json);
            //console.log(insertResult);
            if(insertArticleCateResult.result.ok === 1){
                /**返回成功数据*/
                ctx.body = {'message':'添加成功',success:true};
            }
        }
    }
});



/**========== 编辑管理员 ============*/
router.get('/articleCateEdit',async (ctx)=>{
    /**get 方式获取id*/
    let id = ctx.query.id;
    /**到数据库 articleCate 表中查询数据*/
    let result = await DB.find('articleCate',{"_id":DB.getObjectID(id)});
    /**到数据库 articleCate 查询顶级分类 */
    let articleCateAddResult = await DB.find("articleCate",{"pid":"0"});

    //console.log(result);
    /**判断是否有数据*/
    if(result.length>0){
        await ctx.render('admin/articleCate/articleCateEdit',{
            list:result[0],
            listCate:articleCateAddResult
        });
    }else{
        /**没有数据跳转到错误页面*/
        //await ctx.redirect('')
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




/**
router.get('/delete',async (ctx)=>{
    ctx.body = '后台模板===删除用户'
});*/










/**============在模块加载的时候启动路由=============*/
module.exports = router.routes();