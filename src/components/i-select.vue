<!--
 * @Description: 选择器
 * @Author: Sunly
 * @Date: 2023-08-08 22:41:48
-->
<script lang="ts" setup generic="T">
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    label?: string;
    list: {
      title: string;
      value: T;
    }[];
    value: T;
  }>(),
  {
    label: "",
  }
);

const emits = defineEmits<{
  (event: "update:value", value: T): void;
}>();

const selectValue = computed<{ title: string; value: T }>({
  get() {
    const { list, value } = props;
    const target = list.find(
      (item) => JSON.stringify(item.value) === JSON.stringify(value)
    );
    if (!target) {
      return list[0];
    }
    return target;
  },
  set(newVal) {
    const { value } = newVal;
    emits("update:value", value);
  },
});
</script>

<template>
  <v-select
    v-model:model-value="selectValue"
    :items="list"
    density="compact"
    item-title="title"
    item-value="value"
    return-object
    single-line
    hide-details
  />
</template>
