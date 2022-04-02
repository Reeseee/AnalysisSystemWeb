<template>
  <el-card style="height:100%">
    <!-- 标题 -->
    <p style="font-size:18px; font-weight: bolder">操作记录</p>
    <!-- 内容 -->
    <div class="content">
      <el-table ref="logTable" :data="tableData" style="width: 100%">
        <el-table-column property="projectid" label="项目id" width="100">
        </el-table-column>
        <el-table-column property="filename" label="项目文件" :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column property="operatedate" label="操作时间" :formatter="timeformatter">
        </el-table-column>
        <el-table-column property="operation" label="操作"> </el-table-column>
        <el-table-column fixed="right" label="结果" width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small"
              >查看</el-button
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
          @current-change="getRecords"
          :current-page.sync="currentPage"
        >
        </el-pagination>
      </div>
    </div>
  </el-card>
</template>

<script>
import { getRecordList, getRecordCount } from "@/network/record.js";
export default {
  name: "Record", //组件名称
  data() {
    //组件中所用的数据
    return {
      tableData: [],
      totalPage: 0,
      currentPage: 1 //当前所在页数
    };
  },
  mounted() {
    this.getTotalPage();
    this.getRecords();
  }, //组件刚挂载的一系列操作
  computed: {}, //计算属性
  methods: {
    getTotalPage() {
      getRecordCount(this.$store.getters.id)
        .then(res => {
          //console.log(res);
          this.totalPage = res;
        })
        .catch(err => {
          this.$message.error("获取页数失败");
        });
    },
    getRecords() {
      getRecordList(this.$store.getters.id, this.currentPage)
        .then(res => {
          console.log(res);
          this.tableData = res;
        })
        .catch(err => {
          this.$message.error("获取项目列表失败");
        });
    },
    timeformatter(row, col) {
      var json_date = new Date(row.operatedate).toJSON();
      return new Date(new Date(json_date) + 8 * 3600 * 1000)
        .toISOString()
        .replace(/T/g, " ")
        .replace(/\.[\d]{3}Z/, "");
    },
    //查看跳转
    handleClick(row) {
      console.log(row.operateresult);
      this.$router.push(row.operateresult);
    }
  }, //组件中所使用方法，如向后端请求数据
  components: {} //在此注册此组件中要使用的其他组件（.vue）
};
</script>

<style></style>
