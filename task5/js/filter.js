app
    .filter('status',function () {
        return function (state) {
            switch (state){
                case 1: return '草稿';
                case 2: return '上线';
            }
        }
    })
    .filter('types',function () {
        return function (type) {
            switch (type){
                case 0: return '首页Banner';
                case 1: return '找职业Banner';
                case 2: return '找精英Banner';
                case 3: return '行业大图';
            }
        }
    })
    .filter('industry',function () {
        return function (industry) {
            switch (industry){
                case 0: return '移动互联网';
                case 1: return '电子商务';
                case 2: return '企业服务';
                case 3: return 'O2O';
                case 4: return '教育';
                case 5: return '金融';
                case 6: return '游戏';
            }
        }
    });