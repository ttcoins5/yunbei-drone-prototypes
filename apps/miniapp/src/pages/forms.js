import { icon } from "../components/icons.js";
import { shell } from "../components/layout.js?v=profile-auto-role-1";
import { state } from "../state/appState.js";

function addressCard(address) {
  return `<article class="address-card ${address.isDefault ? "is-default" : ""}">
    <div class="address-card-head">
      <span class="address-pin">${icon({ icon: 4 }, true)}</span>
      <div>
        <h3>${address.region}</h3>
        <p>${address.detail}</p>
      </div>
      ${address.isDefault ? `<em>默认</em>` : ""}
    </div>
    <div class="address-person">
      <span>${address.name}</span>
      <strong>${address.phone}</strong>
    </div>
    <div class="address-actions">
      <button data-action="address-default" data-id="${address.id}" ${address.isDefault ? "disabled" : ""}>设为默认</button>
      <button data-action="address-edit" data-id="${address.id}">编辑</button>
      <button data-action="address-delete" data-id="${address.id}">删除</button>
    </div>
  </article>`;
}

function addressForm() {
  const current = state.addressBook.find(item => item.id === state.editingAddressId) || {
    id: "",
    name: "",
    phone: "",
    region: "上海市 浦东新区",
    detail: ""
  };

  return `<div class="address-modal-mask">
    <form class="address-form" data-form="address">
      <div class="address-form-title">
        <span><small>${current.id ? "EDIT ADDRESS" : "NEW ADDRESS"}</small><b>${current.id ? "编辑地址" : "新增地址"}</b></span>
        <button type="button" data-action="address-cancel">×</button>
      </div>
      <input type="hidden" name="id" value="${current.id}">
      <label>联系人<input name="name" required placeholder="请输入联系人" value="${current.name}"></label>
      <label>手机号<input name="phone" required placeholder="请输入手机号" value="${current.phone}"></label>
      <label>所在地区<input name="region" required placeholder="请选择省市区" value="${current.region}"></label>
      <label>详细地址<textarea name="detail" required placeholder="楼栋、门牌号、起降点说明">${current.detail}</textarea></label>
      <div class="address-form-actions">
        <button type="button" data-action="address-cancel">取消</button>
        <button type="submit">保存</button>
      </div>
    </form>
  </div>`;
}

export function addressPage() {
  const defaultAddress = state.addressBook.find(item => item.isDefault);
  const addressList = state.addressBook.map(addressCard).join("");
  const form = state.showAddressForm ? addressForm() : "";

  return shell(`<div class="address-page">
    <section class="address-hero">
      <div>
        <small>ADDRESS BOOK</small>
        <h2>服务地址簿</h2>
        <p>${defaultAddress ? `${defaultAddress.region} · ${defaultAddress.name}` : "还没有默认服务地址"}</p>
      </div>
      <button data-action="address-new">新增</button>
    </section>
    <section class="address-list">${addressList || `<div class="address-empty"><b>暂无地址</b><p>新增一个常用服务地址，后续预约、租赁和维修会自动带出。</p></div>`}</section>
    ${state.showAddressForm ? "" : `<button class="address-floating-action" data-action="address-new">+ 新增服务地址</button>`}
    ${form}
  </div>`, { title: "地址簿", back: true, tab: "profile" });
}

