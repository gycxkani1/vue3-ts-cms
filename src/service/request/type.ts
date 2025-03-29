import type { AxiosRequestConfig, AxiosResponse } from "axios";
// 定义拦截器的类型，T是响应结果(res.data)的类型
export interface HYRequestInterceptors<T = any> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  requestInterceptorCatch?: (error: any) => any;
  responseInterceptor?: (
    res: AxiosResponse<T>
  ) => AxiosResponse<T> | Promise<AxiosResponse<T>>;
  responseInterceptorCatch?: (error: any) => any;
}

export interface HYRequestConfig<T = any> extends AxiosRequestConfig {
  // 可扩展自己的类型
  interceptors?: HYRequestInterceptors<T>;
  showLoading?: boolean;
}
