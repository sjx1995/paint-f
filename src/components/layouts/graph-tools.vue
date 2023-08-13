<!--
 * @Description: 图形工具栏
 * @Author: Sunly
 * @Date: 2023-08-07 04:49:46
-->
<script lang="ts" setup>
import { useCreateCanvas } from "@/hooks/use-fabric";
import { Icon } from "@iconify/vue";
import { fabric } from "fabric";
import { onMounted, nextTick } from "vue";
import { createLine } from "@/utils/fabric/line";
import { createRect } from "@/utils/fabric/rect";
import { createCircle } from "@/utils/fabric/circle";
import { createTextBox } from "@/utils/fabric/text-box";

enum EnumGraphType {
  LINE = "line",
  RECT = "rect",
  CIRCLE = "circle",
  TEXT = "text",
}

const graphs = [
  {
    icon: "pepicons-pop:line-x",
    type: EnumGraphType.LINE,
    name: "直线",
  },
  {
    icon: "iconoir:3d-rect-corner-to-corner",
    type: EnumGraphType.RECT,
    name: "矩形",
  },
  {
    icon: "material-symbols:circle-outline",
    type: EnumGraphType.CIRCLE,
    name: "圆形",
  },
  {
    icon: "cil:font",
    type: EnumGraphType.TEXT,
    name: "文字",
  },
];

const getGraph = (type: EnumGraphType) => {
  let willAddGraph: fabric.Object | null = null;

  switch (type) {
    case EnumGraphType.LINE:
      willAddGraph = createLine();
      break;
    case EnumGraphType.RECT:
      willAddGraph = createRect();
      break;
    case EnumGraphType.CIRCLE:
      willAddGraph = createCircle();
      break;
    case EnumGraphType.TEXT:
      willAddGraph = createTextBox("请输入文字");
      break;
    default:
      break;
  }

  return willAddGraph;
};

const handleClickAddGraph = (type: EnumGraphType) => {
  const willAddGraph = getGraph(type);
  if (!willAddGraph) {
    return;
  }
  useCreateCanvas()?.canvas?.add(willAddGraph);
};

const dragData = {
  x: 0,
  y: 0,
};

let isDragging = false;
let dragType: EnumGraphType | null;
const handleStartDrag = (type: EnumGraphType) => {
  dragType = type;
};
onMounted(() => {
  nextTick(() => {
    const canvas = useCreateCanvas()?.canvas;
    if (!canvas) {
      throw new Error("canvas is not found");
    }

    canvas.on("dragenter", () => {
      isDragging = true;
    });

    canvas.on("dragleave", () => {
      isDragging = false;
    });

    canvas.on("drop", (opt) => {
      if (isDragging && dragType) {
        isDragging = false;
        const { left, top } = canvas
          .getSelectionElement()
          .getBoundingClientRect();

        const { x, y } = opt.e;
        const point = canvas.restorePointerVpt({ x: x - left, y: y - top });
        dragData.x = point.x;
        dragData.y = point.y;

        const graph = getGraph(dragType);
        if (graph) {
          const width = graph.width;
          const height = graph.height;
          if (width && height) {
            graph.set({
              left: dragData.x - width / 2,
              top: dragData.y - height / 2,
            });
          } else {
            graph.set({
              left: dragData.x,
              top: dragData.y,
            });
          }
          canvas.add(graph);
        }
        dragType = null;
      }
    });
  });
});
</script>

<template>
  <div id="graph-tools-container">
    <div id="graphs">
      <div
        class="graph"
        v-for="graph of graphs"
        :key="graph.type"
        draggable="true"
        @dragstart="handleStartDrag(graph.type)"
        @click="handleClickAddGraph(graph.type)"
      >
        <Icon :icon="graph.icon" />
        <div>{{ graph.name }}</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#graphs {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  div.graph {
    width: 50px;
    padding: 6px 0;
    border-radius: 4px;
    background-color: $color-gray;
    margin: 4px;
    text-align: center;
    cursor: pointer;
    &:hover {
      color: $color-blue;
    }
  }
}
</style>
