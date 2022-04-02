<template>
  
    <div>
      <div class="wrapper">
        <!-- 页面头部部分 -->
        <div class="header">
          <div class="logo">代码分析系统</div>
          <!-- 水平一级菜单 -->
          <div style="float:left;">
            <el-menu
              :default-active="toIndex()"
              mode="horizontal"
              background-color="#000000"
              @select="handleSelect"
            >
              <el-menu-item index="1">我的项目</el-menu-item>
              <el-menu-item index="2">结构分析</el-menu-item>
              <el-menu-item index="3">逆向工程</el-menu-item>
              <el-menu-item index="4"
                ><a href="https://www.ele.me" target="_blank"
                  >历史操作</a
                ></el-menu-item
              >
            </el-menu>
          </div>

          <div class="header-right">
            <div class="header-user-con">
              <!-- 用户头像，根据需要自行修改图片路径 -->
              <!-- 用户名下拉菜单 -->
              <el-dropdown
                class="user-name"
                trigger="click"
                @command="handleCommand"
              >
                <span class="el-dropdown-link">
                  hh
                  <i class="el-icon-caret-bottom"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item disabled>修改密码</el-dropdown-item>
                  <el-dropdown-item command="loginout"
                    >退出登录</el-dropdown-item
                  >
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div class="word-v-middle">已上传项目为</div>
        <div>
          <el-table
            ref="multipleTable"
            :data="tableData"
            :header-cell-style="{ background: '#eef1f6', color: '#909399' }"
            border
            style="width: 100%"
            fixed
            @select="select"
            @row-click="rowClick"
            @selection-change="selectionChange"
            stripe
          >
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column label="id" width="300" align="center">
              <template slot-scope="scope">{{ scope.row.id }}</template>
            </el-table-column>
            <el-table-column
              prop="uploaddate"
              label="日期"
              width="400"
              align="center"
            >
              <template slot-scope="scope">{{ scope.row.uploaddate }}</template>
            </el-table-column>
            <el-table-column
              prop="projectname"
              label="项目名"
              width="500"
              align="center"
            >
            </el-table-column>
          </el-table>
        </div>

        <div style="padding-top: 10px">
          <el-pagination
            background
            layout="prev, pager, next"
            :page-count="totalPage"
            @current-change="getProjectPage"
          >
          </el-pagination>
        </div>
      </div>

      <div>
        选择文件夹<input
          @change="getFiles($event)"
          name="files"
          type="file"
          webkitdirectory
          mozdirectory
        /><br />
        <button @click="upload" type="submit">上传</button>
      </div>

      <div class="analyze-button">
        <!-- <el-button @click="test">进入项目分析</el-button> -->
        <router-link :to="{ name: 'ProjectAnalyze', params: { id: this.pid } }"
          >进入项目分析</router-link
        >
      </div>
    </div>
  
</template>

