<template>
  <div class="hy-form">
    <!-- 头部提供插槽 -->
    <div class="header">
      <slot name="header"></slot>
    </div>
    <!-- 表单区域 -->
    <el-form :label-width="labelWidth">
      <el-row>
        <el-col v-bind="colLayout">
          <el-form-item label="用户名">
            <el-input
              :model-value="modelValue.name"
              @update:modelValue="handleValueChange($event, 'name')"
              placeholder="输入用户名"
            />
          </el-form-item>
        </el-col>
        <el-col v-bind="colLayout">
          <el-form-item label="状态">
            <el-select
              :model-value="modelValue.enable"
              @update:modelValue="handleValueChange($event, 'enable')"
              placeholder="选择状态"
            >
              <el-option label="启用" value="1" />
              <el-option label="禁用" value="0" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!-- 尾部提供插槽 -->
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  modelValue: any
  labelWidth?: string
  colLayout?: any
}
// 1.定义属性并且带上默认值
const props = withDefaults(defineProps<Props>(), {
  modelValue: () => ({}), // formData
  labelWidth: '100px', // 标签名的宽
  colLayout: () => ({
    xl: 6, // 网格布局，屏幕>1920px显示4列
    lg: 8,
    md: 12,
    sm: 24,
    xs: 24
  })
})

// 2.定义了输入框的输入事件
const emit = defineEmits<{
  (e: 'update:modelValue', newFormData: any): void
}>()
const handleValueChange = (value: any, field: string) => {
  emit('update:modelValue', { ...props.modelValue, [field]: value })
}
// 3.对外暴露两个属性
defineExpose({ handleValueChange })
</script>

<style scoped lang="less">
.hy-form {
  padding-top: 22px;
}
</style>
