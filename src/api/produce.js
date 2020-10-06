/*
 * @Author: yukang 1172248038@qq.com
 * @Description: 产地管理
 * @Date: 2020-10-03 11:00:21
 * @LastEditTime: 2020-10-06 17:05:19
 */
import request from "@/utils/request";

export function findAllProdAddress() {
  return request({
    url: "/service/plat/admin/findAllProdAddress",
    method: "get",
  });
}

export function addProdAddress(data) {
  return request({
    url: "/service/plat/admin/addProdAddress",
    method: "post",
    data,
  });
}

export function modifyProdAddress(data) {
  return request({
    url: "/service/plat/admin/modifyProdAddress",
    method: "post",
    data,
  });
}

export function deleteProdAddress(data) {
  return request({
    url: "/service/plat/admin/deleteProdAddress",
    method: "post",
    data,
  });
}
