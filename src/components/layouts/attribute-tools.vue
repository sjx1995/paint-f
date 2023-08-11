<!--
 * @Description: 右侧属性工具栏
 * @Author: Sunly
 * @Date: 2023-08-07 08:06:41
-->
<script lang="ts" setup>
import { hasEditableObject } from "@/hooks/use-fabric";
import { ee, enumEvent } from "@/utils/event-emitter";
import { ILine } from "@/utils/fabric/line";
import { IRect } from "@/utils/fabric/rect";
import { ICircle } from "@/utils/fabric/circle";
import {
  type ICircleObjAttr,
  type ICommonObjAttr,
  type ILineObjAttr,
  type IRectObjAttr,
  type ITextBoxObjAttr,
  reduceObjAttrs,
  updateObjAttrs,
  isEditableObj,
  isLine,
  isRect,
  isCircle,
  isTextBox,
} from "@/utils/fabric/common";
import { reactive, ref } from "vue";
import IColorPicker from "@/components/i-color-picker.vue";
import ISlider from "@/components/i-slider.vue";
import ISelect from "@/components/i-select.vue";
import { Icon } from "@iconify/vue";

let curObj: fabric.Object | null;
ee.on(enumEvent.SELECT_ONE, (obj: ILine | IRect | ICircle) => {
  console.log(obj);
  curObj = obj;

  // 处理特殊属性
  hasBorder.value = isLine(curObj)
    ? true
    : obj.strokeWidth
    ? obj.strokeWidth > 0
    : false;

  if (isLine(obj)) {
    const lineAttrs = reduceObjAttrs(obj);
    objAttrs = Object.assign(objAttrs, { ...lineAttrs });
  } else if (isRect(obj)) {
    const rectAttrs = reduceObjAttrs(obj);
    objAttrs = Object.assign(objAttrs, { ...rectAttrs });
  } else if (isCircle(obj)) {
    const circleAttrs = reduceObjAttrs(obj);
    objAttrs = Object.assign(objAttrs, { ...circleAttrs });
  } else if (isTextBox(obj)) {
    const textBoxAttrs = reduceObjAttrs(obj);
    objAttrs = Object.assign(objAttrs, { ...textBoxAttrs });
  }
  if (isEditableObj(obj)) {
    showAttribute.value = true;
  }
});

ee.on(enumEvent.SELECT_NONE, () => {
  curObj = null;
  showAttribute.value = false;
});

ee.on(enumEvent.MOVING, ({ left, top }: { left: number; top: number }) => {
  objAttrs.left = left;
  objAttrs.top = top;
});

ee.on(
  enumEvent.SCALING,
  ({ scaleX, scaleY }: { scaleX: number; scaleY: number }) => {
    objAttrs.scaleX = scaleX;
    objAttrs.scaleY = scaleY;
  }
);

ee.on(enumEvent.ROTATING, (angle: number) => {
  objAttrs.rotate = angle;
});

const showAttribute = ref(false);
let objAttrs = reactive<
  ICommonObjAttr &
    ILineObjAttr &
    IRectObjAttr &
    ICircleObjAttr &
    ITextBoxObjAttr
>({
  top: 0,
  left: 0,
  width: 0,
  height: 0,
  rotate: 0,
  opacity: 1,
  borderColor: "",
  borderWidth: 1,
  borderType: [],
  fillColor: "",
  // shadow: "",
  scaleX: 1,
  scaleY: 1,
  backgroundColor: "",
});

// 修改填充颜色
const updateFillColor = (color: string) => {
  objAttrs.fillColor = color;
  if (curObj && isEditableObj(curObj) && !isLine(curObj)) {
    updateObjAttrs(curObj, { fill: color });
  }
};

// 修改背景颜色
const updateBackgroundColor = (color: string) => {
  objAttrs.fillColor = color;
  if (curObj && isTextBox(curObj)) {
    updateObjAttrs(curObj, { backgroundColor: color });
  }
};

// 显式隐藏边框
const hasBorder = ref(false);
const updateBorder = (value: boolean) => {
  hasBorder.value = value;
  if (curObj && isEditableObj(curObj)) {
    const strokeWidth = value ? (isTextBox(curObj) ? 1 : 4) : 0;
    objAttrs.borderWidth = strokeWidth;
    updateObjAttrs(curObj, { strokeWidth });
  }
};

// 修改边框颜色
const updateBorderColor = (color: string) => {
  objAttrs.borderColor = color;
  if (curObj && isEditableObj(curObj)) {
    updateObjAttrs(curObj, { stroke: color });
  }
};

// 修改旋转角度
const updateRotate = (rotate: number) => {
  objAttrs.rotate = rotate;
  if (curObj && isEditableObj(curObj)) {
    updateObjAttrs(curObj, { angle: rotate }, "rotate");
  }
};

// 修改透明度
const updateOpacity = (opacity: number) => {
  objAttrs.opacity = opacity;
  if (curObj && isEditableObj(curObj)) {
    updateObjAttrs(curObj, { opacity });
  }
};

// 修改边框宽度
const updateBorderWidth = (borderWidth: number) => {
  objAttrs.borderWidth = borderWidth;
  if (curObj && isEditableObj(curObj)) {
    updateObjAttrs(curObj, { strokeWidth: borderWidth });
  }
};

