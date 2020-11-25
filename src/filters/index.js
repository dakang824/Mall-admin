/*
 * @Author: yukang 1172248038@qq.com
 * @Date: 2020-09-20 22:25:48
 * @LastEditTime: 2020-11-25 19:36:15
 */
import { baseURL } from "@/config/settings";
function imgBaseUrl(val) {
  return process.env.NODE_ENV === "development"
    ? `http://47.101.210.167/${val}` || `/service/${val}`
    : baseURL + val;
}
function toFixed(val, num = 2) {
  return val ? Number(val).toFixed(num) : "0.00";
}
function slice(val, start = 0, end = val.length) {
  return val ? val.slice(start, end) : "";
}
export default { slice, imgBaseUrl, toFixed };
