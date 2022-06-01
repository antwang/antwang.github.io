/*
 * @Author: ant
 * @Date: 2022-06-01 11:41:52
 * @LastEditTime: 2022-06-01 16:11:50
 * @LastEditors: ant
 * @Description: 
 */
let savedPrompt = null
let _resolve = null;
let appInstallPromise = new Promise((resolve) => {
    _resolve = resolve
})

window.addEventListener("beforeinstallprompt", e => {
    // 阻止默认提示弹出
    e.preventDefault();
    // 把事件存起来
    savedPrompt = e;
    // _resolveBeforeInstall(savedPrompt);
    _resolve(savedPrompt)
})

window.addEventListener("appinstalled", () => {
    console.log("PWA 应用已经在桌面了");
    savedPrompt = null;
    // _resolveAppInstalled()
    savedPrompt(savedPrompt)
})

// const addAToHomeScreen = (fn = (outcome)=>{}) => {
//     // 触发安装提示展现
//     savedPrompt && savedPrompt.prompt();
//     return new Promise((resolve, reject)=>{
//     // 用户行为判断
//     savedPrompt.userChoice.then((result) => {
//       // 用户操作之后清空事件
//       savedPrompt = null;

//       fn(result.outcome)
//       if (result.outcome === "accept") {
//         // 隐藏按钮
//         showInstallation.value = false;
//         // 用户将站点添加到桌面
//         console.log("已经添加到桌面");
//       } else {
//         // 用户取消操作
//         console.log("用户取消安装");
//       }
//     });
//     })
//   }
export default appInstallPromise 