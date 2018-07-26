$(document).ready(function () {

    //获取
    var day = sessionStorage.getItem('day');//天数
    var player = JSON.parse(sessionStorage.getItem("player"));//玩家数组
    var arr_player = JSON.parse(sessionStorage.getItem("arr_player"));//玩家状态数组
    var player_state;
    var voteNum;//投票下标
    // var arr_killNum = JSON.parse(sessionStorage.getItem("arr_killNum"));//杀人下标数组
    var arr_voteNum = JSON.parse(sessionStorage.getItem("arr_voteNum"));//投票下标数组
    var man_length = sessionStorage.getItem("man_length");//平民生还数
    var kill_length = sessionStorage.getItem("kill_length");//杀手生还数

    //存储
    var stateNow = 'start';//重新开始状态
    sessionStorage.setItem("stateNow",stateNow);//存储状态

    //关闭
    $(".btn-close").click(function () {
        sessionStorage.clear();
        location.href = 'index2.html';
    });

    //投票下标数组赋值
    if (arr_voteNum == undefined){
        arr_voteNum = [];
    } else {
        arr_voteNum = JSON.parse(sessionStorage.getItem("arr_voteNum"));
    }

    for (i=0; i<player.length; i++){
        //生成格子
        $('.vote-peo').append(
            "<ul class=\"peo-col\">\n" +
                "<ul class=\"peo-box\">\n" +
                    "<li class=\"peo-pic\">" + player[i] + "</li>\n" +
                    "<li class=\"peo-num\">" + (i+1) + "</li>\n" +
                "</ul>" +
                "<ul class=\"peo-act\">\n" +
                    "<li class=\"peo-knife\"></li>\n" +
                "</ul>" +
            "</ul>"
        );
        //隐藏小刀
        $('.peo-knife').hide();
        //死者高亮
        if (arr_player[i].status == 'die'){
            $(".peo-pic").eq(i).css({"backgroundColor":"#83b09a"});
        }
    }

    //选择投死对象
    $(".peo-box").click(function () {
        $('.peo-knife').hide();
        $(this).siblings().children().show();
        $(this).find('.peo-pic').html();//投死者身份
        voteNum = $(this).find('.peo-num').html() - 1;//投死者编号
    });

    //确定按钮
    $(".footer-btn").click(function () {
        if (voteNum == undefined) {
            alert('请先选择要操作的玩家')
        } else if (arr_player[voteNum].status == 'die'){
            alert('当前玩家已死亡，请选择其他玩家')
        } else {
            day = Number(day)+1;//下一天
            $(".peo-pic").eq(voteNum).css({"backgroundColor":"#83b09a"});//高亮投死者
            //玩家状态
            player_state={
                role:player[voteNum],
                num:(voteNum+1),
                status:'die',
            };
            arr_player.splice(voteNum,1,player_state);
            arr_voteNum.push(voteNum);//投票下标数组
            //平民杀手生还数
            if (arr_player[voteNum].role == '平民') {
                man_length = man_length - 1;
            } else {
                kill_length = kill_length - 1;
            }
            //存储
            sessionStorage.setItem("day",day);//存储天数
            sessionStorage.setItem('arr_player',JSON.stringify(arr_player));//存储玩家状态数组
            sessionStorage.setItem("voteNum",voteNum);//存储投死者下标
            sessionStorage.setItem("arr_voteNum",JSON.stringify(arr_voteNum));//存储投死者下标数组
            sessionStorage.setItem("man_length",man_length);//存储平民生还数
            sessionStorage.setItem("kill_length",kill_length);//存储杀手生还数
            //游戏继续\结束判断
            if (man_length == 0 || kill_length == 0 || kill_length >= man_length){
                location.href = 'result.html';
            } else {
                location.href = 'process.html';
            }
        }
    });
    console.log(day);
});
