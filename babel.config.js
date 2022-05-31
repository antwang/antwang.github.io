/*
 * @Author: ant
 * @Date: 2022-05-25 22:40:23
 * @LastEditTime: 2022-05-31 10:53:55
 * @LastEditors: ant
 * @Description: 
 */
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    [
      'import',
      {
        'libraryName': 'vant',
        'libraryDirectory': 'es',
        'style': true
      }
    ]
  ]
}
