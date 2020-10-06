/*
 * @Author: yukang 1172248038@qq.com
 * @Description:　运费管理
 * @Date: 2020-10-02 09:38:00
 * @LastEditTime: 2020-10-06 16:36:58
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
export function modifyPostTemplate(data) {
  return request({
    url: "/service/plat/admin/modifyPostTemplate",
    method: "post",
    data,
  });
}

export function deletePostTemplate(data) {
  return request({
    url: "/service/plat/admin/deletePostTemplate",
    method: "post",
    data,
  });
}
