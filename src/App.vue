<!-- 整合顶部菜单 -->
<template>
  <div id="app">
    <!-- 导航栏 -->
    <navbar></navbar>
    <!-- 主体部分 -->
    <el-container style="height: 93%;background-color:rgb(226,229,233)">
      <el-main><router-view class="routerView"></router-view></el-main>
    </el-container>
  </div>
</template>

<script>

import Navbar from "@/components/Navbar.vue";
export default {
  name: 'App',
  components: {
    Navbar,
  },
}
</script>

<style>
@import "./assets/css/base.css";

</style>
<style scoped>

  html,body,#app,.el-container{
        /*设置内部填充为0，几个布局元素之间没有间距*/
        padding: 0px;
         /*外部间距也是如此设置*/
        margin: 0px;
        /*统一设置高度为100%*/
        height: 100%;
    }
</style>


