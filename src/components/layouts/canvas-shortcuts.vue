<!--
 * @Description: 画布快捷键
 * @Author: Sunly
 * @Date: 2023-08-14 07:04:54
-->
<script lang="ts" setup>
import {
  registerDragEvent,
  unregisterDragEvent,
} from "@/utils/fabric/drag-event";
import { ref } from "vue";
import { Icon } from "@iconify/vue";
import { watch } from "vue";

enum enumCvsMode {
  CREATE,
  DRAG,
}

const cvsMode = ref<enumCvsMode>(enumCvsMode.CREATE);

watch(
  () => cvsMode.value,
  (cvsMode) => {
    if (cvsMode === enumCvsMode.DRAG) {
      registerDragEvent();
    } else {
      unregisterDragEvent();
    }
  }
);
</script>

<template>
  <v-btn-toggle v-model="cvsMode" color="blue-darken-1" mandatory>
    <v-btn :value="enumCvsMode.CREATE">
      <Icon icon="tabler:edit" />
      <v-tooltip activator="parent" location="bottom">
        编辑模式：可以编辑组件
      </v-tooltip>
    </v-btn>

    <v-btn :value="enumCvsMode.DRAG">
      <Icon icon="ant-design:drag-outlined" />
      <v-tooltip activator="parent" location="bottom">
        拖拽模式：可以移动画布
      </v-tooltip>
    </v-btn>
  </v-btn-toggle>
</template>

<style lang="scss" scoped>
svg {
  width: 24px;
  height: 24px;
}
</style>
