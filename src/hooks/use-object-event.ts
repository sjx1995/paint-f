/*
 * @Description: 监听object事件
 * @Author: Sunly
 * @Date: 2023-08-10 12:49:44
 */
import { onMounted } from "vue";
import { useCreateCanvas } from "@/hooks/use-fabric";
import { ee, enumEvent } from "@/utils/event-emitter";
import { isEditableObj } from "@/utils/fabric/common";

const useObjectEvent = () => {
  onMounted(() => {
    const canvas = useCreateCanvas().canvas;
    if (!canvas) {
      throw new Error("canvas is not found");
    }

    // 移动
    canvas.on("object:moving", (opt) => {
      const { target } = opt;
      if (target && isEditableObj(target)) {
        const { left, top } = target;
        ee.emit(enumEvent.MOVING, { left, top });
      }
    });

    // 缩放
    canvas.on("object:scaling", (opt) => {
      const { target } = opt;
      if (target && isEditableObj(target)) {
        const { scaleX, scaleY } = target;
        ee.emit(enumEvent.SCALING, { scaleX, scaleY });
      }
    });

    // 旋转
    canvas.on("object:rotating", (opt) => {
      const { target } = opt;
      if (target && isEditableObj(target)) {
        const { angle } = target;
        ee.emit(enumEvent.ROTATING, angle);
      }
    });
  });
};

export { useObjectEvent };
