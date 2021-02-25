/*
 * @Author: yukang 1172248038@qq.com
 * @Description:文章管理
 * @Date: 2020-12-07 23:26:57
 * @LastEditTime: 2021-02-25 20:35:14
 */
import request from "@/utils/request";

export function findFeedBack(data) {
  return request({
    url: "/service/plat/admin/findFeedBack",
    method: "post",
    data,
  });
}
