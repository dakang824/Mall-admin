/*
 * @Author: yukang 1172248038@qq.com
 * @Description: 产地管理
 * @Date: 2020-10-03 11:00:21
 * @LastEditTime: 2020-12-07 17:19:01
 */
import request from "@/utils/request";

export function findAllCompany(data) {
  return request({
    url: "/service/plat/admin/findAllCompany",
    method: "post",
    data,
  });
}

export function addCompany(data) {
  return request({
    url: "/service/plat/admin/addCompany",
    method: "post",
    data,
  });
}

export function modifyCompany(data) {
  return request({
    url: "/service/plat/admin/modifyCompany",
    method: "post",
    data,
  });
}

export function deleteCompany(data) {
  return request({
    url: "/service/plat/admin/deleteCompany",
    method: "post",
    data,
  });
}
