<!--
 * @Description: 页面尺寸设置
 * @Author: Sunly
 * @Date: 2023-08-11 08:29:23
-->
<script lang="ts" setup>
import ISelect from "@/components/i-select.vue";
import { resizeWorkspace } from "@/hooks/use-workspace";
import { ref } from "vue";

const webSizeList = [
  { title: "3840x2160", value: [3840, 2160] },
  { title: "2560x1440", value: [2560, 1440] },
  { title: "1920x1080", value: [1920, 1080] },
  { title: "1366x768", value: [1366, 768] },
  { title: "1280x800", value: [1280, 800] },
  { title: "1280x720", value: [1280, 720] },
  { title: "1024x768", value: [1024, 768] },
  { title: "1024x600", value: [1024, 600] },
  { title: "800x600", value: [800, 600] },
];

const iPhoneSizeList = [
  { title: "iPhone 12 Pro Max", value: [1284, 2778] },
  { title: "iPhone 12 Pro", value: [1170, 2532] },
  { title: "iPhone 12", value: [1170, 2532] },
  { title: "iPhone 12 mini", value: [1080, 2340] },
  { title: "iPhone 11 Pro Max", value: [1242, 2688] },
  { title: "iPhone 11 Pro", value: [1125, 2436] },
  { title: "iPhone 11", value: [828, 1792] },
  { title: "iPhone 8 Plus", value: [1080, 1920] },
  { title: "iPhone 8", value: [750, 1334] },
  { title: "iPhone SE (2nd generation)", value: [750, 1334] },
];

const androidSizeList = [
  { title: "Huawei Mate 40 Pro", value: [1344, 2772] },
  { title: "Huawei Mate 40", value: [1176, 2400] },
  { title: "Huawei Mate 30 Pro", value: [1176, 2400] },
  { title: "Huawei Mate 30", value: [1080, 2340] },
  { title: "Huawei Mate 20 Pro", value: [1440, 3120] },
  { title: "Huawei Mate 20", value: [1080, 2244] },
  { title: "Huawei Mate 10 Pro", value: [1080, 2160] },
  { title: "Huawei Mate 10", value: [1080, 2160] },
  { title: "Huawei Mate 9 Pro", value: [1440, 2560] },
  { title: "Huawei Mate 9", value: [1080, 1920] },
  { title: "xiaomi 11", value: [1080, 2400] },
  { title: "xiaomi 9", value: [1080, 2340] },
  { title: "xiaomi 8", value: [1080, 2248] },
  { title: "xiaomi 7", value: [1080, 2160] },
  { title: "xiaomi 6", value: [1080, 1920] },
  { title: "xiaomi 3", value: [720, 1280] },
  { title: "xiaomi 1", value: [480, 854] },
  { title: "oppo find x2", value: [1440, 3168] },
  { title: "oppo find x", value: [1080, 2340] },
  { title: "oppo reno 5", value: [1080, 2400] },
  { title: "oppo r15", value: [1080, 2280] },
  { title: "oppo r11", value: [1080, 1920] },
  { title: "oppo r3", value: [720, 1280] },
  { title: "vivo x60", value: [1080, 2376] },
  { title: "samsung galaxy s21 ultra", value: [1440, 3200] },
  { title: "samsung galaxy s21", value: [1080, 2400] },
  { title: "samsung galaxy s10", value: [1440, 3040] },
  { title: "samsung galaxy s9", value: [1440, 2960] },
  { title: "samsung galaxy s5", value: [1080, 1920] },
];

const padSizeList = [
  { title: "iPad Pro 12.9-inch", value: [2048, 2732] },
  { title: "iPad Pro 11-inch", value: [1668, 2388] },
  { title: "iPad Pro 10.5-inch", value: [1668, 2224] },
  { title: "iPad Pro 9.7-inch", value: [1536, 2048] },
  { title: "iPad 10.2-inch", value: [1620, 2160] },
  { title: "iPad 7.9-inch", value: [1536, 2048] },
  { title: "iPad Mini 7.9-inch", value: [1536, 2048] },
  { title: "Galaxy Tab 10.1-inch", value: [1200, 1920] },
  { title: "Galaxy Tab 8.9-inch", value: [800, 1280] },
  { title: "Galaxy Tab 7-inch", value: [600, 1024] },
  { title: "Huawei MatePad Pro", value: [1600, 2560] },
  { title: "Huawei MatePad", value: [1200, 2000] },
  { title: "Huawei MatePad 7.9-inch", value: [1200, 1920] },
  { title: "xiaomi pad", value: [1200, 1920] },
  { title: "oppo pad", value: [1200, 1920] },
  { title: "vivo pad", value: [1200, 1920] },
];

const paperSizeList = [
  { title: "A0", value: [2384, 3370] },
  { title: "A1", value: [1684, 2384] },
  { title: "A2", value: [1191, 1684] },
  { title: "A3", value: [842, 1191] },
  { title: "A4", value: [595, 842] },
  { title: "A5", value: [420, 595] },
  { title: "A6", value: [297, 420] },
  { title: "B0", value: [2835, 4008] },
  { title: "B1", value: [2004, 2835] },
  { title: "B2", value: [1417, 2004] },
  { title: "B3", value: [1001, 1417] },
  { title: "B4", value: [709, 1001] },
  { title: "B5", value: [499, 709] },
  { title: "B6", value: [354, 499] },
  { title: "C0", value: [2599, 3676] },
  { title: "C1", value: [1837, 2599] },
  { title: "C2", value: [1298, 1837] },
  { title: "C3", value: [918, 1298] },
  { title: "C4", value: [649, 918] },
  { title: "C5", value: [459, 649] },
  { title: "C6", value: [323, 459] },
  { title: "Letter", value: [612, 792] },
  { title: "Legal", value: [612, 1008] },
  { title: "Ledger", value: [1224, 792] },
  { title: "Tabloid", value: [792, 1224] },
  { title: "Executive", value: [522, 756] },
  { title: "Folio", value: [612, 936] },
  { title: "Quarto", value: [610, 780] },
];

const sizeType = ref(iPhoneSizeList);
const canvasSize = ref([1170, 2532]);
const sizeTypeList = [
  { title: "网页尺寸", value: webSizeList },
  { title: "iPhone 尺寸", value: iPhoneSizeList },
  { title: "Android 尺寸", value: androidSizeList },
  { title: "平板尺寸", value: padSizeList },
  { title: "纸张尺寸", value: paperSizeList },
];

const handleChangeSizeType = (type: { title: string; value: number[] }[]) => {
  resizeWorkspace(type[0].value[0], type[0].value[1]);
  sizeType.value = type;
};
const handleUpdateSize = (size: number[]) => {
  resizeWorkspace(size[0], size[1]);
  canvasSize.value = size;
};
</script>

<template>
  <ISelect
    class="mb-2"
    :value="sizeType"
    :list="sizeTypeList"
    @update:value="handleChangeSizeType"
  />
  <ISelect
    :value="canvasSize"
    :list="sizeType"
    @update:value="handleUpdateSize"
  />
</template>
