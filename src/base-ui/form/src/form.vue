<template>
  <div class="hy-form">
    <div class="header"><slot name="header"></slot></div>
    <el-form :label-width="labelWidth">
      <el-row>
        <template v-for="item in formItems" :key="item.label">
          <el-col v-bind="colLayout">
            <el-form-item
              v-if="!item.isHidden"
              :label="item.label"
              :rules="item.rules"
              :style="itemStyle"
            >
              <template
                v-if="item.type === 'input' || item.type === 'password'"
              >
                <el-input
                  :placeholder="item.placeholder"
                  v-bind="item.otherOptions"
                  :show-password="item.type === 'password'"
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)"
                />
              </template>
              <template v-else-if="item.type === 'select'">
                <el-select
                  :placeholder="item.placeholder"
                  v-bind="item.otherOptions"
                  style="width: 100%"
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)"
                >
                  <el-option
                    v-for="option in item.options"
                    :key="option.value"
                    :value="option.value"
                    >{{ option.title }}</el-option
                  >
                </el-select>
              </template>
              <template v-else-if="item.type === 'datepicker'">
                <el-date-picker
                  style="width: 100%"
                  v-bind="item.otherOptions"
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)"
                ></el-date-picker>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <div class="footer"><slot name="footer"></slot></div>
  </div>
</template>

<script lang="ts" setup>
import { IFormItem } from '../types'
interface Props {
  modelValue: any
  labelWidth?: string
  colLayout?: any
  itemStyle?: any
  formItems: IFormItem[]
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
  }),
  itemStyle: () => ({ padding: '10px 40px' }),
  formItems: () => []
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
