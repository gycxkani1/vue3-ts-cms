import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenusByRoleId
} from "@/service/login/login";
import localCache from "@/utils/cache";
import router from "@/router";
import { mapMenusToRoutes } from "@/utils/map-menus";

import { Module } from "vuex";
import { IRootState } from "../types";
import { ILoginState } from "./types";
import { IAccount } from "@/service/login/types";

const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true, // 开启命名空间
  state() {
    return {
      token: "", // 保存登录成功的token
      // userInfo: localCache.getCache("userInfo") || {}
      userInfo: {}, // 保存用户信息
      userMenus: [], // 保存用户菜单
      permissions: [] // 保存用户权限
    };
  },
  getters: {},
  mutations: {
    changeToken(state, token: string) {
      state.token = token;
    },
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo;
    },
    changeUserMenus(state, userMenus: any) {
      // 1. 保存用户菜单
      state.userMenus = userMenus;
      // 2.将userMenus 映射为 routes
      const routes = mapMenusToRoutes(userMenus);
      // 3.动态注册路由
      routes.forEach((route) => {
        router.addRoute("main", route);
      });
    }
  },
  actions: {
    async accountLoginAction({ commit, dispatch }, payload: IAccount) {
      // 1.实现登录逻辑
      const loginResult = await accountLoginRequest(payload);
      const { id, token } = loginResult.data;
      // 将结果存起来
      commit("changeToken", token);
      localCache.setCache("token", token);
      // 发送初始化的请求(完整的role/department)
      // dispatch('getInitialDataAction', null, { root: true })

      // 2.请求用户信息
      const userInfoResult = await requestUserInfoById(id);
      const userInfo = userInfoResult.data;
      console.log(userInfo);
      commit("changeUserInfo", userInfo);
      localCache.setCache("userInfo", userInfo);

      // 3.请求用户菜单
      const userMenusResult = await requestUserMenusByRoleId(userInfo.role.id);
      const userMenus = userMenusResult.data;
      console.log(userMenus);
      commit("changeUserMenus", userMenus);
      localCache.setCache("userMenus", userMenus);
      // 4.跳到首页
      router.push("/main");
    },
    // 该action函数用于初始化Vuex中的数据，可派发login/loadLocalLogin来触发该函数的回调
    loadLocalLogin({ commit, dispatch }) {
      const token = localCache.getCache("token");
      if (token) {
        commit("changeToken", token);
        // 发送初始化的请求(完整的role/department)
        // dispatch('getInitialDataAction', null, { root: true })
      }
      const userInfo = localCache.getCache("userInfo");
      if (userInfo) {
        commit("changeUserInfo", userInfo);
      }
      const userMenus = localCache.getCache("userMenus");
      if (userMenus) {
        commit("changeUserMenus", userMenus);
      }
    }
  }
};
export default loginModule;
