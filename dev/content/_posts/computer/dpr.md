---
date: '2018-07-29'
slug: dpr介绍
tags:
- web
title: css units
description: dpr介绍
author: Oliver
location: Beijing;
image: https://cdn.pixabay.com/photo/2020/10/21/09/49/beach-5672641__340.jpg
meta:
  - name: title
    content: dpr介绍
  - name: description
    content: dpr介绍
  - name: keywords
    content: css units, mobile, adaptor, css query media
  - name: author
    content: 刘彤, Oliver
  - name: language
    content: Chinese
featured: false
---

## dpr

dpr 是 devicePixelRatio(设备像素比) 的简写,此属性位于全局(window)当中(可配置，可枚举)，它表示1个`css像素`比多少个物理像素(设备像素)。

比如，我们使用css设置一个50\*50像素的正方形。在dpr为1的设备中，它的真实物理像素分辨率为50\*50，但是在dpr为2的设备当中
却是100*100。这是用户代理(浏览器)根据ppi为基准的提供的像素比。以上面的dpr为2的例子当中，它就表示 1 css pixel = 2 device pixel。

> 它的出现正是在**物理像素与css像素**两者之间为开发者提供了`像素比例`。

viewport这个html元标签，在我们设置device-width时，浏览器就会根据此比例值，去进行视口级的**缩小**。

## 它出现的意义?

web发展快速，如今伴随着HTML5技术，如微信端，hybrid等场景的出现，现在的网页三剑客完全可以占据一部分移动端市场。显示屏技术也发生了
日新月异的变化，自从iphone4发布retina屏幕之后，其他的厂商如oppo,三星等都已经推出了自己的高清屏幕。

在这之前建议看一下我的
[什么是像素](https://github.com/TongDaDa/mobile-knowledge/blob/master/base/pixel.md),
[viewport](https://github.com/TongDaDa/mobile-knowledge/blob/master/base/viewport.md)
两篇内容.

我们先假设，如果没有devicePixelRatio的出现，即css像素 1px 对应物理像素的 1px ，在`小设备`上到底是啥样的呢？

我在ps上模拟大概是这样

<img src="https://github.com/TongDaDa/mobile-knowledge/blob/master/img/ppiExample.png?raw=true" />

注：可能不太直观，那么你可以试一下在你的移动端页面中，把viewport的device-width去掉。（😢没错，你的手机屏越是清晰页面就越是小)

可见，它的体验效果并不好，因为通常显示屏不会把ppi配置太高，毕竟视距与移动端不一样。所以导致了两端的分辨率差距较大。

浏览器为了解决这个问题，才出现了 devicePixelRatio 这个接口，**我认为**它是浏览器厂商根据手机ppi所设置的比例值.

由于pc的ppi与mobile的ppi差距较大，导致的你在pc上看100px可能是长长的一条线，手机上看可能就那么一丁丁.

这样的情况下，我们需要有一个平台到设备之间的衔接，以更好的达到适配效果。

> 需要注意的是，虽然我们可以修改这个属性，但这并没有什么意义。尽量不要这么做，如果这个修改操作出现在你`适配方法`之前会造成意料之外
的后果.

iphone4, 4s, 5, 5s, 6, 6s的ppi都是326，dpr都是2，6+和6s+ppi是441，dpr是3

<img src="https://github.com/TongDaDa/mobile-knowledge/blob/master/img/iphone-dpi.png?raw=true" />

以上是苹果机型的ppi与dpr对照表，我想大家已经发现了，`ppi越大，dpr也就越大`。

参考：

[MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio)

[问答-dp*单位的来源及疑问？](https://www.zhihu.com/question/29226201)

[第一个回答-px,dpr周边技术介绍](https://www.zhihu.com/question/35221839/answer/66825618)

[dpr浅析](http://www.jianshu.com/p/221bebfae266)
