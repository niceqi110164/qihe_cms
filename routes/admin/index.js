/**Created by xiaoqi on 2020/3/7*/

const router = require('koa-router')(),
      DB = require('../../model/db');


/**=========== 后台模板首页 ============*/
router.get('/', async (ctx)=>{
    await ctx.render('admin/index/index');
});

router.get('/changeStatus', async (ctx)=>{
    //console.log(ctx.query);
    let attr = ctx.query.attr;
    //查询数据
    let result = await DB.find(ctx.query.collectionName,{"_id":DB.getObjectID(ctx.query.id)});
    //console.log(result);
    //
    if(result.length>0){
        //修改数据
        if(result[0][attr] === "1"){
            result[0][attr] = "0";
        }else{
            result[0][attr] = "1";
        }
        //更新数据
        //console.log(result[0]);
        let updateResult = await DB.update(ctx.query.collectionName,
                                            {"_id":DB.getObjectID(ctx.query.id)},
                                            result[0]);
        //console.log(updateResult)
        if(updateResult.result.ok === 1){
            ctx.body = {'message':'更新成功',success:true}
        }else{
            //更新失败
            ctx.body = {'message':'更新数据库失败',success:false }
        }
    }else{
        //连接数据库失败
        ctx.body = {'message':'连接数据库失败,参数错误',success:false}
    }
});


router.get('/changeManagerAdd', async (ctx)=>{
    console.log(ctx.query);

})
/**
router.get('/changeStatus', async (ctx)=>{
    let id = ctx.query.id;
    let collectionName = ctx.query.collectionName;
    let attr = ctx.query.attr;

    let result = await DB.find(collectionName,{"_id":DB.getObjectID(id)});
    if(result.length>0){
        if(result[0][attr] === '1'){
            result[0][attr] = '0';
        }else{
            result[0][attr] = '1';
        }
        //更新数据库
        let updateResult = DB.update(collectionName,{'_id':DB.getObjectID(id)},result[0]);
        if(updateResult.result.ok === 1){
            ctx.body = {'message':'更新成功',success:true}
        }else{
            ctx.body = {'message':'更新失败',success:false}
        }

    }else{
        ctx.body = {'message':'连接数据库失败',success:false}
    }

});

**/



module.exports = router.routes();