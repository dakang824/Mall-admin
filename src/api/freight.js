/*
 * @Author: yukang 1172248038@qq.com
 * @Description:　运费管理
 * @Date: 2020-10-02 09:38:00
 * @LastEditTime: 2020-11-07 19:18:22
 */
import request from "@/utils/request";

export function findAllPostTemplate() {
  return request({
    url: "/service/plat/admin/findAllPostTemplate",
    method: "get",
  });
}

export function addPostTemplate(data) {
  return request({
    url: "/service/plat/admin/addPostTemplate",
    method: "post",
    data,
  });
}
export function modifyPostTemplate(params) {
  return request({
    url: "/service/plat/admin/modifyPostTemplate",
    method: "get",
    params,
  });
}

export function deletePostTemplate(data) {
  return request({
    url: "/service/plat/admin/deletePostTemplate",
    method: "post",
    data,
  });
}

export function addPostTemplateArea(data) {
  return request({
    url: "/service/plat/admin/addPostTemplateArea",
    method: "post",
    data,
  });
}

export function findAllProvinceCode() {
  return request({
    url: "/service/plat/admin/findAllProvinceCode",
    method: "get",
  });
}

export function deletePostTemplateArea(data) {
  return request({
    url: "/service/plat/admin/deletePostTemplateArea",
    method: "post",
    data,
  });
}
