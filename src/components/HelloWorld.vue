<!--
 * @Author: ant
 * @Date: 2022-05-25 22:40:23
 * @LastEditTime: 2022-05-30 18:04:38
 * @LastEditors: ant
 * @Description: 
-->
<template>
  <div class="hello">
    <h1>功能清单</h1>
    <p>添加到桌面</p>
    <p>消息通知</p>
    <div class="msg">消息通知演示按钮</div>
    <div class="install-banner" @click="addApp" v-show="showInstallation">
      <span class="guide">喜欢我们的应用？点我添加桌面吧！</span> 
    </div>
  </div>
</template>

<script>
let savedPrompt = null;
export default {
  name: "HelloWorld",
  data(){
    return {
      showInstallation: false,
    }
  },
  created(){
     window.addEventListener('beforeinstallprompt', e =>{
      // 阻止默认提示弹出
      e.preventDefault()
      // 把事件存起来
      savedPrompt = e
      console.log(savedPrompt);
      // 显示按钮
      this.showInstallation = true;
    })

  },
  props: {
    msg: String,
  },
  methods: {
    addApp(){
       // 隐藏按钮
       this.showInstallation =  false;
      // 触发安装提示展现
      savedPrompt.prompt()
      // 用户行为判断
      savedPrompt.userChoice.then(result =>{
        // 用户操作之后清空事件
        savedPrompt = null
        if (result.outcome === 'accept') {
          // 用户将站点添加到桌面
          console.log('已经添加到桌面')
        } else {
          // 用户取消操作
          console.log('用户取消安装')
        }
      })
    }

  }
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.install-banner{
  position: fixed;
  bottom: 0;
  left: 0;
  width:100%;
  height: 60px;
  line-height: 60px;
  background: #42b983;
  color: black;
  font-size: 16px;
  text-align: center;
  cursor: pointer;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
