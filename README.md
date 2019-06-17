这是一个简单的 vue-cli 配置项目，结合了 ts 和 iview 进行 demo 练习。
目前的实现为：

1. 使用 glob 模块做多页面的配置
2. 配置了别名
3. 增加了 url-loader，图片超过 80k 就转成 base64 编码
4. 增加了 style-resources-loader，每个组件增加 config.less 的配置
5. 给单页面增加路由配置

其他发现的问题总结可以在https://matonna.github.io/看到
### 安装项目依赖

```
npm install
```

### 启动项目

```
npm run serve
```

### 打包项目

```
npm run build
```
