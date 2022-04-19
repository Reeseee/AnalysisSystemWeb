<template>
  <div id="building">
      <div>
        <div class="sameLine">当前项目为:xxx {{ this.id }}</div>
        <div class="sameLine">
          <el-menu
            mode="horizontal"
            background-color="#373d41"
            :default-active="$route.path"
            @select="handleSelect"
          >
            <el-menu-item index="/call">生成项目调用关系</el-menu-item>
            <el-menu-item index="/dependency">生成项目依赖关系</el-menu-item>
          </el-menu>
        </div>
      </div>

      <el-container style="height: 1000px; border: 1px solid #eee">
        <el-header style="text-align: center; font-size: 12px">
          <span>项目分析结果</span>
        </el-header>

        <el-container>
          <el-aside width="300px" style="background-color: rgb(238, 241, 246)">
            <div class="dirclass">项目目录结构</div>
            <el-scrollbar class="myscrollbar">
              <el-tree
                :data="projectDir"
                :props="defaultProps"
                @node-click="handleNodeClick"
                default-expand-all
                v-if="isloading"
              ></el-tree>
            </el-scrollbar>
          </el-aside>

          <el-main>
            <div class="fileDetailClass" v-if="isloading">
              项目行数统计: {{ this.projectAnalyzeVo.linecount }}
            </div>
            <div class="fileDetailClass" v-if="isloading">
              项目文件数统计: {{ this.projectAnalyzeVo.filecount }}
            </div>
            <div class="fileDetailClass" v-if="isloading">
              项目类数统计: {{ this.projectAnalyzeVo.classcount }}
            </div>
            <div class="fileDetailClass" v-if="isloading">
              项目方法数统计: {{ this.projectAnalyzeVo.functioncount }}
            </div>
            <div class="fileDetailClass" v-if="isloading">
              项目中最长的文件: {{ this.projectAnalyzeVo.longestfile }}
            </div>
            <div class="fileDetailClass" v-if="isloading">
              项目中最长的类: {{ this.projectAnalyzeVo.longestclass }}
            </div>
            <div class="fileDetailClass" v-if="isloading">
              项目中最长的方法: {{ this.projectAnalyzeVo.longestfunction }}
            </div>
            <div class="fileDetailClass" v-if="isloading">
              项目中最复杂的文件: {{ this.projectAnalyzeVo.mostComplexFile }}
            </div>
            <div class="fileDetailClass" v-if="isloading">
              项目中复杂度拟合结果:
              {{ this.projectAnalyzeVo.projectComplexity }}
            </div>
          </el-main>
        </el-container>
      </el-container>
      <!-- <el-button @click="test">tessssss</el-button> -->
 
  </div>
</template>

<script>
import axios from "axios";
import {getProjectAnalyze} from "@/network/structureanalyze.js"
export default {
  name: "ProjectAnalyze",
  data() {
    return {
      projectDir: [],
      defaultProps: {
        children: "children",
        label: "nodeShortName"
      },
      id: 1,
      selectedFile: "",
      projectAnalyzeVo: {},
      userId: 1,
      isloading: false
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.userId = this.$store.getters.id;
    this.getProjectVo();
  },
  methods: {
    handleNodeClick(data) {
      console.log(data);
      let len = data.nodePath.length;
      if (len < 5) console.log("dir");
      else {
        let start = data.nodePath.length - 5;
        if (data.nodePath.substr(start) == ".java") {
          console.log("analyzeFile");
          // this.$router.push({
          //   name: "FileAnalyze",
          //   params: { id: this.id, filepath: data.fullname }
          // });
          const { href } = this.$router.resolve({
            path: "/file",
            query: { id: this.id, filepath: data.nodePath }
          });
          window.open(href, "_blank");
        }
      }
    },
    // 根据路径绑定到对应的一级菜单，防止页面刷新重新跳回第一个
    toIndex() {
      return this.$route.path.split("/")[1];
    },
    handleSelect(index, indexPath) {
      console.log("index", index);
      //this.$router.push({ name: index, params: { id: this.id } });
      const { href } = this.$router.resolve({
        path: index,
        query: { id: this.id }
      });
      window.open(href, "_blank");
    },
    // handleCommand(command) {
    //   if (command == "loginout") {
    //     localStorage.removeItem("ms_username");
    //     this.$router.push("/login");
    //   }
    // },

    getProjectVo(){
      getProjectAnalyze(this.id,this.userId).then(response => {
        this.projectAnalyzeVo = response;
        this.projectDir = this.projectAnalyzeVo.projectdir;
        this.isloading = true;
      });
    },

  }

};
</script>

<style scoped>
#building {
  /* background: url("../assets/images/typebg.jpg"); */
  width: 100%;
  height: 100%;
  position: relative;
  background-size: 100% 100%;
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
  margin-top: 50px;
  margin-left: 50px;
  font-size: 20px;
  font-weight: 900;
  display: inline-block;
  color: #000;
}


.dirclass {
  font-size: 30px;
  font-weight: 900;
}

.fileDetailClass {
  font-size: 20px;
  color: #000;
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
  color: #000000;
  line-height: 60px;
}

.el-aside {
  color: #333;
}

.myscrollbar {
  height: 100%;
}
.myscrollbar >>> .el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>
