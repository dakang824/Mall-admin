/*
 * @Author: yukang 1172248038@qq.com
 * @Description:订单管理
 * @Date: 2020-10-26 22:43:34
 * @LastEditTime: 2020-10-27 21:42:18
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

export function doEdit(data) {
  return request({
    url: "/order/goods/doEdit",
    method: "post",
    data,
  });
}
