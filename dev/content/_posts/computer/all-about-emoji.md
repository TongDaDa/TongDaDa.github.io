---
date: '2020-04-01'
slug: all-about-in-emoji
tags:
- web
title: All about in emoji
author: Oliver Liu
location: Beijing;
image: https://cdn.pixabay.com/photo/2020/03/31/11/59/sunrise-4987384_960_720.jpg
meta:
  - name: title
    content: All about in emoji.
  - name: description
    content: All about in emoji.
  - name: keywords
    content: emoji, emoji in web, how to display a emoji, the format of emoji.
  - name: author
    content: 刘彤, Oliver Liu, TongTong, LiuTong
  - name: language
    content: English
featured: false
---

## Foreword

---

I was used the native char to represent the emoji in browser, but today I found a problem that it does not be supported by some computers,
most cases in Win7, XP. So a question emerge on my mind, why it doesn't show?

We knew The charset is preserved in the disk by our system, and charset is a set that includes many chars, which one is mapping by a `glyph`,
it is very important for wherever it shows a font on our computer. And

if you have a little obscure for the above text, you could need to read some document about the `Unicode encoding` and `glyph` on Wiki.

## Why some computer cannot display a emoji using Unicode?

--- 

We know, using Unicode display a emoji means a char you inputted. Sometimes these emojis appear as a empty box or some 
other neutral symbols. This situation was unsupported for emojis.

The emoji represent a unicode, and a unicode was reflected by a `glyph` which could not support on some computer system. 

So we could not sure our user's system's version. The browser, it just as a agent and software on the system, and it just inherited the `glyph` 
unless you import the font styles.(but most of font file we used doesn't include the emoji style)

Yeah, we need to make a compatibility for the `old versions` system, like we do it as `IE` compatibility problems.

Below, is my researched some solutions for it.

## Solutions

----

### Image 🚀

We can use an image to represent these emojis.(Sprite)
 
Advantages

- **Highest compatibility**, it support all systems and browsers which can display a image.
- Tiny size, just need about **2.4M** to showing **877 emojis**.

Disadvantages

- It is a **bitmap image** which will lost clarity.
- Just static image, does **not support animations** for a emoji.

**I have finished this solution and you can visit it on [github](https://github.com/TongDaDa/easy-emoji)
or [npm](https://www.npmjs.com/package/easy-emoji)**

### SVG 😠

Showing emoji using SVG have a higher experience. it would more flexible and customizable,
but the difficult thing is the svg resources which we cannot get lots of. 😭

Advantages

- Vector texture, we can adjust its size optionally，yet remain its clarity.
- It support dynamic animations for the emoji, just like the effects of `Facebook`.

Disadvantages
- If you want to support the emojis's amount as the same as `Img solution`, its costs are so high.
- Its 

