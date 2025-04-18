import axios from "axios";
import type { AxiosInstance } from "axios";
import type { HYRequestInterceptors, HYRequestConfig } from "./type";
// 导入ElLoading组件和样式
import "element-plus/es/components/loading/style/css";
import { ElLoading } from "element-plus";
const DEFAULT_LOADING = true;

class HYRequest<T = any> {
  instance: AxiosInstance;
  interceptors?: HYRequestInterceptors; // 指定拦截器的类型

  showLoading?: boolean; // 定义是否显示loading
  loading?: any; // loading的组件实例

  constructor(config: HYRequestConfig<T>) {
    // 创建axios实例
    this.instance = axios.create(config);
    // 默认是否显示加载进度
    this.showLoading =
      config.showLoading === undefined ? DEFAULT_LOADING : config.showLoading; // 默认为true

    // 从config中取出对应的实例的拦截器
    this.interceptors = config.interceptors;
    // 如果某个实例的config中有定义拦截的回调函数，那么将这些函数添加到实例的拦截器中
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    );
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    );

    // 给所有实例添加全局的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // console.log('所有的实例都有的拦截器: 请求成功拦截')
        if (this.showLoading) {
          // 以服务的方式调用。由于创建的loading是单例的，所以不会重复创建
          this.loading = ElLoading.service({
            lock: true,
            text: "Loading",
            background: "rgba(0, 0, 0, 0.2)",
            fullscreen: true
          });
        }
        return config;
      },
      (err) => {
        // console.log('所有的实例都有的拦截器: 请求失败拦截')
        return err;
      }
    );

    this.instance.interceptors.response.use(
      (res) => {
        // console.log('所有的实例都有的拦截器: 响应成功拦截')

        this.loading?.close(); // 将loading移除
        // 这里还可以对返回的数据进行判断
        return res.data;
      },
      (err) => {
        // console.log('所有的实例都有的拦截器: 响应失败拦截')

        this.loading?.close(); // 将loading移除
        // 例子: 判断不同的HttpErrorCode显示不同的错误信息
        if (err.response.status === 404) {
          console.log("404的错误~");
        }
        return err;
      }
    );
  }

  request<T = any>(config: HYRequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      // 判断某个请求是否需要显示loading
      if (config.showLoading === false) {
        this.showLoading = config.showLoading;
      }
      this.instance
        .request<T, T>(config)
        .then((res) => {
          // 3.将结果resolve返回出去
          resolve(res);
        })
        .catch((err) => {
          reject(err);
          return err;
        })
        .finally(() => {
          // 将showLoading设置true, 这样不会影响下一个请求
          this.showLoading = DEFAULT_LOADING;
        });
    });
  }

  get<T = any>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "GET" });
  }
  post<T = any>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "POST" });
  }
  delete<T = any>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "DELETE" });
  }

  patch<T = any>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "PATCH" });
  }
}

export default HYRequest;
