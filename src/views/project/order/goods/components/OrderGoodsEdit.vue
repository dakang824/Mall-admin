<!--
 * @Author: yukang 1172248038@qq.com
 * @Description: 订单详情
 * @Date: 2020-10-26 22:43:34
 * @LastEditTime: 2020-12-26 17:16:01
-->
<template>
  <el-drawer
    :title="title"
    :visible.sync="dialogFormVisible"
    size="50%"
    modal-append-to-body
    @close="close"
  >
    <div class="form">
      <p class="title">基本信息：</p>
      <el-table :data="baseTable" border>
        <el-table-column prop="trade_no" label="订单编号" align="center" />
        <el-table-column show-overflow-tooltip label="订单状态" align="center">
          <template slot-scope="scope">
            {{ scope.row.status | getStatusStr }}
          </template>
        </el-table-column>
        <el-table-column prop="name" label="用户账号" align="center" />
        <el-table-column
          prop="pay_amount"
          label="订单金额(元)"
          align="center"
        />
        <el-table-column label="下单时间" align="center">
          <template slot-scope="scope">
            {{ scope.row.pay_time | slice(0, 16) }}
          </template>
        </el-table-column>
        <el-table-column prop="buyer_common" label="买家留言" align="center" />
      </el-table>

      <!-- 物流表格 -->
      <el-table
        v-if="form.status !== 1 && form.status !== 2"
        :data="refundTable"
        border
      >
        <el-table-column label="支付方式" align="center">
          <template slot-scope="scope">
            {{ scope.row.pay_type | getPayName }}
          </template>
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          label="物流公司"
          align="center"
          prop="post_courier"
        />

        <el-table-column prop="post_track" label="物流单号" align="center" />
        <el-table-column prop="post_time" label="发货时间" align="center">
          <template slot-scope="scope">
            {{ scope.row.post_time | slice(0, 16) }}
          </template>
        </el-table-column>
        <el-table-column label="确认收货时间" align="center">
          <template slot-scope="scope">
            {{ scope.row.recived_time | slice(0, 16) }}
          </template>
        </el-table-column>
      </el-table>

      <p class="title">收货人信息：</p>
      <el-table :data="userTable" border>
        <el-table-column prop="name" label="收货人" align="center" />
        <el-table-column
          show-overflow-tooltip
          prop="mobile"
          label="手机号码"
          align="center"
        />
        <el-table-column prop="phone" label="固定号码" align="center" />
        <el-table-column prop="address" label="收货地址" align="center" />
      </el-table>

      <p class="title">商品信息：</p>
      <el-table
        :data="form.items"
        border
        :summary-method="getSummaries"
        show-summary
      >
        <el-table-column label="商品图片" align="center">
          <template slot-scope="scope">
            <el-image :src="scope.row.item_pic | imgBaseUrl"></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="商品名称" align="center">
          <template slot-scope="scope">
            {{ scope.row.name }}

            <el-link
              v-if="scope.row.prod_type === 1"
              type="primary"
              style="position: absolute; right: 10px; bottom: -1px"
              @click="handleClick(scope.row)"
            >
              查看菜品
            </el-link>
          </template>
        </el-table-column>
        <el-table-column prop="spe_name" label="规格" align="center" />
        <el-table-column prop="unit_Price" label="价格（元）" align="center" />
        <el-table-column prop="quantity" label="数量" align="center" />
        <el-table-column
          prop="total_amount"
          label="小计（元）"
          align="center"
        />
      </el-table>

      <p class="title">费用信息：</p>
      <el-table :data="moneyTable" border>
        <el-table-column
          label="商品合计（元）"
          align="center"
          prop="pay_amount"
        />
        <el-table-column prop="post_amount" label="运费（元）" align="center" />

        <el-table-column
          prop="total_amount"
          label="订单总金额（元）"
          align="center"
        />
        <el-table-column
          prop="pay_money"
          label="应付款金额（元）"
          align="center"
        />
      </el-table>
    </div>

    <div v-if="form.status === 2 || form.status === 6" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button v-if="form.status === 2" type="primary" @click="handleSend">
        发 货
      </el-button>
      <el-button v-if="form.status === 6" type="primary" @click="handlegive">
        退 款
      </el-button>
    </div>

    <el-dialog
      title="菜品明细"
      :visible.sync="dialogTableVisible"
      :modal-append-to-body="false"
      append-to-body
    >
      <el-table :data="gridData" border>
        <el-table-column property="name" label="名称"></el-table-column>
        <el-table-column property="weight" label="重量"></el-table-column>
      </el-table>
    </el-dialog>
    <Dialog v-model="show" :model="form" @change="handleChange"></Dialog>
    <dialogBackMoney
      ref="dialogBackMoney"
      v-model="dialogBackMoney"
      :money="form.pay_amount"
      @handleBackMoney="handleBackMoney"
    />
  </el-drawer>
</template>

