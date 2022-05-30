<template>
   <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>注册</span>
      </div>
      <el-form
        label-width="60px"
        :model="registerForm"
        :rules="registerRules"
        ref="registerForm"
      >
        <el-form-item label="账号" prop="username">
          <el-input v-model="registerForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="registerForm.password" show-password></el-input>
        </el-form-item>
        <el-form-item style="float:right">
            <el-button @click="toLogin"
            >返回登陆</el-button
          >
          <el-button type="primary" @click="submitForm('registerForm')"
            >注册</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
</template>

<script>
import { register } from "@/network/login";
export default {
  name: "Login", //组件名称
  data() {
    //组件中所用的数据
    return {
      registerForm: {
        username: "",
        password: ""
      },
      registerRules: {
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
    window.addEventListener("keydown", this.keyDown);
  },
  destroyed() {
    window.removeEventListener("keydown", this.keyDown, false);
  },
  computed: {}, //计算属性
  methods: {
    keyDown(e) {
      //如果是回车则执行登录方法
      if (e.keyCode == 13) {
        this.submitForm("registerForm");
      }
    },
    submitForm(formname) {
      this.$refs[formname].validate(valid => {
        if (valid) {
          register(this.registerForm)
            .then(res => {
              if (res == 1) {
                this.$message.success("注册成功");
                this.$router.push("/login");
              }
              else{
                this.$message.error("注册失败，用户名已存在!");
              }
            })
            .catch(err => {
              this.$message.error("注册失败");
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    toLogin(){
      this.$router.push('/login');

    }
  }, 
  components: {} 
};
</script>

<style>
.box-card {
  width: 35%;
  margin: 100px auto;
}
</style>