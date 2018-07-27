$(document).ready(function () {

    var begin = document.getElementById('begin');//发牌
    var num = document.getElementById('num');//玩家总人数
    var num_man = document.getElementById('num-man'); //平民数量
    var num_killer = document.getElementById('num-killer'); //杀手数量
    var osliderBlock = document.getElementById("range");//滑块的值
    var player = [];//玩家人数

    //防止页面后退
    history.pushState(null, null, document.URL);
    window.addEventListener('popstate', function () {
        history.pushState(null, null, document.URL);
    });

//平民杀手人数
//1杀手
    function num_player1 (){
        num_man.innerHTML = num.value - 1;
        num_killer.innerHTML = 1;
        player.length = num.value;
        for (i=0; i<player.length-1; i++){
            player[i] = '平民';
        }
        player[player.length-1] = '杀手';
    }
//2杀手
    function num_player2 (){
        num_man.innerHTML = num.value - 2;
        num_killer.innerHTML = 2;
        player.length = num.value;
        for (i=0; i<player.length-2; i++){
            player[i] = '平民';
        }
        for (j=player.length-2; j<player.length; j++){
            player[j] = '杀手';
        }
    }
//3杀手
    function num_player3 (){
        num_man.innerHTML = num.value - 3;
        num_killer.innerHTML = 3;
        player.length = num.value;
        for (i=0; i<player.length-3; i++){
            player[i] = '平民';
        }
        for (j=player.length-3; j<player.length; j++){
            player[j] = '杀手';
        }
    }
//4杀手
    function num_player4 (){
        num_man.innerHTML = num.value - 4;
        num_killer.innerHTML = 4;
        player.length = num.value;
        for (i=0; i<player.length-4; i++){
            player[i] = '平民';
        }
        for (j=player.length-4; j<player.length; j++){
            player[j] = '杀手';
        }
    }
//5杀手
    function num_player5 (){
        num_man.innerHTML = num.value - 5;
        num_killer.innerHTML = 5;
        player.length = num.value;
        for (i=0; i<player.length-5; i++){
            player[i] = '平民';
        }
        for (j=player.length-5; j<player.length; j++){
            player[j] = '杀手';
        }
    }

//配比平民杀手
//配比判断
    function change() {
        if (4<=num.value && num.value<=5){
            num_player1();
        } else if (6<=num.value && num.value<=8){
            num_player2();
        } else if (9<=num.value && num.value<=13){
            num_player3();
        } else if (14<=num.value && num.value<=15){
            num_player4();
        } else if (16<=num.value && num.value<=18){
            num_player5();
        }
    }
//配比匹配
    function on_change() {
        if (num.value >= 4 && num.value <= 18) {//设置方框里面玩家人数范围
            osliderBlock.value=num.value;//将玩家总人数赋值给滑块的值，实现动态变化
        } else {
            alert("请输入正确的人数4~18");
            num.value=8;
            osliderBlock.value=8;
            num_player2();
            //人数超出范围的话，弹出警告框，并且将方框和滑块的值重置为8
        }
    }

//slider
    function moveChange() {// 滑块的值改变，运行这个函数
        num.value=osliderBlock.value;
        change();
        //滑块的值改变的话，滑块的值赋值给方框，实现动态变化
    }
//减少玩家
    function less() {
        num.value--;
        //减的按钮，减掉玩家总人数的值
        if (num.value<4){
            alert("请输入正确的人数4~18");
            num.value=4;
            //人数超出范围的话，弹出警告框，并且将方框和滑块的值重置为8
        }
        else {
            osliderBlock.value=num.value;// 将玩家人数赋值给滑轮的值
        }
        change();
    }
//增加玩家
    function plus() {
        num.value++;
        //加的按钮，减掉玩家总人数的值，上面的值已经相互关联了，所以方框的值改变，滑块的值也会改变
        if (num.value>18){
            alert("请输入正确的人数4~18");
            num.value=18;
            //人数超出范围的话，弹出警告框，并且将方框和滑块的值重置为18
        }
        else {
            osliderBlock.value=num.value;// 将玩家人数赋值给滑轮的值
        }
        change();
    }

//打乱数组
    function Shuffle (){
        Array.prototype.shuffle = function() {
            var input = this;
            for (var i = input.length-1; i >=0; i--) {
                var randomIndex = Math.floor(Math.random()*(i+1));
                var itemAtIndex = input[randomIndex];
                input[randomIndex] = input[i];
                input[i] = itemAtIndex;
            }
            return input;
        };
        player.shuffle();
    }

//返回
    $(".btn-back").click(function () {
        sessionStorage.clear();
        location.href = 'index2.html'
    });

//输入判断
    num.onchange = function () {
        on_change();
        change();
    };

//滑块
    osliderBlock.onchange = function () {
        moveChange();
    };

//减少\增加
    $(".btn-reduce").click(function () {
        less();
    });
    $(".btn-add").click(function () {
        plus();
    });


//发牌前置条件
    var check;
//点击设置
    $(".btn-num").click(function () {
        check = 'on';
        change();//调用获取玩家数组
        var re = player.reverse();//倒序玩家数组使杀手显示在前
        $('.player').remove();//删除上次增加方块
        //动态显示人数方块
        for (i=0; i<player.length; i++){
            $('.kill_man_list').append(
                "<li class=\'player\'>"+
                    "<div class=\'box\'>"+
                    "</div>" + re[i] +
                "</li>"
            );
            if (re[i]=='杀手'){
                $(".box").eq(i).css({"background":"#fbb435"})
            }
        }
    });

//发牌
    begin.onclick = function () {
        if (check=='on'){
            Shuffle();//调用打乱数组
            var man_length = num_man.innerText;//平民数量
            var kill_length =  num_killer.innerText;//杀手数量
            // 存储值：将对象转换为Json字符串
            sessionStorage.setItem("man_length",man_length);
            sessionStorage.setItem("kill_length",kill_length);
            sessionStorage.setItem("player",JSON.stringify(player));
            location.href = 'identity.html';
        } else {
            alert('请配比玩家')
        }
    };

});



