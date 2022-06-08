/*
 * @Author: ant
 * @Date: 2022-05-30 22:54:24
 * @LastEditTime: 2022-06-08 23:39:04
 * @LastEditors: ant
 * @Description: 
 */
import { uint8ArrayToBase64 } from './common'
// 服务器公钥，正式环境中，改为从服务端接口获取
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
 * @description: 获取SW注册对象
 * @return {SWRegistration} 
 */
const getSWRegistration = async () => {
    let reg = await navigator.serviceWorker.ready
    console.log(`获取当前active的SWRegistration`, reg)
    return reg
}
/**
 * @description: 向用户发起授权通知
 * @return {Promise} 用户授权结果
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
 * @description: 向用户发起授权通知
 * @return {String} 用户授权结果 granted denied default
 */
export const askPermission = async () => {
    if (!isNotificationSupported()) {
        console.log('当前浏览器不支持 Notification API .');
        return null
    }
    try {
        let permission = await Notification.requestPermission()
        console.log(permission)
        return permission
    } catch (e) {
        console.log(`获取授权失败`, JSON.stringify(e))
        return null
    }
}
/**
 * @description: 展示通知
 * @param {JSON} msg 一个消息体对象 {title: 'xxx', body: {icon,body,image,...}}
 * @return {*} void
 */
export const displayNotification = async (msg) => {
    let permission = await askPermission();
    if (permission === 'granted') {
        let reg = await getSWRegistration()
        reg.showNotification(msg.title, msg.body);
    }
}

/**
 * @description: 获取消息通知用户授权状态
 * @return {String} 
 */
export const getNotificationPermissionState = async () => {
    if (navigator.permissions) {
        try {
            let res = await navigator.permissions.query({ name: 'notifications' })
            return res.state
        } catch (e) {
            console.log(`权限状态获取失败`, JSON.stringify(e))
            return null
        }
    }
    // fallback Notification.permission 会阻塞主线程，频繁调用影响性能
    return Notification.permission
}
/**
 * @description: 获取pushScription对象
 * @return {pushScription}
 */
export const getPushScription = async () => {
    if (!isPushManagerSupported()) {
        console.log('系统不支持PushManager API')
        return
    }
    try {
        let reg = await getSWRegistration()
        let subscription = await reg.pushManager.getSubscription()
        return subscription
    } catch (e) {
        console.log(`获取pushScription失败`, e)
        return null
    }
}

/**
 * @description: 订阅推送消息
 * @param {Object} subscribeOptions 
 * @return {pushSubscription} 
 */
export const subscribe = async (subscribeOptions = { userVisibleOnly: true }) => {
    if (!isPushManagerSupported()) {
        console.log('系统不支持 PushManager API .')
        return null
    }
    try {
        let permission = await askPermission();
        if (permission === 'granted') {
            let reg = await getSWRegistration()
            let subscription = await reg.pushManager.subscribe(subscribeOptions)
            console.log(`订阅成功`, JSON.stringify(subscription))
            return subscription
        }
    } catch (e) {
        console.log(`订阅失败`, JSON.stringify(e))
        return null
    }
}

/**
 * @description: 取消订阅
 * @return {void} 
 */
export const unsubscribe = async (pushSubScription) => {
    if (!isPushManagerSupported()) {
        console.log('系统不支持 PushManager API .')
        return
    }
    try {
        let res = await pushSubScription.unsubscribe()
        res?console.log(`订阅取消成功`): console.log(`订阅取消失败`)
        return res
    } catch (e) {
        console.log(`订阅取消失败`, e)
        return false
    }
}
export const sendPushSubscription = (pushScription) => {
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