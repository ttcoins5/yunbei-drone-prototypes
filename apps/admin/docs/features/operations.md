# 运营管理

## 路由与代码位置
- 路由：`operator-applications`、`operator-application-detail`、`feedbacks`、`feedback-detail`
- 代码：`js/modules/operations.js`

## 当前功能
- 运营商申请：展示小程序提交的城市运营商入驻申请，只读查看机构、申请人、联系电话、申请区域、身份证正反面、营业执照和协议勾选状态。
- 意见反馈：展示用户提交的反馈内容和图片，只读查看。

## 数据结构
- `operatorApplications[]`：`id`、`organization`、`applicant`、`phone`、`area`、`idCardFront`、`idCardBack`、`businessLicense`、`agreement`、`submittedAt`、`source`。
- `feedbackRecords[]`：`id`、`user`、`phone`、`content`、`images[]`、`submittedAt`、`source`。
- `state.viewingOperatorApplicationId`、`state.viewingFeedbackId`：当前详情记录。

## 操作与业务规则
- 两个模块均只做信息收集结果查看，不提供审核、处理、回复、删除或状态流转。
- 运营商申请必须展示协议是否已勾选。
- 意见反馈支持提交最多 6 张图片，但列表页不展示“图片数”字段。

## 与其他模块的依赖
- 依赖公共分页、详情网格、按钮、缩略图占位、Toast 和右侧页面说明栏。

## 已知占位行为
- 上传文件仅展示文件名，不预览真实证件图片。
- 查询按钮沿用全局筛选模拟提示。

## 本轮变更
- 2026-06-15：新增运营管理菜单组、运营商申请列表/详情、意见反馈列表/详情和页面说明。

## 待确认事项
- 是否后续需要审核运营商申请或回复意见反馈。

## 验收结果
- 2026-06-15：运营商申请列表/详情、意见反馈列表/详情、菜单高亮、右侧页面说明、文件和图片占位展示均通过浏览器验证；无横向溢出和控制台错误。
