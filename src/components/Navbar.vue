<!-- 顶部菜单栏 -->
<template>
  <div>
    <!-- 未登录的navbar -->
    <el-row
      class="container header"
      style="min-width:1200px"
      v-if="!this.$store.getters.isLogin"
    >
      <!-- 系统名 -->
      <div class="topbar-logos" style="line-height: 60px;font-size: 24px;margin-left:36px">
        <a style="color: #fff"><span>代码分析系统</span></a>
      </div></el-row
    >
    <!-- 登陆后的navbar -->
    <el-row
      class="container"
      style="min-width:1200px"
      v-if="this.$store.getters.isLogin"
    >
      <!--头部-->
      <el-col :span="24" class="topbar-wrap">
        <!-- 左边按钮,可添加logo -->

        <!-- 系统名 -->
        <div class="topbar-logos">
          <a style="color: #fff"><span>代码分析系统</span></a>
        </div>

        <!-- 菜单栏,如果未登录就不显示 -->
        <div class="topbar-title">
          <!-- 注意：这里就是topNavState作用之处，根据当前路由所在根路由的type值判断显示不同顶部导航菜单 -->
          <el-row>
            <el-col :span="24">
              <el-menu
                class="el-menu-demo"
                mode="horizontal"
                @select="handleSelect"
                :router="true"
                active-text-color="	#1E90FF"
                text-color="#FFFAFA"
                background-color="#373d41"
                :default-active="$route.path"
              >
                <el-menu-item index="/projects">我的项目</el-menu-item>
                <el-menu-item index="/analysis">结构分析</el-menu-item>
                <el-menu-item index="/reengineering">逆向工程</el-menu-item>
                <el-menu-item index="/records">操作记录</el-menu-item>
              </el-menu>
            </el-col>
          </el-row>
        </div>
        <!-- 用户名菜单栏 -->
        <div class="topbar-account topbar-btn">
          <el-row style="width: 80%" :span="24">
            <el-col :span="12">
              <el-dropdown
                trigger="click"
                style="padding-right: 10px"
                @command="userMsghandleCommand"
              >
                <span class="el-dropdown-link userinfo-inner">
                  <i class="iconfont icon-user"></i> {{ userName }}
                  <i class="el-icon-caret-bottom"></i
                ></span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item icon="el-icon-message">
                    <span>{{ userEmail }}</span></el-dropdown-item
                  >
                  <el-dropdown-item command="setMsg" icon="el-icon-setting"
                    >设置
                  </el-dropdown-item>

                  <el-dropdown-item command="logout" icon="el-icon-back"
                    >退出登录</el-dropdown-item
                  >
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
          </el-row>
        </div>
      </el-col>

      <!-- 修改个人信息弹框（右上角按钮） -->
      <!-- 增加关闭弹框后历史输入信息清空功能 -->
      <el-dialog
        title="我的信息设置"
        :visible.sync="setUserMsgDialogVisible"
        @close="clearInfo('changePwdForm')"
        width="40%"
      >
        <el-radio-group v-model="setMsgRadio">
          <el-radio :label="0">账户设置</el-radio>
          <el-radio :label="1">密码修改</el-radio>
        </el-radio-group>
        <!-- 修改用户名 -->
        <div v-if="setMsgRadio == 0">
          <el-form
            :model="setUserMsgForm"
            :rules="setUserMsgRules"
            ref="setUserMsgForm"
          >
            <el-form-item label="用户账号">
              <el-input :placeholder="userEmail" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="用户名" prop="userName">
              <el-input v-model="setUserMsgForm.userName"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="changeUserName('setUserMsgForm')"
              >保存</el-button
            >
          </div>
        </div>
        <!-- 修改密码弹窗页面 -->
        <div v-if="setMsgRadio == 1">
          <el-form
            :model="changePwdForm"
            :rules="changePwdRules"
            ref="changePwdForm"
          >
            <el-form-item label="旧密码" prop="oldPwd">
              <el-input
                type="password"
                autocomplete="off"
                v-model="changePwdForm.oldPwd"
              ></el-input>
            </el-form-item>

            <el-form-item label="新密码" prop="newPwd">
              <el-input
                type="password"
                autocomplete="off"
                v-model="changePwdForm.newPwd"
              ></el-input>
            </el-form-item>
            <el-form-item label="确认新密码" prop="newPwdAgain">
              <el-input
                type="password"
                autocomplete="off"
                v-model="changePwdForm.newPwdAgain"
              ></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="changePwd('changePwdForm')"
              >确 认</el-button
            >
          </div>
        </div>
      </el-dialog>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      //是否登陆
      userName: this.$store.getters.username,
      userEmail: this.$store.getters.email,
      setUserMsgDialogVisible: false,
      setMsgRadio: 0,
      activeIndex: "/projects",
      //修改用户名弹框
      setUserMsgForm: {
        userName: ""
      },
      setUserMsgRules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur"
          }
        ]
      },
      changePwdForm: {
        oldPwd: "",
        newPwd: "",
        newPwdAgain: ""
      },
      changePwdRules: {
        oldPwd: [
          { required: true, message: "请输入原密码", trigger: "blur" },
          {
            min: 3,
            max: 16,
            message: "长度在 3 到 16 个字符",
            trigger: "blur"
          }
        ],
        newPwd: [
          { required: true, message: "请输入新密码", trigger: "blur" },
          {
            min: 3,
            max: 16,
            message: "长度在 3 到 16 个字符",
            trigger: "blur"
          }
        ],
        newPwdAgain: [
          { required: true, message: "请确认新密码", trigger: "blur" },
          {
            min: 3,
            max: 16,
            message: "长度在 3 到 16 个字符",
            trigger: "blur"
          }
        ]
      }
    };
  },

  mounted() {},
  computed: {
    computeUserEmail() {
      return this.$store.state.userEmail;
    }
  },
  methods: {
    //处理菜单栏的选择
    handleSelect(key, keyPath) {
      let _this = this;
      _this.$store.state.mainPageIndex = key;
    },

    //右上角用户按钮下拉操作响应
    userMsghandleCommand(command) {
      let _this = this;
      if (command == "setMsg") {
        // this.setUserMsgForm.userName = this.$store.state.userName;
        _this.setUserMsgDialogVisible = true;
      } else if (command == "logout") {
        _this.logout();
      }
    },

    //更改用户名
    changeUserName(formName) {
      let _this = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          var changeUserNamePara = {
            userId: _this.$store.state.userId,
            nickName: _this.setUserMsgForm.userName
          };
          changeUserNameApi(changeUserNamePara).then(data => {
            if (data.code == 1) {
              _this.userName = _this.setUserMsgForm.userName;
              _this.$store.state.userName = _this.setUserMsgForm.userName;
              this.$message.success("修改成功");
              _this.setUserMsgDialogVisible = false;
            } else {
              this.$message.error("操作失败");
            }
          });
        } else {
          return false;
        }
      });
    },
    //更改密码
    changePwd(formName) {
      let _this = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (_this.changePwdForm.oldPwd == _this.changePwdForm.newPwd) {
            this.$message.warning("新旧密码相同，请重新输入");
            return;
          } else if (
            _this.changePwdForm.newPwdAgain != _this.changePwdForm.newPwd
          ) {
            this.$message.warning("两次输入的新密码不相同，请重新输入");
            return;
          } else {
            var changeUserNamePara = {
              userId: _this.$store.state.userId,
              oldPwd: _this.changePwdForm.oldPwd,
              newPwd: _this.changePwdForm.newPwd
            };
            changePwdApi(changeUserNamePara).then(data => {
              if (data.code == 1) {
                // _this.$refs[formName].resetFields();
                _this.setUserMsgDialogVisible = false;
                this.$message.success("修改密码成功");
              } else {
                var str = data.msg;
                this.$message.error(str + "。修改密码失败，请重试");
              }
            });
          }
        } else {
          return false;
        }
      });
    },
    //关闭弹框清空历史输入
    clearInfo(type) {
      if (type) {
        this.changePwdForm.oldPwd = "";
        this.changePwdForm.newPwd = "";
        this.changePwdForm.newPwdAgain = "";
        // this.$refs[type].resetFields();
      }
    },
    //退出系统
    logout() {
      // sessionStorage.removeItem("user");
      // removeInfo();
      this.$router.push("/login");
    }
  }
};
</script>

