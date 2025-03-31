<template>
  <div class="login-account">
    <el-form label-width="60px" :model="account" :rules="rules" ref="formRef">
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, defineExpose } from "vue";
import { ElForm, ElFormItem, ElInput } from "element-plus";
import { rules } from "../config/account-config";
// 1. 定义响应式数据，保存用户输入的账号和密码
const account = reactive({
  name: "",
  password: ""
});
// 2. 获取form组件对象，并声明类型为InstanceType<typeof ElForm>
const formRef = ref<InstanceType<typeof ElForm>>();
// 3. 提交表单和表单验证
const loginAction = () => {
  formRef.value?.validate((valid) => {
    if (valid) {
      console.log("真正执行登录逻辑");
    }
  });
};
// 4. 暴露给父组件的方法
defineExpose({
  loginAction
});
</script>

<style scoped lang="less">
.login-account {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  font-size: 14px;
}
</style>
