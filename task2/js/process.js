$(document).ready(function () {

    //获取
    var day = sessionStorage.getItem('day');//天数
    var stateNow = sessionStorage.getItem("stateNow");//当前状态
    var arr_player = JSON.parse(sessionStorage.getItem("arr_player"));//玩家状态数组
    var killNum = sessionStorage.getItem('killNum');//被杀下标
    var arr_killNum = JSON.parse(sessionStorage.getItem('arr_killNum'));//被杀下标数组
    var voteNum = sessionStorage.getItem("voteNum");//投票下标
    var arr_voteNum = JSON.parse(sessionStorage.getItem('arr_voteNum'));//投票下标数组

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
    //结束游戏
    $(".again").click(function () {
        sessionStorage.clear();
        location.href = 'index2.html';
    });

    //当前杀人详情
    function judgeKill() {
        if (arr_killNum[day-1]=='no') {
            $('#kill').after(
                "<div class='killText'>" +
                '没有进行任何操作' +
                "</div>"
            )
        }else {
            $('#kill').after(
                "<div class='killText'>" +
                "<span class='killNum'>" + (Number(killNum)+1) + "</span>" +
                "号被杀手杀死，真实身份是平民" +
                "</div>"
            );
        }
        $('.circle2').css({'top':'1.8rem'});
    }
    //过去杀人详情
    function judgeKill2() {
        if (arr_killNum[day-2]=='no') {
            $('.kill').eq(i-1).after(
                "<div class='killText'>" +
                '没有进行任何操作' +
                "</div>"
            )
        }else {
            $('.kill').eq(i-1).after(
                "<div class='killText'>" +
                "<span class='killNum'>" + (Number(arr_killNum[i-1])+1) + "</span>" +
                "号被杀手杀死，真实身份是平民" +
                "</div>"
            );
        }
        $('.circle2').css({'top':'1.8rem'});
    }
    //当前投死信息
    function judgeVote() {
        $('#vote').after(
            "<div class='voteText'>" +
            "<span class='voteNum'>" + (Number(voteNum)+1) + "</span>" +
            "号被投票投死，真实身份是平民" +
            "</div>"
        );
    }
    //过去投死信息
    function judgeVote2() {
        $('.vote').eq(i-1).after(
            "<div class='voteText'>" +
            "<span class='voteNum'>" + (Number(arr_voteNum[i-1])+1) + "</span>" +
            "号被投票投死，真实身份是" + arr_player[voteNum].role +
            "</div>"
        );
    }

    //start/killed状态转变
    if (stateNow == null){
        stateNow = 'start';
    }

    //动态增加天数
    $("#time-num").text(day);
    if (day>1){
        for (var i=1; i<day; i++){
            //添加天数
            var html =
                "<div class=\'day-box\'>" +
                "<div class=\'date\'>" +
                "<span class=\'time\'>" + "第" +
                "<span class='time-num'>" + i + "</span>" + "天" +
                "</span>" +
                "<img class='down' src='img/down.png'>" +
                "</div>" +
                "<div class=\"proc-box\">" +
                "<div class=\"left\">" +
                "<div class=\"border\"></div>\n" +
                "<div class=\"circle\"></div>\n" +
                "<div class=\"circle2\"></div>"+
                "</div>" +
                "<div class=\"proc\">"+
                "<div class=\"process kill\"><div class=\"trg\"></div>杀手杀人</div>\n" +
                "<div class=\"process\"><div class=\"trg\"></div>亡灵发表遗言</div>\n" +
                "<div class=\"process\"><div class=\"trg\"></div>玩家依次发言</div>\n" +
                "<div class=\"process vote\"><div class=\"trg\"></div>投票</div>"+
                "</div>"+
                "</div>"+
                "</div>";
            $(".day-box").eq(i-1).before(html);
            //杀人信息显示
            judgeKill2();
            judgeVote2();
            //详情隐藏
            $(".day-box").eq(i-1).find(".proc-box").hide();
            //高亮
            $(".proc-box").eq(i-1).find(".process").css({"background":"#83b09a"});
            $(".proc-box").eq(i-1).find(".trg").css({"border-right":"#83b09a solid .22rem"});
        }
    }

    //天数点击展示\隐藏
    $(".date").click(function(){
        $(this).next().slideToggle();
    });
    $("#date_now").click(function(){
        $(this).next().slideToggle();
    });

    //状态机
    var fsm = new StateMachine({
        init: stateNow,
        transitions: [
            { name: 'kill', from: 'start', to: 'killed' },
            { name: 'speak', from: 'killed', to: 'spoke' },
            { name: 'talk', from: 'spoke', to: 'talked' },
            { name: 'vote', from: 'talked', to: 'voted' }
        ],
        methods: {
            onKill: function() {
                $("#kill").css({"background":"#83b09a"});
                $("#trg1").css({"border-right":"#83b09a solid .22rem"});
            },
            onSpeak: function() {
                $("#speak").css({"background":"#83b09a"});
                $("#trg2").css({"border-right":"#83b09a solid .22rem"});
            },
            onTalk: function() {
                $("#talk").css({"background":"#83b09a"});
                $("#trg3").css({"border-right":"#83b09a solid .22rem"});
            },
            onVote: function() {
                $("#vote").css({"background":"#83b09a"});
                $("#trg4").css({"border-right":"#83b09a solid .22rem"});
            }
        }
    });

    //开始杀人
    $("#kill").click(function () {
        if (fsm.state=='start'){
            fsm.kill();
            location.href='kill.html';
        } else {
            alert('请按顺序操作');
        }
    });
    //死者自白
    $("#speak").click(function () {
        if (fsm.state=='killed'){
            var YN = confirm('请死者亮明身份并且发表遗言');
            if (YN==true){
                fsm.speak();
                stateNow = fsm.state;
                sessionStorage.setItem("stateNow",stateNow);//当前状态
            }
        } else {
            alert('请按顺序操作');
        }
    });
    //玩家讨论
    $("#talk").click(function () {
        if (fsm.state=='spoke'){
            var YN = confirm('玩家依次发言讨论');
            if (YN==true){
                fsm.talk();
                stateNow = fsm.state;
                sessionStorage.setItem("stateNow",stateNow);//当前状态
            }
        } else {
            alert('请按顺序操作');
        }
    });
    //玩家投票
    $("#vote").click(function () {
        if (fsm.state=='talked'){
            fsm.vote();
            stateNow = fsm.state;
            sessionStorage.setItem("stateNow",stateNow);//当前状态
            location.href='vote.html';
        } else {
            alert('请按顺序操作');
        }
    });

    //状态判断
    switch (fsm.state){
        case "killed":
            fsm.onKill();
            judgeKill();
            break;
        case "spoke":
            fsm.onKill();
            fsm.onSpeak();
            judgeKill();
            break;
        case "talked":
            fsm.onKill();
            fsm.onSpeak();
            fsm.onTalk();
            judgeKill();
            break;
        case "voted":
            fsm.onKill();
            fsm.onSpeak();
            fsm.onTalk();
            fsm.onVote();
            judgeKill();
            judgeVote();
    }

    //存储
    sessionStorage.setItem("arr_player",JSON.stringify(arr_player));//玩家状态数组
    sessionStorage.setItem('day',day);
});
