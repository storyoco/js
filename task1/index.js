window.onload = function () {

    var start = document.getElementById('start');
    var stop = document.getElementById('stop');
    var cube = document.getElementsByClassName('cube');
    var mycolor;

    //清除颜色
    function clearColor() {
        for (i=0; i<cube.length; i++) {
            cube[i].style.backgroundColor = '#fea500';
        }
    }

    //随机格子颜色
    function random_color() {

        //清除颜色
        clearColor();

        //洗牌算法取随机格子
        function cubeShuffle() {
            //取格子数组
            var test = new Array(cube.length);
            for (i=0; i<test.length; i++){
                test[i] = i;
            }
            //洗牌算法
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
            test.shuffle();
            return test.shuffle();
        }

        //随机颜色
        function rgb() {
            var r = Math.floor(Math.random()*255);
            var g = Math.floor(Math.random()*255);
            var b = Math.floor(Math.random()*255);
            return 'rgb(' + r + "," + g + ","+ b + ')';
        }

        //变化格子颜色
        for (n=0; n<3; n++){
            cube[cubeShuffle()[n]].style.backgroundColor = rgb();
        }
    }

    //开始闪
    start.onclick = function() {
        //按钮变色
        this.style.backgroundColor = '#fea500';
        this.style.color = 'white';
        stop.style.backgroundColor = 'white';
        stop.style.color = '#fea500';
        //清除定时器
        clearInterval(mycolor);
        //开始定时器
        mycolor = setInterval(function () {random_color()},1000);
    };

    //结束闪
    stop.onclick = function() {
        //按钮变色
        this.style.backgroundColor = '#fea500';
        this.style.color = 'white';
        start.style.backgroundColor = 'white';
        start.style.color = '#fea500';
        //清除颜色
        clearColor();
        //清除定时器
        clearInterval(mycolor)
    };
};
