---
date: '2020-06-03'
slug: 什么时候使用 peerDependencies?
tags:
- native
title: 什么时候使用 peerDependencies?
author: Oliver Liu
location: Beijing;
image: https://cdn.pixabay.com/photo/2020/05/29/05/47/barley-5233734__340.jpg
meta:
  - name: title
    content: 什么时候使用 peerDependencies?
  - name: description
    content: peerDependencies?, js, javascript, node, npm, package.json
  - name: keywords
    content: peerDependencies?, js, javascript, node, npm, package.json
  - name: author
    content: 刘彤, Oliver Liu
  - name: language
    content: English
featured: false
---

## npm 中的 dependencies 安装规则
首先npm管理依赖的算法规则是，对于两个不同包的依赖的包的版本，采用这个这个包中增加 `node_modules` 然后作为独有的依赖引入。
所以这种情况下其实是引入了两套不同版本的包，但有一些情况其实这两个包是可以合在一起的，不必用两个增加编译工作的负担。

比如，如下一个例子说明

第一步，我们创建一个测试项目

```bash
md conflict-test
cd conflict-test
npm init -y
```

第二步我们在package.json的依赖中，添加两个包，分别是todd-a,todd-b.

```json
{
"dependencies": {
    "todd-a": "^1.0.0",
    "todd-b": "^1.0.0"
  }
}
```

那么todd-a 和 todd-b 这俩的依赖是不一样的，他们的依赖分别是

### todd-a
```json
{
"dependencies": {
    "lodash": "^4.17.11",
    "todd-child": "^1.0.0"
  }
}
```

### todd-b 
```json
{
"dependencies": {
    "lodash": "^4.17.11",
    "todd-child": "^2.0.0"
  }
}
```

如上，这俩包都依赖lodash，并且lodash的版本号都是一样的，而他们共同依赖的todd-child 的版本确是不一样的。
这种情况我们会看到在安装完这俩包之后，我们项目中的node_modules结构是这样的。

```log
node_modules
├── lodash 4.17.11
├── todd-a 1.0.0
├── todd-b 1.0.0
│   └── node_modules
│       └── todd-child 2.0.0
└── todd-child 1.0.0
```

也就是说，版本号一致的提到了node_modules的根级目录，对于版本号不一致的子包依赖，会在子包中创建node_modules，然后把特定的
版本的包放进去。这就是npm为了应对不产生包版本不同导致的冲突问题的解决方法。

这时，我们会发现一个问题，假如这个todd-child包特别大，这就相当于引入了两个包体积上下差不多的相同但版本号不同的包，但是上述
情况不太容易发生，因为对于默认`^`的版本前缀，只有这个包的major版本(第一位的数字)更新时才会采用两个包，也就是上述所说的情况，
这表明 minor 和 patch 的版本是向后兼容，不需要使用两个版本。而一般的包除了翻天覆地的改动之外是不会更新发布major这个版本的(major
版本的变动一般是基础功能改变，大的重构不保证兼容之前的版本时发布的)，发布的时间周期是很长的。

不容易出现，不代表不出现，在大项目中，依赖管理极其复杂，想在减少包体积和dev的编译速度上提升性能，这是一个不容忽视的大活。
在上面的这个例子中，todd-a/b 这两个包其实对于我们来说，大多数情况下有可能并不知道他们依赖了todd-child，这时作为开发者
不可能在用一个包时还需要审查他们的依赖有没有共性把？这也太耗时间了。所以呢，peerDependencies 出现。

## peerDependencies
peerDependencies 与 dependencies 一样在package中表示此包的依赖列表，但是它能更好的应对上面说到的问题。
还是拿上面的例子说，假如todd-b的依赖这样写

```json
{
"peerDependencies": {
    "lodash": "^4.17.11",
    "todd-child": "^2.0.0 || ^3.0.0"
  }
}
```

这样在安装它时，npm并不会自动为你安装这两个依赖，如果你的依赖中没有安装**符合这个规则**的，只是是提醒你，这个版本的依赖在你的环境中没有，
那么，假如我们已经安装了 todd-a, 这时安装它后，目录结构是这样的。

```log
node_modules
├── lodash 4.17.11
├── todd-a 1.0.0
├── todd-b 1.0.0
└── todd-child 1.0.0
```

todd-b没有了自己的依赖，它其实没有安装任何包，由于我们先安装了todd-a，否则的话，连lodash也不会有，这时todd-b里的代码
require的就是 1.0.0 版本的 todd-child，因此它有可能会出问题，因为todd-b的peer依赖中写明"^2.0.0 || ^3.0.0"，在安装它
时npm也提醒我们了，没有符合它要求的版本依赖，但是我们没手动处理，这时导致它引用了1.0.0的版本的todd-child。

## 如何选择是否使用 peerDependencies

什么时候用 `peerDependencies` 呢？比如我们写了个一个`eslint plugin`/`extend` 或者 `babel` 的 `preset` / `plugin`，
这时候就可以考虑使用`peerDependencies`，因为我们写的这个插件它是依赖于 `eslint` 或 `babel` 的，没有他们提供的基础模块，
我们的插件自然运行不起来，但是如果我们加入一个依赖到 dependence 中，又会导致安装我们这个插件的人有可能会保留两个 babel 的版本，
即运行我们的插件的babel版本是5.0.\* ，用别的插件运行的是 6.0.\*, 这就很蛋疼了，有一些兼容性和中途fix的小问题很难超找到。所以最终的定论时，
在依赖的模块中，如果有**可广泛的独立使用价值的**，应该最好使用 peerDependencies，因为安装你包的人环境中很有肯能会安装和你依赖不同的版本，
从而导致两个不同包。

当然，使用它这是有一些麻烦的，因为需要手动安装peerDependencies的依赖，并不会像dependencies一样自动安装，
对于没有安装babel的那些用户，想通过安装一个babel插件直接使用，是有一些繁琐的，
那么可以使用如下bash命令（以eslint-config-airbn为例）：

```bash
(
  export PKG=eslint-config-airbnb;
  npm info "$PKG@latest" peerDependencies --json | command sed 's/[\{\},]//g ; s/: /@/g' | xargs npm install --save-dev "$PKG@latest"
)
```

😢 bash不能跨平台，而且命令繁碎，我们也可以用npm包来处理它。如果你的npm版本是5.*的话

```bash
npx install-peerdeps --dev babel-plugin-****
```

使用npx 运行 install-peerdeps包，然后安装某一个 babel-plugin ，假如这个包中有peerDependencies，并且有babel的话，
它会帮助我们把babel也安装了，其实就是扩展了命令变成了如下：

```bash
npm install babel-plugin-**** babel -D
```

假如不用install-peerdeps的话，那么就只有babel-plugin-****，而不会安装babel了。
