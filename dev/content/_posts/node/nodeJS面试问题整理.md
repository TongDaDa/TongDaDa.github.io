---
date: '2020-06-4'
slug: nodeJS面试问题
tags:
- native
title: nodeJS面试问题
author: Oliver Liu
location: Beijing;
image: https://cdn.pixabay.com/photo/2020/05/28/03/38/canyon-5229681_960_720.jpg
meta:
  - name: title
    content: nodeJS面试问题
  - name: description
    content: nodeJS面试问题, js, javascript, node
  - name: keywords
    content: nodeJS面试问题, js, javascript, node
  - name: author
    content: 刘彤, Oliver Liu
  - name: language
    content: Chinese
featured: true
---

## 粗略概括一下nodeJS的组成结构

c++ -> Libuv -> V8 -> JS

---


## nodejs 模块类型，有几种，他们之间有什么不同？

1. 核心模块，在内建模块上层封装的js层接口。
2. 内建模块，node内部原生的c++模块实现，这些模块调用了 Libuv 接口。
3. 文件模块, 纯JS模块。

核心模块在启动晋城时，node会把

---

## 为什么require可以不用声明而直接引用？

在Node中，每个模块都会被一个立即执行函数(IIFE)包裹着，在Node引入执行它们时，会传入一些参数

```javascript
(function(expoprts, require, module, __filename, __dirname) {                                                                              
})  
```



---

## module.export换成exports可以吗, 他们之间有什么不同？

```javascript
var module = { exports: {} };
var exports = module.exports;
```

---

## 谈谈你对 duplex 流的理解？

---

## node 是如何处理https请求，如何指定一个特定的证书？

---

## node单进程运行最大内存限制是多少，新旧内存堆它们是什么？

---

## 假如现在有10个G的文件等着你去处理，在保证性能的同时，请问用node的最佳实践是什么？

---


## drain 事件是在什么时候触发的，出现这种情况时如何应对？

---


## 每隔200ms就需要更新一次本地的json格式文件，向里边添加数据，请问使用那个API操作，他们之间有什么区别？

---


## fs.open是不是有同步的方法, 为什么有/没有？

---


## fs.open可以传值指定打开模式，请问这个“0o666"表示什么？

---


## fs.open底层调用了uv_fs_open，请问是在libuv主线程中执行还是另起一个线程执行？

---

## 说说异步非阻塞式语言的特性，有什么优势和劣势？

---

## 了解过其他使用Libuv接口的语言吗？他们的性能对比nodejs有什么差异？

---

## Buffer 和 ArrayBuffer 的区别是什么？如何相互转换？

---


## process.nextTick 的作用?

---
