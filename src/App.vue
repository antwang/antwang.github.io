<!--
 * @Author: ant
 * @Date: 2022-05-25 22:40:23
 * @LastEditTime: 2022-05-31 13:50:41
 * @LastEditors: ant
 * @Description: 
-->
<script setup> 
import HelloWorld from './components/HelloWorld.vue'
</script>
<template>
<div class="topbar">
  <img class="logo" src="./assets/logo.png">
  <span class="label">PWA应用</span>
</div>
  <HelloWorld msg="Welcome to Your Vue.js App"/>
</template>

<style>
h1{
  font-size: 28px;
}
h2{
  font-size: 24px;
}
h3{
  font-size: 20px;
}
#app {
  
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.topbar{
  display: flex;
  padding: 10px;
  align-items: center;
}
.topbar .logo{
  width: 30px;
}
.topbar .label{
  margin-left: 10px;
  font-size: 20px;
  font-weight: 700;
  color: #42b983;
}
</style>
