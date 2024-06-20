---
date: '2016-10-14'
slug: JS中如何准确判断数据类型
tags:
- javascript
title: JS中如何准确判断数据类型
author: Oliver
location: Beijing;
image: https://cdn.pixabay.com/photo/2016/11/19/14/00/code-1839406_960_720.jpg
meta:
  - name: title
    content: The perform of python's unicode problem on different computer
  - name: description
    content: The perform of python's unicode problem on different computer
  - name: keywords
    content: Javascript, Lerna, monorepo, project-management.
  - name: author
    content: 刘彤, aflyingpig, Oliver Liu.
  - name: language
    content: Chinese
featured: false
---

在我的第一篇文章里，介绍过JS各大类型并使用typeof进行输出查看.也有提到过每个函数都有一个自己的内部属性[[class]]，这个class指的是js内部分类.这个类的大致包括：`数据类型`和`构造函数`这两种。
 
<a href="https://segmentfault.com/a/1190000008740554">JavaScript类型介绍 </a> 
 
>我们讲过JS的几大数据类型，也用typeof查看了几个简单的数据类型值。那么今天我们再来更宽泛的了解一下这方面的知识。请看如下代码。
 
 
```
var num = 123;
var str = 'aflypig';
var bool = true;
var arr = [1, 2, 3, 4];
var obj = {name:'aflypig', age:21};
var func = function(){ console.log('this is function'); }
var und = undefined;
var nul = null;
var date = new Date();
var reg = /^[a-zA-Z]{5,20}$/;
var error= new Error(); 
```
显然，上次我们只用typeof查看了几个常用的数据类型，但这次多了一些内置构造函数，还有Array(上次特意没讲Array)类型。那么步入正题，我们怎样才能准确得获得这些`值`(再强调一次，这里不是变量，JS当中衡量类型的是值，变量是储存值的容器)数据类型呢？
 
其实，一共有四种方法，但能完全准确地识别出它们的只有一种方法，这也是面试过程中屡见不鲜的一道题。

## 如果判断不同类型

### typeof
```javascript
   typeof num //number
   typeof str //string
   typeof bool //boolean
   typeof arr //object
   typeof obj //object
   typeof func//function
   typeof und //undefined
   typeof nul //object
   typeof date //object
   typeof reg //object
   typeof error //object
```
解析：typeof可以识别`简单基本类型值`(比如:number,string,boolean)，但对于复合类型(Object,Array,Function)却只能识别Function。
                        undefined和null本身就是JS一直以来的bug，此处typeof `undefined`可以识别出正确的类型值，但null被归类到`Object`大家庭中。
            对于此处的 date && reg && error 类型都是实例后的对象，typeof并不会深入识别他们的`构造函数`(这里不是数据类型)。显然typeof并不能处理这种复杂的类型。
 
总结：typeof可以看作JS内部已经定义好的各个类型返回其对应的字符串，它不深入值本身，不进行类型转换，只针对于当前值返回其对应的类型值。同样的数据类型通过typeof运算符运算都是一样的，它没有原理可言，JS就是这样定义的，我们只管记死它。
 

### instanceof

通过上面的typeof判断，我们知道它并不能满足一些内置构造函数创建的`伪类型`。那么，我们这里来使用 constructor 查看他们的构造函数，从而分辨它们的类型。
 
```javascript
   num instanceof Number  //false
   str instanceof String   //false
   bool instanceof Boolean   //false
   arr instanceof Array  //true
   obj instaneof Object  //true
   func instanceof Function  //true
   und instanceof  Object   //false
   nul instanceof   Object  //false
   date instanceof Date //true
   reg instanceof RegExp //true
   error instanceof Error //true
```
<br />
解析:这里我们使用instanceof来`复合判断`的是否为对应类型。首先，我们先看false项，num str bool 这三个在使用instanceof 时并没有包装封装对象且`instanceof`则是根据
 
 
### Constructor

```javascript
  num.constructor .name    //Numer
  str.constructor.name  //String
  bool.constructor.name  //Boolean
  arr.constructor.name  //Array
  obj.constructor.name  //Objeact
  func.constructor.name  //Function
  und.constructor.name  // TypeError
  nul.constructor.name  //TypeError
  date.constructor.name //Date
  reg.constructor.name // RegExp
  error.constructor.name //Error
```
<br />
上面除了undefined 和 null 类型错误(两者都没有属性值)之外, 其他都可以获得我们想要的数据类型。但实际真的如此吗？
<br />

