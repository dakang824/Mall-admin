/*
 * @Author: yukang 1172248038@qq.com
 * @Description: 店铺管理
 * @Date: 2020-10-03 09:17:16
 * @LastEditTime: 2020-12-07 17:53:26
 */
import request from "@/utils/request";

export function findAllProfession(data) {
  return request({
    url: "/service/plat/admin/findAllProfession",
    method: "post",
    data,
  });
}

export function addProfession(data) {
  return request({
    url: "/service/plat/admin/addProfession",
    method: "post",
    data,
  });
}
export function modifyProfession(data) {
  return request({
    url: "/service/plat/admin/modifyProfession",
    method: "post",
    data,
  });
}

export function deleteProfession(data) {
  return request({
    url: "/service/plat/admin/deleteProfession",
    method: "post",
    data,
  });
}
