app
    .directive("pgnum", function() {
    return {
        restrict:'AE',
        template:'每页显示 <input class="pgnum" ng-model="pgnum" type="text"\n' +
        '                           onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,\'\')}\n' +
        '                           else{this.value=this.value.replace(/\\D/g,\'\')}"\n' +
        '                           onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,\'\')}\n' +
        '                           else{this.value=this.value.replace(/\\D/g,\'\')}"> 条'
    }
})
.directive("pggo", function() {
    return {
        restrict:'AE',
        template:'去第 <input class="pggo" ng-model="pggo" type="text"\n' +
        '                           onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,\'\')}\n' +
        '                           else{this.value=this.value.replace(/\\D/g,\'\')}"\n' +
        '                           onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,\'\')}\n' +
        '                           else{this.value=this.value.replace(/\\D/g,\'\')}"> 页  ' +
        '<button class="pgbtn btn btn-danger" ng-click="pgbtn()" type="button">确定</button>'
    }
});