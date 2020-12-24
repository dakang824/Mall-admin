/*
 * @Author: yukang 1172248038@qq.com
 * @Description:
 * @Date: 2020-12-19 12:57:50
 * @LastEditTime: 2020-12-24 21:31:18
 */
import request from "@/utils/request";

export function findStoreCashApply(data) {
  return request({
    url: "/service/plat/admin/findStoreCashApply",
    method: "post",
    data,
  });
}

export function addStoreCashApply(data) {
  return request({
    url: "/service/plat/admin/addStoreCashApply",
    method: "post",
    data,
  });
}

export function deleteStoreCashApply(data) {
  return request({
    url: "/service/plat/admin/deleteStoreCashApply",
    method: "post",
    data,
  });
}

export function auditStoreCashApply(data) {
  return request({
    url: "/service/plat/admin/auditStoreCashApply",
    method: "post",
    data,
  });
}
