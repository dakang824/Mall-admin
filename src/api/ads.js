/*
 * @Author: yukang 1172248038@qq.com
 * @Description:banner接口
 * @Date: 2020-11-11 21:20:15
 * @LastEditTime: 2020-11-11 22:40:38
 */
import request from "@/utils/request";

export function addBanner(data) {
  return request({
    url: "/service/plat/admin/addBanner",
    method: "post",
    data,
  });
}

export function getAds(params) {
  return request({
    url: "/service/plat/admin/getAds",
    method: "get",
    params,
  });
}

export function modifyAds(data) {
  return request({
    url: "/service/plat/admin/modifyAds",
    method: "post",
    data,
  });
}

export function deleteBanner(data) {
  return request({
    url: "/service/plat/admin/deleteBanner",
    method: "post",
    data,
  });
}
