app
    .constant('state',[
        {key:"1", value:"草稿"},
        {key:"2", value:"上线"}
    ])
    .constant('type',[
        {key:"0", value:"首页Banner"},
        {key:"1", value:"找职业Banner"},
        {key:"2", value:"找精英Banner"},
        {key:"3", value:"行业大图"}
    ])
    .constant('industry',[
        {key:"0", value:"移动互联网"},
        {key:"1", value:"电子商务"},
        {key:"2", value:"企业服务"},
        {key:"3", value:"O2O"},
        {key:"3", value:"教育"},
        {key:"3", value:"金融"},
        {key:"3", value:"游戏"}
    ])
    .constant('sideBar', [
        {
            sideBarTitle: '信息管理',
            sideBarContent: [
                {sideBarName: '公司列表', url: ''},
                {sideBarName: '职位列表', url: ''},
            ]
        },
        {
            sideBarTitle: 'Article管理',
            sideBarContent: [
                {sideBarName: 'Article列表', url: '.article'},
                {sideBarName: '新建管理', url: ''},
                {sideBarName: '文章管理', url: ''},
            ]
        },
        {
            sideBarTitle: '用户管理',
            sideBarContent: [
                {sideBarName: '用户列表', url: ''},
            ]
        }
    ]);