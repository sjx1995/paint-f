<!--
 * @Description: App
 * @Author: Sunly
 * @Date: 2023-08-05 04:07:11
-->
<script lang="ts" setup>
import leftTools from "@/components/layouts/left-tools/left-tools.vue";
import RightTools from "@/components/layouts/right-tools/right-tools.vue";
import { useCreateCanvas } from "@/hooks/use-fabric";
import { useCreateWorkspace } from "@/hooks/use-workspace";
import { useSelection } from "@/hooks/use-selection";
import { useObjectEvent } from "@/hooks/use-object-event";
import { useWindowSize } from "@vueuse/core";
import { ref, watch } from "vue";
import CanvasShortcuts from "./components/layouts/canvas-shortcuts.vue";

useCreateCanvas("canvas");
useCreateWorkspace(1280, 720);
useSelection();
useObjectEvent();

const { height, width } = useWindowSize();
const showOverlay = ref(false);
watch(
  () => [height.value, width.value],
  ([height, width]) => {
    if (height < 540 || width < 960) {
      showOverlay.value = true;
    } else {
      showOverlay.value = false;
    }
  },
  {
    immediate: true,
  }
);
</script>

<template>
  <v-overlay
    v-model="showOverlay"
    :persistent="true"
    class="fullscreen-overlay"
  >
    <h1>请在分辨率大于 960*540 的设备上打开</h1>
  </v-overlay>
  <div id="main-container">
    <div id="left-container">
      <leftTools />
    </div>
    <div id="mid-container">
      <canvas id="canvas" />
      <CanvasShortcuts id="canvas-shortcuts" />
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
    min-width: 280px;
    background-color: #ccc;
  }
  #mid-container {
    position: relative;
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
    #canvas-shortcuts {
      position: absolute;
      top: 8px;
      right: 12px;
    }
  }
  #right-container {
    min-width: 380px;
    background-color: #ccc;
  }
}

.fullscreen-overlay {
  backdrop-filter: blur(14px);
  display: flex;
  justify-content: center;
  align-items: center;
  h1 {
    font-size: 24px;
    color: #000;
  }
}
</style>
