import HYRequest from "./request"; // 1. 导入HYRequest类
import { BASE_URL, TIME_OUT } from "./request/config"; // 2. 导入基本配置
// 3. 创建HYRequest类的实例hyRequest
const hyRequest = new HYRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  // 为单个实例添加拦截器
  interceptors: {
    requestInterceptor: (config) => {
      const token = "";
      if (token) {
        // 例子：统一为header添加Authorization属性
        config.headers!.Authorization = `Bearer ${token}`;
      }
      // console.log("单个实例-请求成功的拦截");
      return config;
    },
    requestInterceptorCatch: (error) => {
      // console.log("单个实例-请求失败的拦截");
      return error;
    },
    responseInterceptor: (res) => {
      // console.log("单个实例-响应成功的拦截");
      return res;
    },
    responseInterceptorCatch: (error) => {
      // console.log("单个实例-响应失败的拦截");
      return error;
    }
  }
});
export default hyRequest;
