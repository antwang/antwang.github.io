/*
 * @Author: ant
 * @Date: 2022-05-26 17:05:16
 * @LastEditTime: 2022-05-31 21:10:43
 * @LastEditors: ant
 * @Description: 
 */
import { precacheAndRoute } from 'workbox-precaching';

precacheAndRoute(self.__WB_MANIFEST);

// 监听通知点击事件
self.addEventListener('notificationclick',  (e) => {
    e.notification.close()
    if (e.action === 'detail') {
        console.log('你点击了详情按钮')
        e.waitUntil(self.clients.openWindow(e.notification.data.url))
    } else if(e.action === 'cancel') {
        console.log('你点击了取消按钮')
    } else {
        console.log('你点击了消息弹窗')
    }
})

// 监听 push 事件
self.addEventListener('push', function (e) {
    if (!e.data) {
      return
    }
    // 解析获取推送消息
    let payload = e.data.text()
    // 根据推送消息生成桌面通知并展现出来
    let promise = self.registration.showNotification(payload.title, {
      body: payload.body,
      data: {
        url: payload.url
      }
    })
    e.waitUntil(promise)
  })