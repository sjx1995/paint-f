/*
 * @Description: 辅助线
 * @Author: Sunly
 * @Date: 2023-08-13 07:57:58
 */
import { useCreateWorkspace } from "@/hooks/use-workspace";
import { fabric } from "fabric";
import { isEditableObj } from "./common";

// 当要移动时，创建出了当前元素以外的所有元素的坐标信息
let xAuxiliaryLines: number[] = [];
let yAuxiliaryLines: number[] = [];
const createAuxiliaryCoors = (canvas: fabric.Canvas, id: string) => {
  const workspace = useCreateWorkspace().workspace;
  if (!workspace) {
    throw new Error("workspace is not found");
  }
  xAuxiliaryLines = [workspace.width! / 2];
  yAuxiliaryLines = [workspace.height! / 2];
  const objs = canvas.getObjects();
  objs.forEach((obj) => {
    if (isEditableObj(obj) && obj.id !== id) {
      const top = obj.top!;
      const left = obj.left!;
      const scaleX = obj.scaleX!;
      const scaleY = obj.scaleY!;
      const width = obj.width! * scaleX;
      const height = obj.height! * scaleY;
      const right = left + width;
      const bottom = top + height;
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      xAuxiliaryLines.push(left, centerX, right);
      yAuxiliaryLines.push(top, centerY, bottom);
    }
  });
};

// 判断是否接近辅助线
const MIN_CLOSE_DISTANCE = 6;
const isClose = (
  objPos: [number, number, number],
  xOrY: "x" | "y"
): [number, 1 | 2 | 3] | null => {
  if (xOrY === "x") {
    for (let i = 0; i < xAuxiliaryLines.length; i++) {
      const x = xAuxiliaryLines[i];
      if (Math.abs(x - objPos[0]) < MIN_CLOSE_DISTANCE) {
        return [x, 1];
      } else if (Math.abs(x - objPos[1]) < MIN_CLOSE_DISTANCE) {
        return [x, 2];
      } else if (Math.abs(x - objPos[2]) < MIN_CLOSE_DISTANCE) {
        return [x, 3];
      }
    }
  } else if (xOrY === "y") {
    for (let i = 0; i < yAuxiliaryLines.length; i++) {
      const y = yAuxiliaryLines[i];
      if (Math.abs(y - objPos[0]) < MIN_CLOSE_DISTANCE) {
        return [y, 1];
      } else if (Math.abs(y - objPos[1]) < MIN_CLOSE_DISTANCE) {
        return [y, 2];
      } else if (Math.abs(y - objPos[2]) < MIN_CLOSE_DISTANCE) {
        return [y, 3];
      }
    }
  }
  return null;
};

// 垂直的辅助线
let verticalLine: fabric.Line | null = null;
const createVerticalLine = (x: number, workspaceHeight: number) => {
  return new fabric.Line([x, 0, x, workspaceHeight], {
    stroke: "red",
    strokeWidth: 1,
    selectable: false,
    evented: false,
  });
};
// 吸附到垂直的辅助线
let workspace: fabric.Rect | null = null;
const attractX = (obj: fabric.Object, canvas: fabric.Canvas) => {
  if (!workspace) {
    workspace = useCreateWorkspace().workspace;
    if (!workspace) {
      throw new Error("workspace is not found");
    }
  }
  let { left, width } = obj;
  left = left!;
  const { scaleX } = obj;
  width = width! * scaleX!;
  const right = left + width;
  const centerX = left + width / 2;
  const closeRes = isClose([left, centerX, right], "x");
  if (closeRes != null) {
    const [x, type] = closeRes;
    if (!verticalLine) {
      verticalLine = createVerticalLine(x, workspace.height!);
      canvas.add(verticalLine);
    }
    if (type === 1) {
      obj.left = x;
    } else if (type === 2) {
      obj.left = x - width / 2;
    } else if (type === 3) {
      obj.left = x - width;
    }
  } else {
    if (verticalLine) {
      canvas.remove(verticalLine!);
      verticalLine = null;
    }
  }
};

// 水平的辅助线
let horizontalLine: fabric.Line | null = null;
const createHorizontalLine = (y: number, workspaceWidth: number) => {
  return new fabric.Line([0, y, workspaceWidth, y], {
    stroke: "red",
    strokeWidth: 1,
    selectable: false,
    evented: false,
  });
};
// 吸附到水平的辅助线
const attractY = (obj: fabric.Object, canvas: fabric.Canvas) => {
  if (!workspace) {
    workspace = useCreateWorkspace().workspace;
    if (!workspace) {
      throw new Error("workspace is not found");
    }
  }
  let { top, height } = obj;
  top = top!;
  const { scaleY } = obj;
  height = height! * scaleY!;
  const bottom = top + height;
  const centerY = top + height / 2;
  const closeRes = isClose([top, centerY, bottom], "y");
  if (closeRes != null) {
    const [y, type] = closeRes;
    if (!horizontalLine) {
      horizontalLine = createHorizontalLine(y, workspace.width!);
      canvas.add(horizontalLine);
    }
    if (type === 1) {
      obj.top = y;
    } else if (type === 2) {
      obj.top = y - height / 2;
    } else if (type === 3) {
      obj.top = y - height;
    }
  } else {
    if (horizontalLine) {
      canvas.remove(horizontalLine!);
      horizontalLine = null;
    }
  }
};

const clearAllAuxiliaryLines = (canvas: fabric.Canvas) => {
  if (verticalLine) {
    canvas.remove(verticalLine);
    verticalLine = null;
  }
  if (horizontalLine) {
    canvas.remove(horizontalLine);
    horizontalLine = null;
  }
};

export { createAuxiliaryCoors, attractX, attractY, clearAllAuxiliaryLines };
