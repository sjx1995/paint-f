/*
 * @Description: 文字
 * @Author: Sunly
 * @Date: 2023-08-09 02:32:42
 */
import { fabric } from "fabric";
import { v4 as uuid } from "uuid";

type ITextBoxOptions = fabric.ITextboxOptions & { id: string };

class ITextBox extends fabric.Textbox {
  id: string;
  name: string;
  constructor(text: string, options: ITextBoxOptions) {
    super(text, options);
    this.id = options.id;
    this.name = `Rect#${new Date().getTime()}`;
  }
}

const createTextBox = (text: string) => {
  const rect = new ITextBox(text, {
    left: 100,
    top: 100,
    width: 150,
    height: 150,
    fill: "#000",
    stroke: "#ff0000",
    strokeWidth: 0,
    backgroundColor: "#ffffff00",
    fontWeight: 400,
    centeredRotation: true,
    id: uuid(),
  });

  return rect;
};

export { type ITextBoxOptions, createTextBox, ITextBox };
