# webSocketSSH
一个可以通过nginx反代解决简单web攻防端口使用过多的项目

通常在简单攻防加固中会开放两个端口。

ssh-22

web-80（一般靶场不会采用443）

这时候就像我这样（钱包不太富裕的人）就会产生一个问题：端口占用太多了。

本项目旨在为解决想开设awd靶场，但是想尽可能使用较少端口的人提供一个解决方案

该项目仅为后端，前端可以通过xterm适配

目前仅支持通过websocket反向代理（如nginx等）


为节省时间可参考文档:https://www.tianguyin.com/archives/websocketsshlian-jie-shi-yong-shuo-ming

加速地址:https://blog.tiangucloud.org/archives/websocketsshlian-jie-shi-yong-shuo-ming
