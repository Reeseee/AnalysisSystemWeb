<template>
  <div>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
    >
      <el-menu-item index="1">我的项目</el-menu-item>
      <el-menu-item index="2">结构分析</el-menu-item>
      <el-menu-item index="3">逆向工程</el-menu-item>
      <el-menu-item index="4"
        ><a href="https://www.ele.me" target="_blank">历史操作</a></el-menu-item
      >
    </el-menu>
     <el-button type="primary" @click="click">主要按钮</el-button>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
    };
  },
  methods:{
    click(){
      console.log("test")
    }
  }
};
</script>

<style scoped></style>