export function invoicePage() {
  const availableOrders = [
    { id: "FF20260615001", title: "行业测绘无人机套装", time: "2026-06-10 22:07", amount: 19999 },
    { id: "FF20260615002", title: "园区楼宇巡检服务", time: "2026-06-12 09:30", amount: 680 },
    { id: "FF20260615003", title: "无人机租赁订单", time: "2026-06-13 14:15", amount: 900 }
  ];
  const records = [
    { id: "FP20260618001", title: "上海云北低空科技有限公司", amount: 19999, type: "增值税普通发票", time: "2026-06-18 10:21", file: "PDF" },
    { id: "FP20260612009", title: "云北用户", amount: 680, type: "电子普通发票", time: "2026-06-12 18:06", file: "图片" }
  ];
  const selectedTotal = availableOrders
    .filter(order => state.selectedInvoiceOrders.includes(order.id))
    .reduce((sum, order) => sum + order.amount, 0);

  const applyContent = `<section class="invoice-orders">
    <div class="invoice-section-title"><b>选择可开票订单</b><small>仅展示已完成且未开票订单</small></div>
    ${availableOrders.map(order => `<button class="invoice-order ${state.selectedInvoiceOrders.includes(order.id) ? "selected" : ""}" data-action="invoice-toggle" data-id="${order.id}">
      <span class="invoice-check"></span>
      <span><b>${order.title}</b><small>${order.id} · ${order.time}</small></span>
      <strong>￥${order.amount.toLocaleString()}</strong>
    </button>`).join("")}
    <div class="invoice-form-card">
      <label>发票类型<input value="增值税普通发票"></label>
      <label>发票抬头<input value="上海云北低空科技有限公司"></label>
      <label>纳税人识别号<input placeholder="请输入税号"></label>
      <label>接收邮箱<input value="finance@example.com"></label>
    </div>
    <div class="invoice-submit-bar">
      <span><small>已选 ${state.selectedInvoiceOrders.length} 单</small><b>￥${selectedTotal.toLocaleString()}</b></span>
      <button data-action="invoice-submit">提交开票</button>
    </div>
  </section>`;

  const recordContent = `<section class="invoice-records">
    <div class="invoice-section-title"><b>开票记录</b><small>可查看已开具发票图片或 PDF</small></div>
    ${records.map(record => `<article class="invoice-record">
      <div><b>${record.id}</b><em>${record.file}</em></div>
      <h3>${record.title}</h3>
      <p>${record.type} · ${record.time}</p>
      <footer><strong>￥${record.amount.toLocaleString()}</strong><button data-action="invoice-preview" data-file="${record.file}" data-id="${record.id}">查看发票</button></footer>
    </article>`).join("")}
  </section>`;

  const preview = state.invoicePreview ? `<div class="invoice-preview-mask" data-action="invoice-preview-close">
    <section class="invoice-preview">
      <button data-action="invoice-preview-close">×</button>
      <small>${state.invoicePreview.file === "PDF" ? "INVOICE PDF" : "INVOICE IMAGE"}</small>
      <h3>${state.invoicePreview.id}</h3>
      <div class="invoice-file ${state.invoicePreview.file === "PDF" ? "pdf" : "image"}">
        <b>${state.invoicePreview.file}</b>
        <span>奉飞飞电子发票</span>
        <p>购买方: 上海云北低空科技有限公司<br>销售方: 宁波泰安宏业交通科技有限公司</p>
      </div>
    </section>
  </div>` : "";

  return shell(`<div class="invoice-page">
    <section class="invoice-hero">
      <small>INVOICE CENTER</small>
      <h2>开票中心</h2>
      <p>选择一个或多个已完成订单合并开票，已开具发票可随时查看。</p>
    </section>
    <div class="invoice-tabs">
      <button class="${state.invoiceTab === "apply" ? "active" : ""}" data-action="invoice-tab" data-tab="apply">申请开票</button>
      <button class="${state.invoiceTab === "records" ? "active" : ""}" data-action="invoice-tab" data-tab="records">开票记录</button>
    </div>
    ${state.invoiceTab === "apply" ? applyContent : recordContent}
    ${preview}
  </div>`, { title: "开票中心", back: true, tab: "profile" });
}

export function feedbackPage() {
  return shell(`<form class="form-page" data-form="feedback">
    <div class="form-intro"><b>意见反馈</b><p>后台仅查看反馈内容、最多 6 张图片、提交用户与提交时间。</p></div>
    <label>反馈类型<input value="功能建议"></label><label>反馈内容<textarea placeholder="请描述遇到的问题或建议">希望订单详情里可以看到飞手到达时间。</textarea></label><label>上传图片<input placeholder="最多 6 张，原型中展示为占位"></label>
    <button class="primary-action" type="submit">提交反馈</button>
  </form>`, { title: "意见反馈", back: true, tab: "profile" });
}

export function operatorPage() {
  return shell(`<form class="form-page" data-form="operator">
    <div class="form-intro"><b>城市运营申请</b><p>提交机构主体、申请人身份和营业资质，审核通过后可成为城市运营商。</p></div>
    <label>机构名称<input required placeholder="请输入机构或公司名称"></label>
    <label>申请人<input required placeholder="请输入申请人姓名" value="云北用户"></label>
    <label>联系电话<input required type="tel" placeholder="请输入联系电话" value="13888888821"></label>
    <label>申请区域<input required placeholder="请选择省市区" value="上海市 浦东新区"></label>
    ${uploadField("上传身份证正面", "请上传身份证人像面", "operator-id-front")}
    ${uploadField("上传身份证反面", "请上传身份证国徽面", "operator-id-back")}
    ${uploadField("上传营业执照", "请上传营业执照", "operator-license")}
    <label class="pilot-agreement">
      <button type="button" class="${state.operatorAgreement ? "checked" : ""}" data-action="operator-agreement" aria-pressed="${state.operatorAgreement}"></button>
      <span>我已阅读并同意<b>《城市运营商入驻协议》</b></span>
    </label>
    <button class="primary-action" type="submit">提交申请</button>
  </form>`, { title: "城市运营申请", back: true, tab: "profile" });
}

