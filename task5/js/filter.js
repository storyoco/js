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
    });