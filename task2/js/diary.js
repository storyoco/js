$(document).ready(function () {

    var player = JSON.parse(sessionStorage.getItem("player"));//获取玩家数组
    var arr_player = [];//玩家状态数组
    var player_state = {};//玩家状态
    var day = 1;//初始第一天
    sessionStorage.setItem('day',day);//存储天数

    //返回
    $("#btn-back").click(function () {
        sessionStorage.clear();
        location.href = 'assign.html';
    });

    //关闭
    $(".btn-close").click(function () {
        sessionStorage.clear();
        location.href = 'index2.html';
    });

    for (i=0; i<player.length; i++){
        //生成格子
        $('.vote-peo').append(
            "<ul class=\"peo-col\">\n" +
            "<ul class=\"peo-box\">\n" +
            "<li class=\"peo-pic\">" + player[i] + "</li>\n" +
            "<li class=\"peo-num\">" + (i+1) + "</li>\n" +
            "</ul>" +
            "</ul>"
        );
        //玩家状态
        player_state ={
            role:player[i],
            num:(i+1),
            status:'live',
        };
        arr_player.push(player_state);
        //存储玩家状态数组
        sessionStorage.setItem('arr_player',JSON.stringify(arr_player))
    }
});
