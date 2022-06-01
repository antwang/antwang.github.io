/*
 * @Author: ant
 * @Date: 2022-06-01 10:48:36
 * @LastEditTime: 2022-06-01 16:01:29
 * @LastEditors: ant
 * @Description: 
 */

/**
 * @description: uint8Array转base64
 * @param {Uint8Array} arr
 * @return {base64String}
 */
export const uint8ArrayToBase64 = (arr) => {
    return btoa(String.fromCharCode.apply(null, new Uint8Array(arr)))
}
/**
 * @description: base64 转 uint8Array
 * @param {base64String} base64String
 * @return {Uint8Array}
 */
export const base64ToUint8Array = (base64String) => {
    let padding = '='.repeat((4 - base64String.length % 4) % 4)
    let base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/')
    let rawData = atob(base64)
    let outputArray = new Uint8Array(rawData.length)
    for (let i = 0; i < rawData.length; i++) {
        outputArray[i] = rawData.charCodeAt(i)
    }
    return outputArray
}