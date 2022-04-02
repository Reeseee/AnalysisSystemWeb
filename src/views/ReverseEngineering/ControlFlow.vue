<template>
  <div style="position: relative;">
    <div
      ref="diagram"
      id="myDiagramDiv"
      style="background-color: #f2f2f2;border: solid 2px black; width:100%;height:490px;justify-content: center;margin: 0 auto;"
    ></div>
  </div>
</template>

<script>
import { getVSResultControlFlowjson } from "@/network/reengineering.js";
export default {
  name: "ControlFlow",
  data() {
    //组件中所用的数据
    return {
      nodedata: [
        {
          key: 1,
          text: "Cognitive Procedural",
          loc: "300 300",
          category: "center"
        },
        {
          key: 2,
          text: "Cognitive Problem Solving",
          loc: "600 300",
          category: "center",
          hicolor: "lightblue",
          hiwidth: 7
        },
        { key: 11, text: "Logical Reasoning", loc: "450 275" },
        { key: 12, text: "Scaffolding", loc: "450 325" },
        { key: 13, text: "Part Task Training", loc: "425 400" },
        { key: 21, text: "Training Wheels", loc: "325 125" },
        { key: 22, text: "Exploratory Learning", loc: "250 150" },
        { key: 23, text: "Learner Control", loc: "650 150" },
        { key: 31, text: "Overlearning", loc: "450 475" }
      ],
      linkdata: [
        { from: 1, to: 11, color: "gray" },
        { from: 1, to: 12, color: "gray", dash: [3, 2] },
        { from: 1, to: 13, color: "olive", width: 2 },
        { from: 1, to: 21, color: "olive", width: 3 },
        { from: 1, to: 22, color: "olive", width: 2 },
        { from: 1, to: 23, color: "crimson", width: 2 },
        { from: 1, to: 31 },
        { from: 2, to: 11, color: "gray" },
        { from: 2, to: 12, color: "olive", width: 2 },
        { from: 2, to: 13, color: "gray", dash: [3, 2] },
        { from: 2, to: 21, color: "crimson", width: 2 },
        { from: 2, to: 22, color: "crimson", width: 2 },
        { from: 2, to: 23, color: "black", width: 3 },
        { from: 2, to: 31, color: "black", dash: [3, 2] }
      ]
    };
  },
  mounted() {
    let _this = this;

    getVSResultControlFlowjson()
      .then(res => {
        _this.nodedata = res.data.nodes;
        _this.linkdata = res.data.edges;
        // For details, see https://gojs.net/latest/intro/buildingObjects.html
        const $ = go.GraphObject.make; // for conciseness in defining templates

        // some constants that will be reused within templates

        var myDiagram = $(
          go.Diagram,
          "myDiagramDiv", // must name or refer to the DIV HTML element
          {
            // have mouse wheel events zoom in and out instead of scroll up and down
            "toolManager.mouseWheelBehavior": go.ToolManager.WheelZoom,
            initialAutoScale: go.Diagram.Uniform, //显示整个图形
            layout: $(go.LayeredDigraphLayout)
          }
        );

        // define the Node template
        myDiagram.nodeTemplate = $(
          go.Node,
          "Auto",
          {
            //locationSpot: go.Spot.Top,
            isShadowed: true,
            shadowBlur: 1,
            shadowOffset: new go.Point(0, 1),
            shadowColor: "rgba(0, 0, 0, .14)"
          },
          // define the node's outer shape, which will surround the TextBlock
          $(go.Shape, "RoundedRectangle", {
            name: "SHAPE",
            fill: "#ffffff",
            strokeWidth: 0,
            stroke: null,
            cursor: "pointer"
          }),
          $(
            go.TextBlock,
            {
              font: "bold small-caps 11pt helvetica, bold arial, sans-serif",
              margin: 7,
              stroke: "rgba(0, 0, 0, .87)",
              editable: false // editing the text automatically updates the model data
            },
            new go.Binding("text","label").makeTwoWay()
          )
        );

        // replace the default Link template in the linkTemplateMap
        myDiagram.linkTemplate = $(
          go.Link, // the whole link panel
          {
            curve: go.Link.Bezier,
            adjusting: go.Link.Stretch
            //toShortLength: 3
          },
          new go.Binding("points").makeTwoWay(),
          new go.Binding("curviness"),
          $(
            go.Shape, // the link shape
            { strokeWidth: 1.5 }
          ),
          //from arrow
          $(
            go.Shape,
            { fromArrow: "standard", stroke: null },
            new go.Binding("from","source"),
          ),
          //to arrow
          $(
            go.Shape, // the arrowhead
            { toArrow: "standard", stroke: null },
            new go.Binding("to","target"),
          ),
          $(
            go.Panel,
            "Auto",
            $(
              go.Shape, // the label background, which becomes transparent around the edges
              {
                fill: $(go.Brush, "Radial", {
                  0: "rgb(245, 245, 245)",
                  0.7: "rgb(245, 245, 245)",
                  1: "rgba(245, 245, 245, 0)"
                }),
                stroke: null
              }
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
              new go.Binding("text","label").makeTwoWay()
            )
          )
        );
        myDiagram.model = new go.GraphLinksModel({
          nodeDataArray: _this.nodedata,
          linkDataArray: _this.linkdata
        });
      })
      .catch(err => {
        console.log(err);
      });
  }, //组件刚挂载的一系列操作
  computed: {}, //计算属性
  methods: {}, //组件中所使用方法，如向后端请求数据
  components: {} //在此注册此组件中要使用的其他组件（.vue）
};
</script>

<style></style>
