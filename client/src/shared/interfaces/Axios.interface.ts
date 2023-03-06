export interface AxiosResponse<T = never> {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, string>;
  config: AxiosRequestConfig<T>;
  request?: any;
}
export interface AxiosRequestConfig<T = any> {
  url?: string;
  method?: Method;
  baseURL?: string;
  data?: T;
  headers?: Record<string, string>;
  params?: any;
}
type Method = "GET" | "POST" | "DELETE" | "PATCH" | "PUT";
