// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  // https://github.com/standard/standard/blob/master/docs/RULES-en.md
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // "off" 或者 0：关闭规则。
  // "warn" 或者 1：打开规则，并且作为一个警告（不影响exit code）。
  // "error" 或者 2：打开规则，并且作为一个错误（exit code将会是1）。
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    "semi": ['off', "always"], //语句强制分号结尾
    // "indent": ["warn", 2],
    "quotes": ["off", "single"],
    'one-var': 0, // 强制函数中的变量要么一起声明要么分开声明
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'space-before-function-paren': [0, "always"]
      // 'func-call-spacing': 'off'
  }
}