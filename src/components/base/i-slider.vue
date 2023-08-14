<!--
 * @Description: 滑块组件
 * @Author: Sunly
 * @Date: 2023-08-08 10:04:03
-->
<script lang="ts" setup>
withDefaults(
  defineProps<{
    min: number;
    max: number;
    step?: number;
  }>(),
  {
    step: 0.01,
  }
);

const { sliderValue } = defineModels<{
  sliderValue: number;
}>();
</script>

<template>
  <v-slider
    v-model="sliderValue"
    :min="min"
    :max="max"
    :step="step"
    hide-details
  />
</template>
