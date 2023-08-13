<!--
 * @Description: 右侧工具栏
 * @Author: Sunly
 * @Date: 2023-08-08 23:16:53
-->
<script lang="ts" setup>
import { ref } from "vue";
import { Icon } from "@iconify/vue";
import WorkspaceTools from "@/components/layouts/workspace-tools.vue";
import AttributeTools from "@/components/layouts/attribute-tools.vue";
import systemTools from "@/components/layouts/system-tools.vue";
import { ee, enumEvent } from "@/utils/event-emitter";

enum enumTab {
  "CANVAS_SETTING",
  "ELEMENT_SETTING",
  "SYSTEM_TOOL",
}

const tab = ref<enumTab>(enumTab.CANVAS_SETTING);
ee.on(enumEvent.SELECT_ONE, () => {
  tab.value = enumTab.ELEMENT_SETTING;
});
ee.on(enumEvent.SELECT_NONE, () => {
  tab.value = enumTab.CANVAS_SETTING;
});
</script>

<template>
  <v-card>
    <v-tabs v-model="tab" bg-color="#eee" grow slider-color="blue-darken-4">
      <v-tab :value="enumTab.CANVAS_SETTING">
        <Icon icon="mingcute:drawing-board-line" />
        画布设置
      </v-tab>
      <v-tab :value="enumTab.ELEMENT_SETTING">
        <Icon icon="icon-park-outline:add-item" />
        组件设置
      </v-tab>
      <v-tab :value="enumTab.SYSTEM_TOOL">
        <Icon icon="carbon:tool-kit" />
        系统工具
      </v-tab>
    </v-tabs>

    <v-window v-model="tab" class="right-tools-container px-4 pb-12">
      <v-window-item :value="enumTab.CANVAS_SETTING" :eager="true">
        <WorkspaceTools />
      </v-window-item>

      <v-window-item :value="enumTab.ELEMENT_SETTING" :eager="true">
        <AttributeTools />
      </v-window-item>

      <v-window-item :value="enumTab.SYSTEM_TOOL" :eager="true">
        <systemTools />
      </v-window-item>
    </v-window>
  </v-card>
</template>

<style lang="scss" setup>
.right-tools-container {
  height: calc(100vh - 48px);
  overflow-y: auto !important;
  background-color: #eaeaea;
}
</style>
