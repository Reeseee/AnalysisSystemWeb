# codeanalysis

> A system to analyze java source code

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## 项目目录

- `node_modules`：用于存放我们项目的各种依赖；
- `src`：开发目录
- `package.json`：模块基本信息项目开发所需要的模块，版本，项目名称。
- `package-lock.json`：是在 npm install 时候生成的一份文件，用于记录当前状态下实际安装的各个 npm package 的具体来源和版本号。

> src目录

- `src/assets`：用于存放着各种静态文件（可能会变动），比如图片。
- `src/components`：存放公共组件（可复用），比如 header.vue、footer.vue等。
- `src/network`：存放api请求。
  1. `request.js` 文件：封装了请求的基本参数，其他请求在此基础上实现。
- `src/router/index.js`：vue-router 路由文件。
  1. 需要引入 `src/views` 文件夹下的 .vue，配置 path、name、component。

- `src/store/index.js`：vuex状态管理库,全局挂载一些变量,如登陆状态。


- `src/views`：存放页面组件

  1. `CodeAnalyze` 目录：结构分析模块的页面
  2. `ReverseEngineering` 目录： 逆向工程模块页面
  3. `Login.vue` : 登录页面

- `src/App.vue`：App.vue 是项目的主组件；

  1. `App.vue` 中使用 router-link 或router-view或其他方式引入其他模块，所有的页面都是在 App.vue 下切换。

- `src/main.js`：入口文件，主要作用是初始化 vue 实例，同时可以在此文件中引用某些组件库.


