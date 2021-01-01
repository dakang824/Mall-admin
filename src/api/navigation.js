/*
 * @Author: yukang 1172248038@qq.com
 * @Description:导航管理
 * @Date: 2020-12-07 23:26:57
 * @LastEditTime: 2021-01-01 20:07:27
 */
import request from "@/utils/request";

export function getAllArtNav(data) {
  return request({
    url: "/service/plat/admin/getAllArtNav",
    method: "post",
    data,
  });
}

export function modifyArtNav(data) {
  return request({
    url: "/service/plat/admin/modifyArtNav",
    method: "post",
    data,
  });
}

export function addArtNav(data) {
  return request({
    url: "/service/plat/admin/addArtNav",
    method: "post",
    data,
  });
}

export function deleteArtNav(data) {
  return request({
    url: "/service/plat/admin/deleteArtNav",
    method: "post",
    data,
  });
}
