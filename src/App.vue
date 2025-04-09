<template>
  <!-- <nav>
    <router-link to="/">Login</router-link> |
    <router-link to="/main">Main</router-link>
  </nav> -->
  <el-config-provider :locale="locale">
    <div class="app">
      <router-view></router-view>
    </div>
  </el-config-provider>
  <!-- <router-view /> -->
</template>

<script lang="ts" setup>
import { ref } from "vue";
import zhCn from "element-plus/lib/locale/lang/zh-cn";
const locale = ref(zhCn);
</script>

<style lang="less">
.app {
  height: 100%;
}

// #app {
//   font-family: Avenir, Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   text-align: center;
//   color: #2c3e50;
// }

// nav {
//   padding: 30px;

//   a {
//     font-weight: bold;
//     color: #2c3e50;

//     &.router-link-exact-active {
//       color: #42b983;
//     }
//   }
// }
</style>
