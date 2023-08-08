/*
 * @Description: useSelection
 * @Author: Sunly
 * @Date: 2023-08-07 14:33:41
 */
import { nextTick } from "vue";
import { useCreateCanvas } from "./useFabric";
import { ee, enumEvent } from "@/utils/eventEmitter";

const useSelection = () => {
  nextTick(() => {
    const canvas = useCreateCanvas().canvas;
    if (!canvas) {
      throw new Error("canvas is not exist");
    }

    canvas.on("selection:created", (opt) => {
      if (opt.selected?.length === 1) {
        ee.emit(enumEvent.selectOne, opt.selected[0]);
      }
    });

    canvas.on("selection:updated", (opt) => {
      console.log("selection:updated", opt);
    });

    canvas.on("selection:cleared", () => {
      ee.emit(enumEvent.selectNone);
    });
  });
};

export { useSelection };
