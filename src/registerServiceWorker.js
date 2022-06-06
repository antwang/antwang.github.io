/*
 * @Author: ant
 * @Date: 2022-05-25 22:40:23
 * @LastEditTime: 2022-06-06 19:49:39
 * @LastEditors: ant
 * @Description: 
 */
/* eslint-disable no-console */

import { register } from 'register-service-worker'
import {subscribe,} from './utils/notification'
if (process.env.NODE_ENV === 'production') {
  register(`${process.env.BASE_URL}sw.js`, {
    async ready(reg) {
      console.log(
        'App is being served from cache by a service worker.\n' +
        'For more details, visit https://goo.gl/AFskqB'
      )
      // 订阅推送消息
      // subscribeAndDistribute(reg);
      console.log(`registration对象是：`)
      console.log(reg)
      let pushSubscription = await subscribe(reg)
      console.log(`请复制如下pushSubscription对象：`)
      console.log(JSON.stringify(pushSubscription))
      // sendPushSubscription(pushSubscription)
      // todo: 调用接口，将订阅信息发送给业务服务器，待服务端提供
    },
    async registered() {
      console.log('Service worker has been registered.')
    },
    cached() {
      console.log('Content has been cached for offline use.')
    },
    updatefound() {
      console.log('New content is downloading.')
    },
    updated() {
      console.log('New content is available; please refresh.')
    },
    offline() {
      console.log('No internet connection found. App is running in offline mode.')
    },
    error(error) {
      console.error('Error during service worker registration:', error)
    }
  })
}