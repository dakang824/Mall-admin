/*
 * @Author: yukang 1172248038@qq.com
 * @Description:商品管理
 * @Date: 2020-10-03 11:27:37
 * @LastEditTime: 2020-10-27 00:26:55
 */
import request from "@/utils/request";

export function findProduct(params) {
  return request({
    url: "/service/plat/admin/findProduct",
    method: "get",
    params,
  });
}

export function findAllCategory() {
  return request({
    url: "/service/plat/admin/findAllCategory",
    method: "get",
  });
}

export function findSubCategoryByCateId(params) {
  return request({
    url: "/service/plat/admin/findSubCategoryByCateId",
    method: "get",
    params,
  });
}
export function addProduct(data) {
  return request({
    url: "/service/plat/admin/addProduct",
    method: "post",
    data,
  });
}
export function deleteProduct(data) {
  return request({
    url: "/service/plat/admin/deleteProduct",
    method: "post",
    data,
  });
}
export function modifyProduct(data) {
  return request({
    url: "/service/plat/admin/modifyProduct",
    method: "post",
    data,
  });
}
export function onlineProduct(data) {
  return request({
    url: "/service/plat/admin/onlineProduct",
    method: "post",
    data,
  });
}
export function offlineProduct(data) {
  return request({
    url: "/service/plat/admin/offlineProduct",
    method: "post",
    data,
  });
}
