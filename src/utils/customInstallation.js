/*
 * @Author: ant
 * @Date: 2022-06-01 11:41:52
 * @LastEditTime: 2022-06-01 18:25:51
 * @LastEditors: ant
 * @Description: 
 */
let _savedPrompt = null
window.addEventListener("beforeinstallprompt", e => {
    // 阻止默认提示弹出
    e.preventDefault();
    // 把事件存起来
    _savedPrompt = e;
    console.log('savedPrompt in window.addEvent',_savedPrompt)
})

window.addEventListener("appinstalled", () => {
    console.log("PWA 应用已经在桌面了");
    _savedPrompt = null;
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

