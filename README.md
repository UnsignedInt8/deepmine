安装最新版的nodejs，clone 之后，进入代码目录，输入下面命令

```
npm install
npm start
```

打开浏览器console窗口，会打印少量信息，最后一个数字就是从webgl拿到结果所花的时间。

sha256所输出的32字节结果里，我只取了前2字节和最后2字节做为输出

你可以在浏览器窗口左边中间偏上的位置看到一个非常浅蓝色的10像素色块，最好使用inspector定位到canvas，再仔细观察

没做代码清理，核心代码是 core/WebGLCore.ts crypto/SHA256.ts public/shaders/fragments/sha256.glsl

如果你对WebGL非常熟悉，也对挖矿感兴趣，欢迎联系我Telegram(直接搜索我ID就行)