<template>
  <el-card style="height:100%">
    <!-- 标题 -->
    <p style="font-size:18px; font-weight: bolder">我的项目</p>
    <!-- 内容 -->
    <div class="content">
      <!-- 按钮 -->
      <el-button type="primary" @click="dialogVisible2 = true" size="medium"
        ><i class="el-icon-upload2"> 上传项目</i>
      </el-button>
      <!-- <el-button type="danger" @click="deleteBatch()" size="medium"
        ><i class="el-icon-delete"> 批量删除</i>
      </el-button> -->

      <!-- 项目表 -->
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
      >
        <!-- <el-table-column type="selection" width="55"> </el-table-column> -->
        <el-table-column type="index" width="50"> </el-table-column>
          <!-- <el-table-column width="50" prop="id"> </el-table-column> -->
        <el-table-column prop="projectname" label="项目名称" sortable>
        </el-table-column>
        <el-table-column
          prop="uploaddate"
          label="上传日期"
          sortable
          :formatter="dateformatter"
        >
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- <el-button
              size="mini"
              @click="handleDownload(scope.$index, scope.row)"
              ><i class="el-icon-download"></i
            ></el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              ><i class="el-icon-delete"></i
            ></el-button> -->

            <el-button
              @click="handleClick(scope.row)"
              type="primary"
              size="small"
              >进入分析</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div style="text-align:center;margin-top:20px">
        <el-pagination
          background
          layout="prev, pager, next"
          :page-size="8"
          :page-count="totalPage"
          @current-change="getProject"
          :current-page.sync="currentPage"
        >
        </el-pagination>
      </div>
    </div>
    <!-- 进入分析前的选择与提示 -->
    <el-dialog title="提示" :visible.sync="dialogVisible1" width="30%" center>
      <span>请选择分析模块</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="toStructureAnalysis()"
          >结 构 分 析</el-button
        >
        <el-button type="primary" @click="toReengineering()"
          >逆 向 工 程</el-button
        >
      </span>
    </el-dialog>
    <!-- 上传文件模块 -->
    <el-dialog title="上传项目" width="40%" :visible.sync="dialogVisible2">
      <el-form
        :model="projectForm"
        :rules="rules"
        ref="projectForm"
        class="demo-logList"
      >
        <el-form-item label="项目名称" prop="name">
          <el-input v-model="projectForm.name" class="textInput"></el-input>
        </el-form-item>

        <el-form-item prop="file" class="uploadfile">
          <div class="inputfile" id="newbutton">
            <el-button type="primary" size="mini" @click="choosefile"
              >选择文件夹</el-button
            >
            <span v-if="files.length != 0">已选择{{ files.length }}个文件</span>
            <input
              @change="getFiles($event)"
              name="files"
              type="file"
              webkitdirectory
              mozdirectory
              class="fileinput"
              id="oldbutton"
            />
          </div>
        </el-form-item>
        <el-form-item style="text-align:center">
          <el-button size="mini" @click="closedialog">取消</el-button>
          <el-button size="mini" @click="resetForm">重置</el-button>
          <el-button type="primary" size="mini" @click="upload">上传</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-card>
</template>

<script>
import axios from "axios";
import {
  getProjectCount,
  getProjectList,
  uploadProject
} from "@/network/project.js";
export default {
  name: "Project", //组件的名称
  data() {
    return {
      tableData: [], //项目数据
      multipleSelection: [],
      dialogVisible1: false,
      dialogVisible2: false,
      projectForm: {
        name: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入项目名称", trigger: "blur" },
          { min: 3, max: 15, message: "长度在 3 到 15 个字符", trigger: "blur" }
        ]
      },
      totalPage: 0,
      files: [], //上传的文件夹
      currentPage: 1
    };
  },
  mounted() {
    this.getTotalPage();
    this.getProject();
  },
  methods: {
    //获取页数
    getTotalPage() {
      getProjectCount(this.$store.getters.id)
        .then(res => {
          //console.log(res);
          this.totalPage = res;
        })
        .catch(err => {
          this.$message.error("获取页数失败");
        });
    },
    //获取项目
    getProject() {
      getProjectList(this.$store.getters.id, this.currentPage)
        .then(res => {
          this.tableData = res;
        })
        .catch(err => {
          this.$message.error("获取项目列表失败");
        });
    },
    //选择文件
    getFiles(event) {
      var files = event.target.files;
      for (var i = 0; i < files.length; i++) {
        this.files.push(files[i]);
        //console.log(this.files[i]);
      }
    },
    //上传项目
    upload() {
      if (this.files.length == 0) {
        this.$message.error("请选择项目文件");
        return;
      }
      this.$refs["projectForm"].validate(valid => {
        if (valid) {
          var formData = new FormData();
          for (var i = 0; i < this.files.length; i++) {
            formData.append("files", this.files[i]);
            //console.log(this.files[i]);
          }
          formData.append("id", this.$store.getters.id);
          formData.append("userDefineName", this.projectForm.name);
          uploadProject(formData)
            .then(res => {
              this.$message.success("上传项目成功");
              //console.log(res);
              this.getTotalPage();
              this.getProject();
              this.dialogVisible2 = false;
              this.resetForm();
            })
            .catch(err => {
              this.$message.error("上传项目失败");
              console.log(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //日期格式formmater
    dateformatter(row, column) {
      return row.uploaddate.substr(0, 10);
    },
    //选择文件
    choosefile() {
      document.getElementById("oldbutton").click();
    },
    //重置上传文件表单
    resetForm() {
      this.files = [];
      this.projectForm.name = "";
    },
    //关闭上传文件dialog
    closedialog() {
      this.resetForm();
      this.dialogVisible2 = false;
    },
    //点击进入分析按钮
    handleClick(row) {
      this.dialogVisible1 = true;
      this.$store.commit("SET_PROJECT", row); //将选择的项目信息存入vuex中保存，以便之后访问
      //console.log(row);
    },
    // deleteBatch() {
    //   console.log("批量删除");
    // },
    // handleDownload(index, row) {
    //   console.log(index, row);
    // },
    // handleDelete(index, row) {
    //   console.log(index, row);
    // },
    //进入结构分模块
    toStructureAnalysis() {
      this.dialogVisible1 = false;
      console.log(this.$store.getters.project.id);
      this.$router.push({ name: "ProjectAnalyze", params: { id: this.$store.getters.project.id } });
    },
    //进入逆向模块
    toReengineering() {
      this.dialogVisible1 = false;
      this.$store.commit("SET_VSIDX",0);
      this.$store.commit("SET_LABEL","");
      this.$router.push("/reengineering");
    }
    // changeFile(file, fileList) {},
    // handleRemove(file, fileList) {}
  }
};
</script>

<style scoped>
.el {
  font-weight: bolder;
}
.content {
  margin: 15px 0px;
  /* text-align: center; */
}
/* .el-button--primary {
    color: #FFF;
    background-color: rgb(101, 165, 253);
    border-color: #409EFF;
} */
.upload-demo {
  margin: 0 auto;
}
</style>
<style>
.el-upload {
  width: 100%;
}
.el-upload-dragger {
  width: 100%;
  height: 180px;
}
#oldbutton {
  display: none;
}
</style>
