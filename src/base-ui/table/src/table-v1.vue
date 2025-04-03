<template>
  <!-- 1.表格头部 -->
  <div class="hy-table">
    <div class="header">
      <slot name="header">
        <div class="title">{{ title }}</div>
        <div class="handler">
          <slot name="headerHandler"></slot>
        </div>
      </slot>
    </div>
    <!-- 2.表格 -->
    <el-table
      :data="listData"
      border
      style="width: 100%"
      @selection-change="handleSelectionChange"
      v-bind="childrenProps"
    >
      <!-- 2.1.表格列是否显示可勾选 -->
      <el-table-column
        v-if="showSelectColumn"
        type="selection"
        align="center"
        width="60"
      ></el-table-column>
      <!-- 2.2.表格列是否显示行号 -->
      <el-table-column
        v-if="showIndexColumn"
        type="index"
        label="序号"
        align="center"
        width="80"
      ></el-table-column>
      <!-- 2.3.表格列：用户名 -->
      <el-table-column
        prop="name"
        label="用户名"
        align="center"
        show-overflow-tooltip
      >
      </el-table-column>
      <!-- 2.4.表格列：状态 -->
      <el-table-column
        prop="enable"
        label="状态"
        align="center"
        show-overflow-tooltip
      >
        <!-- 借用插槽来自定义列内容 -->
        <template #default="scope">
          <el-button>{{ scope.row.enable ? '启用' : '禁用' }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 3.表格尾部 -->
    <div class="footer" v-if="showFooter">
      <slot name="footer">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page.currentPage"
          :page-size="page.pageSize"
          :page-sizes="[10, 20, 30]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="listCount"
        >
        </el-pagination>
      </slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  title?: string
  listData: Array<any>
  listCount?: number
  page?: { currentPage: number; pageSize: number }
  childrenProps?: any
  showIndexColumn?: boolean
  showSelectColumn?: boolean
  showFooter?: boolean
}
// 1.定义属性并且带上默认值
const props = withDefaults(defineProps<Props>(), {
  title: '',
  listData: () => [],
  listCount: 0,
  page: () => ({ currentPage: 0, pageSize: 10 }),
  childrenProps: () => ({}),
  showIndexColumn: true,
  showSelectColumn: true,
  showFooter: true
})

// 2.定义了输入框的输入事件
const emit = defineEmits<{
  (e: 'selectionChange', value: any): void
  (e: 'update:page', value: any): void
}>()
const handleSelectionChange = (value: any) => {
  emit('selectionChange', value)
}
const handleCurrentChange = (currentPage: number) => {
  emit('update:page', { ...props.page, currentPage })
}
const handleSizeChange = (pageSize: number) => {
  emit('update:page', { ...props.page, pageSize })
}
// 3.对外暴露两个属性
defineExpose({
  handleSelectionChange,
  handleCurrentChange,
  handleSizeChange
})
</script>

<style scoped lang="less">
.header {
  display: flex;
  height: 45px;
  padding: 0 5px;
  justify-content: space-between;
  align-items: center;

  .title {
    font-size: 20px;
    font-weight: 700;
  }

  .handler {
    align-items: center;
  }
}

.footer {
  margin-top: 15px;
  display: flex;
  justify-content: flex-end;

  .el-pagination {
    text-align: right;
  }
}
</style>
