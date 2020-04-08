---
date: '2020-04-01'
slug: all-about-emoji
tags:
- web
- mobile
title: All about emoji
author: Oliver Liu
location: Beijing;
image: https://cdn.pixabay.com/photo/2020/03/31/11/59/sunrise-4987384_960_720.jpg
meta:
  - name: title
    content: All about emoji.
  - name: description
    content: All about emoji.
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

### Image

### SVG

### Font

## Conclusion
