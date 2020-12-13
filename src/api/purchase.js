/*
 * @Author: yukang 1172248038@qq.com
 * @Description:
 * @Date: 2020-12-13 19:11:01
 * @LastEditTime: 2020-12-13 23:37:49
 */
import request from "@/utils/request";

export function findShouldPostOrders(data) {
  return request({
    url: "/service/plat/admin/findShouldPostOrders",
    method: "post",
    data,
  });
}

export function getOrderBill(data) {
  return request({
    url: "/service/plat/admin/getOrderBill",
    method: "post",
    data,
  });
}

export function conformBuyBill(data) {
  return request({
    url: "/service/plat/admin/conformBuyBill",
    method: "post",
    data,
  });
}
