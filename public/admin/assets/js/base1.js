/**Created by xiaoqi on 2020/3/14*/



let app = {

    toggle(el,collectionName,attr,id){
        $.get(
            '/admin/changeStatus', {
                collectionName:collectionName,
                attr:attr,
                id:id
            }, function (data) {
                if(data.success){
                    if(el.src.indexOf('yes') !== -1){
                        el.src = '/admin/assets/img/no.gif';
                    }else{
                        el.src = '/admin/assets/img/yes.gif';
                    }
                }
            }
        )
    }
};