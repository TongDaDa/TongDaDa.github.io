---
date: '2017-05-05'
slug: JavaScript 封装对象与强制类型转换
tags:
- web
title: JavaScript 封装对象与强制类型转换
author: Oliver
location: Beijing;
image: https://cdn.pixabay.com/photo/2020/03/27/08/19/landscape-4972789_960_720.jpg
meta:
  - name: title
    content: JavaScript 封装对象与强制类型转换
  - name: description
    content: JavaScript 封装对象与强制类型转换
  - name: keywords
    content: Javascript, 数据类型，强制类型张欢，封装对象
  - name: author
    content: 刘彤, aflyingpig, Oliver Liu.
  - name: language
    content: Chinese
featured: false
---

> 前面两章介绍了几大数据类型以及值类型，接下来的这个知识点，我觉得它对于javascript程序员来说是很重要的，

## 认识封装对象
在开始之前，我们先看一个例子，以便之后更轻松的理解封装对象的概念。
```javascript
   "tick".toUpperCase    //function toUpperCase()
   String.prototype.toUpperCase   //function toUpperCase()
   "tick".toUpperCase  === String.prototype.toUpperCase //true
   // 这里使用恒等比较判断 常量的方法是否和Sting构造函数中的方法为同一个.
```

> 我们先来阅读以下几条知识点，以免对下文做出更好的理解。

 1. 通过直接量的方式访问方法或属性，这种值我们称之为`常量方式` 例如上面的第一行代码。
 
 2. 在JavaScript中对象类型包括:`对象，数组，函数`这三种子类型，我们通常有两种术语，`引用类型 复合值`，引用类型值在做`恒等`比较时比较的是他们`内存指向`,即是否引用同一个值.

 3. javascript对象是一种复合值，它是属性或已命名值的集合，通过`.`符号来读取属性值。

> 通过上面的代码我们可以看到，在使用常量方式访问某个方法时，依然会返回其`数据类型对应的内置构造函数方法`，上面的第三点已经说了，javascript通过`.`操作符来访问属性或方法，可是`常量`真的是对象吗？它在访问属性的过程中底发生了什么？别急，跟随我的脚步，下面我会竭尽全力把我知道的，我的观点统统都说出来.

### 内部属性
在JavaScript中所有`复合类型`(如：对象，数组，函数)都包含一个内部属性`[[calss]]`，此属性可以看作是一个内部分类。它并不是传统面向对象上的类,由于是内部属性，所以我们无法直接访问,不过，可以转换为字符串来查看.

```javascript
  Object.prototype.toString.call([1,2,3]) // '[Object Array]'
  Object.prototype.toString.call(/^[1,2]$/)  // '[Object RegExp]'
```

> 这里补充一点，我们也可以通过此种方式去判断一个对象是否为数组。

我们看到每个不同的`常量类型`中的[[class]],都对应着它们`相应的内部构造函数`，也就是对象的内部[[Class]]属性和创建该对象的内建原生构造函数相对应，但有些`特例`.
```javascript
   //一说特例，我估计就有人想到javascript中比较蛋疼的两个类型
   Object.prototype.toString.call(null) // '[Object Null]'
   Object.prototype.toString.call(undefined) // '[Object Undefined]'
```
除了null和undefined，其他都是javascript的内置构造函数。这里再次说一个小细节，`Infinity`和`NaN`它们返回什么呢？我想不用说大家也可以猜到了，它们都属于Number类型.

```javascript
  Object.prototype.toString.call(42)  // '[Object Number]'
  Object.prototype.toString.call("42") // '[Object String]' 
  Object.prototype.toString.call(true) //  '[Object Boolean]'
```
上面的例子除了null和undefined，它们都有各自的构造类，这些类是javascript内置的.

### 封装对象过程
> 在日常开发中，我们通常不直接使用内置的构造类，而是直接通过常量访问.
```javascript
   var arr = new String("1234")
   arr    //  {0:"1",1:"2",2:"3",3:"4"}
```
通过构造函数实例出来的常量变成了对象，其实就是手动创建其封装对象，封装对象上存在对应的数据类型方法。<b>我们在使用常量的方式直接访问属性和方法时，javascript会自动为你包装一个封装对象,相当于上面我们手动包装</b>`在操作属性或方法完成之后JavaScript也会释放当前封装对象`

说到这里，我们可能会想到一个问题，如果需要经常用到这些字符串的属性和方法，比如在for循环当中使用i<a.length,那么一开始创建一个封装对象也许更为方便，这样JavaScript引擎就不用每次都自动创建和自动释放循环执行这些操作了。

其实我们的想法很好，但实际证明这并不是一个好办法，因为浏览器已经为.length这样常见情况做了性能优化，直接使用封装对象来`提前优化`代码`反而会降低执行效率`。

一般情况下，我们不需要直接使用封装对象，最好是让JavaScript引擎自动选择什么时候应该使用封装对象，换句话说，就是应该优先考虑使用'abc'和42这样的原始类型值，而非new String(‘abc’)和new Number(42)

