window.onload = function () {

    var start = document.getElementById('start');
    var stop = document.getElementById('stop');
    var cube = document.getElementsByClassName('cube');
    var mycolor;

    //随机格子颜色
    function random_color() {
        //随机格子
        var arr_3 = [];
        function numRandom() {
            var random = Math.abs((Math.floor(Math.random()*10))-1);
            if(arr_3.length < 3) {
                for(i=0;i<=arr_3.length;i++) {
                    if( random == arr_3[i] ) {
                        break;
                    }
                    else {
                        if( i == arr_3.length ) {
                            arr_3.push(random);
                            break;
                        }
                    }
                }
                numRandom(0,9);
            }
        }
        numRandom(0,9);
        //随机颜色
        var arr_r = [Math.floor(Math.random()*256),Math.floor(Math.random()*256),Math.floor(Math.random()*256)];
        var arr_g = [Math.floor(Math.random()*256),Math.floor(Math.random()*256),Math.floor(Math.random()*256)];
        var arr_b = [Math.floor(Math.random()*256),Math.floor(Math.random()*256),Math.floor(Math.random()*256)];
        var arr_rgb = [arr_r,arr_g,arr_b];
        //清除颜色
        for (j=0; j<cube.length; j++) {
            cube[j].style.backgroundColor = '#fea500';
        }
        //变化格子颜色
        for (i=0; i<arr_3.length; i++) {
            cube[arr_3[i]].style.backgroundColor = "rgb("+arr_rgb[i][0]+","+arr_rgb[i][1]+","+arr_rgb[i][2]+")";
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
        for (i=0; i<cube.length; i++) {
            cube[i].style.backgroundColor = '#fea500';
        }
        //清除定时器
        clearInterval(mycolor)
    };
};
