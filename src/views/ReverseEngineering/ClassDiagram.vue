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
      style="background-color: #f2f2f2;border: solid 2px black; width:100%;height:600px;justify-content: center;margin: 0 auto;"
    ></div>
    <div id="myOverviewDiv"></div>
   
    <el-button style="float:right" @click="exportJson">结果导出</el-button>
  </div>
</template>

//组件行爲

<script>
import {
  getClassDiagram,
  exportClassDiagram
} from "@/network/reengineering.js";
export default {
  name: "ClassDiagram",
  data() {
    return {
      myDiagram: null, //获取的类图
      nodedata: [],
      linkdata: [],
      loading: true,
      label: ""
    };
  },

  computed: {},
  mounted() {
    this.loading = true;
    let _this = this;
    getClassDiagram(this.$store.getters.project.id, this.$store.getters.id)
      .then(res => {
        //console.log(res);
        this.nodedata = res.classes;
        this.linkdata = res.relations;
        this.label=res.label;
        this.$store.commit("SET_LABEL",res.label);
        const $ = go.GraphObject.make;

        var myDiagram = $(go.Diagram, "myDiagramDiv", {
          layout: $(go.TreeLayout, {
            // this only lays out in trees nodes connected by "generalization" links---ConvertIsTreeLink function
            angle: 90,
            path: go.TreeLayout.PathSource, // links go from child to parent
            setsPortSpot: false, // keep Spot.AllSides for link connection spot
            setsChildPortSpot: false, // keep Spot.AllSides
            // nodes not connected by "generalization" links are laid out horizontally
            arrangement: go.TreeLayout.ArrangementHorizontal
          }),
          //力导向布局
          // layout: $(go.ForceDirectedLayout, {
          //   defaultSpringLength: 50,
          //   defaultSpringStiffness: 0.001,

          // }),
          //层次布局(较慢)
          //   layout: $(go.LayeredDigraphLayout, {
          //     direction: 0
          //   }),
          initialAutoScale: go.Diagram.Uniform,
          "undoManager.isEnabled": false
          // "toolManager.mouseWheelBehavior": go.ToolManager.WheelZoom
        });
        // show visibility or access as a single character at the beginning of each property or method
        function convertVisibility(v) {
          switch (v) {
            case "public":
              return "+";
            case "private":
              return "-";
            case "protected":
              return "#";
            case "package":
              return "~";
            default:
              return v;
          }
        }
        // the item template for properties
        var propertyTemplate = $(
          go.Panel,
          "Horizontal",
          // property visibility/access
          $(
            go.TextBlock,
            { isMultiline: false, editable: false, width: 12 },
            new go.Binding("text", "modifier", m => {
              return m.substr(0, 1);
            })
          ),
          // property name, underlined if scope=="class" to indicate static property
          $(
            go.TextBlock,
            { isMultiline: false, editable: false },
            new go.Binding("text", "propertyName").makeTwoWay(),
            new go.Binding("isUnderline", "scope", s => s[0] === "c")
          ),
          // property type, if known
          $(
            go.TextBlock,
            "",
            new go.Binding("text", "type", t => (t ? ": " : ""))
          ),
          $(
            go.TextBlock,
            { isMultiline: false, editable: false },
            new go.Binding("text", "type").makeTwoWay()
          ),
          // property default value, if any
          $(
            go.TextBlock,
            { isMultiline: false, editable: false },
            new go.Binding("text", "default", s => (s ? " = " + s : ""))
          )
        );
        // the item template for methods
        var methodTemplate = $(
          go.Panel,
          "Horizontal",
          // method visibility/access
          $(
            go.TextBlock,
            { isMultiline: false, editable: false, width: 12 },
            new go.Binding("text", "modifier", m => {
              return m.substr(0, 1);
            })
          ),
          // method name, underlined if scope=="class" to indicate static method
          $(
            go.TextBlock,
            { isMultiline: false, editable: false },
            new go.Binding("text", "methodName").makeTwoWay(),
            new go.Binding(
              "isUnderline",
              "modifier",
              m => m.indexOf("static") != -1
            )
          ),
          // method parameters
          $(
            go.TextBlock,
            "()",
            new go.Binding(
              "isUnderline",
              "modifier",
              m => m.indexOf("static") != -1
            ),
            // this does not permit adding/editing/removing of parameters via inplace edits
            new go.Binding("text", "parameters", function(parr) {
              var s = "(";
              for (var i = 0; i < parr.length; i++) {
                var param = parr[i];
                if (i > 0) s += ", ";
                s += param.name + ": " + param.type;
              }
              return s + ")";
            })
          ),
          // method return type, if any
          $(
            go.TextBlock,
            "",
            new go.Binding("text", "return_type", t => (t ? ": " : "")),
            new go.Binding(
              "isUnderline",
              "modifier",
              m => m.indexOf("static") != -1
            )
          ),
          $(
            go.TextBlock,
            { isMultiline: false, editable: false },
            new go.Binding("text", "return_type").makeTwoWay(),
            new go.Binding(
              "isUnderline",
              "modifier",
              m => m.indexOf("static") != -1
            )
          )
        );
        // this simple template does not have any buttons to permit adding or
        // removing properties or methods, but it could!
        myDiagram.nodeTemplate = $(
          go.Node,
          "Auto",
          {
            locationSpot: go.Spot.Center,
            fromSpot: go.Spot.AllSides,
            toSpot: go.Spot.AllSides
          },
          $(go.Shape, { fill: "lightyellow" }),
          $(
            go.Panel,
            "Table",
            { defaultRowSeparatorStroke: "black" },
            //header
            $(
              go.Panel,
              "Vertical",
              {
                row: 0,
                columnSpan: 3,
                margin: 3,
                alignment: go.Spot.Center
              },
              //如果是特殊类就显示这一行:Abstract/Interface
              $(
                go.TextBlock,
                {
                  alignment: go.Spot.Center,
                  margin: 2,
                  font: "Italic normal normal 12px Georgia, Serif",
                  isMultiline: false,
                  editable: false,
                  text: "<<interface>>"
                },
                new go.Binding("visible", "isInterface")
              ),
              $(
                go.TextBlock,
                {
                  row: 0,
                  columnSpan: 2,
                  margin: 3,
                  alignment: go.Spot.Center,
                  font: "bold 12pt sans-serif",
                  isMultiline: false,
                  editable: false
                },
                new go.Binding("text", "className").makeTwoWay()
              )
            ),
            // properties
            $(
              go.TextBlock,
              "Properties",
              { row: 1, font: "italic 10pt sans-serif" },
              new go.Binding("visible", "visible", v => !v).ofObject(
                "PROPERTIES"
              )
            ),
            $(
              go.Panel,
              "Vertical",
              { name: "PROPERTIES" },
              new go.Binding("itemArray", "properties"),
              {
                row: 1,
                margin: 3,
                stretch: go.GraphObject.Fill,
                defaultAlignment: go.Spot.Left,
                background: "lightyellow",
                itemTemplate: propertyTemplate
              }
            ),
            $(
              "PanelExpanderButton",
              "PROPERTIES",
              {
                row: 1,
                column: 1,
                alignment: go.Spot.TopRight,
                visible: false
              },
              new go.Binding("visible", "properties", arr => arr.length > 0)
            ),
            // methods
            $(
              go.TextBlock,
              "Methods",
              { row: 2, font: "italic 10pt sans-serif" },
              new go.Binding("visible", "visible", v => !v).ofObject("METHODS")
            ),
            $(
              go.Panel,
              "Vertical",
              { name: "METHODS" },
              new go.Binding("itemArray", "methods"),
              {
                row: 2,
                margin: 3,
                stretch: go.GraphObject.Fill,
                defaultAlignment: go.Spot.Left,
                background: "lightyellow",
                itemTemplate: methodTemplate
              }
            ),
            $(
              "PanelExpanderButton",
              "METHODS",
              {
                row: 2,
                column: 1,
                alignment: go.Spot.TopRight,
                visible: false
              },
              new go.Binding("visible", "methods", arr => arr.length > 0)
            )
          )
        );
        function convertIsTreeLink(r) {
          return true;
        }

        function convertFromArrow(r) {
          switch (r) {
            case "generalization":
              return "";
            default:
              return "";
          }
        }

        function convertToArrow(r) {
          switch (r) {
            case "generalization": //继承/泛化：实线空心三角形
              return "Triangle";
            case "association": //关联：实线普通箭头>
              return "Boomerang";
            case "aggregation": ///聚合：实线空心棱形
              return "StretchedDiamond";
            case "composition": //组合：实现实心棱形
              return "StretchedDiamond";
            case "realization": //实现：虚线空心三角形
              return "Triangle";
            case "dependency": //依赖：虚线普通箭头>
              return "Boomerang";
            default:
              return "";
          }
        }

        myDiagram.linkTemplate = $(
          go.Link,
          {
            routing: go.Link.Orthogonal
            //routing: go.Link.AvoidsNodes, //速度比较慢
            // toShortLength: 6,
            // toEndSegmentLength: 20,
            // corner: 3,
            // curve: go.Link.JumpGap,
          },
          new go.Binding(
            "isLayoutPositioned",
            "relationship",
            convertIsTreeLink
          ),
          $(
            go.Shape,
            {},
            new go.Binding("strokeDashArray", "relationship", function(
              relationship
            ) {
              if (relationship == "realization" || relationship == "dependency")
                return [4, 4];
              else return null;
            })
          ),

          $(
            go.Shape,
            { scale: 1.3, fill: "white" },
            new go.Binding("fromArrow", "relationship", convertFromArrow)
          ),
          $(
            go.Shape,
            { scale: 1.3, fill: "white" },
            new go.Binding("toArrow", "relationship", convertToArrow)
          )
        );

        myDiagram.model = new go.GraphLinksModel({
          copiesArrays: true,
          copiesArrayObjects: true,
          nodeDataArray: this.nodedata,
          linkDataArray: this.linkdata
        });
        _this.loading = false;
        // Overview
        var myOverview = $(
          go.Overview,
          "myOverviewDiv", // the HTML DIV element for the Overview
          { observed: myDiagram, contentAlignment: go.Spot.Center }
        ); // tell it which Diagram to show and pan
      })
      .catch(function(error) {
        console.log(error);
        _this.loading = false;
        _this.$message.error("获取类图失败");
      });
  },
  methods: {
    exportJson() {
      exportClassDiagram(this.$store.getters.project.id, this.$store.getters.id)
        .then(res => {
          var blob = new Blob([res]);
          var downloadElement = document.createElement("a");
          downloadElement.style.display = "none";
          var href = window.URL.createObjectURL(blob); //创建下载的链接
          downloadElement.href = href;
          downloadElement.download = this.label+".json"; //下载后文件名
          document.body.appendChild(downloadElement);
          downloadElement.click(); //点击下载
          document.body.removeChild(downloadElement); //下载完成移除元素
          window.URL.revokeObjectURL(href); //释放掉blob对象
        })
        .catch(err => {
          //console.log(err);
          this.$message.error("文件下载失败");
        });
    }
  }
};
</script>

//組件樣式
<style>
#myOverviewDiv {
  position: absolute;
  width: 200px;
  height: 100px;
  top: 10px;
  left: 10px;
  background-color: #f2f2f2;
  z-index: 300; /* make sure its in front */
  border: solid 1px black;
}
</style>
