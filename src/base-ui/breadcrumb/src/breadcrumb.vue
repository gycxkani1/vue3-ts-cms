<template>
  <div class="nav-breadcrumb">
    <el-breadcrumb separator="/">
      <template v-for="item in breadcrumbs" :key="item.name">
        <el-breadcrumb-item :to="{ path: item.path }">{{
          item.name
        }}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts" setup>
// import { withDefaults, defineProps } from "vue";
// import type { PropType } from "vue";
import type { IBreadcrumb } from "../types";
interface Props {
  breadcrumbs: IBreadcrumb[];
}
// 1.定义属性并且带上默认值
const props = withDefaults(defineProps<Props>(), {
  breadcrumbs: () => [] // [ { "name": "系统管理" }, { "name": "部门管理" } ]
});
</script>
