state.userTab = "orders";
state.viewingUserId = "U20260612001";

const users = DroneAdmin.data.users = [
  {
    "id": "U20260612001",
    "avatar": "唐",
    "nickname": "唐先生",
    "phone": "138****8821",
    "gender": "男",
    "birthday": "1990-05-18",
    "region": "四川 · 成都",
    "registeredAt": "2026-06-12 09:18"
  },
  {
    "id": "U20260611018",
    "avatar": "云",
    "nickname": "云航科技",
    "phone": "189****3016",
    "gender": "—",
    "birthday": "—",
    "region": "四川 · 成都",
    "registeredAt": "2026-06-11 15:42"
  },
  {
    "id": "U20260610009",
    "avatar": "张",
    "nickname": "张女士",
    "phone": "136****1175",
    "gender": "女",
    "birthday": "1995-11-02",
    "region": "四川 · 绵阳",
    "registeredAt": "2026-06-10 11:06"
  },
  {
    "id": "U20260609005",
    "avatar": "李",
    "nickname": "李先生",
    "phone": "137****5520",
    "gender": "男",
    "birthday": "1988-03-21",
    "region": "四川 · 德阳",
    "registeredAt": "2026-06-09 08:44"
  },
  {
    "id": "U20260608003",
    "avatar": "王",
    "nickname": "王女士",
    "phone": "135****9081",
    "gender": "女",
    "birthday": "1992-07-09",
    "region": "四川 · 成都",
    "registeredAt": "2026-06-08 19:12"
  },
  {
    "id": "U20260607007",
    "avatar": "林",
    "nickname": "林先生",
    "phone": "133****6618",
    "gender": "男",
    "birthday": "1985-12-30",
    "region": "四川 · 眉山",
    "registeredAt": "2026-06-07 13:27"
  }
];

function userAvatar(text) {
  return `<span class="user-avatar">${text}</span>`;
}

function usersPage() {
  const rows = users.map(user => [
    userAvatar(user.avatar),
    user.nickname,
    user.phone,
    user.gender,
    user.birthday,
    user.region,
    user.registeredAt,
    opRoute("个人信息", "user-detail", "", `data-user-id="${user.id}"`)
  ]);
  return panel("用户列表", `<div class="toolbar" style="margin-bottom:14px">
    <input placeholder="昵称 / 手机号">${button("查询","filter","primary")}
  </div>${paginatedTable("users", ["头像","昵称","手机号","性别","生日","地区","注册时间","个人信息"], rows, "users-table")}`);
}

function userDetailPage() {
  const user = users.find(item => item.id === state.viewingUserId) || users[0];
  const records = state.userTab === "orders"
    ? table(["订单号","商品/服务","金额","状态"], [["YB26061326","高空清洗服务","¥1,599",tag("待派单")],["YB26060803","空域代办服务","线下报价",tag("已完成")]])
    : table(["申请编号","抬头","金额","状态"], [["FP26061303","个人","¥1,599",tag("待处理")]]);
  return panel("用户基本资料", detailGrid([
    ["头像", userAvatar(user.avatar)],["昵称", user.nickname],["手机号", user.phone],["性别", user.gender],
    ["生日", user.birthday],["地区", user.region],["注册时间", user.registeredAt]
  ]), routeButton("返回列表","users",""))
  + panel("业务记录", `<div class="tabs">
    ${button("订单记录","user-tab",state.userTab === "orders" ? "primary" : "",`data-tab="orders"`)}
    ${button("发票记录","user-tab",state.userTab === "invoices" ? "primary" : "",`data-tab="invoices"`)}
  </div>${records}`);
}

DroneAdmin.registerModule({
  id: "users",
  routes: [
  "users",
  "user-detail"
],
  titles: {
  "users": "用户列表",
  "user-detail": "用户详情"
},
  docs: {
  "users": {
    "summary": "查看平台注册用户列表，仅只读，不支持后台新建或编辑用户。",
    "operations": [
      "按昵称、手机号搜索用户",
      "点击「个人信息」进入用户详情页，查看完整资料及订单 / 发票记录"
    ],
    "fields": [
      [
        "头像",
        "用户在小程序上传或系统默认头像"
      ],
      [
        "昵称",
        "小程序端展示名称"
      ],
      [
        "手机号",
        "注册绑定手机号，列表脱敏展示"
      ],
      [
        "性别",
        "用户自行填写的性别信息"
      ],
      [
        "生日",
        "用户自行填写的出生日期"
      ],
      [
        "地区",
        "用户所在省 / 市"
      ],
      [
        "注册时间",
        "首次完成注册的时间"
      ],
      [
        "个人信息",
        "操作入口，跳转查看用户完整资料与业务记录"
      ]
    ]
  },
  "user-detail": {
    "summary": "查看单个用户的完整个人信息及业务往来记录。",
    "operations": [
      "展示头像、昵称、手机号、性别、生日、地区、注册时间等基础资料",
      "切换「订单记录 / 发票记录」查看不同业务数据",
      "点击「返回列表」回到用户列表"
    ],
    "fields": [
      [
        "头像",
        "用户头像，只读展示"
      ],
      [
        "昵称",
        "小程序端昵称"
      ],
      [
        "手机号",
        "绑定手机号，脱敏展示"
      ],
      [
        "性别",
        "用户填写的性别"
      ],
      [
        "生日",
        "用户填写的出生日期"
      ],
      [
        "地区",
        "用户填写的所在地区"
      ],
      [
        "注册时间",
        "账号注册时间"
      ],
      [
        "订单记录",
        "该用户全部订单及当前状态"
      ],
      [
        "发票记录",
        "该用户提交的开票申请及处理状态"
      ]
    ]
  }
},
  pages: {
    "users": usersPage,
    "user-detail": userDetailPage
  },
  actions: {
    "user-tab": function (target) {
      state.userTab = target.dataset.tab;
          render();
    }
  },
  changeActions: {},
  afterRender: {},
  beforeNavigate: function (target) {
    if (target.dataset.userId) state.viewingUserId = target.dataset.userId;
  },
  onClose: null
});
