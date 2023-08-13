<!--
 * @Description: 工作区设置
 * @Author: Sunly
 * @Date: 2023-08-10 23:33:49
-->
<script lang="ts" setup>
import { ref } from "vue";
import PageSizeTools from "@/components/layouts/page-size-tools.vue";
import { setWorkspaceAttribute } from "@/hooks/use-workspace";
import IToolTitle from "@/components/i-tool-title.vue";

const swatches = [
  ["#00000000", "#ffa940", "#36cfc9"],
  ["#ffffff", "#ffc53d", "#4096ff"],
  ["#888888", "#fffb8f", "#597ef7"],
  ["#000000", "#bae637", "#10239e"],
  ["#ff4d4f", "#73d13d", "#9254de"],
  ["#ff7a45", "#237804", "#f759ab"],
];

const bgColor = ref("#ffffff");
const setWorkspaceColor = (color: string) => {
  setWorkspaceAttribute({ fill: color });
  bgColor.value = color;
};
</script>

<template>
  <IToolTitle icon="fluent:slide-size-24-regular">画布尺寸</IToolTitle>
  <PageSizeTools />

  <IToolTitle icon="bxs:color-fill">画布背景</IToolTitle>
  <v-color-picker
    :model-value="bgColor"
    :swatches="swatches"
    :width="336"
    show-swatches
    @update:model-value="setWorkspaceColor"
  />
</template>
