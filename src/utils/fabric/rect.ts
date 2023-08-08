/*
 * @Description: 扩展内置的fabric.rect
 * @Author: Sunly
 * @Date: 2023-08-07 15:28:34
 */
import { fabric } from "fabric";
import { v4 as uuid } from "uuid";

type IRectOptions = fabric.IRectOptions & { id: string };

class IRect extends fabric.Rect {
  id: string;
  name: string;
  constructor(options: IRectOptions) {
    super(options);
    this.id = options.id;
    this.name = `Rect#${new Date().getTime()}`;
  }
}

const createRect = () => {
  const rect = new IRect({
    left: 100,
    top: 100,
    width: 150,
    height: 150,
    fill: "#fff",
    stroke: "#000",
    strokeWidth: 4,
    opacity: 1,
    centeredRotation: true,
    id: uuid(),
  });

  return rect;
};

export { type IRectOptions, createRect, IRect };
