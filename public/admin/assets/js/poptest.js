/**Created by xiaoqi on 2020/6/18*/
/**
//放入自执行函数,避免污染全局作用域
//将window 和document作为参数传入,可以直接在内部获取,不用在外部找,性能更优
(function(window,document){
    //构造函数
    let Msg = function (option) {
        //初始化一个弹出框
        this._init(option);
    }

    //初始化一个弹出框
    Msg.prototype = {
        //初始化
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
            this._bind([this.el, this.overlay]);

            //显示
            this.show([this.el, this.overlay]);
        },
        //生成DOM元素
        _createElement(){
            let wrap = document.createElement("div");
            wrap.className = "msg__wrap";
            //换行前加上转义
            wrap.innerHTML = '<div class="msg-header">' +
                                '<span>确认删除</span>' +
                                '<span class="msg-header-close-button">X</span>' +
                            '</div>'+
                            '<div class="msg-body">' +
                                '<div class="msg-body-icon">' +
                                    '<div class="msg-body-icon-info"></div>' +
                                '</div>'+
                                '<div class="msg-body-content"></div>' +
                            '</div>'+
                            '<div>' +
                                '<button class="msg-footer-btn msg-footer-cancel-button">取消</button>'+
                                '<button class="msg-footer-btn msg-footer-confirm-button">确认</button>'+
                            '</div>'
            //根据传入的参数控制content样式
            let contentDom = wrap.querySelector(".msg-body .msg-body-content");
            //用结构赋值来合并对象
            const contentStyle = {
                contentFontSize:this.contentStyle,
                ...this.contentStyle
            }

            for(let i in contentStyle){
                //如果是自身的属性
                if(contentStyle.hasOwnProperty(i)){
                    //i是属性名, contentStyle[i]是属性值
                    contentDom.style[i] = contentStyle[i];
                }
            }

            //如果使用html
            if(this.useHTML){
                contentDom.innerHTML = this.content;
            }else{
                contentDom.innerText = this.content;
            }

            //创建
            let overlay = document.createElement("div");
            overlay.className = "msg__overlay";

            this._el = wrap;
            this._overlay = overlay;
        },

        //显示
        _show([el,overlay]){
            document.body.appendChild(el);
            document.body.appendChild(overlay);

            //设置动画效果
            //延迟实现异步效果
            setTimeout(function () {
                el.style.tranform = 'translate(-50%, -50%) scale(1, 1)';
                overlay.style.opacity = 1;//透明度为1
            })
        },
        //绑定事件
        _bind([el,overlay]){
            const _this = this;

            //隐藏事件
            const hideMsg = function () {
                el.style.transform = 'translate(-50%, -50%) scale(0, 0)';
                overlay.style.opacity = 0; //透明度为0

                //动画结束后一处元素,(css里设置的东爱护时间是300ms)
                setTimeout(function () {
                    document.body.removeChild(el);
                    document.body.removeChild(overlay);
                },300)
            }

            //取消事件
            const cancel = function (e) {
                //如果传入了回调,则执行回调,参数是e
                _this.cancel && _this.cancel.call(_this._cancel, e);
                //隐藏
                hideMsg();
            }

            //确认事件
            const confirm = function (e) {
                _this.confirm && _this.confirm.call(_this.confirm, e);
                //隐藏
                hideMsg();
            }

            //点击遮罩
            overlay.addEventListener("click",hideMsg);

            //点击右上角叉叉
            el.querySelector(".msg-header .msg-header-close-button").addEventListener("click",hideMsg);

            //点击取消按钮
            el.querySelector(".msg-footer .msg-footer-cancel-button").addEventListener("click",cancel);

            //点击确认按钮
            el.querySelector(".msg-footer .msg-footer-confirm-button").addEventListener("click",confirm);

        }
    }

    window.$Msg = Msg;

})(window,document)*/


//放入自执行的匿名函数，避免污染全局作用域
//将window和document作为参数传入，可以直接在内部获取，不用再去外部找，性能更优
(function(window,document){
    //构造函数
    let Msg=function(options){
        //初始化一个弹出框
        this._init(options);
    }

    //初始化一个弹出框
    Msg.prototype._init=function({content="",confirm=null,cancel=null,useHTML=false,contentStyle={},contentFontSize="15px"}){
        this.content=content;
        this.confirm=confirm;
        this.cancel=cancel;
        this.useHTML=useHTML;
        this.contentStyle=contentStyle;
        this.contentFontSize=contentFontSize;

        //生成DOM元素
        this._createElement();
        //绑定事件
        this._bind([this._el,this._overlay]);
        //显示
        this._show([this._el,this._overlay]);
    }

    //生成DOM元素
    Msg.prototype._createElement=function(){
        let wrap=document.createElement("div");
        wrap.className="msg__wrap";
        //换行前加上转义
        wrap.innerHTML='<div class="msg-header">'+
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
        let contentDom=wrap.querySelector(".msg-body .msg-body-content");
        //用解构赋值来合并对象
        const contentStyle={
            contentFontSize:this.contentFontSize,
            ...this.contentStyle
        }
        for(let i in contentStyle){
            //如果是自身的属性
            if(contentStyle.hasOwnProperty(i)){
                //style[i]==>style.i
                //i是属性名，contentStyle[i]是属性值
                contentDom.style[i]=contentStyle[i];
            }
        }
        //如果使用html
        if(this.useHTML){
            contentDom.innerHTML=this.content;
        }else{
            contentDom.innerText=this.content;
        }

        let overlay=document.createElement("div");
        overlay.className="msg__overlay";

        this._el=wrap;
        this._overlay=overlay;
    }

    //显示
    Msg.prototype._show=function([el,overlay]){
        document.body.appendChild(el);
        document.body.appendChild(overlay);

        //设置动画效果显示
        //延迟实现异步效果
        setTimeout(function(){
            el.style.transform='translate(-50%, -50%) scale(1, 1)';
            overlay.style.opacity=1;
        });

    }

    //绑定事件
    Msg.prototype._bind=function([el,overlay]){
        const _this=this;

        //隐藏事件
        const hideMsg=function(){
            el.style.transform='translate(-50%, -50%) scale(0, 0)';
            overlay.style.opacity=0;

            //动画结束后移除元素（css里设置的动画时间是300ms）
            setTimeout(function(){
                document.body.removeChild(el);
                document.body.removeChild(overlay);
            },300);
        }

        //取消事件
        const cancel=function(e){
            //如果传入了回调，则执行回调，参数是e
            _this.cancel && _this.cancel.call(this._cancel,e);
            hideMsg();
        }

        //确认事件
        const confirm=function(e){
            _this.confirm && _this.confirm.call(_this.confirm,e);
            hideMsg();
        }

        //点击遮罩
        //overlay.addEventListener("click",hideMsg);

        //点击右上角叉叉
        el.querySelector(".msg-header .msg-header-close-button").addEventListener("click",hideMsg);

        //点击取消按钮
        el.querySelector(".msg-footer .msg-footer-cancel-button").addEventListener("click",cancel);

        //点击确认按钮
        el.querySelector(".msg-footer .msg-footer-confirm-button").addEventListener("click",confirm);
    }

    //挂到window上可全局访问
    window.$Msg=Msg;

})(window,document);