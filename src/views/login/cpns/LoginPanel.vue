<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>
    <el-tabs type="border-card" stretch v_model="currentTab">
      <el-tab-pane name="account">
        <template #label>
          <span>
            <el-icon><UserFilled /></el-icon> 账号登录
          </span>
        </template>
        <!-- todo add login form 1-->
        <login-account ref="accountRef"></login-account>
      </el-tab-pane>
      <el-tab-pane name="phone">
        <template #label>
          <span>
            <el-icon><Iphone /></el-icon> 手机登录
          </span>
        </template>
        <!-- todo add login form 2 -->
        <login-phone ref="phoneRef"></login-phone>
      </el-tab-pane>
    </el-tabs>

    <div class="account-control">
      <el-checkbox v-model="isKeepPassword">记住密码</el-checkbox>
      <el-link type="primary">忘记密码</el-link>
    </div>

    <el-button type="primary" class="login-btn" @click="handleLoginClick"
      >立即登录</el-button
    >
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import LoginAccount from "./LoginAccount.vue";
import LoginPhone from "./LoginPhone.vue";
import localCache from "@/utils/cache";

const currentTab = ref("account");
const isKeepPassword = ref(true);
const accountRef = ref<InstanceType<typeof LoginAccount>>();

onMounted(() => {
  // 回显用户名和密码（默认回显：coderwhy  123456）
  const name = localCache.getCache("name") || "coderwhy";
  const password = localCache.getCache("password") || "123456";
  accountRef.value?.setFormFields(name, password);
});
const handleLoginClick = () => {
  // console.log(isKeepPassword.value, "单击登录");
  if (currentTab.value === "account") {
    accountRef.value?.loginAction(isKeepPassword.value);
  } else {
    // todo 手机登录
  }
};
</script>

<style scoped lang="less">
.login-panel {
  margin-bottom: 150px;
  width: 320px;

  .title {
    text-align: center;
  }

  .account-control {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
  }

  .login-btn {
    width: 100%;
    margin-top: 10px;
  }
}
</style>
