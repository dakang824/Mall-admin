/*
 * @Author: yukang 1172248038@qq.com
 * @Date: 2020-09-20 22:25:48
 * @LastEditTime: 2020-10-27 00:27:18
 */
function imgBaseUrl(val) {
  return "/service/" + val;
}
function toFixed(val, num = 2) {
  return val ? Number(val).toFixed(num) : "0.00";
}
export default { imgBaseUrl, toFixed };
