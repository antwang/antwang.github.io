<!--
 * @Author: ant
 * @Date: 2022-05-25 22:40:23
 * @LastEditTime: 2022-05-31 13:39:43
 * @LastEditors: ant
 * @Description: 
-->
<script setup>
import { ref, onMounted } from "vue";
import { Button } from "vant";
import {displayNotification} from "../common";
const msgs = [{
        title: "我是简单的消息",
        body: {
          body: "我是本地消息的内容体，我是本地消息的内容体",
          icon: "/img/icons/android-chrome-192x192.png",
        }
      }, {
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
      }, {
        title: "我是标题",
        body: {
          body: "我是本地消息的内容体，我是本地消息的内容体",
          icon: "/img/icons/android-chrome-192x192.png",
          data: {
            url: "https://tenfei01.cfp.cn/creative/vcg/800/version23/VCG21154786fd8.jpg",
            desc: "我是城市风景照",
          }
        },
      }]
const showMsg = (type)=> displayNotification(msgs[type]);
let savedPrompt = null;
const showInstallation = ref(false);

window.addEventListener("beforeinstallprompt", e => {
  // 阻止默认提示弹出
  e.preventDefault();
  // 把事件存起来
  savedPrompt = e;
  console.log(savedPrompt);
  // 显示按钮
  showInstallation.value = true;
});
window.addEventListener("appinstalled", () => {
  // Hide the app-provided install promotion
  showInstallation.value = false;
  // Clear the deferredPrompt so it can be garbage collected
  savedPrompt = null;
  // Optionally, send analytics event to indicate successful install
  console.log("PWA was installed");
});
onMounted(() => {
});
const addAToHomeScreen = () => {
      // 触发安装提示展现
      savedPrompt.prompt();
      // 用户行为判断
      savedPrompt.userChoice.then((result) => {
        // 用户操作之后清空事件
        savedPrompt = null;
        if (result.outcome === "accept") {
          // 隐藏按钮
          showInstallation.value = false;
          // 用户将站点添加到桌面
          console.log("已经添加到桌面");
        } else {
          // 用户取消操作
          console.log("用户取消安装");
        }
      });
    }
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

    <div class="install-banner" @click="addAToHomeScreen" v-show="showInstallation">
      <span class="guide">喜欢我们的应用？点我添加桌面吧！</span>
    </div>
  </div>
</template>

<style scoped>
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
</style>







