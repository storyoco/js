app.controller('newCtrl',function ($scope,$http,$state,$stateParams,type,industry) {

    var Btn = sessionStorage.getItem('Btn');//新建、编辑入口获取
    var setId = sessionStorage.getItem('setId');//获取ID

    $scope.fileReader = new FileReader();
    $scope.choiceFile = document.getElementById('choice');
    $scope.img = document.getElementById('img');
    $scope.fileChanged = function (response) {
        $scope.$apply(function () {
            $scope.files = response.files[0];
            $scope.fileName = $scope.files.name;
            $scope.fileSize = $scope.files.size / 1024 / 1024;
            $scope.imgState = true;
        })
    };

    //富文本编辑器
    var E = window.wangEditor
    var editor = new E('#editor')
    editor.create()

    //上传按钮
    $scope.uploadArt = function () {
        var formData = new FormData();
        $scope.fileReader.readAsDataURL($scope.files);
        formData.append('file', $scope.files);
        if ($scope.files.size <= 5242880) {
            $http({
                method: 'POST',
                url: '/carrots-admin-ajax/a/u/img/task',
                data: formData,
                headers: {'content-Type': undefined},
                uploadEventHandlers: {
                    progress: function (ev) {
                        $scope.progress = (ev.loaded / ev.total) * 100;
                    }
                }
            }).then(function (ev) {
                $scope.src = ev.data.data.url;
                $scope.uploadStatus = ev.data.message;
                $scope.imgShow = true;
                $scope.tipshow = false
            })
        } else {
            alert('文件大小超过5M')
        }
    };

    //删除按钮
    $scope.delete = function () {
        $scope.img.setAttribute("src", "");
        $scope.src = undefined;
        $scope.choiceFile.value = '';
        $scope.filesAll = '';
        $scope.files = "";
        $scope.fileName = "";
        $scope.files = "";
        $scope.fileSize = "";
        $scope.progress = 0;
        $scope.uploadStatus = false;
        $scope.imgShow = false;
        $scope.imgState = false;
        $scope.tipshow = true
    };


    //下拉框
    $scope.type = type;
    $scope.industry = industry;
    $scope.selectIndus = '0';
    $scope.selectChange = function () {
        if ($scope.selectType == 3) {
            $scope.selectShow = true;
        } else {
            $scope.selectShow = false;
        }
    };

    //编辑入口 渲染数据
    if (Btn == 2){
        $scope.title = '编辑';
        $http({
            method:'GET',
            url:'/carrots-admin-ajax/a/article/' + setId,
        }).then(function (resp) {
            $scope.titleName = resp.data.data.article.title;
            $scope.selectType = String(resp.data.data.article.type);
            $scope.selectIndus = String(resp.data.data.article.industry);
            $scope.link = resp.data.data.article.url;
            $scope.src = resp.data.data.article.img;
            editor.txt.html(resp.data.data.article.content);
            var createTime = resp.data.data.article.createAt;

            if ($scope.selectType == 3) {
                $scope.selectShow = true;
            } else {
                $scope.selectShow = false;
            }

            $scope.imgShow = true;
            $scope.imgState = true;

            //立即上线
            $scope.online = function (){
                $http({
                    method:'PUT',
                    url:'/carrots-admin-ajax/a/u/article/' + setId,
                    params:{
                        title:$scope.titleName,
                        type:Number($scope.selectType),
                        industry:Number($scope.selectIndus),
                        status:2,
                        content:editor.txt.html(),
                        url:$scope.link,
                        img:$scope.src,
                        createAt:createTime
                    }
                }).then(function () {
                    $state.go('home.article',{});
                });
            };
            //存为草稿
            $scope.outline = function (){
                $http({
                    method:'PUT',
                    url:'/carrots-admin-ajax/a/u/article/' + setId,
                    params:{
                        title:$scope.titleName,
                        type:Number($scope.selectType),
                        industry:Number($scope.selectIndus),
                        status:1,
                        content:editor.txt.html(),
                        url:$scope.link,
                        img:$scope.src,
                        createAt:createTime
                    }
                }).then(function () {
                    $state.go('home.article',{});
                });
            };
        });

    }
    //新增入口
    else {
        $scope.title = '新建Article';
        //立即上线
        $scope.online = function (){
            $http({
                method:'POST',
                url:'/carrots-admin-ajax/a/u/article',
                params:{
                    title:$scope.titleName,
                    type:Number($scope.selectType),
                    industry:Number($scope.selectIndus),
                    status:2,
                    content:editor.txt.html(),
                    url:$scope.link,
                    img:$scope.src,
                }
            }).then(function () {
                $state.go('home.article',{});
            });
        };
        //存为草稿
        $scope.outline = function (){
            $http({
                method:'POST',
                url:'/carrots-admin-ajax/a/u/article',
                params:{
                    title:$scope.titleName,
                    type:Number($scope.selectType),
                    industry:Number($scope.selectIndus),
                    status:1,
                    content:editor.txt.html(),
                    url:$scope.link,
                    img:$scope.src
                }
            }).then(function () {
                $state.go('home.article',{});
            });
        };
    }

    //取消
    $scope.cancel = function () {
        $state.go('home.article',{})
    };


});
