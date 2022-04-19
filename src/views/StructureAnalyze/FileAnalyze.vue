<template>
  <div id="building">
    <div>
      <div>
        <div class="sameLine">当前项目为: </div>
        <div class="sameLine">{{ this.id }}</div>
        <div class="sameLine">
          <el-menu
            mode="horizontal"
            background-color="#373d41"
            @select="handleSelect"
          >
            <el-menu-item index="/ast">生成文件抽象语法树</el-menu-item>
          </el-menu>
        </div>
      </div>

      <el-container style="height: 1000px; border: 1px solid #eee">
        <el-header style="text-align: center; font-size: 12px">
          <span>文件分析结果</span>
        </el-header>

        <el-container>
          <el-aside width="300px" style="background-color: rgb(238, 241, 246)">
            <div>
              文件名
            </div>
            <div>文件所处位置 {{ this.filepath }}</div>
          </el-aside>

          <el-main>
            <div class="fileDetailClass" v-if="isloading">
              文件中的类数: {{ this.fileAnalyzeVo.classcount }}
            </div>
            <div class="fileDetailClass" v-if="isloading">
              文件中的类: {{ this.fileAnalyzeVo.classlist }}
            </div>
            <div class="fileDetailClass" v-if="isloading">
              文件中的全局变量数: {{ this.fileAnalyzeVo.variablecount }}
            </div>
            <div class="fileDetailClass" v-if="isloading">
              文件中的全局变量: {{ this.fileAnalyzeVo.variablelist }}
            </div>
            <div class="fileDetailClass" v-if="isloading">
              文件行数: {{ this.fileAnalyzeVo.linecount }}
            </div>
            <div class="fileDetailClass" v-if="isloading">
              文件方法数: {{ this.fileAnalyzeVo.functioncount }}
            </div>
            <div>--------------------------------------------------------------</div>
            
            <div class="fileDetailClass" v-if="isloading">
              文件内的函数信息:

              <div
                v-for="functionInformation in functionInformations" v-if="isloading"
              >
                <div>函数名:{{ functionInformation.name }}</div>
                <div>函数内局部变量：{{ functionInformation.varList }}</div>
                <div>函数复杂度{{ functionInformation.halsteadMetrics}}</div>
              </div>
            </div>

            <div>--------------------------------------------------------------</div>

            <div class="fileDetailClass" v-if="isloading">
              文件Halstead复杂度: {{ this.fileAnalyzeVo.fileHalstead }}
            </div>

            <div class="fileDetailClass" v-if="depIsloading">
              文件内部依赖: {{ this.dependencyVo.dependency }}
            </div>
            <div class="fileDetailClass" v-if="depIsloading">
              文件内部被依赖: {{ this.dependencyVo.beDependentOn }}
            </div>
            <div class="fileDetailClass" v-if="callIsloading">
              文件内部调用: {{ this.callRelationVo.dependency }}
            </div>
            <div class="fileDetailClass" v-if="callIsloading">
              文件内部被调用: {{ this.callRelationVo.beDependentOn }}
            </div>
          </el-main>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {getFileAnalyze,getFileDependency,getFileCall} from "@/network/structureanalyze.js"
export default {
  name: "FileAnalyze",
  data() {
    return {
      id: 0,
      filepath: "",
      fileAnalyzeVo: [],
      functionInformations: null, 
      dependencyVo: [],
      callRelationVo: [],
      userId: 1,
      isloading: false,
      depIsloading: false,
      callIsloading: false
    };
  },
  created() {
    this.id = this.$route.query.id;
    this.filepath = this.$route.query.filepath;
    this.userId = this.$store.getters.id;
    this.getFileAnalyzeInformation();
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
      const { href } = this.$router.resolve({
        path: index,
        query: { id: this.id, filepath: this.filepath }
      });
      window.open(href, "_blank");
    },
    getFileAnalyzeInformation(){
      getFileAnalyze(this.id,this.filepath,this.userId).then(response => {
        this.fileAnalyzeVo = response;
        this.functionInformations = JSON.parse(this.fileAnalyzeVo.functionvariable);
        console.log(response);
        this.isloading = true;
      });
      getFileDependency(this.id,this.filepath,this.userId).then(response => {
        this.dependencyVo = response;
        console.log(response);
        this.depIsloading = true;
      });
      getFileCall(this.id,this.filepath,this.userId).then(response => {
        this.callRelationVo = response;
        console.log(response);
        this.callIsloading = true;
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
  margin-top: 50px;
  margin-left: 50px;
  font-size: 20px;
  font-weight: 900;
  display: inline-block;
  color: #000000;
}

.fileDetailClass {
  font-size: 20px;
  color: #000000;
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
