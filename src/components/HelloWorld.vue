<!--
 * @Author: ant
 * @Date: 2022-05-25 22:40:23
 * @LastEditTime: 2022-05-31 00:30:53
 * @LastEditors: ant
 * @Description: 
-->
<template>
  <div class="hello">
    <h1>功能清单</h1>
    <p>添加到桌面</p>
    <p>消息通知</p>
    <div class="msg">消息通知演示按钮</div>
    <section class="card">
      <h2>本地通知</h2>
      <p>该通知是用户在本地交互所产生，例如，点击下方按钮，会展示一条通知：</p>
      <div class="op-box">
        <span @click="showMsg" class="btn-primary">本地通知</span>
      </div>
    </section>

    <div class="install-banner" @click="addApp" v-show="showInstallation">
      <span class="guide">喜欢我们的应用？点我添加桌面吧！</span>
    </div>
  </div>
</template>

<script>
let savedPrompt = null;
import { displayNotification } from "../common";
export default {
  name: "HelloWorld",
  data() {
    return {
      showInstallation: false,
    };
  },
  created() {
    window.addEventListener("beforeinstallprompt", (e) => {
      // 阻止默认提示弹出
      e.preventDefault();
      // 把事件存起来
      savedPrompt = e;
      console.log(savedPrompt);
      // 显示按钮
      this.showInstallation = true;
    });
    window.addEventListener("appinstalled", () => {
      // Hide the app-provided install promotion
      this.showInstallation = false;
      // Clear the deferredPrompt so it can be garbage collected
      savedPrompt = null;
      // Optionally, send analytics event to indicate successful install
      console.log("PWA was installed");
    });
  },
  props: {
    msg: String,
  },
  methods: {
    showMsg() {
      let msg = {
        title: "我是标题",
        body: {
          body: "我是本地消息的内容体，我是本地消息的内容体",
          icon: "/img/icons/android-chrome-192x192.png",
          image:
            "https://tenfei01.cfp.cn/creative/vcg/800/version23/VCG21154786fd8.jpg",
          vibrate: [200, 100, 200, 100, 200, 100, 200],
          data: {
            url: "https://tenfei01.cfp.cn/creative/vcg/800/version23/VCG21154786fd8.jpg",
            desc: "我是城市风景照",
          },
          actions: [
            {
              action: "like",
              title: "点赞",
              icon: "/img/icons/apple-touch-icon.png",
            },
          ],
        },
      };
      console.log(msg)
      console.log(displayNotification)
      displayNotification(msg);
    },
    addApp() {
      // 隐藏按钮
      this.showInstallation = false;
      // 触发安装提示展现
      savedPrompt.prompt();
      // 用户行为判断
      savedPrompt.userChoice.then((result) => {
        // 用户操作之后清空事件
        savedPrompt = null;
        if (result.outcome === "accept") {
          // 用户将站点添加到桌面
          console.log("已经添加到桌面");
        } else {
          // 用户取消操作
          console.log("用户取消安装");
        }
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.install-banner {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 60px;
  line-height: 60px;
  background: #42b983;
  color: black;
  font-size: 16px;
  text-align: center;
  cursor: pointer;
}
.op-box {
  display: flex;
}
.btn-primary {
  width: 100px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  background: #42b983;
  color: black;
  font-size: 16px;
  cursor: pointer;
}

</style>
