<!--
 * @Description: 工具栏标题
 * @Author: Sunly
 * @Date: 2023-08-13 14:27:15
-->
<script lang="ts" setup>
import { Icon } from "@iconify/vue";

defineModels<{
  icon: string;
}>();
</script>

<template>
  <div class="tool-title">
    <Icon :icon="icon" />
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.tool-title {
  font-size: 16px;
  font-weight: 700;
  display: flex;
  align-items: center;
  margin-top: 16px;
  margin-bottom: 6px;
  svg {
    width: 24px;
    height: 24px;
    margin-right: 4px;
    color: $color-blue;
  }
}
</style>
