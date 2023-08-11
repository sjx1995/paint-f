<!--
 * @Description: 左侧工具栏
 * @Author: Sunly
 * @Date: 2023-08-11 15:46:21
-->
<script lang="ts" setup>
import GraphTools from "@/components/layouts/graph-tools.vue";
import IFooter from "@/components/layouts/i-footer.vue";
</script>

<template>
  <GraphTools class="left-tools-container" />
  <IFooter class="footer" />
</template>

<style lang="scss" scoped>
.left-tools-container {
  height: calc(100vh - 88px);
}
.footer {
  height: 88px;
}
</style>
