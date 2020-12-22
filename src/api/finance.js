/*
 * @Author: yukang 1172248038@qq.com
 * @Description:
 * @Date: 2020-12-19 12:57:50
 * @LastEditTime: 2020-12-22 22:29:14
 */
import request from "@/utils/request";

export function getList(data) {
  return request({
    url: "/finance/getList",
    method: "post",
    data,
  });
}

export function adminRecharge(data) {
  return request({
    url: "/service/plat/admin/adminRecharge",
    method: "post",
    data,
  });
}
