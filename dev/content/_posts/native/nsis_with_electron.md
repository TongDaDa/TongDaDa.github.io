---
date: '2019-10-14'
slug: communication-between-browser-and-native
tags:
- native
title: How to establish a message channel between browser and native application?
author: Oliver
location: Beijing;
image: https://cdn.pixabay.com/photo/2020/04/06/12/37/daisy-5009532_960_720.jpg
meta:
  - name: title
    content: How to establish a message channel between browser and native application?
  - name: description
    content: How to establish a message channel between browser and native application?
  - name: keywords
    content: How to establish a message channel between browser and native application?
  - name: author
    content: 刘彤
  - name: language
    content: English
featured: false
---

Waiting for writing.

Yes, as for as the title of the article, we want to exchange message with browser and send a message to native applications.

Below is my concluded solution after research many document.

Solutions:
1. Native Message, it required that browser must be installed a plug, and it could has problems about compatibility on some browsers.
2. Open Native App, This solution does not require user to install the plugin anywhere, its working theory is to register a custom scheme
for receiving message that corresponded that scheme message, but it doesn't send message to anywhere, just as a received end.

Literature:
https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Native_messaging
https://groups.google.com/forum/#!msg/nwjs-general/k5uP5qFzXxw/zkcTInXDDgAJ
