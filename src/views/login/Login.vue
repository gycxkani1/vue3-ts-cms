<template>
  <div class="login">
    <!-- 使用LoginPanel组件  -->
    <login-panel />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LoginPanel from "./cpns/LoginPanel.vue";
export default defineComponent({
  name: "Login",
  components: {
    LoginPanel
  },
  setup() {
    return {};
  }
});
</script>

<style scoped lang="less">
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: url("@/assets/img/login-bg.svg");
}
</style>
