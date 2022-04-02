<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>登陆</span>
      </div>
      <el-form
        label-width="60px"
        :model="loginForm"
        :rules="loginRules"
        ref="loginForm"
      >
        <el-form-item label="账号" prop="username">
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginForm.password" show-password></el-input>
        </el-form-item>
        <el-form-item style="float:right">
          <el-button type="primary" @click="submitForm('loginForm')"
            >登陆</el-button
          >
          <!-- 找回密码 -->
          <!-- <el-button @click="resetForm('ruleForm')">找回密码</el-button> -->
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { login } from "@/network/login";
import axios from "axios";
export default {
  name: "Login", //组件名称
  data() {
    //组件中所用的数据
    return {
      loginForm: {
        username: "",
        password: ""
      },
      loginRules: {
        username: [
          {
            required: true,
            message: "请输入账号",
            trigger: "blur"
          }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  mounted() {
    //绑定事件
    window.addEventListener("keydown", this.keyDown);
  }, //组件刚挂载的一系列操作
  destroyed() {
    window.removeEventListener("keydown", this.keyDown, false);
  },
  computed: {}, //计算属性
  methods: {
    keyDown(e) {
      //如果是回车则执行登录方法
      if (e.keyCode == 13) {
        this.submitForm("loginForm");
      }
    },
    submitForm(formname) {
      this.$refs[formname].validate(valid => {
        if (valid) {
          login(this.loginForm)
            .then(res => {
              console.log(res);
              if (res.code == 1000) {
                this.$message.success("登陆成功");
                this.$store.commit("SET_ISLOGIN", true);
                this.$store.commit("SET_TOKEN", res.msg); //设置token
                this.$store.commit("SET_ID", res.result.id);
                this.$store.commit("SET_USERNAME", res.result.username);
                this.$router.push("/projects");
              }
              else{
                this.$message.error(res.msg);
              }
            })
            .catch(err => {
              this.$message.error("登陆失败");
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }, //组件中所使用方法，如向后端请求数据
  components: {} //在此注册此组件中要使用的其他组件（.vue）
};
</script>

<style scoped>
.box-card {
  width: 35%;
  margin: 100px auto;
}
</style>
