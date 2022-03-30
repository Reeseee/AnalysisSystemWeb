<template>
  <el-card style="height:100%">
    <!-- 标题 -->
    <p style="font-size:18px; font-weight: bolder">操作记录</p>
    <!-- 内容 -->
    <div class="content">
      <el-table ref="logTable" :data="tableData" style="width: 100%">
        <el-table-column type="index" width="50"> </el-table-column>
        <el-table-column property="projectName" label="项目名称"> </el-table-column>
        <el-table-column property="fileName" label="项目文件"> </el-table-column>
        <el-table-column property="operateDate" label="操作时间"> </el-table-column>
        <el-table-column property="operation" label="操作"> </el-table-column>
        <el-table-column fixed="right" label="结果" width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small"
              >查看</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </el-card>
</template>

<script>
export default {
  name: "Record", //组件名称
  data() {
    //组件中所用的数据
    return {
      tableData: [
          {
              projectName:"test",
              fileName:"a.java",
              operateDate:"2021-3-2",
              operation:"cfgAnalysis",
              operateResult:"/controlFlow/analysis/1?userId = 1&fileName=/Users/katerina/Desktop/test1/test1.java"
          },
           {
              projectName:"test2",
              fileName:"b.java",
              operateDate:"2021-3-3",
              operation:"cfgAnalysis",
              operateResult:"/controlFlow/analysis/1?userId = 1&fileName=/Users/katerina/Desktop/test1/test1.java"
          },
           {
              projectName:"test3",
              fileName:"b.java",
              operateDate:"2021-3-4",
              operation:"ddgAnalysis",
              operateResult:"/dataDependence/analysis/1?userId = 1&fileName=/Users/katerina/Desktop/test1/test1.java"
          },
          
      ]
    };
  },
  mounted() {}, //组件刚挂载的一系列操作
  computed: {}, //计算属性
  methods: {
      handleClick(row) {
        console.log(row.operateResult);
      }
  }, //组件中所使用方法，如向后端请求数据
  components: {} //在此注册此组件中要使用的其他组件（.vue）
};
</script>

<style></style>
