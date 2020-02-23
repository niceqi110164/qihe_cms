/**Created by xiaoqi on 2020/2/23*/
//引入koa

const Koa = require('koa');

//实例化koa
const app = new Koa();


//配置中间件
app.use(async (ctx)=>{
   ctx.body = "koa test"
});

app.listen(3000,()=>{
    console.log("http://127.0.0.1:3000");
});