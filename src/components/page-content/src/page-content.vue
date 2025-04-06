<template>
  <div class="page-content">
    <hy-table
      :listData="dataList"
      :listCount="dataCount"
      v-bind="contentTableConfig"
      v-model:page="pageInfo"
    >
      <!-- 1.header中的插槽 -->
      <template #headerHandler>
        <el-button type="primary" @click="handleNewClick"> 新建用户 </el-button>
      </template>
      <!-- 2.列中的插槽 -->
      <template #status="scope">
        <el-button plain :type="scope.row.enable ? 'success' : 'danger'">
          {{ scope.row.enable ? "启用" : "禁用" }}
        </el-button>
      </template>
      <template #createAt="scope">
        <span>{{ formatTime(scope.row.createAt) }}</span>
      </template>
      <template #updateAt="scope">
        <span>{{ formatTime(scope.row.updateAt) }}</span>
      </template>
      <template #handler="scope">
        <div class="handle-btns">
          <el-button text @click="handleEditClick(scope.row)"> 编辑 </el-button>
          <el-button text @click="handleDeleteClick(scope.row)">删除</el-button>
        </div>
      </template>
    </hy-table>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from "vue";
import { useStore } from "vuex";
import HyTable from "@/base-ui/table";
import { formatTime } from "@/utils/date-format";
const store = useStore();
interface Props {
  pageName: string;
  contentTableConfig: any;
}
// 1.定义属性并且带上默认值
const props = withDefaults(defineProps<Props>(), {
  pageName: "",
  contentTableConfig: () => ({})
});
// 1.双向绑定 pageInfo 分页器信息
const pageInfo = ref({ currentPage: 1, pageSize: 10 });
watch(pageInfo, () => getPageData());

// 发送网络请求, 查询用户列表
const getPageData = (queryInfo: any = {}) => {
  store.dispatch("system/getPageListAction", {
    pageName: props.pageName, // 页面的名称将会作为：URL路径参数
    queryInfo: {
      offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
      size: pageInfo.value.pageSize,
      ...queryInfo // 用户的检索条件
    }
  });
};
// 首次发起网路请求获取用户信息
getPageData();

// 2.表格数据
const dataList = computed(() =>
  store.getters[`system/pageListData`](props.pageName)
);
const dataCount = computed(() =>
  store.getters[`system/pageListCount`](props.pageName)
);

// 3.点击新建用户
const emit = defineEmits<{
  (e: "newBtnClick"): void;
  (e: "editBtnClick", item: any): void;
}>();
// 5.删除/编辑/新建操作
const handleDeleteClick = (item: any) => {
  console.log(item);
  store.dispatch("system/deletePageDataAction", {
    pageName: props.pageName,
    id: item.id
  });
};
const handleNewClick = () => {
  emit("newBtnClick");
};
const handleEditClick = (item: any) => {
  emit("editBtnClick", item);
};

// 4.对外暴露两个属性
defineExpose({ getPageData });
</script>

<style scoped>
.page-content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
</style>
