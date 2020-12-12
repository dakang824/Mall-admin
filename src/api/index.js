/*
 * @Author: yukang 1172248038@qq.com
 * @Description:
 * @Date: 2020-12-12 17:16:24
 * @LastEditTime: 2020-12-12 17:17:09
 */
import request from "@/utils/request";

export function statOrderByDay(params) {
  return request({
    url: "service/plat/admin/statOrderByDay",
    method: "get",
    params,
  });
}

export function statOrderByMonth(params) {
  return request({
    url: "service/plat/admin/statOrderByMonth",
    method: "get",
    params,
  });
}
