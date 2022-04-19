<template>
  <el-card style="height:100%">
    <!-- 标题 -->
    <p style="font-size:18px; font-weight: bolder">操作记录</p>
    <!-- 内容 -->
    <div class="content">
      <el-table ref="logTable" :data="tableData" style="width: 100%">
        <el-table-column property="projectid" label="项目id" width="100">
        </el-table-column>
        <el-table-column
          property="filename"
          label="项目文件"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column
          property="operatedate"
          label="操作时间"
          :formatter="timeformatter"
        >
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
          //console.log(res);
          this.tableData = res;
        })
        .catch(err => {
          this.$message.error("获取项目列表失败");
        });
    },
    timeformatter(row, col) {
      // var json_date = new Date(row.operatedate).toJSON();
      // console.log(json_date);
      // return new Date(new Date(json_date) + 16 * 3600 * 1000)
      //   .toISOString()
      //   .replace(/T/g, " ")
      //   .replace(/\.[\d]{3}Z/, "");

      let time = new Date(Date.parse(row.operatedate));
      time.setTime(time.setHours(time.getHours()));

      // alert(time);
      // if (!isNaN(time)) {
      //     return new Date(Date.parse(date.replace(/-/g, "/")));
      // } else {
      let Y = time.getFullYear() + "-";
      let M = this.addZero(time.getMonth() + 1) + "-";
      let D = this.addZero(time.getDate()) + " ";
      let h = this.addZero(time.getHours()) + ":";
      let m = this.addZero(time.getMinutes()) + ":";
      let s = this.addZero(time.getSeconds());
      return Y + M + D + h + m + s;
      // }
    },
    // 数字补0操作
    addZero(num) {
      return num < 10 ? "0" + num : num;
    },
    //查看跳转
    handleClick(row) {
      //console.log(row);
      let n=this.operationConverter(row.operation);
      let name;
      if(n!=0){//逆向工程
        if(n!=1){
          var idx=row.filename.indexOf(":");
          this.$store.commit("SET_FILEPATH",row.filename.substring(idx+1));
          name=row.filename.substring(0,idx);
        }
        else{
          name=row.filename;
        }
        let pro={
          id:row.projectid,
          projectname:name,
        }
        this.$store.commit("SET_PROJECT",pro);
        this.$store.commit("SET_VSIDX",n);
        this.$store.commit("SET_LABEL","");
        this.$router.push(row.operateresult);
      }
      else if (row.operation == "ProjectAnalyze") {
        this.$router.push({
          name: "ProjectAnalyze",
          params: { id: rowprojectid }
        });
      } else if (row.operation == "/dependency" || row.operation == "/call") {
        const { href } = this.$router.resolve({
          path: row.operation,
          query: { id: row.projectid }
        });
        window.open(href, " blank");
      } else {
        const { href } = this.$router.resolve({
          path: row.operation,
          query: { id: row.projectid, filepath: row.filename }
        });
        window.open(href, "_blank");
      }
    },
    operationConverter(op){
      switch(op) {
        case "CDAnalyze":
          return 1;
        case "CFGAnalyze":
          return 2;
        case "DDGAnalyze":
          return 3;
        case "DDGWithCtrlAnalyze":
          return 4;
        default:
          return 0;
}
    }

  }, //组件中所使用方法，如向后端请求数据
  components: {} //在此注册此组件中要使用的其他组件（.vue）
};
</script>

<style></style>
