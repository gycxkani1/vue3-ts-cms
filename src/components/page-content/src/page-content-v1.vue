<template>
  <div class="page-content">
    <hy-table
      :listData="dataList"
      :listCount="dataCount"
      v-model:page="pageInfo"
    >
      <template #headerHandler>
        <el-button type="primary" @click="handleNewClick"> 新建用户 </el-button>
      </template>
    </hy-table>
  </div>
</template>
<script lang="ts" setup>
import { computed, ref, watch } from "vue";
import HyTable from "@/base-ui/table";
interface Props {
  pageName: string;
}
const props = withDefaults(defineProps<Props>(), {
  pageName: ""
});
const pageInfo = ref({ currentPage: 1, pageSize: 10 });
const dataList = computed(() => {
  return [
    { name: "coderwhy", enable: 1 },
    { name: "liujun", enable: 0 }
  ];
});
const dataCount = 0;
const emit = defineEmits<{
  (e: "newBtnClick"): void;
}>();
const handleNewClick = () => {
  emit("newBtnClick");
};
</script>
