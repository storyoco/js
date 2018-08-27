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
        forceParse: 0,
    });

    //日期限制
    var myDate = new Date();
    var date = myDate.toLocaleDateString();
    $scope.end = function(){
        $('#date1').datetimepicker(
            'setEndDate',$scope.endDate
        );
    };
    $scope.str = function (){
        $('#date2').datetimepicker(
            'setStartDate',$scope.strDate
        );
    }
    if ($scope.endDate == undefined){
        $('#date1').datetimepicker(
            'setEndDate',date
        );
    }
    $('#date2').datetimepicker(
        'setEndDate',date
    );

    //下拉选项
    $scope.state = state;
    $scope.type = type;

    //请求数据
    $http({
        method:"GET",
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

            //搜索
            $scope.searchBtn = function () {
                var strDate = new Date($scope.strDate);
                var endDate = new Date($scope.endDate);
                var time1 = strDate.getTime();
                var time2 = endDate.getTime();

                //若日期没选，则取时间为空，因为时间值会变成NaN，发送的时间值的时候会报错
                if (time1 != time1 || time2 != time2){
                    time1 = '';
                    time2 = '';
                } else if (time1 == time2) {//选择同一天需给另一时间戳添加参数
                    time2 += 86399999;
                    //进行搜索跳转
                }
                $state.go("home.article",{
                    startAt:time1,
                    endAt:time2,
                    status:$scope.selectState,
                    type:$scope.selectType
                });

            };

            //清除
            $scope.clearBtn = function () {
                $state.go("home.article",{
                    startAt:'',
                    endAt:'',
                    status:'',
                    type:''
                })
            };

            //新增article按钮
            $scope.newBtn = function(){
                var Btn = 1;
                sessionStorage.setItem('Btn',Btn);
                $state.go("home.new",{})
            };
            //编辑
            $scope.setBtn = function(){
                var Btn = 2;
                var setId = $scope.list[this.$index].id;
                sessionStorage.setItem('setId',setId);
                sessionStorage.setItem('Btn',Btn);
                $state.go("home.new",{})
            };

            //存储选择
            //日期
            if ($stateParams.startAt == undefined) {
                $scope.strDate = '';
            } else {
                var str = new Date(Number($stateParams.startAt));
                var end = new Date(Number($stateParams.endAt));
                Ys = str.getFullYear()+'/';
                Ms = (str.getMonth()+1 < 10 ? '0'+ (str.getMonth()+1) : str.getMonth()+1) + '/';
                Ds = (str.getDate() < 10 ? '0'+ str.getDate() : str.getDate());
                Ye = end.getFullYear()+'/';
                Me = (end.getMonth()+1 < 10 ? '0'+(end.getMonth()+1) : end.getMonth()+1) + '/';
                De = (end.getDate() < 10 ? '0'+ end.getDate() : end.getDate());
                $scope.strDate = Ys+ Ms + Ds;
                $scope.endDate = Ye+ Me + De;
            }

            //状态类型
            $scope.selectState = $stateParams.status;
            $scope.selectType = $stateParams.type;

            //上下线按钮
            for (i=0;i<$scope.list.length;i++){
                if ($scope.list[i].status == 1) {
                    $scope.list[i].line = '上线'
                } else {
                    $scope.list[i].line = '下线'
                }
            }
            $scope.changeLine = function (){
                var lineId = $scope.list[this.$index].id;
                var lineStatus = $scope.list[this.$index].status;
                if (lineStatus==2) {
                    var onThis = confirm("确认下线此数据？");
                    var line = 1;
                } else {
                    var onThis = confirm("确认上线此数据？");
                    var line = 2;
                }
                if (onThis == true){
                    $http({
                        method:'put',
                        url:"/carrots-admin-ajax/a/u/article/status",
                        params:{
                            id:lineId,
                            status:line
                        }
                    }).then(function () {
                        $state.reload();
                    })
                }
            };

            //删除
            $scope.delete = function () {
                var clearThis = confirm("确认删除此数据？");
                if (clearThis == true){
                    var clearId = $scope.list[this.$index].id;
                    $http({
                        method:'delete',
                        url:"/carrots-admin-ajax/a/u/article/" + clearId,
                    }).then(function () {
                        $state.reload();
                    })
                }
            }

        }
    );
});

