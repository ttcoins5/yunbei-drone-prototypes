# 奉飞飞无人机后台原型 V1 - 接力索引

> 更新日期：2026-06-15 | 本文件只记录全局规则、模块入口和最近变更。模块细节请读取对应文档。

## 1. 运行与技术约束

- 纯静态 HTML、CSS、JavaScript，无构建工具和真实后端。
- 支持直接双击 `index.html`，也可运行 `python3 -m http.server 8080`。
- 使用普通 `<script>`，加载顺序为 `js/core`、`js/modules`、根目录 `app.js`。
- 根目录 `app.js` 只负责调用 `render()` 启动应用。
- 路由使用 `#/{routeId}`；登录状态存于 `sessionStorage.droneAdminLogin`。
- 右侧说明栏状态存于 `localStorage.droneAdminDocPanel`。
- Element Plus 仅提供样式，富文本使用 WangEditor 5.1.23。
- 所有业务数据均为内存 mock，刷新页面后恢复初始值。

## 2. 公共架构

| 文件 | 职责 |
|------|------|
| `js/core/namespace.js` | `window.DroneAdmin`、模块注册表 |
| `js/core/state.js` | 公共状态、菜单、详情页导航别名 |
| `js/core/ui.js` | 按钮、表格、面板、分页、弹窗、Toast |
| `js/core/router.js` | 登录外壳、侧栏、Hash 路由、页面渲染 |
| `js/core/events.js` | `data-route`、`data-action` 通用分发 |
| `js/core/files.js` | 浏览器本地文件选择 |
| `js/core/rich-editor.js` | WangEditor 创建、销毁和容器 |

模块通过 `DroneAdmin.registerModule()` 注册 `titles`、`docs`、`pages`、`actions`、`changeActions`、路由钩子和渲染后钩子。业务动作应留在所属模块，`events.js` 不写模块业务分支。

## 3. 模块索引

| 模块 | 路由 | 代码 | 文档 | 状态 |
|------|------|------|------|------|
| 工作台 | `dashboard` | `js/modules/dashboard.js` | `docs/features/dashboard.md` | 已完成 |
| 首页配置 / 轮播图配置 | `carousel` | `js/modules/carousel.js` | `docs/features/carousel.md` | 已完成 |
| 首页配置 / 导航配置 | `homepage-nav` | `js/modules/homepage-nav.js` | `docs/features/homepage-nav.md` | 已完成 |
| 用户 | `users`、`user-detail` | `js/modules/users.js` | `docs/features/users.md` | 已完成 |
| 商品 | `categories`、`products`、`product-edit` | `js/modules/catalog.js` | `docs/features/catalog.md` | 已完成 |
| 订单 | `orders`、`order-detail` | `js/modules/orders.js` | `docs/features/orders.md` | 已完成 |
| 培训 | `training`、`training-detail` | `js/modules/training.js` | `docs/features/training.md` | 已完成 |
| 运营管理 | `operator-applications`、`operator-application-detail`、`feedbacks`、`feedback-detail` | `js/modules/operations.js` | `docs/features/operations.md` | 已完成 |
| 飞手入驻 | `pilot-applications`、`pilot-review` | `js/modules/pilot-onboarding.js` | `docs/features/pilot-onboarding.md` | 已完成 |
| 已认证飞手 | `pilots`、`pilot-detail` | `js/modules/pilots.js` | `docs/features/pilots.md` | 已完成 |
| 飞行报备 | `flight-reports`、`flight-report-detail` | `js/modules/flight-reports.js` | `docs/features/flight-reports.md` | 已完成 |
| 任务需求 | `tasks`、`task-detail` | `js/modules/tasks.js` | `docs/features/tasks.md` | 已完成 |
| 发票 | `invoices`、`invoice-detail` | `js/modules/invoices.js` | `docs/features/invoices.md` | 已完成 |
| 关于我们 | `about` | `js/modules/about.js` | `docs/features/about.md` | 已完成 |

## 4. 跨模块规则

- Dashboard 只读使用订单、飞手申请、发票模块公开的 mock 数据。
- 商品业务属性在下单时形成订单快照，修改商品不改变历史订单。
- 订单流转由“在线支付”和“需要飞手”组合决定；无需飞手时使用“待交付”。
- 已认证飞手没有全局空闲状态；个人状态只存在于具体订单履约记录。
- 培训报名和飞行报备来源于小程序，后台以查看和确认操作为主。
- 分页状态统一存于 `state.listPages`，公共分页动作由 core 处理。
- 富文本页面切换、弹窗关闭前必须销毁现有编辑器实例。

## 5. 新会话阅读规则

1. 读取本文件的全局规则、模块索引和最近变更。
2. 只读取目标模块的 `docs/features/*.md` 和 `js/modules/*.js`。
3. 仅根据模块文档列出的依赖读取必要的 `js/core` 或其他模块。
4. 不扫描其他无关模块，不重新生成完整功能清单。
5. 完成后只更新目标模块文档，并在本文件追加一条最近变更。

可复制模板见 [`docs/new-session-prompt.md`](docs/new-session-prompt.md)。

后台与微信小程序的页面、字段和功能范围见
[`docs/project-page-function-list-v1.md`](docs/project-page-function-list-v1.md)。

## 6. 最近变更

| 日期 | 变更摘要 | 影响范围 |
|------|----------|----------|
| 2026-06-15 | 新增运营商申请和意见反馈信息收集模块 | 运营管理 |
| 2026-06-15 | 使用生成式图片升级手机首页品牌 banner、分类悬浮卡片和固定快捷入口 | 首页配置 |
| 2026-06-15 | 合并轮播图与首页导航配置，使用同一台手机预览完整首页 | 首页配置 |
| 2026-06-15 | 新增首页导航配置固定模板、实时预览、入口编辑和页面说明 | 首页导航配置 |
| 2026-06-16 | 拆分首页配置父级菜单，恢复独立轮播图配置，并将导航配置改为固定 8 项后台列表 | 首页配置 |
| 2026-06-15 | 新增后台与微信小程序页面功能总清单及业务规则确认表 | 产品范围 |
| 2026-06-15 | 将单体 `app.js` 拆为 core + 12 个业务模块；建立模块注册、事件分发和低 Token 文档接力结构 | 全局 |
| 2026-06-14 | 建立 V1 原型功能清单 | 全局 |
