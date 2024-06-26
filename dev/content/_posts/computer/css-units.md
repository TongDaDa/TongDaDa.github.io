---
date: '2018-07-14'
slug: css units
tags:
- web
title: css units
description: css 适配单位
author: Oliver
location: Beijing;
image: https://cdn.pixabay.com/photo/2021/01/11/21/39/temple-5909803__340.jpg
meta:
  - name: title
    content: css 适配单位
  - name: description
    content: css 适配单位
  - name: keywords
    content: css units, mobile, adaptor, css query media
  - name: author
    content: 刘彤, Oliver
  - name: language
    content: Chinese
featured: false
---

# css 适配单位有哪些？

> 对于不同的设备我们需要选择它展示的方式，前些年的响应式比较火，现在的pc端追求高点的网站
也会都会有，就像[LeaVerou](https://github.com/LeaVerou)说的那样，响应式是需要配合页面中的`活性单位`去实现的，如果只靠
[css-media](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Media_queries)恐怕代码会乱糟糟的，而且不好维护。类似的移动端适配也是如此，对于移动端来说它的
范围可能比响应式要小，可是核心方法不变，我们需要使用比较灵活的单位去让它自己`栩栩如生`~~~:

css的所有单位如下:

+ px (像素)
+ em (font size of the element)
+ % (百分比)
+ rem (font size of the root element)
+ in (英寸)
+ cm (厘米)
+ mm (毫米)
+ ex (x-height)
+ ch (x-height)
+ pt (Point)
+ pc (Pica)

视口:
+ vw
+ vh
+ vmin
+ vmax

以上单位，最为基础也是最常用的是`px`，具体的它表示什么，在[像素到底是什么](https://github.com/TongDaDa/mobile-knowledge/base/pixel.md)
我已经写了，觉得`值`的朋友，可以去看看.

除像素意外，我们可以把其他单位都看成是`像素`，其实说白了，单位只不过是一个测量的`度`。而在屏幕当中，毋庸置疑，像素就是一个
最基础的显示单位，显示屏上没有比他更小的`可视化单位`(再小就是bit了),对于除它以外的我们可以称作是`复合单位`;

如设置复合单位，我们可以从控制台样式表中的Computed当中，查看此元素的样式，来查看具体的基础像素. 也可以通过select an element 工具从视图上查看。

> On screens, the units are related to CSS inches, centimeters, or pixels, not physical values.

翻译过来是，在屏幕上，in,px,cm css单位不能代表物理值。也就是说，你设置用css设置了 10px 10cm 10in 不是物理值，每个设备都不一样。

回到主题，那么:

## 在什么样的场合下我们应该使用什么单位呢？

<b style="font-size:20px">px</b> 基础单位，除此之外的所有属性都是基于像素的，如果页面没有响应和适配要求的话可以尝试，大多数应用在pc端，也可以
配合流体式布局再加上百分比单位，实现类似响应式页面，但是并不`纯`，因为字体等属性并不能很好的控制。

<b style="font-size:20px">em</b> 相比px比较灵活的一点是，`可以通过继承的font-size属性来灵活调整`，可是这将面临一个问题，如果页面中某个模块的
字体大小改变了，这将会影响你这个模块下所有元素的边距从而搞乱你的布局。

对于移动端来说，它的整个Layout全部
都是`流体式`的，通俗点说就是几乎没有`写死`的地方。因此比较适合那种**牵一发而动全身**的写法。所以这种小规模控制不可取。

说回em,它的使用场景在pc端中比较常用，因为在pc中有些场景确实是要做`局部响应`的，对整个页面来说影响较小，再与css-media合作，就可以随心所欲，为所欲为了.

<b style="font-size:20px">百分比%</b>  这个单位我们在开发中适用也很广泛，它相对于当前文档尺寸的来计算数值，最后我们可以在控制台的styleComputed中
查看它被转换成了具体`pixel`单位数值，在上级元素有了固定大小之后，会相对于上级。使用它来设置盒子大小边距等还可以，但是对于某些场景下(比如移动端)，要求文
档内所有`节点`都要全部适应,比如字体大小它就无能为力了，可除此之外并不影响我们在移动端愉快的使用它们！

<b style="font-size:20px">rem</b> 主角登场，我觉得它的出现正是重新定义了em的另一种实现方式，也就是它名字的来源,即 reset em(font size of the element),
相比rem，它只继承根元素，也就是html元素。上面说到em不足的地方，也就是移动端我们需要完全自适应，在早期移动端的实现大概是使用 viewprot 来整体调整视口级的缩放比例，
从而实现不同设备大小的适配。虽然可以完成，但是因为失去了`原始大小`，一些图像会出现模糊的情况。而rem保持了em的字体流方式，对于移动端来说，它改善了`em`在某些情况下
的不足，可以完美的控制页面整体元素的大小。

<b style="font-size:20px">cm & mm & in</b> 曾经有一个比较好笑的事情，后台买衣服，突然问我十厘米有多大？还没来得及等我说，他告诉我你用css在屏幕上画个10cm的线，我看
看不就行了。cm,mm,in 在生活当中，它们都能衡量物理尺寸，但是在电子屏幕上，最基础的单位就是像素没有其他。上面说了，除像素以外的`复合单位`，css都会把它们转换成相应的px
而转换成px之后，又会受到设别像素比的影响。所以，cm,mm,in 与你实际生活当中物理尺寸是没有任何关系的。那么它们是如何转换成像素的呢？

1in = 2.54cm = 25.4 mm = 72pt = 6pc = 96px

我们可以用这个换算来测试一下，在我的浏览器中，设置一个元素的宽度为 1cm, 去computed中查看其px为37.7812px ≈ 96/2.54

<b style="font-size:20px">ex</b> 相对于`x`字符的x-height，x字符受到这个元素的 fontSize 所影响，那么 fontSize 一样也可以影响 ex 的显示。

<b style="font-size:20px">ch</b> 与 ex 一样，它表示字符 `0`，但是兼容不是很好，ie9及一下浏览器不支持.

<b style="font-size:20px">pt</b> 点(绝对长度)，pt全称为point，但中文不叫“点”，确切的说法是一个专用的印刷单位“磅”，大小为1/72英寸。所以它是一个自然界标准的长度单位，也称为“绝对长度”。

<b style="font-size:20px">pc</b> 派卡(绝对长度)，多用在印刷当中，1pc = 1/6英寸 = 24点，这个点是pt，前者多用于印刷中，后者是电子屏幕基础单位。
