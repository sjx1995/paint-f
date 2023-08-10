/*
 * @Description: useSelection
 * @Author: Sunly
 * @Date: 2023-08-07 14:33:41
 */
import { onMounted } from "vue";
import { useCreateCanvas } from "./use-fabric";
import { ee, enumEvent } from "@/utils/event-emitter";

const useSelection = () => {
  onMounted(() => {
    const canvas = useCreateCanvas().canvas;
    if (!canvas) {
      throw new Error("canvas is not exist");
    }

    canvas.on("selection:created", (opt) => {
      if (opt.selected?.length === 1) {
        ee.emit(enumEvent.SELECT_ONE, opt.selected[0]);
      }
    });

    canvas.on("selection:updated", (opt) => {
      console.log("selection:updated", opt);
    });

    canvas.on("selection:cleared", () => {
      ee.emit(enumEvent.SELECT_NONE);
    });
  });
};

export { useSelection };