```javascript
  var Structure =  function (){ }
  var ins = new Structure();
  ins.constructor.name  //Structure 

  var Person = function(){}
  var Student = function(){}
   
  Person.prototype = new Student();
  var obj = new Person();
  obj.constructor === Student
```

解析：第一种情况，对于通过我们的构造函数生成的实例，不能准确得获得其对应得类型名称，这一点恐怕就已经遏制了我们使用这种方式。
                        第二种情况，由于对象的构造函数是`可变的`，`不准确的`，我们还是无法准确的通过constructor获得具体的类型.
            
            
总结：通过constructor我们可以得到 instance不能得到的  str num bool 这些`基本类型值`，但另一个问题又浮现出来，constructor的`可变性`，由于它的不确定性，我们在很多情况下都无法判断出正确的数据类型，所以使用constructor这个方法也差不多废了....
 
 
### [[Class]]
解析：此[[class]]指的是隐藏在javascript内部的分类属性，它不可读，不可枚举，不可修改，不可配置。（两边出现__下划线__的属性都属于部分浏览器支持的属性。[[]]两个中括号括起来的属性属于JavaScript内部属性。），我记得上一章说过，JavaScript中`一切皆为对象`的理念,我们可以强制把它转换成字符串，使它暴露出内部的[[class]]属性。
 
了解了以上各种方法，我们发现它们只能完成部分的类型验证，有些情况是可变和不准确的。
 
```javascript
Object.prototype.toString.call(num);   //  "[object Number]"
Object.prototype.toString.call(str);   //  "[object String]"
Object.prototype.toString.call(bool);  //  "[object Boolean]"
Object.prototype.toString.call(arr);   //  "[object Array]"
Object.prototype.toString.call(func);  //  "[object Function]"
Object.prototype.toString.call(und);   //  "[object Undefined]"
Object.prototype.toString.call(nul);   //  "[object Null]"
Object.prototype.toString.call(date);  //  "[object Date]"
Object.prototype.toString.call(reg);   //  "[object RegExp]"
Object.prototype.toString.call(error);  //  "[object Error]"
 
arr instanceof Array  //true
obj instaneof Object  //true
func instanceof Function  //true
und instanceof  Object   //false
nul instanceof   Object  //false
date instanceof Date //true
reg instanceof RegExp //true
error instanceof Error //true
```
 
我们通过 Object 的 toString 方法来查看了当前对象的`数据类型`，我们看到使用这种方式可以完美的查看对应的数据类型，正是我们想要的，而且每个对象都有属于自己的[[class]]，我们可以理解为，它是JavaScript根据内置构造函数做出的内部分类。
 
对于这种经常使用原生js又难以需求的情况下，怎么能少得了jqquery呢？
 
以下是与jQuery.type()函数相关的jQuery示例代码：
 
```javascript
jQuery.type( undefined ); // "undefined"
jQuery.type( null ); // "null"
 
jQuery.type( true ); // "boolean"
jQuery.type( new Boolean(true) ); // "boolean"
 
jQuery.type( 3 ); // "number"
jQuery.type( new Number(3) ); // "number"
 
jQuery.type( "test" ); // "string"
jQuery.type( new String("test") ); // "string"
 
jQuery.type( function(){} ); // "function"
jQuery.type( new Function() ); // "function"
 
jQuery.type( [] ); // "array"
jQuery.type( new Array() ); // "array"
 
jQuery.type( new Date() ); // "date"
 
jQuery.type( new Error() ); // "error" // jQuery 1.9 新增支持
 
jQuery.type( /test/ ); // "regexp"
jQuery.type( new RegExp("\\d+") ); // "regexp"
```

jquery内部也是通过我们刚才说到的 [[class]]的方式实现的，它返回一个字符串，固定为小写字母。
我们可以写行代码，来简单的实现jquery中的type方法

```javascript
function type(o){
    var s  = Object.prototype.toString.call(o);
    return s.slice(s.indexOf(" ")+1,s.length-1).toLowerCase();
}
```

```javascript
type(false)  //boolean
type({})  //object
type([]) //array
type("")  //string
type(/^/)  //regexp
```
 
希望通过本次粗浅的讲解能给大家带来一点收获，在知道最终有适合的方式时，应该多去考虑使用另外的方式去实现的手段，因为做这样可以扩展自己的知识范围。就比如上文，如果从后向前列举，我想有很多人都不会去思考 constructor 和 instance 的不足以及他们的适用范围吧，
