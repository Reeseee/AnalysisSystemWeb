<template>
  <div id="building">
    <div>
      <div>
        <div class="sameLine">当前项目为: {{ this.id }}</div>
        <div class="sameLine">
          <el-menu
            :default-active="toIndex()"
            mode="horizontal"
            background-color="#373d41"
            @select="handleSelect"
          >
            <el-menu-item index="1">生成文件抽象语法树</el-menu-item>
          </el-menu>
        </div>
      </div>

      <el-container style="height: 500px; border: 1px solid #eee">
        <el-header style="text-align: center; font-size: 12px">
          <span>文件分析结果</span>
        </el-header>

        <el-container>
          <el-aside width="300px" style="background-color: rgb(238, 241, 246)">
            <div>
              文件名
            </div>
            <div>文件所处位置 {{ this.filepathvo }}</div>
          </el-aside>

          <el-main>
            <div class="sameLine">抽象语法树</div>
            <el-button size="small" type="primary" @click="downloadFile"
              >导出</el-button
            >
            <el-tree
              :data="data"
              :props="defaultProps"
              @node-click="handleNodeClick"
              default-expand-all= true
              v-if="isloading"
            ></el-tree>
          </el-main>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {getFileAst,exportFileAst} from "@/network/structureanalyze.js"
export default {
  name: "astGraph",
  data() {
    return {
      data: [],
      defaultProps: {
        children: "children",
        label: "nodeMessage"
      },
      id: 0,
      filepath: "",
      userId: 1,
      isloading: false,
      filepathvo: ""
    };
  },
  mounted() {
    this.id = this.$route.query.id;
    this.userId = this.$store.getters.id;
    this.filepath = this.$route.query.filepath;
    var ss = "" + this.id + "\\";
    var index = this.filepath.indexOf(ss);
    this.filepathvo = this.filepath.substring(index);
    this.getFileAstInformation();
  },
  methods: {
    handleNodeClick(data) {
      console.log(data);
    },
    // 根据路径绑定到对应的一级菜单，防止页面刷新重新跳回第一个
    toIndex() {
      return this.$route.path.split("/")[1];
    },
    handleSelect(index) {
      this.$router.push("/" + index);
    },
    handleExport(index) {
      this.$router.push("/" + index);
    },
    downloadFile() {
     exportFileAst(this.id,this.filepath,this.userId)
        .then(response => {
          //文件名 文件保存对话框中的默认显示
          var timestamp = new Date().getTime()
          let fileName = timestamp + ".ast";
          let data = response;
          if (!data) {
            return;
          }
          console.log(response); //构造a标签 通过a标签来下载
          let url = window.URL.createObjectURL(new Blob([data]));
          let a = document.createElement("a");
          a.style.display = "none";
          a.href = url; //此处的download是a标签的内容，固定写法，不是后台api接口
          a.setAttribute("download", fileName);
          document.body.appendChild(a);
          //点击下载
          a.click();
          // 下载完成移除元素
          document.body.removeChild(a);
          // 释放掉blob对象
          window.URL.revokeObjectURL(url);
        })
        .catch(response => {
          this.$message.error(response);
        });
    },

    getFileAstInformation(){
      getFileAst(this.id,this.filepath,this.userId).then(response => {
        this.data = response;
        console.log(response);
        this.isloading = true;
      });
    }

  }
  // handleCommand(command) {
  //   if (command == "loginout") {
  //     localStorage.removeItem("ms_username");
  //     this.$router.push("/login");
  //   }
  // }
};
</script>

<style scoped>
#building {
  /* background: url("../assets/images/typebg.jpg"); */
  width: 100%;
  height: 100%;
  position: relative;
  /* background-size: 100% 100%; */
  background-size: cover;
}

.wrapper {
  width: 100%;
  height: 100%;
  background: #000000;
}

.header {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 70px;
  font-size: 22px;
}
.header .logo {
  float: left;
  margin-left: 60px;
  margin-top: 17.5px;
  height: 29px;
  width: 160px;
  background: #000000;
  color: #ffffff;
  vertical-align: middle;
}

.header-right {
  float: right;
  padding-right: 50px;
}
.header-user-con {
  display: flex;
  height: 70px;
  align-items: center;
}
.user-avator {
  margin-left: 20px;
}
.user-avator img {
  display: block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.user-name {
  margin-left: 10px;
}
.el-dropdown-link {
  cursor: pointer;
}
.el-dropdown-menu__item {
  text-align: center;
}
/* --------------- 水平一级菜单栏的样式--------------------- */
.el-menu.el-menu--horizontal {
  border-bottom: none !important;
  float: left;
  margin-left: 50px;
}
.el-menu--horizontal > .el-menu-item.is-active {
  border-bottom: 2px solid #409eff;
  color: #3989fa;
  font-weight: 700;
}
.el-menu--horizontal > .el-menu-item {
  font-size: 20px;
  margin: 0 15px;
  color: #ffffff;
}

/* --------------- 同一行显示--------------------- */
.sameLine {
  margin-top: 5px;
  margin-left: 50px;
  font-size: 20px;
  font-weight: 900;
  display: inline-block;
}

.word-v-middle {
  margin-bottom: 0;
  font-size: 20px;
  min-height: 31px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 31px;
  margin-top: 30px;
  color: #000000;
  white-space: normal;
}

.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>
