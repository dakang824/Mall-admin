/*
 * @Author: yukang 1172248038@qq.com
 * @Description:订单管理
 * @Date: 2020-10-26 22:43:34
 * @LastEditTime: 2020-11-02 22:43:43
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

export function orderPost(data) {
  return request({
    url: "/service/plat/admin/orderPost",
    method: "post",
    data,
  });
}

export function exportOrderRecipe(data) {
  return request({
    url: "/service/plat/admin/exportOrderRecipe",
    method: "post",
    data,
  });
}

export function findOrderRecipe(data) {
  return request({
    url: "/service/plat/admin/findOrderRecipe",
    method: "post",
    data,
  });
}

export function exportOrders(data) {
  return request({
    url: "/service/plat/admin/exportOrders",
    method: "post",
    data,
  });
}
