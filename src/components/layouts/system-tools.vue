<!--
 * @Description: 系统工具栏
 * @Author: Sunly
 * @Date: 2023-08-13 06:49:17
-->
<script lang="ts" setup>
import { Icon } from "@iconify/vue";
import { exportWorkspace } from "@/hooks/use-workspace";
import IToolTitle from "@/components/i-tool-title.vue";
import { ref } from "vue";

const showMask = ref(false);
const handleExport = () => {
  showMask.value = true;
  exportWorkspace();
  showMask.value = false;
};
</script>

<template>
  <v-overlay v-model="showMask" :persistent="true" />

  <IToolTitle icon="bx:file">文件工具</IToolTitle>

  <v-btn class="mt-4" @click="handleExport" :loading="showMask" block>
    <Icon icon="carbon:save" />
    导出画布
  </v-btn>
</template>
