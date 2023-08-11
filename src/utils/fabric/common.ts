/*
 * @Description: 公共方法
 * @Author: Sunly
 * @Date: 2023-08-08 07:16:36
 */
import { useCreateCanvas } from "@/hooks/use-fabric";
import { ILine, type ILineOptions } from "./line";
import { IRect, type IRectOptions } from "./rect";
import { ICircle, type ICircleOptions } from "./circle";
import { ITextBox, type ITextBoxOptions } from "./text-box";

// 判断对象类型
const isEditableObj = (
  obj: fabric.Object
): obj is ILine | IRect | ICircle | ITextBox => {
  return isLine(obj) || isRect(obj) || isCircle(obj) || isTextBox(obj);
};
const isLine = (obj: fabric.Object): obj is ILine => {
  return obj instanceof ILine;
};
const isRect = (obj: fabric.Object): obj is IRect => {
  return obj instanceof IRect;
};
const isCircle = (obj: fabric.Object): obj is ICircle => {
  return obj instanceof ICircle;
};
const isTextBox = (obj: fabric.Object): obj is ITextBox => {
  return obj instanceof ITextBox;
};

// 图形对象的通用属性类型
type ICommonObjAttr = {
  top: number;
  left: number;
  width: number;
  height: number;
  rotate: number;
  opacity: number;
  borderColor: string;
  borderWidth: number;
  borderType: number[];
  scaleX: number;
  scaleY: number;
  // shadow: string;
};

// 直线的特殊属性类型
type ILineObjAttr = {};

// 矩形的特殊属性类型
type IRectObjAttr = {
  fillColor: string;
};

// 圆形特殊属性类型
type ICircleObjAttr = {
  fillColor: string;
};

// 文字box特殊属性类型
type ITextBoxObjAttr = {
  fillColor: string;
  backgroundColor: string;
  fontWeight: number;
};

// 处理不同类型的对象的属性，根据类型返回对应的属性集合
function reduceObjAttrs(obj: ILine): ICommonObjAttr & ILineObjAttr;
function reduceObjAttrs(obj: IRect): ICommonObjAttr & IRectObjAttr;
function reduceObjAttrs(obj: ICircle): ICommonObjAttr & ICircleObjAttr;
function reduceObjAttrs(obj: ITextBox): ICommonObjAttr & ITextBoxObjAttr;
function reduceObjAttrs(obj: ILine | IRect | ICircle | ITextBox) {
  // 处理公共属性
  const attrs = {} as ICommonObjAttr;
  attrs.top = obj.top || 0;
  attrs.left = obj.left || 0;
  attrs.width = obj.width || 0;
  attrs.height = obj.height || 0;
  attrs.rotate = obj.angle || 0;
  attrs.opacity = obj.opacity || 1;
  attrs.borderColor = obj.stroke as string;
  attrs.borderWidth = obj.strokeWidth || 1;
  attrs.borderType = obj.strokeDashArray || [];
  attrs.scaleX = obj.scaleX || 1;
  attrs.scaleY = obj.scaleY || 1;
  // 处理直线特殊属性
  if (isLine(obj)) {
    const lineAttrs = attrs as ILineObjAttr & ICommonObjAttr;
    return lineAttrs;
  }
  // 处理矩形特殊属性
  else if (isRect(obj)) {
    const rectAttrs = attrs as IRectObjAttr & ICommonObjAttr;
    rectAttrs.fillColor = obj.fill as string;
    return rectAttrs;
  }
  // 处理圆形特殊属性
  else if (isCircle(obj)) {
    const circleAttrs = attrs as ICircleObjAttr & ICommonObjAttr;
    circleAttrs.fillColor = obj.fill as string;
    return circleAttrs;
  }
  // 处理文字box特殊属性
  else if (isTextBox(obj)) {
    const textBoxAttrs = attrs as ITextBoxObjAttr & ICommonObjAttr;
    textBoxAttrs.fillColor = obj.fill as string;
    textBoxAttrs.backgroundColor = obj.backgroundColor as string;
    textBoxAttrs.fontWeight = obj.fontWeight as number;
    return textBoxAttrs;
  }
}

// 修改对象属性
let cvs: fabric.Canvas | null;
function updateObjAttrs(
  obj: ILine | IRect | ICircle | ITextBox,
  options: Partial<
    ILineOptions & IRectOptions & ICircleOptions & ITextBoxOptions
  >,
  type?: "rotate"
) {
  if (type === "rotate" && typeof options.angle === "number") {
    obj.rotate(options.angle);
  } else if (obj instanceof ILine) {
    obj.set(options);
  } else if (obj instanceof IRect) {
    obj.set(options);
  } else if (obj instanceof ICircle) {
    obj.set(options);
  } else if (obj instanceof ITextBox) {
    obj.set(options);
  }
  if (!cvs) {
    cvs = useCreateCanvas().canvas;
    if (!cvs) {
      throw new Error("canvas is not exist");
    }
  }
  cvs.renderAll();
}

export {
  isEditableObj,
  isLine,
  isRect,
  isCircle,
  isTextBox,
  reduceObjAttrs,
  type ICommonObjAttr,
  type ILineObjAttr,
  type IRectObjAttr,
  type ICircleObjAttr,
  type ITextBoxObjAttr,
  updateObjAttrs,
};
