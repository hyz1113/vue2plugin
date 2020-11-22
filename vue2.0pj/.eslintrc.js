module.exports = {
  root: true,
  env: {
    "es6": true,
    "node": true,
    "browser": true
  },
  // extends: [], // 添加额外的校验参数
  rules: {
    "no-console": "off",
    "no-debugger": "off"
  },
  parser: "vue-eslint-parser",
  "parserOptions": {
    "sourceType": "module"
  }
}