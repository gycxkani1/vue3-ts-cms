<template>
  <div class="nav-menu">
    <!-- logo -->
    <div class="logo">
      <img class="img" src="~@/assets/img/logo.svg" alt="logo" />
      <!-- 折叠时隐藏标题 -->
      <span v-if="!collapse" class="title">Vue3+TS-{{ collapse }}</span>
    </div>
    <!-- 菜单导航 -->
    <el-menu
      default-active="39"
      class="el-menu-vertical"
      :collapse="collapse"
      background-color="#0c2135"
      text-color="#b7bdc3"
      active-text-color="#0a60bd"
    >
      <!-- 二级菜单的可以展开的标题 -->
      <el-sub-menu :index="'38'">
        <template #title>
          <!-- <el-icon><Setting /></el-icon> -->
          <!-- 上面是固定写法，下面是动态写法 -->
          <el-icon><component :is="'Setting'"></component></el-icon>
          <span>系统总览</span>
        </template>
        <!-- 子菜单项 -->
        <el-menu-item :index="'39'">
          <span>核心技术</span>
        </el-menu-item>
        <el-menu-item :index="'40'">
          <span>商品统计</span>
        </el-menu-item>
      </el-sub-menu>
      <el-menu-item :index="'41'">
        <el-icon><ChatDotRound /></el-icon>
        <span>随便聊聊</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  collapse: boolean;
}
// 1.定义属性并且带上默认值
const props = withDefaults(defineProps<Props>(), {
  collapse: true // 菜单默认展开
});
</script>

<style scoped lang="less">
.nav-menu {
  height: 100%;
  background-color: #001529;
  .logo {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    .img {
      height: 100%;
      margin: 0 10px;
    }

    .title {
      font-size: 16px;
      font-weight: 700;
      color: white;
    }
  }
  .el-menu {
    border-right: none;
  }
  // 目录
  .el-submenu {
    background-color: #001529 !important;
    // 二级菜单 ( 默认背景 )
    .el-menu-item {
      padding-left: 50px !important;
      background-color: #0c2135 !important;
    }
  }
  ::v-deep .el-submenu__title {
    background-color: #001529 !important;
  }

  // hover 高亮
  .el-menu-item:hover {
    color: #fff !important; // 菜单
  }
  .el-menu-item.is-active {
    color: #fff !important;
    background-color: #0a60bd !important;
  }
}
.el-menu-vertical:not(.el-menu--collapse) {
  width: 100%;
  height: calc(100% - 48px);
}
</style>
