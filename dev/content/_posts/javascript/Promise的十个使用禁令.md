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

## resolve(thenable) 与 resolve('non-thenable-object')?

## 不要在 Promise 类方法中定义 async 函数。

## 不要把代码写在 Promise 方法外

## 不要嵌套Promise, 使用 await

## 不要配合回调方法使用 await

## 不要在循环中使用await

## 在Promise链条上添加错误处理

## 不要Reject非Error类型参数

例如：

```javascript
Promise.reject("非法的参数，请检查")
```

通常我们外部使用Promise时，会认为catch捕获到的一定是一个继承于Error类的实例化对象。因为
在使用声明式的Promise的构造函数内如果出现未捕获的错误，它就是原生的错误类型，但是JS中并没有要求
我们手动的Reject参数一定要传Error实例，为了简化外部使用，这也属于一个潜规则，很多
Eslint的规则中，都会包含一个Reject只能传继承自Error的实例。

```javascript
Promise.reject(new Error("Cannot match the proper params"))
```

如果是因为某一个错误，导致你要使用reject抛出去，并且想要加上一些备注(比如会添加一些在哪个阶段出错的)，
这时可以修改 Error 的 message 属性，拼接上自己的备注即可

```javascript
const processResult = (res) => {
  return new Promise((resolve, reject) => {
    unzip(res, (err, data) => {
      if (err) return reject(err);
      resolve(data);
    })
  })
}
const getProject = () => {
  return fetch(xxxx)
  .then(processResult)
  .catch((sourceError) => {
    // do not use 'return Promise.reject(balabala)'
    sourceError.message = `Failed to get project, detail error ${sourceError.message}`
    return Promise.reject(sourceError)
  })
}
```

比如上面的例子，getProject依赖于另一个promise，在它返回错误时，不能直接抛出你的备注或描述，需要带上详细的
错误原始类，方便追踪栈信息和错误消息。

## 不要试图调用多次resolve来使then
```javascript

var p = new Promise( function(resolve,reject){
    click( "#mybtn", resolve );
} );
p.then( function(evt){
    var btnID = evt.currentTarget.id;
    return request( "http://some.url.1/?id=" + btnID );
} )
.then( function(text){
    console.log( text );
} );

```

## 不要搭配回调函数使用Promise

相比上面的那些，这是一个非常繁琐要求，因为很多库并不能提供Promise状态，需要手动一个个hack他们回掉才能达到理想的使用方式。

```javascript

```

在回掉中resolve或者reject一个Promise，固然能完成任务，但久而久之，套的回掉越来越多(基于习惯)，
promise也就没什么作用了。

```javascript
const buyRefrigerator = new Promise((resolve) => {
  setTimeout(resolve, 5000)
})

buyRefrigerator.then(openTheDoor)
.then(putTheElephantInIt)
.then(closeTheDoor)
.then(waitingForDead)
```

单独使用Promise，注册一个个处理函数的方式，相对于层层的回调来说是简便了一些，但是还不够灵活。
就比如说上面，如果用回调处理，至少需要五个语句块包裹着。用Promise处理，可以很清晰的看出他们之间
的处理步骤，而且词法也很扁平化，看着舒服。

