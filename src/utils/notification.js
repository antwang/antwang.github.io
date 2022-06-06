/*
 * @Author: ant
 * @Date: 2022-05-30 22:54:24
 * @LastEditTime: 2022-06-06 14:26:54
 * @LastEditors: ant
 * @Description: 
 */
import { base64ToUint8Array, uint8ArrayToBase64 } from './common'
// 服务器公钥，正式环境中，改为从服务端接口获取
const VAPIDPublicKey = 'BPAlVBGt3YFzGBTOjrCbNVk5Q-2zkETpExGRO00CmyS3FqLI9LSGZHu4fJhIz0sObXwK88ArqZQdGpv51h3NbZg';
/**
 * @description: 判断是否支持 Notification API
 * @return {Boolean} 
 */
const isNotificationSupported = () => {
    return 'Notification' in window
}
/**
 * @description: 判断是否支持 Push API
 * @return {Boolean} 
 */
const isPushManagerSupported = () => {
    return 'PushManager' in window
}

/**
 * @description: 获取用户授权允许接受消息推送
 * @return {Promise} a promise resolved with permission or rejected with an error
 */
export const askNotificationPermission = async () => {
    if (!isNotificationSupported()) {
        console.log('当前浏览器不支持 notifications.');
        return Promise.reject('当前浏览器不支持 notifications.')
    } else {
        try {
            let permission = await Notification.requestPermission()
            switch (permission) {
                case 'granted':
                    console.log('Notification 已获授权')
                    break
                case 'denied':
                    console.log('Notification 被拒绝')
                    break
                default:
                    console.log('Notification 尚未授权')
            }
            return Promise.resolve(permission)
        } catch (e) {
            return Promise.reject(e)
        }
    }
}
/**
 * @description: 展示通知
 * @param {JSON} msg 一个消息体对象 {title: 'xxx', body: {icon,body,image,...}}
 * @return {*} void
 */
export const displayNotification = async (msg) => {
    let permission = await askNotificationPermission();
    console.log(permission)
    if (permission === 'granted') {
        let registration = await navigator.serviceWorker.getRegistration();
        console.log(registration)
        registration.showNotification(msg.title, msg.body);
    }
}

/**
 * @description: 订阅推送并将订阅结果发送给后端
 * @param {Object} registration 
 * @return {Promise}
 */
export const subscribe = async (registration) => {
    if (!isPushManagerSupported()) {
        return Promise.reject('系统不支持消息推送')
    }
    let pushSubscription = await registration.pushManager.getSubscription();
    if (pushSubscription) {
        return Promise.resolve(pushSubscription)
    } else {
        try {
            pushSubscription = await registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: base64ToUint8Array(VAPIDPublicKey)
            });
            return Promise.resolve(pushSubscription)
        } catch (e) {
            return Promise.reject(e)
        }
    }
}


export const sendPushSubscription = (pushScription)=>{
  return fetch('/api/push/subscribe', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            endpoint: pushScription.endpoint,
            keys: {
                p256dh: uint8ArrayToBase64(pushScription.getKey('p256dh')),
                auth: uint8ArrayToBase64(pushScription.getKey('auth'))
            }
        })
    })
}