/*
 * @Author: ant
 * @Date: 2022-05-25 22:40:23
 * @LastEditTime: 2022-05-26 17:06:33
 * @LastEditors: ant
 * @Description: 
 */
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  pwa: {
    workboxPluginMode: "InjectManifest",
    workboxOptions: {
      swSrc: "./src/sw.js"
    }
  }
})
