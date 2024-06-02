---
date: '2020-11-30'
slug: Mac big sur 闪退现象分析
tags: 
- computer
title: Mac big sur 闪退现象分析
author: Oliver Liu
location: Beijing;
image: https://cdn.pixabay.com/photo/2020/05/20/12/43/landscape-5196367__340.jpg
meta:
  - name: title
    content: Relaunch application in nwjs
  - name: description
    content: Mac big sur 闪退现象分析
  - name: keywords
    content: 
  - name: author
    content: 刘彤, Oliver Liu
  - name: language
    content: English
featured: false
---

## 背景

苹果为了购买因特尔芯片的成本和统一全平台架构的目的(Iphone, ipad, mac)，自研的ARM芯开始集成到Mac中使用，
从原来的 Intel 64 到 ARM64导致需要系统层软件向上兼容老应用程序的运行，也就是把 Intel64 转换成 符合 ARM-64 架构的指令集。
这个软件由一个 Transitive Corporation 公司为苹果提供动态转换技术，也就是最近发布的 苹果11系统中 Rosetta2 组件的实现。
动态转换技术全称为: “Dynamic birnary translation”， 旨在原体系的芯片架构上翻译成可以在目标架构上运行的代码。所以更新了 Big Sur 系统，
就相当于兼容了ARM架构，也就是自带了这个组件。(如果本身就是intel架构的老机器，默认是不会开启这个组件的)。


## 对跨平台软件的影响
由于新系统big sur 相较于上一个 10.0.0 的版本相差了十年左右，这次的更新不仅为 ARM 架构迁移做出了调整，
而且在基础架构上做出了很多的改变，比如UI调整，系统设置等等，目的就是让用户体验更接近于IOS。
这就导致有些即使使用intel芯片的mac用户在升级big sur 之后会出现与客户端不兼容的问题，
具体表现在 node&chromium, 前者会闪退，后者会显示一个崩溃图标和一个黑色背景。新买的mac电脑自带了big sur系统和 arm 芯片，
这种电脑不能打开客户端，但是可以启用 Rosseta2 打开(默认开启)，
虽然使用了这个不用担心老软件不能运行在ARM架构上的问题，但是由于动态编译技术和V8中的JIT互斥，这会导致实际跑两个V8，
虽然可以运行，但会变得比较慢，因此也会导致一些闪退的情况发生。


## 解决方案：

更新内核版本，把最新的对big sur系统作出改进的chromium拉进去(用ua去判断系统版本，只要是11以上的就用这个最新的内核版本)。
优化上面说的运行两个V8会变得比较慢的情况，在原有的基础上(darwin-intel64)，增加一个单独的支持arm架构的客户端(darwin-arm64)，
用于专门运行在arm架构上的mac电脑上，但前提是浏览器的ua可以判断出arm架构的系统（待调研）。如果不能的话就使用 Universal/fat realese 包（目前社区没有这种包，
主要是由于chromium和node还没有发布出来），用于兼容两个系统架构的包（实际上还是打入了两个二进制执行程序，只不过是系统做的判断到底执行哪个），缺点是包体积大，
但是运行时的性能几乎和a一样, 并打包简单，不用打两个。
