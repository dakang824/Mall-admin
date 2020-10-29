/*
 * @Author: yukang 1172248038@qq.com
 * @Description:汇款订单
 * @Date: 2020-10-30 00:05:16
 * @LastEditTime: 2020-10-30 00:09:26
 */
import request from "@/utils/request";

export function findMyRemittance(data) {
  return request({
    url: "/service/plat/admin/findMyRemittance",
    method: "post",
    data,
  });
}

export function doEdit(data) {
  return request({
    url: "/order/remittance/doEdit",
    method: "post",
    data,
  });
}

export function doDelete(data) {
  return request({
    url: "/order/remittance/doDelete",
    method: "post",
    data,
  });
}
