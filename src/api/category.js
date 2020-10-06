/*
 * @Author: yukang 1172248038@qq.com
 * @Description: 分类管理
 * @Date: 2020-10-02 00:59:22
 * @LastEditTime: 2020-10-06 16:50:41
 */
import request from "@/utils/request";

export function getList(data) {
  return request({
    url: "/category/getList",
    method: "post",
    data,
  });
}

export function addCategory(data) {
  return request({
    url: "/service/plat/admin/addCategory",
    method: "post",
    data,
  });
}

export function doDelete(data) {
  return request({
    url: "/category/doDelete",
    method: "post",
    data,
  });
}
