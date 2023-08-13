<!--
 * @Description: 颜色选择器
 * @Author: Sunly
 * @Date: 2023-08-08 04:22:09
-->
<script lang="ts" setup>
import { ref } from "vue";
import { useElementBounding } from "@vueuse/core";

const { color } = defineModels<{
  color: string;
}>();

const pickerWrapperRef = ref<HTMLElement | null>(null);
const showPicker = ref(false);
const topShowModal = ref(true);
const handleTogglePicker = () => {
  showPicker.value = !showPicker.value;
  if (showPicker.value) {
    const { top } = useElementBounding(pickerWrapperRef);
    if (window.innerHeight - top.value < 400) {
      topShowModal.value = true;
    } else {
      topShowModal.value = false;
    }
    document.addEventListener("click", handleHidePicker);
  } else {
    document.removeEventListener("click", handleHidePicker);
  }
};
const handleHidePicker = (e: MouseEvent) => {
  if (pickerWrapperRef.value?.contains(e.target as HTMLElement)) return;
  showPicker.value = false;
  document.removeEventListener("click", handleHidePicker);
};
</script>

<template>
  <div class="picker-wrapper" ref="pickerWrapperRef">
    <div class="picker-color-container" @click="handleTogglePicker">
      <div class="picker-color" :style="{ background: color }" />
    </div>
    <div
      :class="{ 'picker-modal': true, 'show-top': topShowModal }"
      v-show="showPicker"
    >
      <v-color-picker elevation="15" mode="hexa" v-model="color" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.picker-wrapper {
  position: relative;
  .picker-color-container {
    position: relative;
    height: 16px;
    padding: 6px 8px;
    background-color: #fff;
    border: 1px solid #ccc;
    box-sizing: content-box;
    border-radius: 22px;
    .picker-color {
      position: relative;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      border: 1px solid #888;
      border-radius: 22px;
      cursor: pointer;
      &::after {
        content: "";
        z-index: -1;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(
            45deg,
            rgba(0, 0, 0, 0.4) 25%,
            transparent 25%,
            transparent 75%,
            rgba(0, 0, 0, 0.4) 75%,
            rgba(0, 0, 0, 0.4) 100%
          ),
          linear-gradient(
            45deg,
            rgba(0, 0, 0, 0.4) 25%,
            transparent 25%,
            transparent 75%,
            rgba(0, 0, 0, 0.4) 75%,
            rgba(0, 0, 0, 0.4) 100%
          );
        background-size: 12px 12px;
        background-position:
          0 0,
          6px 6px;
      }
    }
  }
  .picker-modal {
    position: absolute;
    right: 0;
    z-index: 999;
    &:not(.show-top) {
      top: 30px;
    }
    &.show-top {
      bottom: 30px;
    }
  }
}
</style>