function flightReportCard(report) {
  return `<article class="flight-report-card ${report.status === "待确认" ? "pending" : "confirmed"}">
    <div class="flight-report-head">
      <span>
        <small>报备编号</small>
        <b>${report.reportNo}</b>
      </span>
      <em>${report.status}</em>
    </div>
    <div class="flight-report-grid">
      <span><small>起飞飞手</small><strong>${report.pilot}</strong></span>
      <span><small>飞行架次</small><strong>${report.sorties} 架次</strong></span>
      <span><small>机型执照</small><strong>${report.modelLicense}</strong></span>
      <span><small>飞行时长</small><strong>${report.duration}</strong></span>
    </div>
    <div class="flight-report-foot">
      <p>报备时间：${report.reportTime}</p>
      <button type="button" data-action="toast" data-message="报备详情原型待补充">查看详情</button>
    </div>
  </article>`;
}

export function reportPage() {
  const pendingCount = state.flightReports.filter(item => item.status === "待确认").length;
  const confirmedCount = state.flightReports.filter(item => item.status === "已确认").length;
  const reportFilters = [
    { label: "全部报备", count: state.flightReports.length },
    { label: "待确认", count: pendingCount },
    { label: "已确认", count: confirmedCount }
  ];
  const visibleReports = state.reportFilter === "全部报备"
    ? state.flightReports
    : state.flightReports.filter(item => item.status === state.reportFilter);

  return shell(`<form class="flight-report-page" data-form="flight-report">
    <section class="flight-report-hero">
      <small>FLIGHT REPORT</small>
      <h2>飞行报备</h2>
      <p>提交飞行报备后进入平台确认流程，可在历史记录中查看待确认和已确认状态。</p>
    </section>
    <section class="flight-report-form">
      <div class="flight-report-title"><b>新增报备</b><small>报备编号由系统自动生成</small></div>
      <label>报备编号<input name="reportNo" readonly value="系统自动生成"></label>
      <label>起飞飞手<input name="pilot" required value="林先生" placeholder="请输入认证飞手姓名"></label>
      <label>机型执照<input name="modelLicense" required value="DJI M350 RTK / CAAC-A01236" placeholder="请输入机型与执照编号"></label>
      <div class="flight-report-two">
        <label>飞行架次<input name="sorties" required type="number" min="1" value="1"></label>
        <label>飞行时长<input name="duration" required value="1小时30分"></label>
      </div>
      <label>报备时间<input name="reportTime" required value="2026-06-18 09:00"></label>
      <button class="primary-action" type="submit">提交报备</button>
    </section>
    <section class="flight-report-history">
      <div class="flight-report-title"><b>历史记录</b><small>${pendingCount} 个待确认 · ${confirmedCount} 个已确认</small></div>
      <div class="flight-report-summary">
        ${reportFilters.map(filter => `<button type="button" class="${state.reportFilter === filter.label ? "active" : ""}" data-action="report-filter" data-filter="${filter.label}">
          <small>${filter.label}</small>
          <b>${filter.count}</b>
        </button>`).join("")}
      </div>
      <div class="flight-report-list">
        ${visibleReports.length ? visibleReports.map(flightReportCard).join("") : `<div class="flight-report-empty"><b>${state.reportFilter}</b><p>当前筛选下暂无报备记录，可切换其他状态查看。</p></div>`}
      </div>
    </section>
  </form>`, { title: "飞行报备", back: true, tab: "home" });
}

function formField(label, placeholder, value = "", type = "text") {
  return `<label>${label}<input type="${type}" required placeholder="${placeholder}" value="${value}"></label>`;
}

function uploadField(label, placeholder, name = "") {
  return `<label class="upload-field">${label}
    <span class="upload-control">
      <input type="file" name="${name || label}" required accept="image/*" data-upload-label="${placeholder}">
      <b>+</b>
      <em>${placeholder}</em>
      <small>支持 JPG / PNG 图片</small>
    </span>
  </label>`;
}

function deviceFields(prefix = "") {
  return `<div class="pilot-section">
    <div class="pilot-section-title"><b>${prefix}设备信息</b><small>用于审核无人机资产与任务派单匹配</small></div>
    ${formField("机型选择", "请选择无人机机型")}
    ${formField("序列号", "请输入无人机序列号")}
    ${formField("唯一识别码", "请输入 UAS 码或设备唯一识别码")}
  </div>`;
}

const pilotCompanies = [
  "上海云北低空科技有限公司",
  "宁波泰安宏业交通科技有限公司",
  "杭州低空智航科技有限公司",
  "苏州巡航无人机服务有限公司"
];

