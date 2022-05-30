/*
 * @Author: ant
 * @Date: 2022-05-30 22:54:24
 * @LastEditTime: 2022-05-31 00:30:20
 * @LastEditors: ant
 * @Description: 
 */
function isNotificationSupported() {
    return 'Notification' in window
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


// export default { displayNotification, askNotificationPermission }