看如下代码，思考它们的执行结果:
```javascript
  var test = 'abc';
  test.len = 123;
  var t = test.len;
```
此处t为`undefined`，第三行是通过新的原始对象访问其`.len`属性，这并不是上次添加的`.len`，上次的已经被销毁，当前是一个新的封装对象.

说了这么多的理论与例子，不如我们从头到尾来整理一下，通过基础类型值访问属性过程中，到底发生了什么。

```javascript
  var s = 'hello world';
  var world = s.toUpperCase();
```
我们就以它为例：
首先javascript会讲字符串值通过`new String(s)的方式转换为封装对象`，这个对象继承了来自字符串构造函数的所有方法(这些操作都从第二行访问方法时开始发生),当前s已经变成了一个`封装对象`,接下来在封装对象中查找需要的方法或属性，找到了之后做出相应的操作.<b>一旦引用结束，这个新创建的对象就会销毁。</b>这时候s.toUpperCase已经运行了该方法，随即销毁封装对象。

### 拆封
想要等到封装对象中基本类型值，我们可以使用valueOf方法获取。
```javascript
    var ss = new String("123");
    ss.valueOf()  //"123"
```
javascipt 在需要用到封装对象中基本类型值时，会发生自动转换，即`隐式强制类型转换`
```javascript
  var t = new String("123");
  t+"";  "123"
```


### 不可变的原始值和可变的对象引用
javascript原始值(undefined null 字符串 数字 布尔)是`不可修改的`，而对象是可以被`引用和修改的`.讲值类型那章时我们说过JavaScript变量没有所谓的类型而言，衡量类型的是值，即`值类型`,在原始值上，我们无法更改，任何方法都无法更改一个原始值，这对于数字本身就说不通，怎么更改数字本身呢？但是对于字符串来说，`看似有点说得通`因为它像是通过字符组成的数组，我们可以期望通过指定的索引来修改其字符元素，但javascript并不允许这么做。字符串方法看上去返回了修改后的值，其实返回的是一个新字符串，与之前的没有任何关系.

## 强制类型转换
> 封装对象与类型转换有很大关联，我们只有弄懂封装对象的概念，才能更好的理解类型转换，还有之后的相等比较与恒等比较。

### 值类型转换
```javascript
  var num = 123;
  //1
  num.toString(); // "123"

  //2
  num + ""; //"123"
```
上面两种方式，第一种我们称为`显示强制类型转换`.第二种称之为`隐式强制类型转换`。类型转换总是返回`基本类型值`，不会返回对象类型,

第一个，num.toString()时，把num常量通过内部[[class]]生成临时的封装对象，再调用对象toString方法，返回转换完成的字符串.

第二个，由于＋运算符的其中一个操作数是字符串，所以是字符串拼接操作，结果是数字123被转换成“123”。

介绍强制与隐式类型转换时，我们需要掌握对字符串数字和布尔类型的转换规则。

 - #### toString
    基本类型的转换规则为，undefined -> “undefined”, null->"null",true->"true",数字则使用通用规则，如果有极大或极小的值则使用指数形式.
    
    ```javascript
      var num = 1.37 * 1000 * 1000 * 1000 * 1000 * 1000 * 1000 * 1000
      num.toString() //"1.37e+21"
    ```
    
    普通对象除非自定义，否则它会返回对象内部的[[Class]]属性.
    ```javascript
      var obj = {};
      obj.toString() //"[object Object]"
    ```
    
    数组的toStirng有些特殊，它是通过"，"连接的字符串.
    ```javascript
      var arr = [1,2,3,4];
      arr.toString();  // "1,2,3,4"
    ```
   
> 这里捎带讲一下json字符串化.
JSON.stringify在将JSON对象序列化为字符串时也使用了toString方法,但需要注意的是JSON.stringify并非严格意义上的强制类型转换，只是涉及toString的相关规则.

```javascript
  var num = 123;
  var str = “123”; 
  JSON.stringify(num) //“123”
  JSON.stringify(str) // “”123”” //两个引号
```
所有安全的JSON值都可以使用JSON.stringify序列化，那么， 何为不安全的值？例如: undefined,function,Symbol(es6新增),如果JSON中出现这些值，序列化时不能把它们识别，就把他们变成了null。
```javascript
JSON.stringify([1,undefined,function(){}]) //"[1,null,null]"
```
> 如果对象定义了toJSON方法，会先调用此方法，然后用它的返回值来进行序列化。
```javascript
  var obj = {name:"Jack"}
  obj.toJSON = function(){ return {name:”Join"} }
  
  JSON.stringify(obj)   // “{“name”:”Join"}"
```
在序列化之前，会先调用对象的toJSON方法，以它的返回值来进行序列化.默认对象是没有此属性的，如果有需要可以手动添加。

