/*
 * @Author: zyl
 * @Date: 2023-01-04 15:25:30
 * @LastEditors: zyl zyl14730@cnki.net
 * @LastEditTime: 2023-01-09 10:04:46
 * @Description: 
 */
import axios from "axios";
import { Message } from "element-ui";

// 创建axios实例
const service = axios.create({
  baseURL: "http://127.0.0.1:3000/api", // api的base_url
  timeout: 5000, // 请求超时时间
});

// respone拦截器
service.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("err" + error); // for debug
    Message({
      message: error.message,
      type: "error",
      duration: 5 * 1000,
    });
    return Promise.reject(error);
  }
);

export default service;
