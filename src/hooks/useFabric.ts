/*
 * @Description: 创建/获取Canvas
 * @Author: Sunly
 * @Date: 2023-08-07 06:42:36
 */
import { fabric } from "fabric";
import { onMounted } from "vue";

const PARENT_SELECTOR = "#mid-container";

let canvas: fabric.Canvas | null;
let cvsContainer: HTMLDivElement | null;
const useCreateCanvas = (id?: string) => {
  if (canvas) {
    return {
      canvas,
    };
  }

  if (!id) {
    throw new Error("canvas id is required");
  }

  onMounted(() => {
    // const { width, height } = getParentSize();
    canvas = initCanvas(
      id
      // width,
      // height
    );
  });

  return {
    canvas,
  };
};

const getParentSize = () => {
  cvsContainer = document.querySelector(PARENT_SELECTOR);
  if (!cvsContainer) {
    throw new Error("parentElement is not found");
  }

  const { width, height } = cvsContainer.getBoundingClientRect();
  return {
    width,
    height,
  };
};

const initCanvas = (
  id: string
  // width: number,
  // height: number
) => {
  return new fabric.Canvas(id, {
    stopContextMenu: true, // 禁用右键菜单
    backgroundColor: "#f2f2f2", // 背景颜色
    // width,
    // height,
  });
};

const setCvsScale = (scale: number, obj?: fabric.Object) => {
  if (!canvas) {
    throw new Error("canvas is not found");
  }

  const { height, width } = getParentSize();
  canvas.setHeight(height);
  canvas.setWidth(width);
  const { left, top } = canvas.getCenter();
  canvas.setViewportTransform(fabric.iMatrix.concat());
  canvas.zoomToPoint(new fabric.Point(left, top), scale);
  if (obj) {
    setObjCenter(obj);
  }
  canvas.renderAll();
};

const setObjCenter = (obj: fabric.Object) => {
  if (!canvas) {
    throw new Error("canvas is not found");
  }

  const { width, height } = getParentSize();
  const { x, y } = obj.getCenterPoint();

  const vpt = canvas.viewportTransform;
  if (!vpt) {
    return;
  }
  vpt[4] = width / 2 - x * vpt[0];
  vpt[5] = height / 2 - y * vpt[3];
  canvas.setViewportTransform(vpt);

  canvas.renderAll();
};

export { useCreateCanvas, setCvsScale, setObjCenter };