import { accountLoginRequest } from "@/service/login/login";
import localCache from "@/utils/cache";
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
    }
    // changeUserInfo(state, userInfo: IAccount) {
    //   state.userInfo = userInfo;
    //   localCache.setCache("userInfo", userInfo);
    // }
  },
  actions: {
    async accountLoginAction({ commit, dispatch }, payload: IAccount) {
      // 1.实现登录逻辑
      const loginResult = await accountLoginRequest(payload);
      const { id, token } = loginResult.data;
      // 将结果存起来
      commit("changeToken", token);
      localCache.setCache("token", token);
      // commit("changeUserInfo", id);
      // console.log("登录成功", loginResult);
      // return id;
    }
  }
};
export default loginModule;
