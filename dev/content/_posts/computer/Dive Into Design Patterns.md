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

## Object Oriented Programming

我个人比较喜欢面相对象编程，因为它更符合人类思考模型，一个模块就是物理世界中的Object，它有多个属性和作用。**共创多个类可以完成一件复杂的事情**，
当类实例化后也就是这个物质诞生的时间。但用多了之后缺点也很明显，如下 (: 可能不算缺点吧，易用性不太适合初级和中级的程序员。

1. 它对一开始的底层设计模式要求很高。
2. 系统复杂度越高，代码越乱，如果是做业务，你无法控制它们之间的合理性，因为需求就是不合理的。对通过构造，继承，多态等操作完成复杂的调用关系。
3. 不可变性和副作用太多，通常一个功能性对象被多个场景混合使用时就是噩梦的开始... 多个地方不合理的操作一个属性，然后
调用地狱，debug查看调用链。

它比较适合一个脱离于渲染的模块，有固定的运行，销毁逻辑。可被外部调用的生命周期完善的类模块。


### 实例和封装

实例化常常被忽视，实际上它也是面相对象中比较重要的一部分，在实例之前通过构造函数的参数完成对这个类的实例构造。在类被实例之前类也可以提供 Static 方法直接调用。这给类方法提供了多种调用场景。

```java
public class Person {
    // 私有变量，不能直接从类的外部访问
    private String name;
    private int age;

    // 公共的构造方法，用于创建对象
    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    // 公共的 getter 方法，用于获取 name 的值
    public String getName() {
        return name;
    }

    // 公共的 setter 方法，用于设置 name 的值
    public void setName(String name) {
        this.name = name;
    }

    // 公共的 getter 方法，用于获取 age 的值
    public int getAge() {
        return age;
    }

    // 公共的 setter 方法，用于设置 age 的值
    public void setAge(int age) {
        if (age > 0) {  // 简单的验证逻辑
            this.age = age;
        } else {
            System.out.println("Age must be positive.");
        }
    }

    // 一个方法展示个人信息
    public void displayInfo() {
        System.out.println("Name: " + name + ", Age: " + age);
    }
}
```

```java
public class Main {
    public static void main(String[] args) {
        // 创建一个 Person 对象
        Person person = new Person("Alice", 30);

        // 使用 getter 方法获取属性值
        System.out.println("Initial Name: " + person.getName());
        System.out.println("Initial Age: " + person.getAge());

        // 使用 setter 方法修改属性值
        person.setName("Bob");
        person.setAge(35);

        // 使用 getter 方法获取修改后的属性值
        System.out.println("Updated Name: " + person.getName());
        System.out.println("Updated Age: " + person.getAge());

        // 展示个人信息
        person.displayInfo();

        // 尝试设置一个无效的年龄
        person.setAge(-5);  // 输出: Age must be positive.
    }
}
```

以java为例，它天生就是适合做面向对象的编程语言，上例代码演示了实例和封装的概念。大多数场景在实例化时
都是一个类对象，好处是方面管理类型，如果一个个传参也比较麻烦。

这个类是一个Person，我们都知道一个人应该具备哪些属性，规范它的构造函数应该接收哪些「人的属性」。

但在实际使用中，它总是会被`混乱定义`导致难以维护，但在函数式中如果你的参数定义模块依然会有这种问题(求生欲很强，抵制抬杠)，只是哪种方式更能使人减少错误，
更容易实现逻辑隔离思想。在这个问题上，OOP和FP两大阵营之间有很多你来我往的情愫纠葛(互喷)，我不讲逻辑，也不谈感情，我信命。从哲学上讲，我更倾向于
函数式符合21世纪40年代的人生观，审美和价值观。。。

> 在过去人们做一些事更聚焦于一个 分支模块 -> 庞大的系统，这是典型的面相对象编程，而当基础建设起来，节奏变快后，会发现通过组合和合理的设计，世界上没有庞大的系统。这其实也是个悖论，因为从来就没有一个一开始就很完善的系统，到最后一定是持续修改迭代的，所以鲁棒性高的系统比设计更重要。

封装，Encapsulation 可简单可复杂，简单的就是上面这个demo，它的属性是私有的，不直接对外开发，如果想得到它，通过定义来的固定方法获取。复杂的会创建几个私有化的基类继承。


### 多态和继承

多态和继承在OOP中经常配合使用，多态是对一个既定能力的多样扩展。比如下面的例子。

```java
abstract class Animal {
    abstract void makeSound();
}

class Cat extends Animal {
    @Override
    void makeSound() {
        System.out.println("Cat meows");
    }
}

class Dog extends Animal {
    @Override
    void makeSound() {
        System.out.println("Dog barks");
    }
}
```

猫和狗都可以发出声音，发的声音有自己的特性，所以这里的抽象类是规范 Animal，动物一定会发出声音。子类通过重载Override，各自实现声音的逻辑。

抽象类中只是定义实现逻辑的子类们的规范，但实际场景中，不仅只有一个抽象类，抽象类会继承一个父类，然后父类实现一些
发声逻辑的公共方法，子类中直接调用父类的方法发出声音，子类的逻辑只是根据自己的逻辑来选择适合的声音。

上述一个简单的demo，实际上简单的情况也不太需要分类。对于一个没有特殊化处理逻辑 & 回调的平级事务来讲，我更倾向于用一个列表的数据结构批量处理，
而不是每一种都新建一个类，比如下面这样。

```
[{name: "Dog", accent: "barks"}, {name: "Cat", accent: "meows"}]
```

再举个复杂的栗子，在Webpack这种新增的Plugin中，就用了多态的设计，每一个插件都是一个实例，在定义类时定义好在不同时间段要被调用的方法，
再传给webpack打包时，会按序调用注入进来的Plugin的生命周期成员函数。通过函数的返回值等输出参数，影响它打包的效果。这就是一个典型的多态设计。

至于抽象类，这是java中对OOP使用的扩展，其他语言中可能也没有，但不影响多态和继承的使用。

## Function Programming

对前端来讲，提高开发UI体验的最好编程方式就是函数式。`状态默认都是不可变的，简洁，易用性高，关注点都在UI上面`，
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

当只谈论逻辑实现时，函数式的实现要比OOP形式上不是那么的`《内聚》`，因为从一开始设计时FP就是拆开了揉碎的，
