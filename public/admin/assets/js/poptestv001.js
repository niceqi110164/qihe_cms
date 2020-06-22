/**Created by xiaoqi on 2020/6/22*/


class Msg {
    constructor(options) {
        this._init(options);
    }

    _init({content="",confirm=null,cancel=null,useHTML=false,contentStyle={},contentFontSize="1.5em"}){
        this.content = content;
        this.confirm = confirm;
        this.cancel = cancel;
        this.useHTML = useHTML;
        this.contentStyle = contentStyle;
        this.contentFontSize = contentFontSize;

        //生成DOM元素
        this._createElement();

        //绑定事件
        this._bind([this._el, this._overlay]);

        //显示
        this._show([this._el, this._overlay]);
    }

    _createElement(){
        let wrap = document.createElement("div");
        wrap.className = 'msg__wrap';

        wrap.innerHTML = '<div class="msg-header">'+
                            '<span>确认删除</span>'+
                            '<span class="msg-header-close-button">×</span>'+
                        '</div>'+
                        '<div class="msg-body">'+
                            '<div class="msg-body-icon">'+
                                '<div class="msg-body-icon-info"></div>'+
                            '</div>'+
                            '<div class="msg-body-content">' +
                            '</div>'+
                        '</div>'+
                        '<div class="msg-footer">'+
                            '<button class="msg-footer-btn msg-footer-cancel-button">取消</button>'+
                            '<button class="msg-footer-btn msg-footer-confirm-button">确认</button>'+
                        '</div>';

        //根据传入的参数控制content样式
        let contentDom = wrap.querySelector(".msg-body .msg-body-content");
        //用解构赋值来合并对象
        const contentStyle = {
            contentFontSize:this.contentFontSize,
            ...this.contentStyle
        }

        for(let i in contentStyle){
            //如果是自身的属性
            if(contentStyle.hasOwnProperty(i)){
                contentDom.style[i] = contentStyle[i];
            }
        }

        //使用html
        if(this.useHTML){
            contentDom.innerHTML = this.content;
        }else{
            contentDom.innerHTML = this.content;
        }

        let overlay = document.createElement("div");
        overlay.className = "msg__overlay";

        //把值传出去
        this._el = wrap;
        this._overlay = overlay;
    }



    _show([el, overlay]){
        document.body.appendChild(el);
        document.body.appendChild(overlay);

        //设置动画效果显示
        //延迟实现异步效果
        setTimeout(function(){
            el.style.transform = "translate(-50%, -50%) scale(1, 1)";
            overlay.style.opacity = 1;
        })
    }

    _bind([el, overlay]){


        //隐藏事件
        const hideMsg = ()=>{
            el.style.transform = "translate(-50%, -50%) scale(0, 0)"
            overlay.style.opacity = 0;

            //动画结束后溢出元素(css里设置的动画时间是300ms)
            setTimeout(function () {
                document.body.removeChild(el);
                document.body.removeChild(overlay);
            },300)
        }

        //取消事件
        const cancel = (e)=>{
            this.cancel && this.cancel.call(this.cancel,e);
            hideMsg();
        }

        //确认事件
        const confirm = (e)=>{
            this.confirm && this.confirm.call(this.confirm,e);
            hideMsg();
        }

        //点击遮罩
        //overlay.addEventListener('click',hideMsg);

        //点击X关闭事件
        el.querySelector('.msg-header .msg-header-close-button').addEventListener('click',hideMsg);

        //点击取消按钮
        el.querySelector(".msg-footer .msg-footer-cancel-button").addEventListener("click",cancel);

        //点击确认按钮
        el.querySelector(".msg-footer .msg-footer-confirm-button").addEventListener("click",confirm);

    }

}

