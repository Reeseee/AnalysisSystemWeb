<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>登陆</span>
      </div>
      <el-form label-width="40px" :model="loginForm" ref="loginForm">
        <el-form-item label="账号">
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="loginForm.password"></el-input>
        </el-form-item>
        <el-form-item style="float:right">
          <el-button type="primary" @click="submitForm('loginForm')">登陆</el-button>
          <!-- 找回密码 -->
          <!-- <el-button @click="resetForm('ruleForm')">找回密码</el-button> -->
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Login", //组件名称
  data() {
    //组件中所用的数据
    return {
      loginForm: {
        username: "",
        password: ""
      }
    };
  },
  mounted() {}, //组件刚挂载的一系列操作
  computed: {}, //计算属性
  methods: {}, //组件中所使用方法，如向后端请求数据
  components: {} //在此注册此组件中要使用的其他组件（.vue）
};
</script>

<style scoped>
.box-card{
    width: 35%;
    margin: 100px auto;
}
</style>
