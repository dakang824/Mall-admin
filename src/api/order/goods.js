/*
 * @Author: yukang 1172248038@qq.com
 * @Description:订单管理
 * @Date: 2020-10-26 22:43:34
 * @LastEditTime: 2020-10-30 00:09:17
 */
import request from "@/utils/request";

export function queryOrders(data) {
  return request({
    url: "/service/plat/admin/queryOrders",
    method: "post",
    data,
  });
}

export function getProductDetail(data) {
  return request({
    url: "/service/front/web/getProductDetail",
    method: "post",
    data,
  });
}
