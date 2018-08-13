app.controller('artCtrl',function ($scope,$http,$state,$stateParams,state,type) {

    //日期选择
    $('.form_date').datetimepicker({
        language:  'zh-CN',
        weekStart: 1,
        todayBtn:  1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        minView: 2,
        forceParse: 0
    });

    //下拉选项
    $scope.state = state;
    $scope.type = type;

    //请求数据
    $http({
        method:"get",
        url:"/carrots-admin-ajax/a/article/search",
        params:{
            page: $stateParams.page, //使用$stateParams获取传递的参数
            size: $stateParams.size,
            total: $stateParams.total,
            startAt: $stateParams.startAt,
            endAt: $stateParams.endAt,
            status: $stateParams.status,
            type: $stateParams.type,
            id: $stateParams.id,
        }
    }).then (
        function (resp) {
            $scope.list = resp.data.data.articleList;//列表数据渲染
            $scope.size = resp.data.data.size;//每页显示条数
            $scope.totalItems = resp.data.data.total;//数据数量
            $scope.currentPage = $stateParams.page;//当前页

            //翻页
            $scope.page = function () {
                $state.go("home.article",{
                    page:$scope.currentPage
                })
            };

            //分页确定按钮事件
            $scope.pgbtn = function () {
                //只跳转页面
                if ($scope.pgnum == undefined && $scope.pggo !== undefined){
                    $state.go("home.article",{
                        page:$scope.pggo,
                    },{
                        reload: true
                    })
                }
                //只改变单页条数
                if ($scope.pgnum !== undefined && $scope.pggo == undefined){
                    $state.go("home.article",{
                        size:$scope.pgnum,
                    },{
                        reload: true
                    })
                }
                //改变单页条数，跳转页面
                if ($scope.pgnum !== undefined && $scope.pggo !== undefined){
                    $state.go("home.article",{
                        page:$scope.pggo,
                        size:$scope.pgnum,
                    },{
                        reload: true
                    })
                }
            };

            //搜索
            $scope.searchBtn = function () {

                //转换时间戳
                var strTime = new Date($scope.strDate);
                var endTime = new Date($scope.endDate);
                var time1 = strTime.getTime();
                var time2 = endTime.getTime();

                //若日期没选，则取时间为空，因为时间值会变成NaN，发送的时间值的时候会报错
                if (time1 != time1 || time2 != time2){
                    time1 = '';
                    time2 = ''
                } else if (time1 == time2){//选择同一天需给另一时间戳添加参数
                    time2 = time2 + 86399999
                }

                //进行搜索跳转
                $state.go("home.article",{
                    startAt:time1,
                    endAt:time2,
                    status:$scope.selectState,
                    type:$scope.selectType
                })
            };

            //存储选择
            //日期
            if ($stateParams.startAt == undefined) {
                $scope.strDate = '';
            } else {
                var str = new Date(Number($stateParams.startAt));
                var end = new Date(Number($stateParams.endAt));
                Ys = str.getFullYear()+'-';
                Ms = (str.getMonth()+1 < 10 ? '0'+(str.getMonth()+1) : str.getMonth()+1) + '-';
                Ds = (str.getDate() < 10 ? '0'+ str.getDate() : str.getDate());
                Ye = end.getFullYear()+'-';
                Me = (end.getMonth()+1 < 10 ? '0'+(end.getMonth()+1) : end.getMonth()+1) + '-';
                De = (end.getDate() < 10 ? '0'+ end.getDate() : end.getDate());
                $scope.strDate = Ys+ Ms + Ds;
                $scope.endDate = Ye+ Me + De;
            }
            //状态类型
            $scope.selectState = $stateParams.status;
            $scope.selectType = $stateParams.type;

            //时间戳转换
            var arr_list = resp.data.data.articleList;
            for (i=0; i<arr_list.length; i++){
                //时间
                var date1 = new Date(arr_list[i].createAt);
                Y1 = date1.getFullYear() + '-';
                M1 = (date1.getMonth()+1 < 10 ? '0'+(date1.getMonth()+1) : date1.getMonth()+1) + '-';
                D1 = (date1.getDate() < 10 ? '0'+ date1.getDate() : date1.getDate()) + ' ';
                h1 = (date1.getHours() < 10 ? '0'+ date1.getHours() : date1.getHours()) + ':';
                m1 = (date1.getMinutes() < 10 ? '0'+ date1.getMinutes() : date1.getMinutes()) + ':';
                s1 = (date1.getSeconds() < 10 ? '0'+ date1.getSeconds() : date1.getSeconds()) ;

                var date2 = new Date(arr_list[i].updateAt);
                Y2 = date2.getFullYear() + '-';
                M2 = (date2.getMonth()+1 < 10 ? '0'+(date2.getMonth()+1) : date2.getMonth()+1) + '-';
                D2 = (date2.getDate() < 10 ? '0'+ date2.getDate() : date2.getDate()) + ' ';
                h2 = (date1.getHours() < 10 ? '0'+ date1.getHours() : date1.getHours()) + ':';
                m2 = (date1.getMinutes() < 10 ? '0'+ date1.getMinutes() : date1.getMinutes()) + ':';
                s2 = (date1.getSeconds() < 10 ? '0'+ date1.getSeconds() : date1.getSeconds()) ;
                arr_list[i].createAt = Y1+M1+D1+h1+m1+s1;
                arr_list[i].updateAt = Y2+M2+D2+h2+m2+s2;
            }
        }
    );

});

