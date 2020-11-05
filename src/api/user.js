/*
 * @Author: yukang 1172248038@qq.com
 * @Description:登录接口
 * @Date: 2020-08-07 22:33:30
 * @LastEditTime: 2020-11-05 23:04:15
 */
import request from "@/utils/request";
import { encryptedData } from "@/utils/encrypt";
import { loginRSA } from "@/config/settings";

export async function login(data) {
  if (loginRSA) {
    data = await encryptedData(data);
  }
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
