$(document).ready(function () {

    //获取
    var player = JSON.parse(sessionStorage.getItem("player"));//玩家数组
    var player_state = {};//玩家状态
    var arr_player = JSON.parse(sessionStorage.getItem("arr_player"));//玩家状态数组
    var arr_killNum = JSON.parse(sessionStorage.getItem("arr_killNum"));//杀手数组
    var killNum;//被杀下标
    var man_length = sessionStorage.getItem("man_length");//平民生还人数
    var kill_length = sessionStorage.getItem("kill_length");//杀手生还人数

    //防止页面后退
    history.pushState(null, null, document.URL);
    window.addEventListener('popstate', function () {
        history.pushState(null, null, document.URL);
    });

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

    //被杀下标数组
    if (arr_killNum == undefined){
        arr_killNum = [];
    } else {
        arr_killNum = JSON.parse(sessionStorage.getItem("arr_killNum"));
    }

    //生成格子
    for (i=0; i<arr_player.length; i++){
        //生成格子
        $('.vote-peo').append(
            "<ul class=\"peo-col\">\n" +
                "<ul class=\"peo-box\">\n" +
                    "<li class=\"peo-pic\">" + arr_player[i].role + "</li>\n" +
                    "<li class=\"peo-num\">" + arr_player[i].num + "</li>\n" +
                "</ul>" +
                "<ul class=\"peo-act\">\n" +
                    "<li class=\"peo-knife\"></li>\n" +
                "</ul>" +
            "</ul>"
        );
        //高亮
        $('.peo-knife').hide();
        if (arr_player[i].status == 'die'){
            $(".peo-pic").eq(i).css({"backgroundColor":"#83b09a"});
        }
    }

    //选择杀死对象
    $(".peo-box").click(function () {
        $('.peo-knife').hide();
        $(this).siblings().children().show();
        killNum = $(this).find('.peo-num').html() - 1;//死者下标
    });

    //确定按钮
    $(".footer-btn").click(function () {
        if (player[killNum] == undefined){
            killNum = 'no';
            arr_killNum.push(killNum);
            sessionStorage.setItem("killNum", killNum);//存储被杀下标
            sessionStorage.setItem("arr_killNum", JSON.stringify(arr_killNum));//存储被杀下标数组
            //存储
            var stateNow = 'killed';
            sessionStorage.setItem("stateNow", stateNow);//存储状态
            location.href = 'process.html'
        } else if (arr_player[killNum].role == '平民') {
            if (arr_player[killNum].status == 'die') {
                alert('不能杀已死玩家')
            } else {
                $(".peo-pic").eq(killNum).css({"backgroundColor": "#83b09a"});//高亮死者
                arr_killNum.push(killNum);
                //玩家状态
                player_state = {
                    role: player[killNum],
                    num: (killNum + 1),
                    status: 'die',
                };
                arr_player.splice(killNum, 1, player_state);
                //平民生还者
                man_length = man_length - 1;
                //存储
                var stateNow = 'killed';
                sessionStorage.setItem("stateNow", stateNow);//存储状态
                sessionStorage.setItem('arr_player', JSON.stringify(arr_player));//存储玩家状态数组
                sessionStorage.setItem("killNum", killNum);//存储被杀下标
                sessionStorage.setItem("arr_killNum", JSON.stringify(arr_killNum));//存储被杀下标数组
                sessionStorage.setItem("man_length",man_length);//存储平民生还数
                //游戏继续\结束判断
                if(man_length == 0 || kill_length == 0 ||kill_length >= man_length){
                    var time = 'on';
                    sessionStorage.setItem("time",time);
                    location.href = 'result.html'
                } else {
                    location.href='process.html';
                }
            }
        } else if (arr_player[killNum].role == '杀手') {
            alert('您是杀手不能杀死本职业，请选择其他玩家杀死')
        }
    });
});
