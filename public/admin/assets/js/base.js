/**Created by xiaoqi on 2020/3/13*/
//  $(document).ready(function(){})可以简写成$(function(){});
// $(function(){
//     app.delete();
// });


let app = {
/**定义 toggle 方法*/
    toggle(el,collectionName,attr,id){
        $.get("/admin/changeStatus", {
                attr:attr,
                collectionName:collectionName,
                id: id
            }, function(data,status){
            console.log(status);
            //console.log(data);//{message: "更新成功", success: true}
                //判断
                if(data.success){
                    if(el.src.indexOf('yes') !== -1){
                        el.src = "/admin/assets/img/no.gif"
                    }else{
                        el.src = "/admin/assets/img/yes.gif"
                    }

                }
            }
        );
    },
    changeSort(el,collectionName,id){
        let sortValue = el.value;
        $.get("/admin/changeSort",
            {
                collectionName:collectionName,
                sortValue:sortValue,
                id:id
            },
            function (data,status) {
                if(data.success){
                    tankuang(300,data.message,'/admin/nav/');
                }else{
                    tankuang(300,data.message,'/admin/nav/');
                }
            }
        )
    }
};

