# byvue

## 运行步骤

``` bash
# 首次拉代码，或者拉代码时package.json,package-lock.json有变动，需要执行一遍安装所有package-lock.json中指定的依赖
npm install

# 使用shell脚本替代npm的dev和build脚本
# 开发环境实时预览 例如 sh dev.sh 201808/invite
sh dev.sh page-path

# 打包 例如 sh build.sh 201808/invite
sh build.sh page-path

# 打包并分析代码size build for production and view the bundle analyzer report
# npm run build --report
sh build.sh page-path report

# eslint检查代码是否规范 并提示警告位置和原因 -fix参数会自动解决空格等部分书写规范问题 注意：校验不通过不能执行 git commit
npm run lint
npm run lint-fix
```

## 目录说明

``` js
├── README.md
├── build // webpack 配置相关（忽略）
│   ├── ...
│   └── webpack.prod.conf.js
├── build.sh // 打包脚本
├── commit.sh // commit脚本，会先做eslint fix（忽略）
├── config // webpack 配置相关（忽略）
│   ├── ...
│   └── test.env.js
├── dev.sh // 开发环境运行脚本
├── dist // 打包后文件输出的目录 也是上线后访问的目录
│   ├── 201808
│   └── 201809
├── package-lock.json // npm依赖记录（忽略）
├── package.json // npm配置信息（忽略）
├── rsync.sh // 方便开发时快速部署
├── src // 源码
│   ├── api // 接口层 所有接口在这里封装成方法供页面使用
│   ├── assets // 资源 公共样式等
│   ├── components // 公共组件
│   ├── pages // 页面 日期/文件名创建
│   └── utils // 公共方法
│       ├── README.md
│       ├── ajax.js // 使用自己封装的ajax请求
│       ├── rem.js // 使用rem布局
│       ├── request.js // 再封装一层ajax，拦截并发
│       ├── hooks // 与客户端定义的方法
│       │   ├── ...
│       │   ├── makephonecall.js
│       │   └── torecharge.js
│       ├── weixin // 微信相关的方法
│       │   ├── ...
│       │   ├── wxconfig.js
│       │   └── wxshare.js // 拆分更细的二次分享方法
│       └── wxshare.js // 废弃的二次分享方法
├── static // 静态资源 不会被打包
│   ├── README.md
│   ├── config
│   │   ├── 201809 // 页面独立的配置（根据需求决定要不要提取配置）
│   │   │   ├── ...
│   │   │   └── workershare.js
│   │   ├── dev.js // 开发环境的配置 每个人根据自己需求配置 已被git忽略
│   │   └── index.js // 全局配置 所有页面都会引
│   ├── images
│   │   ├── 201808 // 页面用到的图片
│   │   │   └── inviteshare
│   │   ├── icons // 公共icon
│   │   │   ├── ...
│   │   │   └── wxtimeline.png
│   │   └── public // 公共图片
│   └── style // 全局css
│       ├── normalize.min.css
│       └── rem.css
├── templete.html // 模板（忽略）
└── test // 测试用例（忽略）
    └── unit
```

## 相关文档

[vue2.x](https://cn.vuejs.org/v2/api/)  
[vuex](https://vuex.vuejs.org/zh/guide/)  
[vue-router](https://router.vuejs.org/zh/)  
[mintui](http://mint-ui.github.io/#!/zh-cn)  
[weixin-js-sdk](https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141115)  
[guide](http://vuejs-templates.github.io/webpack/)  
[docs for vue-loader](http://vuejs.github.io/vue-loader)  

## 使用rsync简化调试步骤

``` bash
# 运行方法 例如 sh rsync.sh demo dist 用本地的dist目录覆盖demo服务器dist目录
# 覆盖有一个后遗症，因为是局部覆盖，服务器上的git会发现大量更新，调试完后注意处理
# sh rsync.sh demo|test dist|static

# rsync.sh中每台机器公钥位置不同，因此被忽略，需要参考下面手动添加上脚本，并取得服务器授权（vi ~/.ssh/authorized_keys）

# if [ ! $1 ]; then
#     echo 'ENV not found'
#     exit
# fi

# if [ ! $2 ]; then
#     echo 'Dir not found'
#     exit
# fi

# cd $2
# pwd
# if [ "$1" = "test" ]
# then
#     echo 'send' $2 'to test...'
#     rsync -avze 'ssh -i /Users/haotang/.ssh/id_rsa -p 21206' . root@192.168.0.252:/home/jitai/static/content/html5/byvue/$2
# elif [ "$1" = "demo" ] 
# then
#     echo 'send' $2 'to demo...'
#     rsync -avze 'ssh -i /Users/haotang/.ssh/id_rsa -p 21206' . root@123.57.27.156:/home/jitai/static/content/html5/byvue/$2
# elif [ "$1" = "prod" ] 
# then
#     echo 'send' $2 'to prod...'
#     rsync -avze 'ssh -i /Users/haotang/.ssh/id_rsa -p 21206' . root@47.95.33.95:/home/jitai/static/content/html5/byvue/$2
# else
#     echo 'WRAN: ENV wrong, to use rsync.sh you should run: sh build.sh page-path test|demo|prod or sh rsync.sh test|demo|prod'
# fi
# cd -
```

## 使用dev.js解决本地开发时跨域

新建 static/config/dev.js  
放入下面的参考代码   

``` js
// 252
// 请求域名头 和 跨域代理域名头
// envConfig.requestDomain = 'http://192.168.0.252'
// envConfig.requestDomain = '/test'

// demo
// // 请求域名头 和 跨域代理域名头
envConfig.requestDomain = 'http://demo1.cwjia.cn'
// envConfig.requestDomain = '/demo'

// prod
// // 请求域名头 和 跨域代理域名头
// envConfig.requestDomain = 'https://api.ichongwujia.com'
// envConfig.requestDomain = '/prod'
```
