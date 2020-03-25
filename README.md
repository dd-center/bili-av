<div align="center">
  <h1><a href="https://av.bilisc.com/" target="_blank">AV/BV 号互转小工具</a></h1>

  <p style="font-size: 20px;">顺便探索一下静态页面一份代码全平台构建的可能性（</p>

</div>

![Screenshot](https://github.com/dd-center/bili-av/raw/master/docs/Screenshot_v1.0.2.png)

核心算法在：[converter.js](https://github.com/dd-center/bili-av/blob/master/utils/converter.js)

也可左转 [知乎回答](https://www.zhihu.com/question/381784377/answer/1100446631)

附上知乎大佬写的 [原 Python 版](https://www.zhihu.com/question/381784377/answer/1099438784)

静态站已经部署了：<https://av.bilisc.com>

网站里面也有 Electron 版的下载地址。

## Development & Other

Docker 部署：参见 [CI](https://github.com/dd-center/bili-av/actions?query=workflow%3A%22Website+Build%22)

静态站部署：`npm run website:generate`

Electron 部署：参见 [CI](https://github.com/dd-center/bili-av/actions?query=workflow%3A%22Shell+Build%22)

（UniApp 移植在做了（逃
