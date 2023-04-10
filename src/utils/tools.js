/*
 * @Author: zyl
 * @Date: 2023-01-10 14:42:34
 * @LastEditors: zyl zyl14730@cnki.net
 * @LastEditTime: 2023-01-10 15:03:50
 * @Description:
 */
//时间戳转化为日期
export function timestampToTime(timestamp) {
  var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var Y = date.getFullYear() + "-";
  var M =
    (date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1) + "-";
  var D = date.getDate() < 10 ? "0" + date.getDate() : date.getDate() + "";
  return Y + M + D;
}