<style>
/* 修改了全局el-menu的样式 */
.topbar-title .el-menu--horizontal > .el-menu-item[data-v-41458b80] {
  height: 59px !important;
}
</style>
<style scoped>
.header{
  height: 60px;
  background-color: #373d41;
}
.el-menu.el-menu--horizontal {
  border-bottom: none;
}

.container {
  /* position: absolute; */
  top: 0px;
  bottom: 0px;
  width: 100%;
}

/* top navbar style start */
.container .topbar-wrap {
  height: 60px;
  line-height: 60px;
  background: #373d41;
  padding: 0px;
  width: 100%;
}

.container .topbar-wrap .topbar-btn {
  display: flex;
  flex-direction: row-reverse;
  color: rgb(95, 92, 92);
  width: 20%; /*  用户名菜单长度 */
  height: 60px;
}

.container .topbar-wrap .topbar-logo {
  float: left;
  width: 5%; /*左菜单伸缩按钮长度 */
  line-height: 60px;
}
.container .topbar-wrap .topbar-logos {
  float: left;
  width: 12%; /* 系统名长度 */
  line-height: 60px;
  font-size: 24px;
  margin-left: 36px;
  font: bolder;
}
.container .topbar-wrap .topbar-title {
  float: left;
  text-align: left;
  padding-left: 10px;
  width: 45%; /*顶部菜单栏长度 */
}
.container .topbar-wrap .topbar-logo img,
.container .topbar-wrap .topbar-logos img {
  height: 30px;
  margin-top: 12px;
  margin-left: 2px;
}

.topbar-title .el-menu--horizontal {
  background-color: transparent;
}

.el-menu--horizontal > .el-menu-item:not(.is-disabled):hover,
.el-menu--horizontal > .el-menu-item:not(.is-disabled):focus,
.el-menu--horizontal > .el-menu-item.is-active {
  color: rgb(107, 84, 84);
  background-color: transparent;
  border-bottom: 2px solid rgb(53, 137, 255) !important;
}

.topbar-title .el-menu--horizontal > .el-menu-item {
  height: 59px;
  line-height: 60px;
  color: rgb(14, 13, 13);
}

.el-menu-item .iconfont {
  margin-right: 5px;
  display: inline-block;
  width: 24px;
  text-align: center;
  font-size: 26px;
  vertical-align: middle;
}

.container .topbar-wrap .topbar-account {
  float: right;
  padding-right: 10px;
  width: 15%;
}

.container .topbar-wrap .topbar-timer {
  display: inline-block;
}

.container .topbar-wrap .topbar-timer span {
  display: inline-block;
  vertical-align: middle;
}

.container .topbar-wrap .topbar-timer .login-name {
  margin: 0 6px;
  font-style: normal;
}

.container .topbar-wrap .userinfo-inner {
  cursor: pointer;
  color: #fff;
  padding-left: 10px;
}

.container .topbar-wrap .userinfo-inner img {
  margin-left: 6px;
  width: 42px;
  height: 42px;
  border: 1px solid #504d4d;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  border-radius: 50%;
  vertical-align: middle;
}
/* top navbar style end */
</style>
