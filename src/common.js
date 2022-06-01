/*
 * @Author: ant
 * @Date: 2022-05-30 22:54:24
 * @LastEditTime: 2022-06-01 10:50:05
 * @LastEditors: ant
 * @Description: 
 */

const VAPIDPublicKey = 'BPAlVBGt3YFzGBTOjrCbNVk5Q-2zkETpExGRO00CmyS3FqLI9LSGZHu4fJhIz0sObXwK88ArqZQdGpv51h3NbZg';
function isNotificationSupported() {
    return 'Notification' in window
}
function isPushManagerSupported() {
    return 'PushManager' in window
}
export const askNotificationPermission = async () => {
    if (!isNotificationSupported()) {
        console.log("This browser does not support notifications.");
    } else {
        Notification.requestPermission().then(function (permission) {
            switch (permission) {
                case 'granted':
                    console.log('Notification 可用')
                    break
                case 'denied':
                    console.log('Notification 被拒绝')
                    break
                default:
                    console.log('Notification 尚未授权')
            }
        })
    }
}

export const displayNotification = async (msg) => {
    if (isNotificationSupported()) {
        let permission = await Notification.requestPermission()
        if (permission === 'granted') {
            let registration = await navigator.serviceWorker.getRegistration();
            registration.showNotification(msg.title, msg.body);
        } else {
            console.log('Notification 尚未获得授权')
        }
    } else {
        console.log('浏览器不支持Notification API')
    }
}

function distributePushResource(subscription) {
    return fetch('/api/push/subscribe', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            endpoint: subscription.endpoint,
            keys: {
                p256dh: uint8ArrayToBase64(subscription.getKey('p256dh')),
                auth: uint8ArrayToBase64(subscription.getKey('auth'))
            }
        })
    })
}

// 订阅推送并将订阅结果发送给后端
export const subscribeAndDistribute = async (registration) => {
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
            // 实际应用中，请删除，并在业务中进行自行调用发送订阅的方法
            distributePushResource(pushSubscription)
        } catch (e) {
            return Promise.reject(e)
        }
    }
}