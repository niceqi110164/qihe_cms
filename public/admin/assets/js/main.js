(function ($) {
    "use strict";
    $(window).on('load', function () {
        $('#preloader').fadeOut();
        /**初始化页面上所有工具提示的一种方法*/
        $('[data-toggle="tooltip"]').tooltip()
        $('[data-toggle="popover"]').popover()
    });
}(jQuery));