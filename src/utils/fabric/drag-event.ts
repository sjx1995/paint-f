/*
 * @Description: 拖拽画布事件
 * @Author: Sunly
 * @Date: 2023-08-14 20:18:07
 */
import { fabric } from "fabric";
import { useCreateCanvas } from "@/hooks/use-fabric";

let isDragging = false;
let posX = 0;
let posY = 0;
let mouseDownFn: ((e: fabric.IEvent<MouseEvent>) => void) | null = null;
let mouseMoveFn: ((e: fabric.IEvent<MouseEvent>) => void) | null = null;

const mouseDownHandler = (canvas: fabric.Canvas) => {
  return (opt: fabric.IEvent<MouseEvent>) => {
    isDragging = true;
    canvas.discardActiveObject();
    const { e } = opt;
    posX = e.clientX;
    posY = e.clientY;
  };
};

const mouseMoveHandler = (canvas: fabric.Canvas) => {
  return (opt: fabric.IEvent<MouseEvent>) => {
    if (!isDragging) {
      return;
    }
    const { e } = opt;
    const vpt = canvas.viewportTransform || [1, 0, 0, 1, 0, 0];
    vpt[4] += e.clientX - posX;
    vpt[5] += e.clientY - posY;
    canvas.setViewportTransform(vpt);
    posX = e.clientX;
    posY = e.clientY;
  };
};

const mouseUpHandler = () => {
  isDragging = false;
};

const registerDragEvent = () => {
  const cvs = useCreateCanvas().canvas;
  if (!cvs) {
    throw new Error("canvas is not found");
  }
  mouseDownFn = mouseDownHandler(cvs);
  mouseMoveFn = mouseMoveHandler(cvs);
  cvs.on("mouse:down", mouseDownFn);
  cvs.on("mouse:move", mouseMoveFn);
  cvs.on("mouse:up", mouseUpHandler);
};

const unregisterDragEvent = () => {
  const cvs = useCreateCanvas().canvas;
  if (!cvs) {
    throw new Error("canvas is not found");
  }
  cvs.off("mouse:down", mouseDownFn as any);
  cvs.off("mouse:move", mouseMoveFn as any);
  cvs.off("mouse:up", mouseUpHandler as any);
  mouseMoveFn = null;
};

export { registerDragEvent, unregisterDragEvent };
