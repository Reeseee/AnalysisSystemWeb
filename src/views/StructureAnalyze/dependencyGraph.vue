<template>
  <div>
    <div>
      <div class="sameLine">当前项目为:</div>
      <div class="sameLine">{{ this.id }}</div>
      <div class="sameLine">
        <el-menu
          :default-active="toIndex()"
          mode="horizontal"
          background-color="#373d41"
          @select="handleSelect"
        >
          <el-menu-item index="1">生成项目调用关系</el-menu-item>
          <el-menu-item index="2">生成项目依赖关系</el-menu-item>
        </el-menu>
      </div>
    </div>

    <el-container style="height: 500px; border: 1px solid #eee">
      <el-header style="text-align: center; font-size: 12px">
        <span>项目分析结果</span>
      </el-header>

      <el-container>
        <el-main>
          <div class="sameLine">项目依赖图</div>
          <el-button size="small" type="primary" @click="downloadFile"
            >导出</el-button
          >

          <div class="g6-x" id="containerG6" ref="containerG6"></div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import G6 from "@antv/g6";
import axios from "axios";
import {
  getProjectDependency,
  exportProjectDependency
} from "@/network/structureanalyze.js";
export default {
  name: "DependencyGraph",
  data() {
    return {
      data: [
        {
          label: "一级 1",
          children: [
            {
              label: "二级 1-1",
              children: [
                {
                  label: "三级 1-1-1"
                }
              ]
            }
          ]
        },
        {
          label: "一级 2",
          children: [
            {
              label: "二级 2-1",
              children: [
                {
                  label: "三级 2-1-1"
                }
              ]
            },
            {
              label: "二级 2-2",
              children: [
                {
                  label: "三级 2-2-1"
                }
              ]
            }
          ]
        },
        {
          label: "一级 3",
          children: [
            {
              label: "二级 3-1",
              children: [
                {
                  label: "三级 3-1-1"
                }
              ]
            },
            {
              label: "二级 3-2",
              children: [
                {
                  label: "三级 3-2-1"
                }
              ]
            }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      },
      id: 0,
      graph: null,
      gdata: null,
      userId: 1,
      isloading: false
    };
  },
  mounted() {
    this.id = this.$route.query.id;
    this.userId = this.$store.getters.id;
    this.getDependencyInformation();
  },
  methods: {
    testAxios() {
      return axios.get("/user", {
        params: {
          name: "virus"
        }
      });
    },
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
    handleCommand(command) {
      if (command == "loginout") {
        localStorage.removeItem("ms_username");
        this.$router.push("/login");
      }
    },
    initTree() {
      // const gdata = {
      //   // 点集
      //   nodes: [
      //     {
      //       id: "node1", // String，该节点存在则必须，节点的唯一标识
      //       label: "xx"
      //       // x: 100, // Number，可选，节点位置的 x 值
      //       // y: 200 // Number，可选，节点位置的 y 值
      //     },
      //     {
      //       id: "node2", // String，该节点存在则必须，节点的唯一标识
      //       label: "yy"
      //       // x: 300, // Number，可选，节点位置的 x 值
      //       // y: 200 // Number，可选，节点位置的 y 值
      //     }
      //   ],
      //   // 边集
      //   edges: [
      //     {
      //       source: "node1", // String，必须，起始点 id
      //       target: "node2" // String，必须，目标点 id
      //     }
      //   ]
      // };
      const containerG6 = this.$refs.containerG6;
      const width = 1000;
      const height = 300;
      const minimap = new G6.Minimap({
        size: [120, 80]
      });
      this.graph = new G6.Graph({
        container: containerG6,
        width,
        height,
        linkCenter: true,
        layout: {
          type: "dagre",
          rankdir: "LR",
          align: "DL",
          nodesepFunc: () => 1,
          ranksepFunc: () => 1
        },
        defaultNode: {
          size: [300, 40],
          type: "rect",
          style: {
            fill: "#e4e387",
            stroke: "#00000"
          }
        },
        defaultEdge: {
          label: "dep",
          style: {
            stroke: "#f96000",
            lineAppendWidth: 15,
            endArrow: {
              path: G6.Arrow.triangle(18, 24, 30), // 使用内置箭头路径函数，参数为箭头的 宽度、长度、偏移量（默认为 0，与 d 对应）
              d: 30
            }
          }
        },
        modes: {
          default: ["drag-canvas", "zoom-canvas"]
        },
        plugins: [minimap]
      });
      console.log(this.gdata);
      this.graph.data(this.gdata); // 读取 Step 2 中的数据源到图上

      let container = document.getElementById("containerG6");
      let w = container.offsetWidth;
      let h = container.offsetHeight;

      this.graph.changeSize(w, h);
      this.graph.render(); // 渲染图
    },
    downloadFile() {
      exportProjectDependency(this.id, this.userId)
        .then(response => {
          //文件名 文件保存对话框中的默认显示
          var timestamp = new Date().getTime();
          let fileName = timestamp + ".dep";
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
    getDependencyInformation() {
      getProjectDependency(this.id, this.userId).then(response => {
        this.gdata = response;
        console.log(response);
        console.log(this.gdata);
        this.isloading = true;
        this.initTree();
      });
    }
  }
};
</script>

<style scoped>
#building {
  /* background: url("../assets/images/typebg.jpg"); */
  width: 100%;
  height: 100%;
  position: fixed;
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
  margin-top: 0px;
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

.g6-x {
  width: 100wh;
  height: 50vh;
  box-sizing: border-box;
  border: 1px solid #000;
  margin-left: 10px;
  background-color: rgba(168, 194, 127, 0.802);
}

.g6-x >>> .g6-minimap {
  background-color: rgb(236, 167, 132);
  background-color: #f96000;
  float: right;
}
</style>