toJSON返回的不是一个经过JSON字符串化后的值，它应该是一个`适当`的值，也就是没有经过任何处理的值.当然，它应该被返回一个可以被JSON化的值.
```javascript
var ob = {
  val : [1,2,3],
  toJSON : function(){
    return this.val.slice(2)
  }
 }

  var obj = {
    val : [1,2,3],
   toJSON:  function(){ 
     return this.val.slice(1).join()
    }
  }
JSON.stringify(ob)  //“[2,3]"
 JSON.stringify(obj) //“”2,3”” 双引号
```
>以上我们讲JSON字符串化完全是toString捎带出来的，它和toString很相似，但是却还有些不同。既然上面已经讲了些，我们不妨再来看看它的几个参数.

很多开发者在使用JSON字符串化时候，只使用了第一个参数，其实它是有三个参数的。

我们先来看第一个参数和第二参数.
```javascript
  var obj = { 
   a:42,
   b:”42",
   c:[1,2,3]
  }

  JSON.stringify(obj,function(k,v){ 
	if(k !== "c" ) return v
  })
```
第一个参数不用多介绍了吧，主要是第二个参数，它有两个参数，和map的参数正好相反，也有filter方法的那点意思，在JSON字符串化中指定哪些属性应该被处理.

等等，这里有个小细节，以上第二个回调参数实际上比我预想的多执行了一次，假设以上为例，三个属性，它第一次为undefined，第二次才是属性a。这是为什么呢？因为它在处理时，obj也计入其中了。

第三个参数是缩进的字符，如果它是一个数字，就代表缩进多少空格符。如果是字符串，则固定以它为缩进符号。
```javascript
 var obj = {
   a:42,
   b:”42”,
   c:[1,2,3] 
  }

 JSON.stringify(obj,function(k,v){
   if(k !==“c”) return v
},”---")
//"{
//----"a": 42,
//----"b": "42”
//}"
```
<b>在编辑代码时，由于编辑器原因，引号的格式很不好把握，所以大家在复制代码运行时可能会出错，需检查引号是否为中文格式.</b>

 - #### ToNumber
> 有时候我们需要将非数字类型当做数字来使用，比如说数字运算

其中true转1，false转换为，null转换为0，undefined转换为NaN
toNumber时如不能转换为数字类型就会返回NaN,它对以0开头的数字并不是以16进制来处理，而是10进制

```javascript
var str = “123”;
str - 0;   //123
Number(str)  //123
```
字符串转为number很简单，这里不做介绍。让我们来看一下`复合类型是如何转换为Number类型的`.
认真读下面这句话:
<b>
为了将值转化为基本类型值，抽象操作ToPrimite(参见ES5规范9.1节)会首先(通过内部操作DefaultValue)检查该值是否具有valueOf()方法,如果有就返回基本类型值，并使用该值进行`强制类型转换`,如果没有就使用toString()的返回值来进行强制转换.
</b>
``如果valueOf()和toString()均不返回基本类型值，则会产生TypeError错误`
```javascript
  var obj = {
   valueOf:function(){ return "42" }
  }

  var obj_1 = {
     toString:function(){ return "42" }      
  }

  var arr = [1,2,3]
  arr.toString = function(){ return this.join(“") } //“123"

 Number(obj)  //42
 Number(obj_1) //42
 Number(arr) // 123
```

- #### ToBoolean

> 关于布尔值，我们存在许多误解和困惑，需要我们特别注意.
javascript中有两个关键词true和false，分别代表布尔类型中的真和假，我们常误认以为数值1和0分别等同于true和false，在有些语言中可能是这样，但在javascript中布尔值和数字时不一样的，虽然我们可以将1强制类型转换为true，将0强制转换为false，反之亦然，但他们并不是一回事.

我们可以把他们分为`两类`
(1) 可以被强制转换为false的值
(2) 其他(被强制类型转换为true的值)

<b> 假值 </b>
JavaScript规范具体定义了一小撮可以被强制类型转换为false的值。
以下是一些假值:
undefined
null
false
+0 -0 和 NaN
“”
假值的布尔强制类型转换结果为false.

虽然javascript规范没有明确指出除了假值以外都是真值，但我们可以暂时理解为`假值以外的值都是真值`。

>假值对象不是假值

```javascript
  var  bool = new Boolean(false);
  var number = new Number(0);
  var string = new String(“0”);
```
这些都是假值`封装后的对象`，让我们来用复合条件来判断一下.

```javascript
  var a = new Boolean( bool && number && string ); 
  a   //true
```
我们都知道web端的javascript依赖两个环境，javascript语言引擎，与宿主环境，宿主环境包括 DOM BOM，我们为什么提及它们呢？
因为document里面有一个类数组对象它会被转换为false，它包含了页面中所有的元素。

```javascript
  var dom = document.all;
  Boolean( dom )  //false
```
<b> 真值 </b>

```javascript
 var a = “false”
 var b = “0”
 var c = “‘'"
 Boolean( a && b && c ) // true
```
上例的字符串看似假值，但所有字符串都是真值，不过””除外,因为它是假值列表中的唯一字符串.
真值列表可以无限长，无法一一列举，所以我们以假值作为参考。

真值有很多，可以无限延长，[],function,{} 都是真值。大家可以用一点时间去控制台上练习。
