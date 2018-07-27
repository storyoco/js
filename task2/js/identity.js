$(document).ready(function () {

    //防止页面后退
    history.pushState(null, null, document.URL);
    window.addEventListener('popstate', function () {
        history.pushState(null, null, document.URL);
    });

    //获取
    var player = JSON.parse(sessionStorage.getItem("player"));//玩家数组
    var btn_check = 0;
    var i = 0;

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

    //身份隐藏
    $("#text").hide();
    //按钮文本
    $(".footer-btn").text("查看1号身份");
    //号码
    $(".num-pic").text(1);

    //状态判断
    $(".footer-btn").click(function () {
        if (btn_check === 0){
            //身份显示
            $(".flop").css({"background":"url(img/identity.png) no-repeat center .6rem #ffedc5"});
            $(".text").text(player[i]);
            $(".text").show();
            //查看n号身份
            $(".footer-btn").text("隐藏并查看" + (Number(i)+2) + "号身份");
            //最后玩家
            if (i === player.length-1){
                $(".footer-btn").text("法官查看");
            }
            btn_check = 1;
        }else if (i<player.length-1) {
            $(".flop").css({"background":"url(img/flop.png) no-repeat center #ffedc5"});
            $(".num-pic").text(i+2);
            //身份隐藏
            $(".text").hide();
            //翻牌
            $(".footer-btn").text("查看" + (Number(i)+2) + "号身份");
            btn_check = 0;
            i++;
        } else {
            location.href = 'diary.html';
        }
    });
});
