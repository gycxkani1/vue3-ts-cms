import hyRequest from "../index";

import type { IAccount, ILoginResult } from "./types";
import type { IDataType } from "../types";

enum LoginAPI {
  AccountLogin = "/login", // 登录接口，默认为加上BASE_URL作为前缀
  LoginUserInfo = "/users/", // 用法: /users/1
  UserMenus = "/role/" // 用法: role/1/menu
}

// 登录的服务
export function accountLoginRequest(account: IAccount) {
  // 调用hyRequest.post方法，并指定res.data的数据类型为IDataType<ILoginResult>
  return hyRequest.post<IDataType<ILoginResult>>({
    url: LoginAPI.AccountLogin,
    data: account // 用户名和密码
  });
}
// 根据id获取用户信息
export function requestUserInfoById(id: number) {
  return hyRequest.get<IDataType>({
    url: LoginAPI.LoginUserInfo + id,
    showLoading: false
  });
}
// 根据id获取用户菜单
export function requestUserMenusByRoleId(id: number) {
  return hyRequest.get<IDataType>({
    url: LoginAPI.UserMenus + id + "/menu",
    showLoading: false
  });
}
