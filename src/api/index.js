/*
 * @Author: zyl
 * @Date: 2023-01-09 09:14:55
 * @LastEditors: zyl zyl14730@cnki.net
 * @LastEditTime: 2023-01-11 17:16:41
 * @Description:
 */
import request from "@/utils/request";

//获取实时气象数据
export function getMeteorologicalData(params) {
  return request({
    url: "/getMeteorologicalData",
    method: "get",
    params,
  });
}

//24小时功率预测图
export function getHoursChart(params) {
  return request({
    url: "/getHoursChart",
    method: "get",
    params,
  });
}

//查询历史气象数据
export function getHistoryMeteorologicalData(params) {
  return request({
    url: "/getHistoryMeteorologicalData",
    method: "get",
    params,
  });
}

//短期预测误差数据
export function getShortForecast(params) {
  return request({
    url: "/getShortForecast",
    method: "get",
    params,
  });
}

//超短期预测误差数据
export function getUltraShortForecast(params) {
  return request({
    url: "/getUltraShortForecast",
    method: "get",
    params,
  });
}
