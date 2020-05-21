---
date: '2020-05-15'
slug: 破解google语音合成接口
tags:
- computer
title:  破解google语音合成接口
author: Oliver
location: Beijing;
image: https://cdn.pixabay.com/photo/2015/01/20/13/13/ipad-605440_960_720.jpg
meta:
  - name: title
    content: 破解google语音合成接口
  - name: description
    content: 语音合成，生成语音，单词转语音，如何通过文字转换成语音？
  - name: keywords
    content: 语音合成，生成语音，单词转语音
  - name: author
    content: Oliver Liu
  - name: language
    content: Chinese
featured: true
---

因为个人的一些需求，需要每天把造出来的句子(通过认识新单词，写一些句子)，转变成语音，方便熟悉前段时间的单词。
其中不仅是句子，也有作为，所以我一直在寻找较好的，符合英语发音标准的语音合成接口。

很久之前，我做了一个 word_pronunciation 的项目，旨在拉取有道的单词本中的内容，以一个单词一个例句的方式，
合成一个语音片段朗读出来，例句也会有兼顾中英文的选项。

那时单独用了百度的免费体验版的语音合成接口，但效果并不理想，一些英文朗诵出来还是硬邦邦的。怀着遗憾，我发现Google Translation 
中的发音非常的不错。而且还可选择语言的口音(英式|美式)进行合成，实在是贴心。

然而，Google并没有那么轻松让第三方破解他的接口并使用，尽管GoogleTranslation也是免费的，
但它的目的是训练NLP模型，通过机器学习加强翻译语料库，完善基础设施。如果直接用语音合成的接口，其实
对它没有什么价值，自然要通过加密防止第三方滥用。

加密的方法，也不算是特别严格，其实是客户端和服务端互相约定一段字符串，通过相同的一种算法加密这段字符串和**我们要合成语音的文字**，可以得出
一段十进制序列，然后就可以依据这个参数来判断是否是Google Translation的客户端发送出来的。

为什么说不是特别严格的加密方式？因为任何保存在客户端的代码都是不安全的，客户端是一个GUI，不能作为逻辑和安全的主导层，
当然呢，连我这种小渣渣都知道的事情，Google不可能不知道。它也是为了方便，简单所以也没有做那么复杂，
本身这个接口就是对世界开放的，这点钱它也是花得起。

所以我找到了隐藏在它客户端中js代码，是用来做加密处理的，如下：

```javascript
  function shiftLeftOrRightThenSumOrXor(num, opArray) {
    return opArray.reduce((acc, opString) => {
      let op1 = opString[1]; //    '+' | '-' ~ SUM | XOR
      let op2 = opString[0]; //    '+' | '^' ~ SLL | SRL
      let xd = opString[2]; //    [0-9a-f]
      let shiftAmount = hexCharAsNumber(xd);
      let mask = op1 == "+" ? acc >>> shiftAmount : acc << shiftAmount;
      return op2 == "+" ? (acc + mask) & 0xffffffff : acc ^ mask;
    }, num);
  }
  function hexCharAsNumber(xd) {
    return xd >= "a" ? xd.charCodeAt(0) - 87 : Number(xd);
  }
  function transformQuery(query) {
    for (var e = [], f = 0, g = 0; g < query.length; g++) {
      let l = query.charCodeAt(g);
      if (l < 128) {
        e[f++] = l; //    0{l[6-0]}
      } else if (l < 2048) {
        e[f++] = (l >> 6) | 0xc0; //    110{l[10-6]}
        e[f++] = (l & 0x3f) | 0x80; //    10{l[5-0]}
      } else if (
        0xd800 == (l & 0xfc00) &&
        g + 1 < query.length &&
        0xdc00 == (query.charCodeAt(g + 1) & 0xfc00)
      ) {
        //    that's pretty rare... (avoid ovf?)
        l = (1 << 16) + ((l & 0x03ff) << 10) + (query.charCodeAt(++g) & 0x03ff);
        e[f++] = (l >> 18) | 0xf0; //    111100{l[9-8*]}
        e[f++] = ((l >> 12) & 0x3f) | 0x80; //    10{l[7*-2]}
        e[f++] = (l & 0x3f) | 0x80; //    10{(l+1)[5-0]}
      } else {
        e[f++] = (l >> 12) | 0xe0; //    1110{l[15-12]}
        e[f++] = ((l >> 6) & 0x3f) | 0x80; //    10{l[11-6]}
        e[f++] = (l & 0x3f) | 0x80; //    10{l[5-0]}
      }
    }
    return e;
  }
  function normalizeHash(encondindRound2) {
    if (encondindRound2 < 0) {
      encondindRound2 = (encondindRound2 & 0x7fffffff) + 0x80000000;
    }
    return encondindRound2 % 1e6;
  }
  function calcHash(query, windowTkk) {
    //    STEP 1: spread the the query char codes on a byte-array, 1-3 bytes per char
    let bytesArray = transformQuery(query);
    //    STEP 2: starting with TKK index, add the array from last step one-by-one, and do 2 rounds of shift+add/xor
    let d = windowTkk.split(".");
    let tkkIndex = Number(d[0]) || 0;
    let tkkKey = Number(d[1]) || 0;
    let encondingRound1 = bytesArray.reduce((acc, current) => {
      acc += current;
      return shiftLeftOrRightThenSumOrXor(acc, ["+-a", "^+6"]);
    }, tkkIndex);
    //    STEP 3: apply 3 rounds of shift+add/xor and XOR with they TKK key
    let encondingRound2 =
      shiftLeftOrRightThenSumOrXor(encondingRound1, ["+-3", "^+b", "+-f"]) ^
      tkkKey;
    //    STEP 4: Normalize to 2s complement & format
    let normalizedResult = normalizeHash(encondingRound2);
    return normalizedResult.toString() + "." + (normalizedResult ^ tkkIndex);
  }
```

这个calcHash就是加密入口，第一个参数是需要合成的文字，第二个其实是一个常量，就是互相约定的一个字符串。
所以，有了这个，我们就可以开心的使用google语音合成的功能啦。

后期我会把这个项目开源到github上，敬请期待！！！
