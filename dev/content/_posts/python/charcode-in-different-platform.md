---
date: '2019-10-14'
slug: Python ***
tags:
- python
- unicode
title: The perform of python's unicode problem on different computer
description: The perform of python's unicode problem on different computer
author: Oliver
location: Beijing;
image: https://cdn.pixabay.com/photo/2020/07/05/12/53/rainbow-5372892_960_720.jpg
meta:
  - name: title
    content: The perform of python's unicode problem on different computer
  - name: description
    content: The perform of python's unicode problem on different computer
  - name: keywords
    content: Unicode, ASCII, Python2, Python3, messy code, unreadable code.
  - name: author
    content: 刘彤, Oliver
  - name: language
    content: English
featured: true
---


## Basic knowledge
Before avoid some problems we should know the period of encoding from input into output.
### Abstract Character Repertoire(Abstract Character for short)
It is a character set that **system support**, the set can be closed and open, it belong to computer's system and it will update the character set with the system's upgrade if 
it is open. For example, the series of ASCII, ISO/IEC character set all is closed, which means they will never update the character set and for the opened Unicode character set 


### Coded Character Set
### Universal Character Set
### Character Encoding Form
### Character Encoding Schema(Also called: Serialization Format)
> Unicode encoding scheme: A specified byte serialization for a Unicode encodingform, including the specification of the handling of a byte order mark (BOM), ifallowed.

## Confused between <string> and <unicode>

## Where always happened the encoding problems?

- Interpreter of python.
- The file format of source code.
- Terminal code format if you use terminal to input the code.
- The system default coding, it could be affected by the local language of the computer.

## What differences between Python2.* and python3.*?

## 
