# AV/BV 号互转小工具

核心算法在：[converter.js](https://github.com/dd-center/bili-av/blob/master/utils/converter.js)

也可左转 [知乎回答](https://www.zhihu.com/question/381784377/answer/1100446631)

附上知乎大佬写的 [原 Python 版](https://www.zhihu.com/question/381784377/answer/1099438784)

静态站已经部署了：<https://av.bilisc.com>

网站里面也有 Electron 版的下载地址。

## Development & Other

这个 repo 同时可以作为静态站多端共享一份代码的好栗子~

Docker 部署：参见 [CI](https://github.com/dd-center/bili-av/actions?query=workflow%3A%22Website+Build%22)

静态站部署：`npm run website:generate`

Electron 部署：参见 [CI](https://github.com/dd-center/bili-av/actions?query=workflow%3A%22Shell+Build%22)

（UniApp 移植在做了（逃
