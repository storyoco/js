// js
// window.onload = function () {
//     var request = new XMLHttpRequest();//创建XHR对象
//     var btn = document.getElementById('btn');//登录
//     var account = document.getElementById('account');//用户名
//     var number = document.getElementById('number');//密码
//     var point = document.getElementById('point');//提示
//
//     function login() {
//         //规定请求类型URL异步
//         request.open("POST","/carrots-admin-ajax/a/login",true);
//         //POST表单数据添加HTTP头
//         request.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
//         //发送请求
//         request.send("name=" + account.value + "&pwd=" + number.value);
//         //监听浏览器
//         request.onreadystatechange=function(){//readyState改变时调用该函数
//             if (request.readyState==4){//XHR请求完成响应就绪
//                 if (request.status==200){//OK
//                     //获得服务器响应信息
//                     var response = JSON.parse(request.responseText);
//                     //账密校验
//                     if (response.message == 'success') {
//                         location.href = "http://dev.admin.carrots.ptteng.com/#/dashboard";//校验成功登录跳转
//                     }else {
//                         point.innerHTML = response.message;//校验失败显示错误
//                     }
//                 }
//             }
//         };
//     }
//     //登录
//     btn.onclick = login;
//
// };


//jQuery
// $(document).ready(function () {
//
//     function login() {
//         //POST方法
//         $.post(
//             //URL
//             "/carrots-admin-ajax/a/login",
//             //发送数据
//             {name:$("#account").val(),pwd:$("#number").val()},
//             //发送成功获取data作出响应
//             function (data) {
//                 if (data.message=='success'){
//                     location.href = "http://dev.admin.carrots.ptteng.com/#/dashboard";
//                 }
//                 else {
//                     $("#point").text(data.message);
//                 }
//             },
//             //转为JSON格式
//             "json"
//         );
//     }
//
//     //登录
//     $("#btn").click(function () {
//         login();
//     })
//
// });


//angular
app.controller('loginCtrl',function ($scope,$state,$http) {
    $scope.btnLogin = function() {
        $http({
            method:"post",
            url:"/carrots-admin-ajax/a/login",
            params:{
                name:$scope.account,
                pwd:$scope.number
            }
        }) .then(
            function (resp){
            if (resp.data.code == 0) {
                $state.go('home',{})
            } else {
                $scope.point = resp.data.message;
            }
        });
    }
});


