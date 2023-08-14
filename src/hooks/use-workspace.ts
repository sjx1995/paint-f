/*
 * @Description: 创建/获取实际绘制画布
 * @Author: Sunly
 * @Date: 2023-08-07 08:30:25
 */
import { onMounted } from "vue";
import { useCreateCanvas, setCvsScale } from "./use-fabric";
import { fabric } from "fabric";
import { useResizeObserver } from "@vueuse/core";

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
    throw new Error("workspace is not found");
  }
  if (!canvas) {
    throw new Error("canvas is not found");
  }
  workspace.set(option);
  canvas?.renderAll();
};

// const removeWorkspace = (workspace: fabric.Rect) => {
//   if (!canvas) {
//     throw new Error("canvas is not found");
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

  obverseWindowResize();
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

const obverseWindowResize = () => {
  useResizeObserver(document.documentElement, () => {
    setWorkspaceRightSize();
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
  setWorkspaceRightSize();
};

const setWorkspaceRightSize = () => {
  if (!workspace) {
    throw new Error("workspace is not found");
  }
  const scale = getWorkspaceScale();
  setCvsScale(scale, workspace);
};

const exportWorkspace = () => {
  if (!workspace || !canvas) {
    throw new Error("canvas or workspace is not found");
  }
  const originVts = [...(canvas.viewportTransform ?? [1, 0, 0, 1, 0, 0])];
  canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
  const dataUrl = canvas.toDataURL({
    left: workspace.left,
    top: workspace.top,
    width: workspace.width,
    height: workspace.height,
    format: "png",
    quality: 1,
  });
  canvas.setViewportTransform(originVts);
  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = "workspace.png";
  link.click();
};

const setObjCenterX = (obj: fabric.Object) => {
  if (!workspace) {
    throw new Error("workspace is not found");
  }
  if (workspace.width && obj.width && obj.scaleX) {
    obj.left = workspace.width / 2 - (obj.width * obj.scaleX) / 2;
    canvas?.renderAll();
  }
};

const setObjCenterY = (obj: fabric.Object) => {
  if (!workspace) {
    throw new Error("workspace is not found");
  }
  if (workspace.height && obj.height && obj.scaleY) {
    obj.top = workspace.height / 2 - (obj.height * obj.scaleY) / 2;
    canvas?.renderAll();
  }
};

export {
  useCreateWorkspace,
  setWorkspaceAttribute,
  getWorkspaceScale,
  resizeWorkspace,
  setWorkspaceRightSize,
  exportWorkspace,
  setObjCenterX,
  setObjCenterY,
};
