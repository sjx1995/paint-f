/*
 * @Description: 创建/获取实际绘制画布
 * @Author: Sunly
 * @Date: 2023-08-07 08:30:25
 */
import { onMounted } from "vue";
import { useCreateCanvas, setCvsScale } from "./use-fabric";
import { fabric } from "fabric";

let canvas: fabric.Canvas | null;
let cvsContainer: HTMLDivElement | null;
let workspace: fabric.Rect | null;
const useCreateWorkspace = (width?: number, height?: number) => {
  if (workspace) {
    return {
      workspace,
    };
  }

  onMounted(() => {
    if (width == null || height == null) {
      throw new Error("width and height is required");
    }

    canvas = useCreateCanvas().canvas;
    if (!canvas) {
      throw new Error("canvas is not found");
    }

    workspace = initWorkspace(canvas, width, height);
  });

  return {
    workspace,
  };
};

const setWorkspaceAttribute = (option: fabric.IRectOptions) => {
  if (!workspace) {
    throw new Error("workspace is not exist");
  }
  if (!canvas) {
    throw new Error("canvas is not exist");
  }
  workspace.set(option);
  canvas?.renderAll();
};

// const removeWorkspace = (workspace: fabric.Rect) => {
//   if (!canvas) {
//     throw new Error("canvas is not exist");
//   }
//   canvas.remove(workspace);
// };

const initWorkspace = (
  canvas: fabric.Canvas,
  width: number,
  height: number
) => {
  workspace = new fabric.Rect({
    width,
    height,
    fill: "#ffffff",
    selectable: false,
    hasControls: false,
    stroke: "#000000",
  });
  workspace.hoverCursor = "default";
  canvas.getContext().globalCompositeOperation = "source-atop";
  canvas.add(workspace);
  createMask(canvas, workspace);
  const scale = getWorkspaceScale();
  console.log(scale);
  setCvsScale(scale, workspace);

  // canvas.sendToBack(workspace);

  canvas.renderAll();
  return workspace;
};

const getWorkspaceScale = () => {
  if (!workspace) {
    throw new Error("workspace is not found");
  }
  if (!cvsContainer) {
    cvsContainer = document.querySelector("#mid-container");
  }

  const { width: wsWidth, height: wsHeight } = workspace;

  const { width: cvsWidth, height: cvsHeight } =
    cvsContainer?.getBoundingClientRect() ?? {};

  if (!wsWidth || !wsHeight || !cvsWidth || !cvsHeight) {
    throw new Error(
      "workspaceWidth or workspaceHeight or cvsWidth or cvsHeight is not found"
    );
  }

  const scale = Math.min(cvsWidth / wsWidth, cvsHeight / wsHeight) - 0.1;
  return scale;
};

const createMask = (canvas: fabric.Canvas, workspace: fabric.Rect) => {
  canvas.clipPath = new fabric.Rect({
    width: workspace.width,
    height: workspace.height,
    top: workspace.top,
    left: workspace.left,
  });
};

const resizeWorkspace = (width: number, height: number) => {
  if (!workspace) {
    throw new Error("workspace is not found");
  }
  workspace.set({
    width,
    height,
  });
  if (canvas?.clipPath) {
    canvas.clipPath.set({
      width,
      height,
    });
  }
  const scale = getWorkspaceScale();
  setCvsScale(scale, workspace);
};

export {
  useCreateWorkspace,
  setWorkspaceAttribute,
  getWorkspaceScale,
  resizeWorkspace,
};
