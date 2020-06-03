---
date: '2020-05-25'
slug: 什么时候使用 peerDependencies?
tags:
- native
title: 什么时候使用 peerDependencies?
author: Oliver Liu
location: Beijing;
image: https://cdn.pixabay.com/photo/2020/05/21/11/03/lily-of-the-valley-5200245__340.jpg
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

## dependencies 安装规则
首先npm管理依赖的算法规则是，对于两个不同包的依赖的包的版本，采用这个这个包中增加 node_modules 然后作为独有的依赖引入。
所以这种情况下其实是引入了两套不同版本的包，但有一些情况其实这两个包是可以合在一起的，不必用两个增加编译工作的负担。

## peerDependencies 为了解决什么问题？

什么时候用 peerDependencies 呢？比如我们写了个一个eslint plugin 或 extend 或者babel 的 preset / plugin，
这时候就可以考虑使用peerDependencies，因为我们写的这个插件它是依赖于 eslint 或 babel 的，没有他们提供的基础模块，
我们的插件自然运行不起来，但是如果我们加入一个依赖到 dependence 中，又会导致安装我们这个插件的人有可能会保留两个 babel 的版本，
即运行我们的插件的babel版本是5.0.* ，用别的插件运行的是 6.0.*, 这就很蛋疼了，有一些兼容性和中途fix的小问题很难超找到。所以最终的定论时，
在依赖的模块中，如果有可广泛的独立使用价值的，应该最好使用 peerDependencies，因为安装你包的人环境中很有肯能会安装和你依赖不同的版本，
从而导致两个不同包，在他的环境中运行时。

当然，这是有一些麻烦的，因为需要手动安装peerDependencies的依赖，并不会像dependencies一样自动安装，
对于没有安装babel的那些用户，想通过安装这个插件直接使用，是有一些繁琐的，这时如果你的npm版本大于5.*的话，
那么可以使用 

```bash
npx install-peerdeps --dev babel-plugin-****
```