<script>
import axios from "axios";
// axios.defaults.headers[
//   "authorization"
// ] = `Bearer eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJobGMiLCJ1c2VySWQiOiIxIiwiZXhwIjoxNjQ4ODA4MzQ2fQ.Q_tiD8G-FCmu3AAcjxgT_qIGoY4ekDLwNyTXzF2hZmI`;
export default {
  name: "chooseProject",

  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "project1",
          id: "1"
        },
        {
          date: "2016-05-04",
          name: "project2",
          id: "2"
        },
        {
          date: "2016-05-01",
          name: "project3",
          id: "3"
        }
      ],
      selectData: "",
      pid: 0,
      userId: 1,
      pageNo: 1,
      totalPage: 10,
      token:
        "eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJobGMiLCJ1c2VySWQiOiIxIiwiZXhwIjoxNjQ3MjQ3NTA5fQ.FL0kdgYY7HqUuKnvST8HdmyVKRlCySmaEZaXfVCTL_4",
      files: [],
      ax : null
    };
  },
  created() {
    this.getTotalPage();
    this.getProjectPage();
  },
  methods: {
    testAxios() {
      return axios.get("/user", {
        params: {
          name: "virus"
        }
      });
    },
    // 根据路径绑定到对应的一级菜单，防止页面刷新重新跳回第一个
    toIndex() {
      return this.$route.path.split("/")[1];
    },
    handleSelect(index) {
      this.$router.push("/" + index);
    },
    handleCommand(command) {
      if (command == "loginout") {
        localStorage.removeItem("ms_username");
        this.$router.push("/login");
      }
    },
    select(selection, row) {
      // 清除 所有勾选项
      this.$refs.multipleTable.clearSelection();
      // 当表格数据都没有被勾选的时候 就返回
      // 主要用于将当前勾选的表格状态清除
      if (selection.length == 0) return;
      this.$refs.multipleTable.toggleRowSelection(row, true);
    },
    // 表格的选中 可以获得当前选中的数据
    selectionChange(val) {
      // 将选中的数据存储起来
      this.selectData = val;
      this.pid = val[0].id;
    },
    // 表格某一行的单击事件
    rowClick(row, column) {
      const selectData = this.selectData;
      this.$refs.multipleTable.clearSelection();
      if (selectData.length == 1) {
        selectData.forEach(item => {
          // 判断 如果当前的一行被勾选, 再次点击的时候就会取消选中
          if (item == row) {
            this.$refs.multipleTable.toggleRowSelection(row, false);
          }
          // 不然就让当前的一行勾选
          else {
            this.$refs.multipleTable.toggleRowSelection(row, true);
          }
        });
      } else {
        this.$refs.multipleTable.toggleRowSelection(row, true);
      }
    },
    test() {
      console.log(this.selectData);
      let name = this.selectData[0].name;
      console.log("name", name);
      console.log(this.pid);
    },
    getTotalPage() {
      let urlpath = "http://127.0.0.1:9001/myProject/listCount";
      axios
        .get(
          urlpath,
          { params: { userId: this.userId } },
          {
            responseType: "json"
            // withCredentials: true
          }
        )
        .then(response => {
          this.totalPage = response.data;
          console.log(response);
        });
    },
    getProjectPage() {
      let urlpath = "http://127.0.0.1:9001/myProject/list";
      axios
        .get(
          urlpath,
          { params: { userId: this.userId, pageNo: this.pageNo } },
          { headers: { Authorization: this.token } },
          {
            responseType: "json",
            withCredentials: true
          }
        )
        .then(response => {
          this.tableData = response.data;
          console.log(response);
        });
    },
    getFiles: function(event) {
				var files = event.target.files;
				for (var i = 0; i < files.length; i++) {
					this.files.push(files[i]);
				}
			},
			upload: function() {
				var formData = new FormData();
				for (var i = 0; i < this.files.length; i++) {
					formData.append('files', this.files[i]);
          console.log(this.files[i]);
				}
        formData.append('id',this.userId);
        formData.append('userDefineName',"xxx1");
				axios.post("http://127.0.0.1:9001/myProject/upload",formData,
        //{ params: {formd: formData, userDefineName: "xxx1" , userId: this.userId} },
         {
					headers: {
						//'Content-Type': 'multipart/form-data',
            'authorization': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJobGMiLCJ1c2VySWQiOiIxIiwiZXhwIjoxNjQ4NTI3NTE2fQ.MC0MxXZhpIBxla9GNpHp0VpqWlycno3bV22Nmk1jT4c`,
					}
				}).then(function(response) {
					console.log("succeed");
				}, function(err) {
          console.log("fail");
				})
			 }
  }
};
</script>

<style scoped>
/* #building {
  background: url("../assets/images/typebg.jpg");
  width: 100%;
  height: 100%;
  position: fixed;
  background-size: 100% 100%;
} */

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
  color: #ffffff;
  display: inline-block;
}

.word-v-middle {
  margin-bottom: 20px;
  font-size: 30px;
  min-height: 31px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 31px;
  margin-top: 30px;
  color: #ffffff;
  white-space: normal;
}
.analyze-button {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.router-link-active {
  text-decoration: none;
  color: #3989fa;
}
a {
  text-decoration: none;
  margin-top: 20px;
  font-size: 20px;
  color: #3989fa;
}
</style>
