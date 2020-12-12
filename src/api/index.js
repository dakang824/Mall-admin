/*
 * @Author: yukang 1172248038@qq.com
 * @Description:
 * @Date: 2020-12-12 17:16:24
 * @LastEditTime: 2020-12-12 17:21:57
 */
import request from "@/utils/request";

export function statOrderByDay(data) {
  return request({
    url: "service/plat/admin/statOrderByDay",
    method: "post",
    data,
  });
}

export function statOrderByMonth(data) {
  return request({
    url: "service/plat/admin/statOrderByMonth",
    method: "post",
    data,
  });
}
