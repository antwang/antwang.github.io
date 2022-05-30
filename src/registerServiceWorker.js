/*
 * @Author: ant
 * @Date: 2022-05-25 22:40:23
 * @LastEditTime: 2022-05-30 16:54:01
 * @LastEditors: ant
 * @Description: 
 */
/* eslint-disable no-console */

import { register } from 'register-service-worker'
function showNotification() {
  Notification.requestPermission().then(res => {
    console.log(res)
    if (res === 'granted') {
      navigator.serviceWorker.ready.then(registration => {
        registration.showNotification('通知示例', {
          body: '我是桌面通知',
          icon: '/img/icons/android-chrome-192x192.png',
          vibrate: [200, 100, 200, 100, 200, 100, 200],
          tag: 'vibration-sample'
        });
      });
    }
  })
}
if (process.env.NODE_ENV === 'production') {
  register(`${process.env.BASE_URL}sw.js`, {
    ready() {
      console.log(
        'App is being served from cache by a service worker.\n' +
        'For more details, visit https://goo.gl/AFskqB'
      )
      showNotification();
    },
    registered() {
      console.log('Service worker has been registered.')
      showNotification();
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