/*
 * @Author: yukang 1172248038@qq.com
 * @Description:登录接口
 * @Date: 2020-08-07 22:33:30
 * @LastEditTime: 2020-11-22 19:45:49
 */
import request from "@/utils/request";

export async function login(data) {
  return request({
    url: "/service/plat/admin/platLogin",
    method: "post",
    data,
  });
}

export function getUserInfo(token) {
  return request({
    url: "/service/plat/admin/getAdminInfo",
    method: "post",
    data: {
      token,
    },
  });
}

export function logout() {
  return request({
    url: "/logout",
    method: "post",
  });
}
export function register() {
  return request({
    url: "/register",
    method: "post",
  });
}
