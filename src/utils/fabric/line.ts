/*
 * @Description: 扩展内置的fabric.line
 * @Author: Sunly
 * @Date: 2023-08-07 07:34:58
 */
import { fabric } from "fabric";
import { v4 as uuid } from "uuid";

type ILineOptions = fabric.ILineOptions & { id: string };

class ILine extends fabric.Line {
  id: string;
  name: string;
  constructor(points: number[], options: ILineOptions) {
    super(points, options);
    this.id = options.id;
    this.name = `Line#${new Date().getTime()}}`;
  }
}

const createLine = () => {
  const line = new ILine([50, 50, 250, 50], {
    stroke: "#000",
    fill: "#f00",
    strokeWidth: 4,
    opacity: 1,
    centeredRotation: true,
    id: uuid(),
  });

  return line;
};

export { type ILineOptions, createLine, ILine };
