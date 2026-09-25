# FancyCNR

FancyCNR 为 CyreneNameRoller API 1.4 提供由宿主校验和渲染的界面定制选项。启用插件后，在插件管理卡片的「插件设置」入口打开宿主原生 Fluent 设置页，即可切换组件样式、组件显隐和权威结果布局。插件包含一个不执行后台业务的最小 Worker，以确保 Web/Tauri 都能正确建立插件实例。

## 声明文件

| 文件 | 内容 |
| --- | --- |
| `manifest.yml` | 身份、入口、图标与 `permissions`；绝不包含 `contributes` / `settings` / `pages` / `api` |
| `contributions.json` | 扁平贡献对象：顶层 `settings`（样式、显隐与布局、结果布局三个分区），以及样式包、覆盖包与结果呈现 |

两者不能与 `manifest.json` 同时存在。`integrity` 由 `cnrp pack` 注入 `manifest.yml`，覆盖除 `manifest.yml` 外的全部包内文件（含 `contributions.json`），请勿手写。

宿主原生设置写在 `contributions.json` 顶层的 `settings` 区块（`sections[].fields[]`），不再使用 `pages[].native`；本插件的设置不是 iframe 页面，因此没有 `pages[]`。

## 界面显隐与布局

- 隐藏版本标记
- 隐藏或压缩点名筛选器
- 分别隐藏 English Mode、人员/小组、性别、单人/多人、重复设置或抽取数量
- 隐藏统计摘要，并选择收起或保留布局空间
- 隐藏卡牌界面的整组按钮与控制项
- 专注模式：同时隐藏版本标记和点名筛选器

## 样式预设

- 醒目结果
- 紧凑导航
- 紧凑点名控件
- 大号主操作
- 紧凑或舒展卡牌
- 紧凑或易读统计
- 弱化版本标记
- 桌面端紧凑标题栏

样式只使用宿主允许的组件 ID、字号、字重、密度、间距、圆角、阴影和宿主字体别名，因此会随插件禁用或卸载自动撤销。

## 结果布局

- 单项紧凑
- 易读列表
- 简洁网格
- 聚光结果

姓名、结果数组和抽取回执始终由宿主提供，FancyCNR 只声明展示方式。

## API 边界

API 1.4 支持精确隐藏宿主公布的可选组件和六个独立点名筛选器，但仍不允许任意 DOM、CSS 选择器或按钮 ID。主要点名按钮、当前名单、权威结果、导航、标题栏、卡牌结果、抽奖结果、设置恢复入口等受保护目标不能隐藏。

设置页使用宿主提供的 `component-style-select`、`component-override-select` 和 `result-presentation-select`。这些控件只修改宿主管理的展示选择，不向插件暴露核心算法、名单、结果、统计或记录写入能力。

只有“开/关”两种状态的显隐项使用 `component-override-toggle` 开关；具有隐藏、紧凑或不同布局等多个选项的目标仍使用下拉选择器。

## 构建

```powershell
npm install
npm run validate
npm run build
```

`validate` / `build` 使用 `vendor/` 中随附的 `@starcyrene/cyrene-name-roller` SDK（1.4.0），与宿主使用同一套声明读取与校验逻辑。

打包只收录 `scripts/stage-plugin.mjs` 中 `publishFiles` 列出的文件——即双声明文件与宿主引用的载荷（Worker、图标、README）。`scripts/`、CI 工作流、`package-lock.json`、`vendor/` 这些开发期内容不会进入 `.cnrp`。

构建产物位于 `dist/FancyCNR-<version>.cnrp`（当前 `dist/FancyCNR-0.4.1.cnrp`）。

## 更新日志

- 0.4.1：插件声明迁移到 `manifest.yml` + `contributions.json` 拆分格式；插件身份改为 `cn.leafsc.fancycnr`，作者改为 LeafS825；设置页从 Dock 页面改为宿主设置区块（由插件卡片的「插件设置」进入）；校验与打包改用随附的 1.4 SDK，发布文件清单收窄到声明与宿主引用的载荷。
- 0.4.0：升级到 CyreneNameRoller API 1.4。
