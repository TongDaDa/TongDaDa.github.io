---
date: '2020-06-03'
slug: Promise的十个使用禁令
tags:
- javascript
title: Promise的十个使用禁令
author: Oliver Liu
location: Beijing;
image: https://cdn.pixabay.com/photo/2020/05/30/16/48/forest-5239560_960_720.jpg
meta:
  - name: title
    content: Promise的十个使用禁令
  - name: description
    content: Promise的十个使用禁令
  - name: keywords
    content: Javascript, Promise, await, async queue in javascript.
  - name: author
    content: 刘彤, Oliver Liu.
  - name: language
    content: Chinese
featured: true
---

## resolve(thenable) and resolve('non-thenable-object')?

## 不要在 Promise 类方法中定义 async 函数。

## 不要把代码写在 Promise 方法外

## 不要嵌套 then 方法

## 不要配合回调方法使用 await

## 不要在循环中使用await
