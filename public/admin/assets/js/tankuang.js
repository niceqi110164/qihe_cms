/**Created by xiaoqi on 2020/6/16*/

/**弹框方法**/
function tankuang(pWidth,content) {
    $("#msg").remove();
    let html ='<div id="msg" style="position:fixed;top:50%;width:100%;height:30px;line-height:30px;margin-top:-15px;">' +
        '<p style="background:#000;' +
        'opacity:0.8;' +
        'width:'+ pWidth +'px;' +
        'color:#fff;' +
        'text-align:center;' +
        'padding:10px 10px;' +
        'margin:0 auto;' +
        'font-size:12px;' +
        'border-radius:4px;' +
        '">'+
        content +
        '</p>' +
        '</div>'
    $("body").append(html);
    let t = setTimeout(next,500);
    function next() {
        $("#msg").remove();
        window.location.href="/admin/manager";
    }
}

