/*
 * @Author: ant
 * @Date: 2022-05-25 22:40:23
 * @LastEditTime: 2022-05-31 21:17:42
 * @LastEditors: ant
 * @Description: 
 */
/* eslint-disable no-console */

import { register } from 'register-service-worker'
import  { subscribeAndDistribute } from './common'
if (process.env.NODE_ENV === 'production') {
  register(`${process.env.BASE_URL}sw.js`, {
    ready() {
      console.log(
        'App is being served from cache by a service worker.\n' +
        'For more details, visit https://goo.gl/AFskqB'
      )
    },
    async registered() {
      console.log('Service worker has been registered.')
      let registration = await navigator.serviceWorker.getRegistration();
      subscribeAndDistribute(registration);
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