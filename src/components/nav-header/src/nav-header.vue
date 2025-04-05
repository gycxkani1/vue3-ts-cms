<template>
  <div class="nav-header">
    <el-icon class="fold-menu" @click="handleFoldClick">
      <component :is="isFold ? 'expand' : 'fold'"></component>
    </el-icon>
    <div class="content">
      <!-- <hy-breadcrumb :breadcrumbs="breadcrumbs" /> -->
      <div>面包屑</div>
      <user-info />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import UserInfo from "./user-info.vue";
// import { useStore } from "vuex";
// import { useRoute } from "vue-router";
// import { pathMapBreadcrumbs } from "@/utils/map-menus";
// import HyBreadcrumb from "@/base-ui/breadcrumb";
// import type { IStoreType } from "@/store/types";
// 1.定义一个isFold变量
const isFold = ref(false);

// const store = useStore<IStoreType>();
// const route = useRoute();
// 获取面包屑数组
// const breadcrumbs = computed(() => {
//   const userMenus = store.state.login.userMenus;
//   const currentPath = route.path;
//   // 根据菜单和当前路由来拿到面包屑数组数据
//   return pathMapBreadcrumbs(userMenus, currentPath);
// });

// 2.注册需要触发的emit事件
const emit = defineEmits(["foldChange"]);
const handleFoldClick = () => {
  isFold.value = !isFold.value;
  emit("foldChange", isFold.value);
};
// 3.对外暴露两个属性
defineExpose({ isFold, handleFoldClick });
</script>

<style scoped lang="less">
.nav-header {
  display: flex;
  width: 100%;

  .fold-menu {
    font-size: 30px;
    cursor: pointer;
  }

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 20px;
  }
}
</style>
