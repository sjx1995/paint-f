/*
 * @Description: 扩展内置的fabric.circle
 * @Author: Sunly
 * @Date: 2023-08-07 07:34:37
 */
import { fabric } from "fabric";
import { v4 as uuid } from "uuid";

type ICircleOptions = fabric.ICircleOptions & { id: string };

class ICircle extends fabric.Circle {
  id: string;
  name: string;
  constructor(options: ICircleOptions) {
    super(options);
    this.id = options.id;
    this.name = `Circle#${new Date().getTime()}`;
  }
}

const createCircle = () => {
  const rect = new ICircle({
    left: 100,
    top: 100,
    radius: 100,
    fill: "#fff",
    stroke: "#000",
    strokeWidth: 4,
    opacity: 1,
    centeredRotation: true,
    id: uuid(),
  });

  return rect;
};

export { type ICircleOptions, createCircle, ICircle };
