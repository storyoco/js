$(document).ready(function () {

    //获取
    var player = JSON.parse(sessionStorage.getItem("player"));//玩家数组
    var arr_player = JSON.parse(sessionStorage.getItem("arr_player"));//玩家状态数组

    //返回
    $(".footer-btn").click(function () {
        location.href = 'process.html';
    });

    for (i=0; i<arr_player.length; i++){
        //生成格子
        $('.vote-peo').append(
            "<ul class=\"peo-col\">\n" +
            "<ul class=\"peo-box\">\n" +
            "<li class=\"peo-pic\">" + player[i] + "</li>\n" +
            "<li class=\"peo-num\">" + (i+1) + "</li>\n" +
            "</ul>" +
            "</ul>"
        );
        //高亮
        if (arr_player[i].status == 'die'){
            $(".peo-pic").eq(i).css({"backgroundColor":"#83b09a"});
        }
    }

});
