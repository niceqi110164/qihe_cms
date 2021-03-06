/**Created by xiaoqi on 2020/3/7*/

const router = require('koa-router')(),
      DB = require('../../model/db');


/**=========== 后台模板首页 ============*/
router.get('/', async (ctx)=>{
    await ctx.render('admin/index/index');
});


/**========== 改变选项状态操作 ============*/
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

/**========== 改变排序操作 ============*/
router.get('/changeSort', async (ctx)=>{
    //console.log(ctx.query);
    /**
      {
          collectionName: 'nav',
          sortValue: '9',
          id: '5efea879e4c55806e433d023'
      }

     * */
    let sortJson = ctx.query;
    //更新数据库
    let updateResult = await DB.update(sortJson.collectionName,{"_id":DB.getObjectID(sortJson.id)},{"sort":sortJson.sortValue})

    //判断数据是否更新成功
    if(updateResult.result.ok === 1){
        /**返回数据*/
        ctx.body = {'message':'更新成功',success:true};
    }else{
        /**返回数据*/
        ctx.body = {'message':'更新失败',success:false};
    }
})


/**========== test doAdd操作 ============*/
router.get('/changeManagerAdd', async (ctx)=>{
    console.log(ctx.query);
    let json = {};
    json.username = ctx.query.username;
    json.password = ctx.query.password;
    json.rpassword = ctx.query.rpassword;

    /**3.在数据库查询当前要增加的管理员是否存在*/
    let managerResult = await DB.find("managers",{"username":json.username});
    if(managerResult.length>0){
        /**返回数据*/
        ctx.body = {'message':'用户已存在',success:false};
    }else{
        /**4.增加管理员*/
        let insertResult = await DB.insert('managers',json);
        //console.log(insertResult);
        if(insertResult.result.ok === 1){
            /**返回数据*/
            ctx.body = {'message':'添加成功',success:true};
        }
    }
})

/**========== 公共的删除操作 ============*/
router.get('/delete', async (ctx)=>{
    //console.log(ctx.query);
    let collectionName = ctx.query.collectionName;
    let id = ctx.query.id;
    let delResult = await DB.delete(collectionName, {"_id":DB.getObjectID(id)});
    if(delResult.result.ok === 1){
        /**返回数据*/
        ctx.body = {'message':'删除成功',success:true};
    }else{
        /**返回数据*/
        ctx.body = {'message':'删除失败',success:false};
    }
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