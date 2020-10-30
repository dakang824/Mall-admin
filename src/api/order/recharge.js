/*
 * @Author: yukang 1172248038@qq.com
 * @Description:
 * @Date: 2020-10-30 22:51:52
 * @LastEditTime: 2020-10-30 23:06:34
 */
import request from "@/utils/request";

export function queryRecharge(data) {
  return request({
    url: "/service/plat/admin/queryRecharge",
    method: "post",
    data,
  });
}
