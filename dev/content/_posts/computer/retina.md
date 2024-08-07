---
date: '2018-07-16'
slug: 视网膜屏幕简单介绍
tags:
- web
title: 视网膜屏幕简单介绍
description: 视网膜屏幕简单介绍
author: Oliver
location: Beijing;
image: https://cdn.pixabay.com/photo/2021/01/28/03/13/person-5956897__340.jpg
meta:
  - name: title
    content: 视网膜屏幕简单介绍
  - name: description
    content: 视网膜屏幕简单介绍
  - name: keywords
    content: 视网膜屏，retina
  - name: author
    content: 刘彤, Oliver
  - name: language
    content: Chinese
featured: false
---

## 简介

Retina屏幕由摩托罗拉公司研发，随着iphone4的引入这个技术被熟知，这个词也成为苹果屏幕的专属`代名词`，简单的说它是指多个像素压缩在一块屏幕上，
所以清晰与细腻程度比以前更高。在某种程度上，它表示用肉眼分辨不出像素颗粒感的屏幕,但是这一点可不是这么判断的.

> 是否为 Retina 屏幕，不仅仅决定于 ppi（分辨率，或者说像素间距h；1英寸/像素间距h英寸＝ppi），还要看使用设备时与人眼的距离（d）

几张图轻松理解概念:

<img src="https://github.com/TongDaDa/mobile-knowledge/blob/master/img/retina1.jpg?raw=true" />

<br />

<img src="https://github.com/TongDaDa/mobile-knowledge/blob/master/img/retina2.png?raw=true" />

<br />

<img src="https://github.com/TongDaDa/mobile-knowledge/blob/master/img/highPpi.jpg?raw=true" />

举个栗子，我的13寸显示屏分辨率是 1920 * 1080 的分辨率，突然有一天老婆答应每月多给我一千块零花钱，我积攒了一段时间，决定换
一块Retina显示屏。更新设备之后，我的屏幕大小并没有改变，但是分辨率变成了 3840 * 2160 ，宽和高像素分别翻了个翻。

使用上了新设备，我感觉非常爽，心想，还有这么高科技的玩意？ 我打算进一步研究研究。。。

## 探索

在发布iphone4的时候，乔老爷子给出了一个公式，依照这个公式，可以判断是否为`视网膜屏幕`。

<img src="https://github.com/TongDaDa/mobile-knowledge/blob/master/img/issueiph4.jpg?raw=true" />

> 其中a代表人眼视角，h代表像素间距，d代表肉眼与屏幕的距离。符合以上条件的屏幕可以使肉眼看不见单个物理像素点。这样的IPS屏幕就可被苹果称作“视网膜屏幕”。

抛开这蛋疼的公式，我们通俗的理解一下，苹果说的这个视网膜屏幕，顾名思义就是`在一定的距离下我们人眼分辨不出屏幕中的颗粒度`(据说，这个公式苹果是建立在中等视力
的人群上，如果视力好的，这个公式就不准确了)。

> 任何显示器在一定的视距之后都会是Retina

视网膜屏幕这个词儿是苹果搞出来，其他的公司怎么能用？即便是没有法律相关的约束，对于后者来说也是一种模仿的`耻辱`。所以，国内很多手机都可以在屏幕清晰度上超越它所谓的***
这种屏幕，但是没有人称为其视网膜屏幕，其底层技术都是一样的。只不过这个词有点被苹果 `产品化` 了.

> Retina技术类似于一种数字倍频，也就是把实际100x100分辨率的图片倍频成400x400的图片显示到液晶上面。这样做可以保证图像看起来没有颗粒感


## 问题：

### 苹果的Retina屏幕与其他手机型号除了ppi的不同，还有什么技术区别，以至于产生多倍像素的问题？

概念上讲，retina屏幕是可以理解为一定距离下人眼看不到像素点的显示屏(有很多传言说ppi达到300以上就是)，早在iphone4发
布之前，很多手机的ppi就已经超过了它，所以在那时在屏幕清晰度细腻度来说苹果所定义的 Retina 屏幕算不上是老大。抛开技术
说`情怀`都是扯淡，那么这个显示屏究竟为什么会让我们的1像素缩成 1/2 1/4 像素呢？

据我所知，苹果retina屏幕与其他厂商提高ppi的技术有所区别，如上引言，通过`数字倍频`。我们可以这样理解，在硬件上
Retina屏幕的像素数量还是1/4(粗糙版)，但在屏幕工作时，会通过这种技术增加`周边像素密度`，也就是人们所说的 1 分 4 像素。这
种技术维持显示的内存少，CPU负载也就低，可以省电。这是一个硬件与软件结合的技术。

### 是否只有Retina上需要使用多倍图？

不是，这个问题如果自己仔细体会，应该不难理解。我假设您现在已经知道了viewport dpr 等概念了。

多倍图的本质是解决在高ppi的情况下图片失真的问题，由于大多码农一传十，十传百，导致了所谓的`苹果的retina屏幕需要多倍图`
的说法，页面上的css像素我们有 dpr , 通过 viewport 标签 可以转换成不错的视口比例。但注意，这是css像素，对于图片来说
它有自己的像素，可以通过css像素为他设置大小，但是这样如果图片超出原有大小会出现失真。所以多倍图是通过准备多种图片，从
自身分辨率上来解决的这个问题。

<br />

参考:

[Retina一种新型高分辨率的显示技术](https://baike.baidu.com/item/Retina/4616695?fr=aladdin)

[双重标准？retina屏科学原理](http://blog.csdn.net/ithomer/article/details/8307927)

[对于 Retina Display 有哪些误解?](https://www.zhihu.com/question/20515881)
