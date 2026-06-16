state.viewingInvoiceId = "FP26061307";

const invoiceRecords = DroneAdmin.data.invoiceRecords = [
  {
    "id": "FP26061307",
    "user": "云航科技",
    "title": "四川云航科技有限公司",
    "orderCount": 3,
    "amount": "¥18,600",
    "appliedAt": "2026-06-13 16:08",
    "status": "待处理",
    "taxNo": "91510100MA****8K",
    "email": "finance@example.com",
    "type": "增值税普通发票"
  },
  {
    "id": "FP26061303",
    "user": "唐先生",
    "title": "个人",
    "orderCount": 1,
    "amount": "¥1,599",
    "appliedAt": "2026-06-13 10:21",
    "status": "待处理",
    "taxNo": "—",
    "email": "tang@example.com",
    "type": "增值税普通发票"
  },
  {
    "id": "FP26061002",
    "user": "张女士",
    "title": "个人",
    "orderCount": 2,
    "amount": "¥2,498",
    "appliedAt": "2026-06-10 11:06",
    "status": "已开票",
    "taxNo": "—",
    "email": "zhang@example.com",
    "type": "增值税普通发票"
  },
  {
    "id": "FP26060901",
    "user": "华景物业",
    "title": "华景物业有限公司",
    "orderCount": 1,
    "amount": "¥3,600",
    "appliedAt": "2026-06-09 14:22",
    "status": "待上传",
    "taxNo": "91510100MB****2X",
    "email": "ap@example.com",
    "type": "增值税普通发票"
  },
  {
    "id": "FP26060804",
    "user": "林先生",
    "title": "个人",
    "orderCount": 1,
    "amount": "¥1,599",
    "appliedAt": "2026-06-08 09:15",
    "status": "已驳回",
    "taxNo": "—",
    "email": "lin@example.com",
    "type": "增值税普通发票"
  }
];

function activeInvoice() {
  return invoiceRecords.find(item => item.id === state.viewingInvoiceId) || invoiceRecords[0];
}

function invoicesPage() {
  const rows = invoiceRecords.map(item => [
    item.id, item.user, item.title, item.orderCount, item.amount, item.appliedAt, tag(item.status),
    opRoute("查看详情", "invoice-detail", "", `data-invoice-id="${item.id}"`)
  ]);
  return panel("发票申请", `<div class="toolbar" style="margin-bottom:14px">
    <input placeholder="申请编号 / 用户 / 抬头"><select><option>全部状态</option><option>待处理</option><option>待上传</option><option>已开票</option><option>已驳回</option></select>${button("查询","filter","primary")}
  </div>${paginatedTable("invoices", ["申请编号","用户","发票抬头","订单数","金额","申请时间","状态","操作"], rows)}`);
}

function invoiceDetailPage() {
  const invoice = activeInvoice();
  const actions = invoice.status === "待处理"
    ? `${button("驳回","reject-invoice","danger")}${button("审核通过","approve-invoice","primary")}`
    : invoice.status === "待上传" ? button("上传发票文件","upload-invoice","primary") : "";
  return panel("申请信息", detailGrid([
    ["申请编号", invoice.id], ["申请用户", invoice.user], ["发票类型", invoice.type], ["发票抬头", invoice.title],
    ["税号", invoice.taxNo], ["申请金额", invoice.amount], ["接收邮箱", invoice.email], ["当前状态", tag(invoice.status)]
  ]), routeButton("返回发票列表","invoices",""))
  + panel("关联订单", table(["订单号","商品/服务","完成时间","可开票金额"], [
    ["YB26060811","园区航拍测绘","2026-06-09 18:20","¥8,600"],
    ["YB26060703","无人机巡检服务","2026-06-08 16:05","¥6,400"],
    ["YB26060518","空域代办服务","2026-06-06 11:30","¥3,600"]
  ]), actions);
}

async function handleUploadInvoice() {
  const files = await pickLocalFile({ accept: ".pdf,.jpg,.jpeg,.png,image/*" });
  const file = files[0];
  if (!file) return;
  activeInvoice().status = "已开票";
  render();
  toast(`发票已上传：${file.name}`);
}

DroneAdmin.registerModule({
  id: "invoices",
  routes: [
  "invoices",
  "invoice-detail"
],
  titles: {
  "invoices": "发票中心",
  "invoice-detail": "发票申请详情"
},
  docs: {
  "invoices": {
    "summary": "处理用户提交的发票申请，审核通过后上传发票文件。",
    "operations": [
      "按申请编号、用户、抬头、状态筛选",
      "点击「查看详情」进入审核与开票流程"
    ],
    "fields": [
      [
        "申请编号",
        "发票申请唯一编号"
      ],
      [
        "用户",
        "提交申请的小程序用户"
      ],
      [
        "发票抬头",
        "个人或企业抬头名称"
      ],
      [
        "订单数",
        "本次申请关联的已完成订单数"
      ],
      [
        "金额",
        "可开票合计金额"
      ],
      [
        "状态",
        "待处理 → 待上传 → 已开票 / 已驳回"
      ]
    ]
  },
  "invoice-detail": {
    "summary": "审核发票申请、查看关联订单并完成开票。",
    "operations": [
      "待处理：可审核通过或驳回（需填原因）",
      "审核通过后进入待上传，需上传发票 PDF / 图片",
      "上传完成即标记为已开票，用户可在小程序查看"
    ],
    "fields": [
      [
        "申请信息",
        "抬头、税号、金额、接收邮箱等开票要素"
      ],
      [
        "关联订单",
        "本次开票包含的已完成订单及各自可开票金额"
      ],
      [
        "当前状态",
        "驱动后续可操作按钮展示"
      ]
    ]
  }
},
  pages: {
    "invoices": invoicesPage,
    "invoice-detail": invoiceDetailPage
  },
  actions: {
    "approve-invoice": function (target) {
      activeInvoice().status = "待上传";
          render();
          toast("审核通过，请上传发票文件");
    },
    "reject-invoice": function (target) {
      modal("驳回发票申请", `<div class="form-field"><label>驳回原因</label><textarea id="invoice-reject-reason" placeholder="请填写驳回原因"></textarea></div>`,
            `${button("取消","close-modal")}${button("确认驳回","confirm-invoice-reject","danger")}`);
    },
    "confirm-invoice-reject": function (target) {
      activeInvoice().status = "已驳回";
          closeModal();
          render();
          toast("发票申请已驳回");
    },
    "upload-invoice": function (target) {
      handleUploadInvoice();
    }
  },
  changeActions: {},
  afterRender: {},
  beforeNavigate: function (target) {
    if (target.dataset.invoiceId) state.viewingInvoiceId = target.dataset.invoiceId;
  },
  onClose: null
});
