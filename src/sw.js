/*
 * @Author: ant
 * @Date: 2022-05-26 17:05:16
 * @LastEditTime: 2022-05-29 22:54:54
 * @LastEditors: ant
 * @Description: 
 */
import { precacheAndRoute } from 'workbox-precaching';

precacheAndRoute(self.__WB_MANIFEST);
console.log('注册成功');
// 监听通知点击事件
self.addEventListener('notificationclick',  (e) => {
    // 关闭通知
    e.notification.close()

    if (e.action === 'like') {
        // 点击了“点赞”按钮
        console.log('点击了点赞按钮')
    } else {
        // 点击了对话框的其他部分
        console.log('点击了对话框')
        e.waitUntil(self.clients.openWindow(e.notification.data.url))
    }
})

let msg = {
    title: "消息标题",
    body: {
        body: '点赞按钮可点击',
        icon: '/img/icons/android-chrome-192x192.png',
        image: "https://tenfei01.cfp.cn/creative/vcg/800/version23/VCG21154786fd8.jpg",
        vibrate: [200, 100, 200, 100, 200, 100, 200],
        data: {
            url: "https://tenfei01.cfp.cn/creative/vcg/800/version23/VCG21154786fd8.jpg",
            desc: "我是城市风景照"
        },
        actions: [
            {
                action: 'like',
                title: '点赞',
                icon: '/img/icons/apple-touch-icon.png'
            }
        ]
    }
}
// 向用户展示消息弹窗
self.registration.showNotification(msg.title, msg.body).then(() => {
    console.log("消息正常弹出")

}).catch(e => {
    console.log("消息未获许可", e)
})