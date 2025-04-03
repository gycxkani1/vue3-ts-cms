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
import { useStore } from "vuex";
import localCache from "@/utils/cache";
import { ElForm, ElFormItem, ElInput } from "element-plus";
import { rules } from "../config/account-config";

const store = useStore();
// 1. 定义响应式数据，保存用户输入的账号和密码
const account = reactive({
  name: "",
  password: ""
});
// 2. 获取form组件对象，并声明类型为InstanceType<typeof ElForm>
const formRef = ref<InstanceType<typeof ElForm>>();
// 3. 提交表单和表单验证
const loginAction = (isKeepPassword: boolean) => {
  formRef.value?.validate((valid) => {
    if (valid) {
      // 1.判断是否需要记住密码
      if (isKeepPassword) {
        // 本地缓存用户名和密码
        localCache.setCache("name", account.name);
        localCache.setCache("password", account.password);
      } else {
        // 清除本地缓存的用户名和密码
        localCache.deleteCache("name");
        localCache.deleteCache("password");
      }

      // 2.开始进行登录验证
      store.dispatch("login/accountLoginAction", { ...account });
    }
  });
};

// 给表单项设置值
const setFormFields = (name: string, password: string) => {
  account.name = name || account.name;
  account.password = password || account.password;
};

// 4. 暴露给父组件的方法
defineExpose({
  loginAction,
  setFormFields
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
