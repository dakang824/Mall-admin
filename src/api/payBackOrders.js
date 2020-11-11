/*
 * @Author: yukang 1172248038@qq.com
 * @Description:退款订单
 * @Date: 2020-11-11 23:14:23
 * @LastEditTime: 2020-11-11 23:24:13
 */
import request from "@/utils/request";

export function queryPayBackOrders(data) {
  return request({
    url: "/service/plat/admin/queryPayBackOrders",
    method: "post",
    data,
  });
}
