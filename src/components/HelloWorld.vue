<!--
 * @Author: ant
 * @Date: 2022-05-25 22:40:23
 * @LastEditTime: 2022-06-08 23:40:24
 * @LastEditors: ant
 * @Description: 
-->
<script setup>
import { onMounted, ref } from "vue";
import { Button } from "vant";
import {
  displayNotification,
  subscribe,
  unsubscribe,
  getPushScription,
} from "../utils/notification";
import { base64ToUint8Array } from "@/utils/common";
// 业务中需要掉用此接口，将pushScription 发送给业务服务器。业务服务器需要pushScription向推送服务器推送消息。
// const sendPushSubscription = (pushScription)=>{
//   return fetch('/api/push/subscribe', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             endpoint: pushScription.endpoint,
//             keys: {
//                 p256dh: uint8ArrayToBase64(pushScription.getKey('p256dh')),
//                 auth: uint8ArrayToBase64(pushScription.getKey('auth'))
//             }
//         })
//     })
// }
const msgs = [
  {
    title: "我是简单的消息",
    body: {
      body: "我是本地消息的内容体，我是本地消息的内容体",
      icon: "/img/icons/android-chrome-192x192.png",
    },
  },
  {
    title: "我是带操作按钮的消息",
    body: {
      body: "我是带有操作按钮的消息，我是带有操作按钮的消息，我是带有操作按钮的消息，我是带有操作按钮的消息。",
      icon: "/img/icons/android-chrome-192x192.png",
      data: {
        url: "https://tenfei01.cfp.cn/creative/vcg/800/version23/VCG21154786fd8.jpg",
        desc: "我是城市风景照",
      },
      actions: [
        {
          action: "detail",
          title: "查看",
          icon: "/img/icons/apple-touch-icon.png",
        },
        {
          action: "cancel",
          title: "取消",
          icon: "/img/icons/apple-touch-icon.png",
        },
      ],
    },
  },
  {
    title: "我是标题",
    body: {
      body: "我是本地消息的内容体，我是本地消息的内容体",
      icon: "/img/icons/android-chrome-192x192.png",
      data: {
        url: "https://tenfei01.cfp.cn/creative/vcg/800/version23/VCG21154786fd8.jpg",
        desc: "我是城市风景照",
      },
    },
  },
];
// 使用web-push生成的key
// const VAPIDPublicKey =
//   "BPAlVBGt3YFzGBTOjrCbNVk5Q-2zkETpExGRO00CmyS3FqLI9LSGZHu4fJhIz0sObXwK88ArqZQdGpv51h3NbZg";
// 当前使用https://web-push-codelab.glitch.me/  工具提供的key，便于在线进行推送测试
const VAPIDPublicKey =
  "BN5zsRBSCmX9EjFkK-hoaSlukY-H8cBG5xuAhHi6SHH2EuLFGQpHxhLPYkZBVw8Cxc5udX8RZEpaKIOxuGV4vrk";
let savedPrompt = null;
const showInstallation = ref(false);
let pushInfo = ref("");
let subscribeText = ref("订阅");
let pushSub = null;
onMounted(async () => {
  pushSub = await getPushScription();
  if (pushSub) {
    subscribeText.value = "取消订阅";
    pushInfo.value = JSON.stringify(pushSub);
  } else {
    subscribeText.value = "订阅";
    pushInfo.value = "";
  }
});

const subscribeOrUnsubscribe = async () => {
  console.log(`pushSub的值为：`,pushSub)
  if (pushSub) {
    // 取消订阅
    let res = await unsubscribe(pushSub);
    if (res) {
      pushInfo.value = "";
      subscribeText.value = "订阅";
    }
  } else {
    // 去订阅
    pushSub = await subscribe({
      userVisibleOnly: true,
      applicationServerKey: base64ToUint8Array(VAPIDPublicKey),
    });
    if (pushSub) {
      pushInfo.value = JSON.stringify(pushSub);
      subscribeText.value = "取消订阅";
    }
  }
};
const showMsg = (i) => displayNotification(msgs[i]);

window.addEventListener("beforeinstallprompt", async (e) => {
  // 阻止默认提示弹出
  e.preventDefault();
  // 把事件存起来
  savedPrompt = e;
  // 展示引导banner
  showInstallation.value = true;
  let res = await e.userChoice;
  let { outcome } = res;
  console.log(res);
  console.log(outcome);
  if (outcome == "accepted" || res == "accepted") {
    // 隐藏按钮
    showInstallation.value = false;
    // 用户将站点添加到桌面
    console.log("已经添加到桌面");
  } else {
    // 用户取消操作
    console.log("用户取消安装");
  }
});

window.addEventListener("appinstalled", () => {
  console.log("PWA 应用已经在你的桌面啦");
  savedPrompt = null;
});
const addAToHomeScreen = async () => {
  // 触发安装提示展现，userChoice 属性是根据用户的选择进行解析的承诺。您只能调用延迟事件的 prompt() 一次。如果用户关闭了它，您需要等到 beforeinstallprompt 事件被再次触发，通常是在 userChoice 属性解析后立即触发。
  if (savedPrompt) {
    savedPrompt.prompt();
    let { outcome } = await savedPrompt.userChoice;
    // 用户操作之后清空事件
    savedPrompt = null;
    if (outcome == "accept" || outcome == "accepted") {
      // 隐藏按钮
      showInstallation.value = false;
      // 用户将站点添加到桌面
      console.log("已经添加到桌面");
    } else {
      // 用户取消操作
      console.log("用户取消安装");
    }
  }
};
</script>

<template>
  <div class="hello">
    <h3>PWA应用功能清单</h3>
    <ul>
      <li>添加到桌面</li>
      <li>消息通知</li>
      <li>离线可用</li>
      <li>缓存</li>
    </ul>

    <section class="card">
      <h3>本地通知</h3>
      <p>该通知是用户在本地交互所产生，例如，点击下方按钮，会展示一条通知：</p>
      <div class="op-box">
        <Button type="success" @click="showMsg(0)">发送通知</Button>
      </div>
    </section>

    <section class="card">
      <h3>有操作按钮的通知</h3>
      <p>该通知会带有两个操作按钮，一个是查看，一个是取消：</p>
      <div class="op-box">
        <Button type="success" @click="showMsg(1)">发送通知</Button>
      </div>
    </section>

    <section class="card">
      <h3>消息推送</h3>
      <p>消息推送信息对象：</p>
      <p>{{ pushInfo }}</p>
      <div class="op-box">
        <Button type="success" @click="subscribeOrUnsubscribe">{{
          subscribeText
        }}</Button>
      </div>
    </section>
    <div
      class="install-banner"
      @click="addAToHomeScreen"
      v-show="showInstallation"
    >
      <span class="guide">喜欢我们的应用？点我添加桌面吧！</span>
    </div>
  </div>
</template>

<style scoped>
.hello {
  padding: 0 10px;
}
.install-banner {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 40px;
  background: green;
  color: #fff;
  font-size: 16px;
  text-align: center;
  line-height: 40px;
}
.card {
  padding-bottom: 20px;
}
</style>







