/*
 * @Author: yukang 1172248038@qq.com
 * @Date: 2020-09-20 22:25:48
 * @LastEditTime: 2021-02-21 15:22:06
 */
import { target } from "@/config/settings";
function imgBaseUrl(val) {
  return process.env.NODE_ENV === "development"
    ? `/service/${val}`
    : target + val;
}
function toFixed(val, num = 2) {
  return val ? Number(val).toFixed(num) : "0.00";
}
function slice(val, start = 0, end = val.length) {
  return val ? val.slice(start, end) : "";
}
export default { slice, imgBaseUrl, toFixed };
