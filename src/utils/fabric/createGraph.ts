/*
 * @Description: 创建图形
 * @Author: Sunly
 * @Date: 2023-08-07 03:09:38
 */
import { fabric } from "fabric";

const createLine = () => {
  const line = new fabric.Line([50, 50, 250, 50], {
    stroke: "#000",
    strokeWidth: 1,
  });
  return line;
};

const createRect = () => {
  const rect = new fabric.Rect({
    left: 100,
    top: 100,
    width: 150,
    height: 150,
    fill: "transparent",
    stroke: "#000",
    strokeWidth: 1,
  });
  return rect;
};

const createCircle = () => {
  const circle = new fabric.Circle({
    left: 100,
    top: 100,
    radius: 100,
    fill: "transparent",
    stroke: "#000",
    strokeWidth: 1,
  });
  return circle;
};

export { createLine, createRect, createCircle };
