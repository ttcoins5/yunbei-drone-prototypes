# 工作台
## 路由与代码位置
- 路由：`dashboard`
- 代码：`js/modules/dashboard.js`
## 当前功能
- 四个指标卡切换今日订单、待派单、待审核飞手和待处理发票明细。
- 明细支持分页，并跳转到对应详情或处理页面。
## 数据结构
- 只读使用 `orderRecords`、`pilotApplications`、`invoiceRecords`。
- 当前指标存于 `state.dashboardMetric`。
## 操作与业务规则
- `dashboard-metric` 切换明细，不修改业务数据。
## 与其他模块的依赖
- 依赖 `orders.js`、`pilot-onboarding.js`、`invoices.js` 的公开数据和展示 helper。
- 依赖 core 表格、分页、面板和路由按钮。
## 已知占位行为
- 指标数字为固定演示值，明细由 mock 数据生成。
## 本轮变更
- 2026-06-15：从单体 `app.js` 拆出并注册为独立模块。
## 待确认事项
- 无。
## 验收结果
- 2026-06-15：路由渲染及指标明细通过浏览器回归。
