// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential', 
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // 全局变量
  globals: { 
    "JSMpeg":false,
    "Video":false,
    "mediaMgr":false,
    "envConfig": false,
    "config": false,
    "Toast": false,
    "$":false,
    "WeixinJSBridge":false,
    "addressInfo":false,
    "goSharePage":false,
    "taskInfo":false,
  },
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 允许非全等
    'eqeqeq': 'off',
    // 不限制分号
    'semi': 'off',
    // 一个tab等于4个空格
    'indent': ['warn', 4]
  }
}
