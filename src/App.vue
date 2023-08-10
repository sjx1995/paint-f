<!--
 * @Description: App
 * @Author: Sunly
 * @Date: 2023-08-05 04:07:11
-->
<script lang="ts" setup>
import GraphTools from "@/components/layouts/graph-tools.vue";
import RightTools from "./components/layouts/right-tools.vue";
import { useCreateCanvas } from "@/hooks/use-fabric";
import { useCreateWorkspace } from "@/hooks/use-workspace";
import { useSelection } from "@/hooks/use-selection";
import { useObjectEvent } from "@/hooks/use-object-event";

useCreateCanvas("canvas");
useCreateWorkspace(768, 1024);
useSelection();
useObjectEvent();
</script>

<template>
  <div id="main-container">
    <div id="left-container">
      <GraphTools />
    </div>
    <div id="mid-container">
      <canvas id="canvas" />
    </div>
    <div id="right-container">
      <RightTools />
    </div>
  </div>
</template>

<style lang="scss" scoped>
#main-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  #left-container {
    min-width: 300px;
    background-color: #ccc;
  }
  #mid-container {
    flex-grow: 1;
    background: linear-gradient(
        45deg,
        rgba(0, 0, 0, 0.15) 25%,
        transparent 25%,
        transparent 75%,
        rgba(0, 0, 0, 0.15) 75%,
        rgba(0, 0, 0, 0.15) 100%
      ),
      linear-gradient(
        45deg,
        rgba(0, 0, 0, 0.15) 25%,
        transparent 25%,
        transparent 75%,
        rgba(0, 0, 0, 0.15) 75%,
        rgba(0, 0, 0, 0.15) 100%
      );
    background-size: 36px 36px;
    background-position:
      0 0,
      18px 18px;
  }
  #right-container {
    min-width: 400px;
    background-color: #ccc;
  }
}
</style>
./hooks/use-selection
