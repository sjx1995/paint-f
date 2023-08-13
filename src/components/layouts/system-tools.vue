<!--
 * @Description: 系统工具栏
 * @Author: Sunly
 * @Date: 2023-08-13 06:49:17
-->
<script lang="ts" setup>
import { Icon } from "@iconify/vue";
import { exportWorkspace } from "@/hooks/use-workspace";
</script>

<template>
  <v-btn @click="exportWorkspace">
    <Icon icon="carbon:save" />
    导出画布
  </v-btn>
</template>
