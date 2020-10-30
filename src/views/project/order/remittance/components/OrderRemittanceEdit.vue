<!--
 * @Author: yukang 1172248038@qq.com
 * @Description: 订单详情
 * @Date: 2020-10-26 22:43:34
 * @LastEditTime: 2020-10-30 21:29:33
-->
<template>
  <el-drawer
    :title="title"
    :visible.sync="dialogFormVisible"
    size="100%"
    modal-append-to-body
    @close="close"
  >
    <div class="form">
      <p class="title">基本信息：</p>
      <el-table :data="baseTable" border>
        <el-table-column prop="name" label="姓名" align="center" />
        <el-table-column
          show-overflow-tooltip
          label="用户名"
          align="center"
          prop="user_account"
        />
        <el-table-column prop="bank_account" label="汇款账号" align="center" />
        <el-table-column prop="bank_name" label="汇款银行" align="center" />
        <el-table-column label="汇款金额(元)" align="center" prop="amount" />
        <el-table-column prop="time" label="汇款时间" align="center">
          <template slot-scope="scope">
            {{ scope.row.time | slice(0, 19) }}
          </template>
        </el-table-column>
      </el-table>

      <!-- 物流表格 -->
      <el-table :data="baseTable" border>
        <el-table-column label="电话" align="center" prop="mobile" />
        <el-table-column
          show-overflow-tooltip
          label="备注"
          align="center"
          prop="commont"
        />

        <el-table-column label="状态" align="center">
          <template slot-scope="scope">
            {{ scope.row.status | getStatusStr }}
          </template>
        </el-table-column>
      </el-table>

      <p class="title">汇款底单:</p>
      <el-image :src="form.pic_path | imgBaseUrl"></el-image>
    </div>

    <div class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="handleSend">已处理</el-button>
    </div>
  </el-drawer>
</template>

<script>
  import { doEdit } from "@/api/order/goods";

  export default {
    name: "OrderGoodsEdit",
    filters: {
      getStatusStr(v) {
        return v === 0 ? "待审核 " : v === 1 ? "已审核确认" : "";
      },
    },
    data() {
      return {
        form: {
          id: "",
        },
        dialogTableVisible: false,
        baseTable: [],
        rules: {
          id: [{ required: true, trigger: "blur", message: "请输入id" }],
        },
        title: "",
        dialogFormVisible: false,
      };
    },
    created() {},
    methods: {
      handleClick(row) {
        this.gridData = row.recipes.map((item) => {
          return { name: item.name, weight: item.weight };
        });
        this.dialogTableVisible = true;
      },
      showEdit(row) {
        if (!row) {
          this.title = "添加";
        } else {
          this.title = "订单详情";
          this.form = Object.assign({}, row);
          this.baseTable.push(row);
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
        this.$baseMessage("发货代做", "success");
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

        sums[columns.length - 1] = values + "元";
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
    font-weight: bold;
    font-size: 15px;
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
