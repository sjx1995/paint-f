<!--
 * @Description: App
 * @Author: Sunly
 * @Date: 2023-08-05 04:07:11
-->
<script lang="ts" setup>
import GraphTools from "@/components/layouts/graph-tools.vue";
import { useCreateCanvas } from "@/hooks/useFabric";
import { useCreateWorkspace } from "@/hooks/useWorkspace";

useCreateCanvas("canvas");
useCreateWorkspace(768, 1024);
</script>

<template>
  <div id="main-container">
    <div id="left-container">
      <GraphTools />
    </div>
    <div id="mid-container">
      <canvas id="canvas" />
    </div>
    <div id="right-container" />
  </div>
</template>

<style lang="scss" scoped>
#main-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  #left-container {
    width: 300px;
  }
  #mid-container {
    flex-grow: 1;
    background-color: $color-gray;
  }
  #right-container {
    width: 300px;
  }
}
</style>
