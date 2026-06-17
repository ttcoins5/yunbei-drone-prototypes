# 案例展示配置

## 路由与代码位置
- 路由：`case-showcase`、`case-showcase-edit`
- 代码：`js/modules/case-showcase.js`

## 当前功能
- 在「小程序配置」父级菜单下新增「案例展示配置」子页面。
- 支持后台新增、编辑、删除、排序首页案例。
- 每个案例维护标题、案例摘要、轮播图和富文本介绍。
- 小程序首页展示案例卡片，详情页展示轮播图首图、标题和案例介绍。

## 数据结构
- `state.caseShowcase.items[]`：`id`、`title`、`summary`、`images[]`、`intro`。
- `state.caseShowcaseObjectUrls[]`：本地临时图片的 Object URL。

## 操作与业务规则
- 首页案例区不再展示按销量排序的服务商品。
- 后台新增案例后可进入编辑页维护轮播图位。
- 富文本介绍使用 WangEditor 编辑。
- 首页卡片默认使用首张图作为封面，详情页展示完整案例介绍。

## 验收结果
- 待浏览器验证。
