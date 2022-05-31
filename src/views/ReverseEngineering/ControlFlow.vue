<template>
  <div
    style="position: relative;"
    v-loading="loading"
    element-loading-text="加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <div
      ref="diagram"
      id="myDiagramDiv"
      style="background-color: #f2f2f2;border: solid 2px black; width:100%;height:600px;justify-content: center;margin:0 auto;"
    ></div>
    <div id="myOverviewDiv"></div>
    <el-button
      style="float:right"
      @click="exportJson"
      v-if="this.nodedata.length != 0"
      >结果导出</el-button
    >
  </div>
</template>

<script>
import {
  getVSResultControlFlowjson,
  getControlFlow,
  exportControlFlow
} from "@/network/reengineering.js";
export default {
  name: "ControlFlow",
  data() {
    return {
      myDiagram: {},
      nodedata: [],
      linkdata: [],
      loading: true,
      label: "", //图形的标签
      type: "" //图形的种类
    };
  },
  created() {},
  mounted() {
    this.init();
    this.drawDiagram();
  }, //组件刚挂载的一系列操作
  computed: {
    getFilePath() {
      return this.$store.getters.filepath;
    }
  },
  watch: {
    getFilePath(curval, oldval) {
      //this.init();
      this.drawDiagram();
    }
  },
  methods: {
    exportJson() {
      exportControlFlow(
        this.$store.getters.project.id,
        this.getFilePath,
        this.$store.getters.id
      )
        .then(res => {
          var blob = new Blob([res]);
          var downloadElement = document.createElement("a");
          downloadElement.style.display = "none";
          var href = window.URL.createObjectURL(blob); //创建下载的链接
          downloadElement.href = href;
          downloadElement.download =
            this.label.substr(0, this.label.indexOf(".java")) + ".json"; //下载后文件名
          document.body.appendChild(downloadElement);
          downloadElement.click(); //点击下载
          document.body.removeChild(downloadElement); //下载完成移除元素
          window.URL.revokeObjectURL(href); //释放掉blob对象
        })
        .catch(err => {
          //console.log(err);
          this.$message.error("文件下载失败");
        });
    },
    //初始化图形
    init() {
      let _this = this;
      const $ = go.GraphObject.make; // for conciseness in defining templates

      // some constants that will be reused within templates

      _this.myDiagram = $(
        go.Diagram,
        "myDiagramDiv", // must name or refer to the DIV HTML element
        {
          // have mouse wheel events zoom in and out instead of scroll up and down
          // "toolManager.mouseWheelBehavior": go.ToolManager.WheelZoom,

          initialAutoScale: go.Diagram.Uniform, //显示整个图形
          layout: $(go.LayeredDigraphLayout, {
            layerSpacing: 25,
            direction: 90,
            columnSpacing: 15,
            setsPortSpots: false
          })
        }
      );
      // Overview
      var myOverview = $(
        go.Overview,
        "myOverviewDiv", // the HTML DIV element for the Overview
        { observed: _this.myDiagram, contentAlignment: go.Spot.Center }
      ); // tell it which Diagram to show and pan
    },
    //绘制
    drawDiagram() {
      this.loading = true;
      let _this = this;
      //console.log(this.$store.getters.file.nodePath);
      getControlFlow(
        this.$store.getters.project.id,
        this.getFilePath,
        this.$store.getters.id
      )
        //getVSResultControlFlowjson()
        .then(res => {
          //console.log(res);
          if (res.code == 1) {
            if (res.result.nodes == undefined||res.result.nodes.length==0) {
              this.$message.error("该文件中不存在控制流，请重新选择项目或文件");
              _this.loading = false;
              return;
            }
            _this.nodedata = res.result.nodes;
            _this.linkdata =
              res.result.edges == undefined ? [] : res.result.edges;
            _this.label = res.result.label;
      
            _this.$store.commit("SET_LABEL", res.result.label);
            _this.type = res.result.type;
            // For details, see https://gojs.net/latest/intro/buildingObjects.html
            const $ = go.GraphObject.make;
            // define the Node template
            _this.myDiagram.nodeTemplate = $(
              go.Node,
              "Auto",
              {
                locationSpot: go.Spot.Center,
                isShadowed: true,
                shadowBlur: 1,
                shadowOffset: new go.Point(0, 1),
                shadowColor: "rgba(0, 0, 0, .14)"
              },
              // define the node's outer shape, which will surround the TextBlock
              $(go.Shape, "Ellipse", {
                name: "SHAPE",
                fill: "#ffffff",
                strokeWidth: 0,
                stroke: null,
                cursor: "pointer"
              }),
              $(
                go.Panel,
                "Horizontal",
                $(
                  go.TextBlock,
                  {
                    font: "bold 10pt sans-serif",
                    margin: new go.Margin(5, 5, 5, 5),
                    stroke: "rgba(0, 0, 0, .87)",
                    editable: false // editing the text automatically updates the model data
                  },
                  new go.Binding("text", "line", l => {
                    return l + ":";
                  }),
                  new go.Binding("visible", "line", l => {
                    return l != 0;
                  })
                ),
                $(
                  go.TextBlock,
                  {
                    font: "bold 10pt sans-serif",
                    margin: new go.Margin(5, 5, 5, 0),
                    stroke: "rgba(0, 0, 0, .87)",
                    editable: false // editing the text automatically updates the model data
                  },
                  new go.Binding("text", "label").makeTwoWay()
                )
              )
            );

            // replace the default Link template in the linkTemplateMap
            _this.myDiagram.linkTemplate = $(
              go.Link, // the whole link panel
              {
                curve: go.Link.Bezier,
                adjusting: go.Link.Stretch,
                toShortLength: 2
                // corner: 8,
                // toEndSegmentLength: 20,
                // toolTip: this.getTooltiptemplate()
              },
              new go.Binding("points").makeTwoWay(),
              new go.Binding("curviness"),
              $(
                go.Shape, // the link shape
                { strokeWidth: 1.5 }
              ),
              // //from arrow
              // $(
              //   go.Shape,
              //   { fromArrow: "standard", stroke: null },
              //   new go.Binding("from", "source")
              // ),
              //to arrow
              $(
                go.Shape, // the arrowhead
                { toArrow: "triangle", stroke: null },
                new go.Binding("to", "target")
              ),
              $(
                go.Panel,
                "Auto",
                $(
                  go.Shape, // the label background, which becomes transparent around the edges
                  {
                    fill: $(go.Brush, "Radial"),
                    stroke: null
                  },
                  new go.Binding("background", "label", function(t) {
                    return t === "" || t === "EPSILON"
                      ? "transparent"
                      : "rgba(245,245,245,0.75)";
                  })
                ),
                $(
                  go.TextBlock,
                  "", // the label text
                  {
                    textAlign: "center",
                    font: "9pt helvetica, arial, sans-serif",
                    margin: 4,
                    editable: false // enable in-place editing
                  },
                  // editing the text automatically updates the model data
                  new go.Binding("text", "label", function(l) {
                    return l === "EPSILON" ? "" : l;
                  })
                )
              )
            );

            _this.myDiagram.model = new go.GraphLinksModel({
              nodeDataArray: _this.nodedata,
              linkDataArray: _this.linkdata
            });

            _this.loading = false;
          } else {
            _this.$message.error(res.msg);
            _this.loading = false;
          }
        })
        .catch(err => {
          console.log(err);
          _this.loading = false;
          _this.$message.error("获取控制流图失败");
        });
    }
  },
  components: {} //在此注册此组件中要使用的其他组件（.vue）
};
</script>

<style scoped>
#myOverviewDiv {
  position: absolute;
  width: 200px;
  height: 100px;
  top: 10px;
  left: 10px;
  background-color: #f2f2f2;
  z-index: 300; /* make sure its in front */
  border: solid 1px #000000;
}
/* #myInfoDiv {
  position: absolute;
  width: 200px;
  height: 100px;
  top: 110px;
  left: 10px;
  background-color: #131212a4;
  z-index: 300; 
  border: solid 1px #000000;
} */
</style>
