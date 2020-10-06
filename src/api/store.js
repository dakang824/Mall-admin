/*
 * @Author: yukang 1172248038@qq.com
 * @Description: 店铺管理
 * @Date: 2020-10-03 09:17:16
 * @LastEditTime: 2020-10-06 18:48:01
 */
import request from "@/utils/request";

export function findStore(data) {
  return request({
    url: "/service/plat/admin/findStore",
    method: "post",
    data,
  });
}

export function addStore(data) {
  return request({
    url: "/service/plat/admin/addStore",
    method: "post",
    data,
  });
}
export function modifyStore(data) {
  return request({
    url: "/service/plat/admin/modifyStore",
    method: "post",
    data,
  });
}

export function deleteStore(data) {
  return request({
    url: "/service/plat/admin/deleteStore",
    method: "post",
    data,
  });
}
