(window.webpackJsonp=window.webpackJsonp||[]).push([[35],{512:function(e,a,t){"use strict";t.r(a);var r=t(4),v=Object(r.a)({},(function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[t("blockquote",[t("p",[e._v("因为lerna在管理多个模块和项目时(发布版本，更新版本，集成工具)操作简单。不用自己手动管理互相依赖的版本问题。")])]),e._v(" "),t("h3",{attrs:{id:"提前思考："}},[t("a",{staticClass:"header-anchor",attrs:{href:"#提前思考："}},[e._v("#")]),e._v(" 提前思考：")]),e._v(" "),t("h4",{attrs:{id:"独立的功能一定要拆分成独立的repo吗？"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#独立的功能一定要拆分成独立的repo吗？"}},[e._v("#")]),e._v(" 独立的功能一定要拆分成独立的repo吗？")]),e._v(" "),t("p",[e._v("最近做直播还听说后端同事在管理每个模块时，他们都是一个模块一个仓库管理，我说为什么时，他回答说，可以防止别人胡乱提交...")]),e._v(" "),t("h4",{attrs:{id:"除了一些内部的sdk或者带有自更新的应用，我们是不是很少关注项目的版本？有没有特殊的场景？"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#除了一些内部的sdk或者带有自更新的应用，我们是不是很少关注项目的版本？有没有特殊的场景？"}},[e._v("#")]),e._v(" 除了一些内部的sdk或者带有自更新的应用，我们是不是很少关注项目的版本？有没有特殊的场景？")]),e._v(" "),t("p",[e._v("如果我现在有五六个项目，每个项目都有固定版本的相互依赖，比如经常见的 common, core，这些都是对通用和核心模块的解耦，我们简称基础模块。除了他们之外，还可能有一些偏业务的模块和关联性强的项目，这其中的项目和模块都引用了基础模块。\n看起来只是分了几个文件夹相互引用嘛，但我们还是会面临一个工程问题，那就是，这些包是捆绑和固定式的更新，每次提交代码我都必须保证我们不得不关注这些包之间"),t("strong",[e._v("版本问题")]),e._v("。\n比如，我在common模块中的有很多util，隔了几天我发现了这里面util中有一个bug，然后我需要更新他，这时，")]),e._v(" "),t("h3",{attrs:{id:"项目管理的方式"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#项目管理的方式"}},[e._v("#")]),e._v(" 项目管理的方式")]),e._v(" "),t("h4",{attrs:{id:"mutiplerepos-多仓库管理"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#mutiplerepos-多仓库管理"}},[e._v("#")]),e._v(" mutipleRepos(多仓库管理)")]),e._v(" "),t("p",[e._v("就像我刚才说的我们后端一样，把每个业务模块抽离到单独的仓库中，优点有：")]),e._v(" "),t("ol",[t("li",[e._v("可以为每个模块单独为开发者分配repo权限。其实，这个也不算优点，对于公司项目来说，很少有这种需求，第一团队内的开发人员还是很自觉的，第二，maintainer在合分支时就可以丢弃掉某个提交。")]),e._v(" "),t("li",[e._v("模块的职责更清晰，复用程度更高，更明显。通常体现在跨语言的场景。")])]),e._v(" "),t("p",[e._v("缺点有：")]),e._v(" "),t("ol",[t("li",[e._v("项目管理，协同开发难。一个repo一个仓库，每个仓库都得clone。而且在ide中，通常你需要打开很多你想编辑的项目工程的窗口，如果是一个大的根目录的话，会indexing很久(这个也是可以在ide里配置的，但配置这个对于其他同事来说也是个成本)。")]),e._v(" "),t("li",[e._v("changelog 不好整理")]),e._v(" "),t("li",[e._v("维护成本高。很多repo了之后，改一次就得提交一次git，试想一下，如果同时修改十几个repo，然后每个都test|lint，更新版本，提交，推送...")])]),e._v(" "),t("h4",{attrs:{id:"monorepo-单仓库管理"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#monorepo-单仓库管理"}},[e._v("#")]),e._v(" monoRepo(单仓库管理)")]),e._v(" "),t("p",[e._v("lerna 使用的就是这个管理方式。它的优势在于：")]),e._v(" "),t("ol",[t("li",[e._v("one repo with multiple packages，代码变更都能比较好清晰的体现给协同开发者")]),e._v(" "),t("li",[e._v("子模块的版本版本变更会自动同步给相关的模块。")]),e._v(" "),t("li",[e._v("多个模块的变动，可以融为一个提交。")])]),e._v(" "),t("p",[e._v("缺点：")]),e._v(" "),t("ol",[t("li",[e._v("一个repo的代码量变多了，其他开发者容易产生误操作，影响了其他模块。")])]),e._v(" "),t("h3",{attrs:{id:"使用-lerna"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#使用-lerna"}},[e._v("#")]),e._v(" 使用 Lerna")]),e._v(" "),t("p",[e._v("** Lerna ** 是一个monoRepo的项目管理工具，通过它，我们可以让发布安装和模块间的版本管理非常简单。")]),e._v(" "),t("h4",{attrs:{id:"fixed-locked-mode-default"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#fixed-locked-mode-default"}},[e._v("#")]),e._v(" Fixed/Locked mode(default)")]),e._v(" "),t("p",[e._v("使用 "),t("code",[e._v("lerna init")]),e._v(" 默认创建固定版本模式，它会在lerna.json中的version中指定一个初始版本，以后每次发布每个package中都会以这个版本为准，也就是说，这个版本代表了所有的pacakge的版本，它们不能有自己独立的版本。")]),e._v(" "),t("p",[t("img",{attrs:{src:"/img/bVbAbjC",alt:"屏幕快照 2019-11-12 下午2.23.40.png"}})]),e._v(" "),t("p",[e._v("如图，"),t("code",[e._v("lerna.json")]),e._v(" 中的版本是1.3.4，当发布时，把原有0.2.1的版本置为了1.3.4，而且是全量发布。")]),e._v(" "),t("h4",{attrs:{id:"independent-mode"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#independent-mode"}},[e._v("#")]),e._v(" Independent mode")]),e._v(" "),t("p",[e._v("使用 "),t("code",[e._v("lerna init -indenpendent")]),e._v(' 初始化一个独立版本的lerna项目，它们各有独自的版本。比如我只更改其中一个包，那就单独更新这一个包，不会对其他包更新。检测有哪些包更新的功能是Lerna是通过commit文件的变动做的，也可以在lerna.json中的配置忽略更新的文件(command.publish.ignoreChanges = ["*.md"])。')]),e._v(" "),t("p",[t("img",{attrs:{src:"/img/bVbAbxF",alt:"屏幕快照 2019-11-12 下午3.19.31.png"}})]),e._v(" "),t("p",[e._v("这种模式比较常用，因为通常我们希望每个包都可以对外单独使用，单独维护，单独更新。")]),e._v(" "),t("h4",{attrs:{id:"commands"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#commands"}},[e._v("#")]),e._v(" commands")]),e._v(" "),t("ol",[t("li",[e._v("bootstrap")]),e._v(" "),t("li",[e._v("publish")]),e._v(" "),t("li",[e._v("version")]),e._v(" "),t("li",[e._v("exec")]),e._v(" "),t("li",[e._v("init")]),e._v(" "),t("li",[e._v("create")]),e._v(" "),t("li",[e._v("add\n1.为某个包安装第三方依赖 "),t("code",[e._v("lerna add xxx --scope=xxxx")]),e._v("\n2.为某个包安装本地依赖，如packages/a依赖packages/b"),t("code",[e._v("lerna add b --scope=a")]),e._v("\n3.为所有包安装依赖 "),t("code",[e._v("lerna add xxx")])]),e._v(" "),t("li",[e._v("clean")]),e._v(" "),t("li",[e._v("link")])]),e._v(" "),t("h4",{attrs:{id:"generate-changelog"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#generate-changelog"}},[e._v("#")]),e._v(" generate CHANGELOG")]),e._v(" "),t("ol",[t("li",[e._v("asd")])]),e._v(" "),t("h4",{attrs:{id:"integration-with-other-tools"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#integration-with-other-tools"}},[e._v("#")]),e._v(" integration with other tools")]),e._v(" "),t("ol",[t("li",[t("p",[e._v("prettier")])]),e._v(" "),t("li",[t("p",[e._v("代码美化工具在多人项目中尤为重要，因为每个人的开发工具不一样，有的可编辑区域宽，导致代码每行也很长，没有固定的换行规范。并且没遇到它之前，最苦恼的是强迫症患者看到自己不舒服的代码格式，由于，也就不想再去细看逻辑了。所以，美丽的格式加上完美的代码逻辑和设计，才能让别人佩服呀。")])]),e._v(" "),t("li"),e._v(" "),t("li",[t("p",[e._v("lint-staged\n这个")])])])])}),[],!1,null,null,null);a.default=v.exports}}]);