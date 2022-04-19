<template>
  <el-card style="height:100%">
    <!-- 标题
    <span style="font-size:18px; font-weight: bolder">逆向工程</span> -->
    <!-- 项目信息 -->
    <div style="line-height:24px">
      <!-- <p>项目ID：{{ getProjectInfo.id }}</p> -->

      <i class="el-icon-info" style="font-size: 22px;vertical-align:middle"></i>
      <span style="font-size:18px;vertical-align:middle">当前分析项目名称：{{ getProjectInfo.projectname }}</span>
    

    </div>
    <!-- 内容 -->
    <div class="content">
      <el-button-group>
        <el-button type="primary" @click="diagram = 1">类图</el-button>
        <el-button type="primary" @click="toDiagram(2)">控制流图</el-button>
        <el-button type="primary" @click="toDiagram(3)">数据依赖</el-button>
        <el-button type="primary" @click="toDiagram(4)"
          >基于控制流的数据依赖</el-button
        >
      </el-button-group>
      <el-tag class="labeltag" size="large" effect="dark" v-if="getLabel!=''">Label:{{getLabel}}</el-tag>
      <class-diagram v-if="this.diagram === 1"></class-diagram>
      <control-flow v-if="this.diagram === 2"></control-flow>
      <data-dependence
        :diagramType="diagram"
        v-if="this.diagram === 3 || this.diagram === 4"
      ></data-dependence>
    </div>
    <el-dialog :visible.sync="dialogVisible" title="目录">
      <span>请选择要分析的java文件</span>

      <el-tree
        :data="dir"
        :props="defaultProps"
        @node-click="handleNodeClick"
      ></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>

<script>
import ClassDiagram from "@/views/ReverseEngineering/ClassDiagram";
import ControlFlow from "@/views/ReverseEngineering/ControlFlow";
import { getDirectory } from "@/network/reengineering.js";
import DataDependence from "@/views/ReverseEngineering//DataDependence";
export default {
  name: "ReengineeringIndex", //组件名称
  data() {
    //组件中所用的数据
    return {
      dir: [],
      dialogVisible: false,
      defaultProps: {
        children: "children",
        label: "nodeShortName"
      },
      diagram:this.$store.getters.diagram_idx, //从1-4分别代表当前所显示的图像：类图、控制流图、数据依赖、基于控制流的数据依赖
      diagram_record: 0, //记录下点击的按钮所选择的diagram
      fileinfo: {}, //选择的文件
      //ctrl: false //是否带控制流
    };
  },
  mounted() {},
  computed: {
    getProjectInfo() {
      return this.$store.getters.project;
    },
    getLabel(){
      return this.$store.getters.label;
    },
    // getDiagram(){
    //   return  this.$store.getters.diagram_idx;
    // }
  }, //计算属性
  methods: {
    handleNodeClick(data) {
      //console.log(data)
      this.fileinfo = data;
    },
    submit() {
      if (this.fileinfo.nodeShortName.indexOf(".java") != -1) {
        this.$store.commit("SET_FILEPATH", this.fileinfo.nodePath);
        // if (this.diagram_record == 3) {
        //   this.ctrl = false;
        // } else {
        //   this.ctrl = true;
        // }
        this.diagram = this.diagram_record;
        this.dialogVisible = false;
        this.$store.commit("SET_LABEL","");
      } else this.$message.error("请选择java文件");
    },
    toDiagram(n) {
      getDirectory(this.getProjectInfo.id)
        .then(res => {
          //console.log(res);
          this.dir = res;
          this.dialogVisible = true;
          this.diagram_record = n;
        })
        .catch(err => {
          console.log(err);
          this.$message.error("获取目录信息失败");
        });
    }
  }, //组件中所使用方法，如向后端请求数据
  components: {
    ClassDiagram,
    ControlFlow,
    DataDependence
  } //在此注册此组件中要使用的其他组件（.vue）
};
</script>

<style scoped>
.content {
  margin-top: 10px;
}
.labeltag{
  float:right;
}
.el-tag--dark {
    background-color: #373d41;
    border-color: #373d41;
    color: #fff;
}
.el-tag{
  height:42px;
  line-height: 42px;
  font-size: 13px;
  font-weight: 600;
}
.el-button{
  font-weight: 600;
}
</style>