function pilotCompanyFields() {
  return state.pilotCompanyMode === "create" ? `<div class="pilot-section">
    <div class="pilot-section-title"><b>创建公司</b><small>未找到所属公司时补充主体信息</small></div>
    ${formField("公司名称", "请输入公司名称")}
    ${formField("联系电话", "请输入公司联系电话", "13888888821", "tel")}
    ${formField("所在区域", "请选择省市区", "上海市 浦东新区")}
    <label>地址<textarea required placeholder="请输入详细地址、办公地址或经营地址"></textarea></label>
    ${uploadField("上传水印营业执照", "请上传带平台水印的营业执照")}
  </div>` : `<div class="pilot-section">
    <div class="pilot-section-title"><b>选择所属公司</b><small>输入关键词可搜索已有公司</small></div>
    <label class="company-select-field">所属公司
      <input required list="pilot-company-options" placeholder="搜索并选择已有公司" value="上海云北低空科技有限公司">
      <datalist id="pilot-company-options">
        ${pilotCompanies.map(company => `<option value="${company}"></option>`).join("")}
      </datalist>
    </label>
  </div>`;
}

function pilotPersonalFields() {
  return `<div class="pilot-section">
    <div class="pilot-section-title"><b>个人信息</b><small>用于实名认证、资质审核与联系确认</small></div>
    ${formField("申请人", "请输入申请人姓名", "云北用户")}
    ${formField("联系电话", "请输入联系电话", "13888888821", "tel")}
    ${formField("出生年月", "请选择出生年月", "", "month")}
    ${formField("所在区域", "请选择省市区", "上海市 浦东新区")}
    ${uploadField("上传身份证正面", "请上传身份证人像面")}
    ${uploadField("上传身份证反面", "请上传身份证国徽面")}
    ${uploadField("上传无人机操作执照", "请上传 CAAC 或对应操作执照")}
    ${uploadField("上传无人机照片", "请上传无人机实物照片")}
  </div>`;
}

function pilotPage() {
  const isCompany = state.pilotJoinType === "company";

  return shell(`<form class="form-page pilot-page" data-form="pilot">
    <div class="form-intro"><b>飞手加入</b><p>个人信息为必填资料；若所属主体为公司，还需要选择或补充公司信息。</p></div>
    ${pilotPersonalFields()}
    <div class="pilot-section">
      <div class="pilot-section-title"><b>所属主体</b><small>若归属公司，继续选择或创建公司</small></div>
      <div class="pilot-type-tabs">
        <button type="button" class="${state.pilotJoinType === "personal" ? "active" : ""}" data-action="pilot-type" data-type="personal">个人主体</button>
        <button type="button" class="${isCompany ? "active" : ""}" data-action="pilot-type" data-type="company">公司主体</button>
      </div>
    </div>
    ${isCompany ? `<div class="pilot-company-tabs">
      <button type="button" class="${state.pilotCompanyMode === "existing" ? "active" : ""}" data-action="pilot-company-mode" data-mode="existing">选择所属公司</button>
      <button type="button" class="${state.pilotCompanyMode === "create" ? "active" : ""}" data-action="pilot-company-mode" data-mode="create">创建公司</button>
    </div>${pilotCompanyFields()}` : ""}
    ${deviceFields()}
    <label class="pilot-agreement">
      <button type="button" class="${state.pilotAgreement ? "checked" : ""}" data-action="pilot-agreement" aria-pressed="${state.pilotAgreement}"></button>
      <span>我已阅读并同意<b>《飞手入驻协议》</b></span>
    </label>
    <button class="primary-action" type="submit">提交飞手申请</button>
  </form>`, { title: "飞手加入", back: true, tab: "service" });
}

export function formPage(type) {
  if (type === "pilot") return pilotPage();

  const configs = {
    booking: ["服务预约", "提交需求后，奉飞飞顾问将尽快与您联系。", ["服务项目", "联系人", "联系电话"]],
    rental: ["无人机租赁", "提交机型和租期需求，平台确认档期与押金。", ["租赁机型", "租赁日期", "使用场景"]]
  };
  const [title, intro, fields] = configs[type];
  return shell(`<form class="form-page" data-form="${type}"><div class="form-intro"><b>${title}</b><p>${intro}</p></div>${fields.map((field, index) => `<label>${field}<input required placeholder="请输入${field}" value="${index === 1 && type !== "rental" ? "13888888821" : ""}"></label>`).join("")}<label>补充说明<textarea placeholder="请补充相关需求"></textarea></label><button class="primary-action" type="submit">提交申请</button></form>`, { title, back: true, tab: "service" });
}
