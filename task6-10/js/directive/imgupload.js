app.run(function ($templateCache) {
    $templateCache.put('imgupload.html')
});

app.directive("imgUpload",function ($http) {
        return {
            restrict:'AECM',
            replace:true,
            templateUrl:'/html/imgupload.html',
            link: function (scope) {
                //图片上传
                scope.fileReader = new FileReader();
                scope.choiceFile = document.getElementById('choice');
                scope.img = document.getElementById('img');
                scope.fileChanged = function (response) {
                    scope.$apply(function () {
                        scope.files = response.files[0];
                        scope.fileName = scope.files.name;
                        scope.fileSize = scope.files.size / 1024 / 1024;
                        scope.imgState = true;
                    })
                };

                //上传按钮
                scope.uploadArt = function () {
                    var formData = new FormData();
                    scope.fileReader.readAsDataURL(scope.files);
                    formData.append('file', scope.files);
                    if (scope.files.size <= 5242880) {
                        $http({
                            method: 'POST',
                            url: '/carrots-admin-ajax/a/u/img/task',
                            data: formData,
                            headers: {'content-Type': undefined},
                            uploadEventHandlers: {
                                progress: function (ev) {
                                    scope.progress = (ev.loaded / ev.total) * 100;
                                }
                            }
                        }).then(function (ev) {
                            scope.src = ev.data.data.url;
                            scope.uploadStatus = ev.data.message;
                            scope.imgShow = true;
                            scope.tipshow = false
                        })
                    } else {
                        alert('文件大小超过5M')
                    }
                };

                //删除按钮
                scope.delete = function () {
                    scope.img.setAttribute("src", "");
                    scope.src = undefined;
                    scope.choiceFile.value = '';
                    scope.filesAll = '';
                    scope.files = "";
                    scope.fileName = "";
                    scope.files = "";
                    scope.fileSize = "";
                    scope.progress = 0;
                    scope.uploadStatus = false;
                    scope.imgShow = false;
                    scope.imgState = false;
                    scope.tipshow = true
                };
            }
        }
});