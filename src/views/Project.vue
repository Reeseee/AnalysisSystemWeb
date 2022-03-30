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
      <el-button type="danger" @click="deleteBatch()" size="medium"
        ><i class="el-icon-delete"> 批量删除</i>
      </el-button>

      <!-- 项目表 -->
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column type="index" width="50"> </el-table-column>
        <el-table-column prop="projectName" label="项目名称" sortable>
        </el-table-column>
        <el-table-column prop="uploadDate" label="上传日期" sortable>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleDownload(scope.$index, scope.row)"
              ><i class="el-icon-download"></i
            ></el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              ><i class="el-icon-delete"></i
            ></el-button>
            <el-button size="mini" type="primary" @click="dialogVisible1 = true"
              >进入分析</el-button
            >
          </template>
        </el-table-column>
      </el-table>
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
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        class="demo-logList"
      >
        <el-form-item label="项目名称" prop="logName">
          <el-input v-model="ruleForm.logName" class="textInput"></el-input>
        </el-form-item>

        <el-form-item prop="file" class="uploadFile">
          <el-upload
            ref="upload"
            class="upload-demo"
            drag
            action="#"
            :limit="1"
            :show-file-list="true"
            :with-credentials="true"
            :on-change="changeFile"
            :on-remove="handleRemove"
            accept=".txt, .xes"
            :auto-upload="false"
          >
            <!-- :on-progress="onUpload"     :before-upload="beforeAvatarUpload"  :on-success="upFile"-->
            <!--是否支持多选文件  multiple  -->
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或<em>点击上传</em>
            </div>
            <div class="el-upload__tip" slot="tip">
              提示：上传文件夹？
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item style="text-align:center">
          <el-button size="mini" @click="closeTheDialog()">取消</el-button>
          <el-button size="mini" @click="resetForm('ruleForm')">重置</el-button>
          <el-button type="primary" size="mini" @click="uploadLog('ruleForm')"
            >确定</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  name: "Project", //组件的名称
  data() {
    //组件中所用的数据
    return {
      tableData: [
        {
          uploadDate: "2016-05-03",
          projectName: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          uploadDate: "2016-05-02",
          projectName: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          uploadDate: "2016-05-04",
          projectName: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          uploadDate: "2016-05-01",
          projectName: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          uploadDate: "2016-05-08",
          projectName: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          uploadDate: "2016-05-06",
          projectName: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          uploadDate: "2016-05-07",
          projectName: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ],
      multipleSelection: [],
      dialogVisible1: false,
      dialogVisible2: false,
      ruleForm: {},
      rules: {}
    };
  },
  methods: {
    //组件中所使用或触发的方法，如向后端请求数据
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    uploadProject() {
      console.log("上传项目");
    },
    deleteBatch() {
      console.log("批量删除");
    },
    handleDownload(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    //进入结构分模块
    toStructureAnalysis() {
      this.dialogVisible1 = false;
      this.$router.push("/analysis");
    },
    //进入逆向模块
    toReengineering() {
      this.dialogVisible1 = false;
      this.$router.push("/reengineering");
    },
    changeFile(file, fileList) {},
    handleRemove(file, fileList) {}
  }
};
</script>

<style scoped>
.el {
  font-weight: bolder;
}
.content {
  margin: 15px 0px;
}
/* .el-button--primary {
    color: #FFF;
    background-color: rgb(101, 165, 253);
    border-color: #409EFF;
} */
.upload-demo{
    margin: 0 auto;
}

</style>
<style>
.el-upload{
    width: 100%;
}
.el-upload-dragger {
    
    width: 100%;
    height: 180px;
   
}
</style>