<script>
  import { mapState } from "vuex";
  import { orderPayBack } from "@/api/order/goods";
  import Dialog from "./dialog";
  import DialogBackMoney from "./dialogBackMoney";

  export default {
    name: "OrderGoodsEdit",
    components: { Dialog, DialogBackMoney },
    filters: {
      getStatusStr(v) {
        return v === 1
          ? "待付款"
          : v === 2
          ? "待发货"
          : v === 3
          ? "待收货"
          : v === 4
          ? "已完成"
          : v === 5
          ? "已取消"
          : v === 6
          ? "待退款"
          : v === 7
          ? "已退款"
          : "";
      },
      getPayName(v) {
        return v === 1
          ? "微信"
          : v === 2
          ? "支付宝"
          : v === 3
          ? "银联"
          : v === 4
          ? "余额"
          : "其它";
      },
    },
    data() {
      return {
        form: {
          id: "",
        },
        dialogBackMoney: false,
        dialogTableVisible: false,
        baseTable: [],
        userTable: [],
        moneyTable: [],
        gridData: [],
        refundTable: [],
        show: false,
        rules: {
          id: [{ required: true, trigger: "blur", message: "请输入id" }],
        },
        title: "",
        dialogFormVisible: false,
      };
    },
    computed: {
      ...mapState({
        username: (state) => state.user.username,
      }),
    },
    created() {},
    methods: {
      handlegive() {
        this.dialogBackMoney = true;
        this.$refs["dialogBackMoney"].handleInit(this.form.pay_amount);
      },
      handleClick(row) {
        this.gridData = row.recipes.map((item) => {
          return { name: item.name, weight: item.weight };
        });
        this.dialogTableVisible = true;
      },
      handleChange(e) {
        this.form.status = 3;
        this.$emit("changeStatus", e);
        this.close();
      },
      showEdit(row) {
        if (!row) {
          this.title = "添加";
        } else {
          this.title = "订单详情";
          this.form = Object.assign({}, row);
          this.form.items.map((item) => {
            item.unit_Price =
              item.quantity >= item.w_num ? item.w_price : item.sell_price;
            item.total_amount = (item.unit_Price * item.quantity).toFixed(2);
          });
          const {
            trade_no,
            status,
            name,
            pay_amount,
            pay_time,
            buyer_common,
            mobile,
            phone,
            address,
            total_amount,
            post_amount,
            discount,
            post_courier,
            post_track,
            recived_time,
            pay_type,
            post_time,
          } = row;
          this.baseTable.push({
            trade_no,
            status,
            name,
            pay_amount,
            pay_time,
            buyer_common,
          });

          this.moneyTable.push({
            total_amount,
            pay_amount,
            post_amount,
            pay_money: total_amount - discount,
          });

          this.userTable.push({
            name,
            mobile,
            phone,
            address,
          });

          this.refundTable.push({
            pay_type,
            post_courier,
            post_track,
            recived_time,
            post_time,
          });
        }
        this.dialogFormVisible = true;
      },
      close() {
        this.baseTable = [];
        this.userTable = [];
        this.moneyTable = [];
        this.refundTable = [];
        this.dialogFormVisible = false;
        this.$refs["form"].resetFields();
        this.form = this.$options.data().form;
      },
      handleSend() {
        this.show = true;
      },
      async handleBackMoney(e) {
        const {
          user_id: userId,
          id: order_id,
          pay_no,
          total_amount,
          operator = this.username,
        } = this.form;

        const { msg } = await orderPayBack({
          userId,
          order_id,
          pay_no,
          refund_amount: e,
          total_amount,
          operator,
        });
        this.form.status = 7;
        this.$emit("fetchData", false);
        this.$baseMessage(msg, "success");
      },
      getSummaries(param) {
        const { columns, data } = param;
        const sums = ["总价"];
        const values = data
          .map((item) => Number(item["total_amount"]))
          .reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);

        sums[columns.length - 1] = values.toFixed(2) + "元";
        return sums;
      },
    },
  };
</script>

<style lang="scss" scoped>
  .form {
    margin: 0 20px;
  }

  .title {
    font-size: 15px;
    font-weight: bold;
  }

  .dialog-footer {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    padding: $base-padding;
    text-align: center;
    text-align: right;
    border-top: 1px solid $base-border-color;
  }

  ::v-deep {
    .el-card__header {
      padding: 10px 20px;
    }

    .el-upload {
      &-list__item-status-label,
      &-list__item .el-icon-close {
        display: none !important;
      }
    }

    .el-card__body {
      padding: 20px 10px 0 0;
    }

    .add-btn {
      .el-form-item__content {
        margin-left: 10px !important;
      }
    }

    .el-upload__tip {
      line-height: 20px;
    }

    .el-drawer__header {
      padding-bottom: 15px;
      margin-bottom: 0;
      border-bottom: 1px solid $base-border-color;
    }

    .el-drawer {
      &__body {
        flex: inherit;
        padding-top: 10px;

        .form {
          max-height: calc(100vh - 148px);
          overflow: auto;

          .el-table {
            margin-bottom: 20px;
          }
        }
      }
    }
  }
</style>