// 边框类型
const borderTypeList = [
  {
    title: "实线",
    value: [],
  },
  {
    title: "虚线",
    value: [5, 5],
  },
  {
    title: "点线",
    value: [1, 5],
  },
];
const updateBorderType = (dashType: number[]) => {
  objAttrs.borderType = [...dashType];
  if (
    curObj instanceof ILine ||
    curObj instanceof IRect ||
    curObj instanceof ICircle
  ) {
    updateObjAttrs(curObj, { strokeDashArray: [...objAttrs.borderType] });
  }
};
</script>

<template>
  <div v-if="showAttribute" class="controller-container">
    <div class="controller-item">
      <div class="controller-item-label">左边距</div>
      <div class="controller-item-value">
        {{ objAttrs.left }}
      </div>
    </div>

    <div class="controller-item">
      <div class="controller-item-label">上边距</div>
      <div class="controller-item-value">
        {{ objAttrs.top }}
      </div>
    </div>

    <div class="controller-item">
      <div class="controller-item-label">宽度</div>
      <div class="controller-item-value">
        {{ objAttrs.width * objAttrs.scaleX }}
      </div>
    </div>
    <div class="controller-item">
      <div class="controller-item-label">高度</div>
      <div class="controller-item-value">
        {{ objAttrs.height * objAttrs.scaleY }}
      </div>
    </div>
    <div class="controller-item">
      <div class="controller-item-label">旋转角</div>
      <div class="controller-item-value">
        <ISlider
          style="width: 200px"
          :slider-value="objAttrs.rotate"
          :min="0"
          :max="359"
          @update:slider-value="updateRotate"
        />
      </div>
    </div>
    <div class="controller-item">
      <div class="controller-item-label">透明度</div>
      <div class="controller-item-value">
        <ISlider
          style="width: 200px"
          :slider-value="objAttrs.opacity"
          :min="0"
          :max="1"
          @update:slider-value="updateOpacity"
        />
      </div>
    </div>
    <div class="controller-item" v-show="curObj && !isLine(curObj)">
      <div class="controller-item-label">
        {{
          curObj ? (isTextBox(curObj) ? "文字颜色" : "填充颜色") : "填充颜色"
        }}
      </div>
      <div class="controller-item-value">
        <IColorPicker
          style="width: 200px"
          :color="objAttrs.fillColor"
          @update:color="updateFillColor"
        />
      </div>
    </div>
    <div class="controller-item" v-if="curObj && isTextBox(curObj)">
      <div class="controller-item-label">背景颜色</div>
      <div class="controller-item-value">
        <IColorPicker
          style="width: 200px"
          :color="objAttrs.backgroundColor"
          @update:color="updateBackgroundColor"
        />
      </div>
    </div>
    <div class="controller-item" v-if="curObj && !isLine(curObj)">
      <div class="controller-item-label">
        {{ isTextBox(curObj) ? "开启描边" : "开启边框" }}
      </div>
      <div class="controller-item-value">
        <v-switch
          inset
          hide-details
          :model-value="hasBorder"
          @update:model-value="(value: any) => updateBorder(value)"
        />
      </div>
    </div>
    <template v-if="hasBorder">
      <div class="controller-item">
        <div class="controller-item-label">
          {{
            curObj
              ? isLine(curObj)
                ? "线条颜色"
                : isTextBox(curObj)
                ? "描边颜色"
                : "边框颜色"
              : "边框颜色"
          }}
        </div>
        <div class="controller-item-value">
          <IColorPicker
            style="width: 200px"
            :color="objAttrs.borderColor"
            @update:color="updateBorderColor"
          />
        </div>
      </div>
      <div class="controller-item">
        <div class="controller-item-label">
          {{
            curObj
              ? isLine(curObj)
                ? "线条宽度"
                : isTextBox(curObj)
                ? "描边宽度"
                : "边框宽度"
              : "边框宽度"
          }}
        </div>
        <div class="controller-item-value">
          <ISlider
            style="width: 200px"
            :slider-value="objAttrs.borderWidth"
            :min="1"
            :max="40"
            :step="1"
            @update:slider-value="updateBorderWidth"
          />
        </div>
      </div>
      <div class="controller-item">
        <div class="controller-item-label">
          {{
            curObj
              ? isLine(curObj)
                ? "线条类型"
                : isTextBox(curObj)
                ? "描边类型"
                : "边框类型"
              : "边框类型"
          }}
        </div>
        <div class="controller-item-value">
          <ISelect
            :list="borderTypeList"
            :value="objAttrs.borderType"
            @update:value="updateBorderType"
          />
        </div>
      </div>
    </template>
  </div>

  <div class="empty-tip" v-else>
    <template v-if="hasEditableObject()">
      <Icon icon="icon-park-outline:click" />
      <p>请选中组件以编辑</p>
    </template>
    <template v-else>
      <Icon icon="ri:drag-drop-line" />
      <p>请先添加组件</p>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.controller-container {
  margin: 16px auto;
  width: 360px;
  .controller-item {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 10px;

    .controller-item-label {
      width: 100px;
      text-align: left;
      margin-right: 10px;
      line-height: 44px;
    }
    .controller-item-value {
      width: 240px;
      line-height: 44px;
    }
  }
}
.empty-tip {
  font-size: 60px;
  margin-top: 80px;
  text-align: center;
  p {
    font-size: 20px;
  }
}
</style>
