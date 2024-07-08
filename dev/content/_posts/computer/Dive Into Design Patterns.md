---
date: '2021-12-15'
slug: Dive Into Design Patterns
tags:
- computer
title: 《Dive Into Design Patterns》 读后感
author: Oliver
location: Beijing;
image: https://cdn.pixabay.com/photo/2020/07/04/05/24/cat-5368270_960_720.jpg
meta:
  - name: title
    content: The patterns in computer science
  - name: description
    content: The patterns in computer science
  - name: keywords
    content: The patterns in computer science
  - name: author
    content: Oliver Liu
  - name: language
    content: Chinese
featured: true
---

这段时间一直在想编程本元是什么，有无穷的模块化上层建筑使很多的简单的项目门槛非常低，那么
编程的意义在哪呢？假如有一天机器可以写代码的话，那人的竞争力又在哪呢，不得不思考在过程过程中
我们都在学习什么。

不管什么语言，框架，平台，在开发项目中都离不开团队协作，这也是代码工程的意义所在。人和机器的不同
点在人可以通过配合，分工，完成极其复杂的项目。这个过程是AI取代不了的。实际上编程语言的初衷
就是让人理解机器码的执行逻辑，假如代码的可读性不好，那和机器写代码相比可真就一点竞争力没有了。


怎么写高维护性和可读的代码，看了《Dive Into Design Patterns》这本书之后，有很多想法，
这本书的作者Alexander Shvets 是乌克兰人，从事编程行业很多年，之后改行做了编程教学工作，
教的内容就是如何避免潜在的编程问题，以及代码重构相关的。同时也是这本书的作者。

下面我同步更新一些，关于这本书的看法，有兴趣的也可以搜搜看。

## Object

我个人比较喜欢面相对象编程，因为它更符合人类思考模型，一个模块就是物理世界中的Object，它有多个属性和作用。**共创多个类可以完成一件复杂的事情**，
当类实例化后也就是这个物质诞生的时间。但用多了之后缺点也很明显，如下 (: 可能不算缺点吧，易用性不太适合初级和中级的程序员。

1. 它对一开始的底层设计模式要求很高。
2. 系统复杂度越高，代码越乱，如果是做业务，你无法控制它们之间的合理性，因为需求就是不合理的。对通过构造，继承，多态等操作完成复杂的调用关系。
3. 不可变性和副作用太多，通常一个功能性对象被多个场景混合使用时就是噩梦的开始... 多个地方不合理的操作一个属性，然后
调用地狱，debug查看调用链。

它比较适合一个脱离于渲染的模块，有固定的运行，销毁逻辑。可被外部调用的生命周期完善的类模块。

## Function

尤其对前端来讲，提高开发体验的最好编程方式就是函数式。`状态默认都是不可变的，简洁，易用性高，关注点都在UI上面`，
并且最最最重要的是组合性更高。

```javascript
const cart = [
    { name: 'Laptop', price: 999.99, quantity: 1 },
    { name: 'Mouse', price: 25.50, quantity: 2 },
    { name: 'Keyboard', price: 75.00, quantity: 1 },
    { name: 'Monitor', price: 200.00, quantity: 2 },
    { name: 'USB Cable', price: 10.00, quantity: 5 }
];

// 定义纯函数进行数据变换和过滤
const isExpensive = item => item.price > 50;
const getTotalPrice = item => item.price * item.quantity;
const sum = (acc, price) => acc + price;

// 使用高阶函数进行变换和过滤
const expensiveItems = cart.filter(isExpensive);
const totalPrices = expensiveItems.map(getTotalPrice);
const totalPrice = totalPrices.reduce(sum, 0);

console.log(`Total price of expensive items: $${totalPrice.toFixed(2)}`);

```

这种高阶函数和纯函数的组合是非常清晰，并且是状态安全的，并不像OOP一样，它会有潜在的状态变更风险。

所以拿这种编程范式来说，它再适合渲染不过了。因为渲染周期中最容易维护和调试开发的场景就是状态唯一，

状态不变更。而持久化的状态并不属于渲染逻辑，它只负责取状态，至于状态是什么是通过其他模块构造的。
