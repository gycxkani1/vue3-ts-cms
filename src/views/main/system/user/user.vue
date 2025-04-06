<template>
  <div class="user">
    <!-- <page-search
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
    /> -->
    <page-search
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
    />
    <!-- pageName是页面名称，将作为URL的路径用 -->
    <!-- <page-content
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
      pageName="users"
      @newBtnClick="handleNewData"
    ></page-content> -->
  </div>
</template>

<script lang="ts" setup>
// import { ref } from "vue";
import PageSearch from "@/components/page-search";
// import PageContent from "@/components/page-content";
// import { searchFormConfig } from "./config/search.config";
// import { contentTableConfig } from "./config/content.config";
// const pageContentRef = ref<InstanceType<typeof PageContent>>();

// 重置
const handleResetClick = () => {
  console.log("handleResetClick");
  // pageContentRef.value?.getPageData();
};
// 查询
const handleQueryClick = (formData: any) => {
  console.log("handleQueryClick", formData);
  // pageContentRef.value?.getPageData(formData);
};
// 新建用户
// const handleNewData = () => {
//   console.log("handleNewData");
// };
</script>

<style scoped lang="less"></style>
