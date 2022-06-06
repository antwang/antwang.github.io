/*
 * @Author: ant
 * @Date: 2022-05-25 22:40:23
 * @LastEditTime: 2022-06-06 14:16:12
 * @LastEditors: ant
 * @Description: 
 */

import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'

import VConsole from 'vconsole';

createApp(App).mount('#app')

// or init with options
new VConsole({ theme: 'dark' });