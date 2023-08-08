<!--
 * @Description: 右侧工具栏
 * @Author: Sunly
 * @Date: 2023-08-08 23:16:53
-->
<script lang="ts" setup>
import { ref } from "vue";

const tab = ref("one");
</script>

<template>
  <v-card>
    <v-tabs
      v-model="tab"
      bg-color="blue-lighten-1"
      grow
      slider-color="blue-darken-4"
    >
      <v-tab value="one">Item One</v-tab>
      <v-tab value="two">Item Two</v-tab>
      <v-tab value="three">Item Three</v-tab>
    </v-tabs>

    <v-window v-model="tab">
      <v-window-item value="one"> One </v-window-item>

      <v-window-item value="two"> Two </v-window-item>

      <v-window-item value="three"> Three </v-window-item>
    </v-window>
  </v-card>
</template>
