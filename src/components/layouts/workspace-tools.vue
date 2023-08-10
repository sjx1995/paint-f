<!--
 * @Description: 工作区设置
 * @Author: Sunly
 * @Date: 2023-08-10 23:33:49
-->
<script lang="ts" setup>
import type { fabric } from "fabric";
import {
  useCreateWorkspace,
  setWorkspaceAttribute,
} from "@/hooks/use-workspace";

const swatches = [
  ["#00000000", "#ffa940", "#36cfc9"],
  ["#ffffff", "#ffc53d", "#4096ff"],
  ["#888888", "#fffb8f", "#597ef7"],
  ["#000000", "#bae637", "#10239e"],
  ["#ff4d4f", "#73d13d", "#9254de"],
  ["#ff7a45", "#237804", "#f759ab"],
];

let workspace: fabric.Rect | null;
const setWorkspaceColor = (color: string) => {
  if (!workspace) {
    workspace = useCreateWorkspace()?.workspace;
  }
  if (!workspace) {
    throw new Error("workspace is not exist");
  }

  setWorkspaceAttribute({ fill: color });
};
</script>

<template>
  <v-color-picker
    :swatches="swatches"
    :width="360"
    show-swatches
    @update:model-value="setWorkspaceColor"
  />
</template>
