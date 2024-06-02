---
date: '2020-05-25'
slug: node各个环境变量详解
tags:
- computer
title: node各个环境变量详解
author: Oliver Liu
location: Beijing;
image: https://cdn.pixabay.com/photo/2020/05/21/11/03/lily-of-the-valley-5200245__340.jpg
meta:
  - name: title
    content: node各个环境变量详解
  - name: description
    content: node各个环境变量详解, js, javascript, node
  - name: keywords
    content: node各个环境变量详解, js, javascript, node
  - name: author
    content: 刘彤, Oliver Liu
  - name: language
    content: English
featured: false
---

前段时间在node中fork出来的一个子进程中，此进程中还会spawn出来一些命令，但是死活提示找不到路径，错误如下。

```log
env: node: No such file or directory
```

经过一番调查之后，才发现fork出来的子进程中并没有获取到环境变量，这下才想起来，环境变量在env中，没有传过去。

所以，这里做一个node中各个环境变量的作用的简述.

首先node环境变量和其他语言一样，继承来自系统和当前用户目录下的环境变量设置。但是在node中无法分辨哪些环境变量是系统
继承的，还是node注入的。

## TITLE


## TERM_PROGRAM

当前终端的运行程序，比如在mac上自带的终端，它的值就是 `Apple_Terminal`, 在 Iterm(另一款终端应用) 上
就是`iTerm.app`

## TERM

通常都是Xterm/Xterm256，它表示当前终端协议，这个协议早在windows上被开发和应用，然后从 16 色 一直扩展到 256 色，也就是我们终端中
显示的字体颜色。(256色即2的八次方，也就是一个字节显示一个像素，肉眼已经很难分辨其颜色的差别，现在一些高清显示器上甚至出现了512色)

## SHELL

在MAC中，BASH的可执行程序的地址，也就是 `sh` 的命令。


## TMPDIR

临时目录，这个目录是动态的，仅仅作为存储为临时的文件(短会话)，不可长期存储。

## USER

当前用户下的用户名

## PATH

当前的环境变量，也就是 $PATH


## NODE_PATH

全局安装的node_modules目录
