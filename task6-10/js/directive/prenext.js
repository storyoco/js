app.run(function ($templateCache) {
    $templateCache.put('prenext.html');
});

app.directive('preNext',function ($state) {
    return {
        restrict:'AECM',
        replace:true,
        templateUrl:'/html/prenext.html',
        link:function (scope) {

            //翻页
            scope.page = function () {
                $state.go("home.article",{
                    page:scope.currentPage
                })
            };

            //跳转确定
            scope.pgbtn = function () {
                //只跳转页面
                if (scope.pgnum == undefined && scope.pggo !== undefined){
                    $state.go("home.article",{
                        page:scope.pggo,
                    },{
                        reload: true
                    })
                }
                //只改变单页条数
                if (scope.pgnum !== undefined && scope.pggo == undefined){
                    $state.go("home.article",{
                        size:scope.pgnum,
                    },{
                        reload: true
                    })
                }
                //改变单页条数，跳转页面
                if (scope.pgnum !== undefined && scope.pggo !== undefined){
                    $state.go("home.article",{
                        page:scope.pggo,
                        size:scope.pgnum,
                    },{
                        reload: true
                    })
                }
            };
        }
    }
});