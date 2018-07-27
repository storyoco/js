$(document).ready(function () {

    //获取
    var day = sessionStorage.getItem('day');//天数
    var time = sessionStorage.getItem('time');//结果页跳转判断
    var player = JSON.parse(sessionStorage.getItem("player"));//玩家数组
    var arr_killNum = JSON.parse(sessionStorage.getItem('arr_killNum'));//被杀下标数组
    var arr_voteNum = JSON.parse(sessionStorage.getItem('arr_voteNum'));//投票下标数组
    var man_length = sessionStorage.getItem("man_length");//平民生还数
    var kill_length = sessionStorage.getItem("kill_length");//杀手生还数

    //防止页面后退
    history.pushState(null, null, document.URL);
    window.addEventListener('popstate', function () {
        history.pushState(null, null, document.URL);
    });

    //返回
    $(".btn-home").click(function () {
        sessionStorage.clear();
        location.href = 'index2.html';
    });

    //再来一局
    $(".again").click(function () {
        sessionStorage.clear();
        location.href = 'assign.html';
    });

    //杀手平民生还数显示
    $('.chac-kill').text(kill_length);
    $('.chac-civy').text(man_length);

    //判断是否从杀人页面跳转而来
    if (time == 'on') {
        day = day;
    } else {
        day = Number(day)-1;
    }

    //动态生成流程结果
    for (i=0; i<day; i++){
        var html =
            "<ul class=\'process-col\'>" +
            "<li class=\"process-time\">" +
            "<span class=\"date\">" + "第" + "<span class=\'date_time\'>" + Number(i+1) + "</span>" + "天" + "</span>" +
            "</li>" +
            "<li class='night'>" +
            "晚上：" +
            "<span class='kill_num'>" + (Number(arr_killNum[i])+1) + "</span>" +
            "号被杀手杀死，真实身份是" + "<span class=\'kill_role\'>" + player[arr_killNum[i]] + "</span>"+
            "</li>"+
            "<li class='day'>" +
            "白天：" +
            "<span class='vote_num'>" + (Number(arr_voteNum[i])+1) + "</span>" +
            "号被投票投死，真实身份是" + "<span class='vote_role'>" + player[arr_voteNum[i]] +"</span>" +
            "</li>"+
            "</ul>";
        $(".cont-process").append(html);
        //杀人页面跳转则隐藏当前投票信息
        if (arr_voteNum[day-1] == undefined){
            $(".day").eq(day-1).text('');
        }
        //没有杀人显示无操作
        if (arr_killNum[i] == 'no'){
            $('.night').eq(i).text('晚上：没有任何操作');
        }
    }

});