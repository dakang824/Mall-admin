/*
 * @Author: yukang 1172248038@qq.com
 * @Description:汇款订单
 * @Date: 2020-10-30 00:05:16
 * @LastEditTime: 2020-10-30 22:07:18
 */
import request from "@/utils/request";

export function findMyRemittance(data) {
  return request({
    url: "/service/plat/admin/findMyRemittance",
    method: "post",
    data,
  });
}

export function conformRemittance(data) {
  return request({
    url: "/service/plat/admin/conformRemittance",
    method: "post",
    data,
  });
}
