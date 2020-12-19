<template>
  <div class="order/recharge-container">
    <vab-query-form>
      <vab-query-form>
        <vab-query-form-left-panel :span="24">
          <el-form :inline="true" :model="queryForm" @submit.native.prevent>
            <el-form-item label="下单时间" prop="time">
              <el-date-picker
                v-model="queryForm.time"
                type="datetimerange"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                range-separator="至"
                clearable
              ></el-date-picker>
            </el-form-item>
            <el-form-item prop="status">
              <el-select
                v-model="queryForm.status"
                placeholder="请选择订单状态"
                clearable
              >
                <el-option
                  v-for="(item, index) in statusOptions"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.disabled"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="order_no">
              <el-input
                v-model="queryForm.order_no"
                placeholder="订单编号"
                clearable
              ></el-input>
            </el-form-item>

            <el-form-item>
              <el-button
                icon="el-icon-search"
                type="primary"
                @click="queryData"
              >
                查询
              </el-button>
            </el-form-item>
            <el-form-item>
              <el-button icon="el-icon-download" @click="handleExportOrders">
                订单导出
              </el-button>
            </el-form-item>
          </el-form>
        </vab-query-form-left-panel>
      </vab-query-form>
    </vab-query-form>

    <el-table
      v-loading="listLoading"
      :data="list"
      :element-loading-text="elementLoadingText"
      border
    >
      <el-table-column
        show-overflow-tooltip
        prop="user_id"
        label="客户信息"
        align="center"
      />
      <el-table-column
        show-overflow-tooltip
        prop="amount"
        label="充值金额（元）"
        align="center"
      />
      <el-table-column show-overflow-tooltip label="支付方式" align="center">
        <template #default="scope">
          {{ scope.row.pay_type | getPayName }}
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip label="下单时间" align="center">
        <template #default="scope">
          {{ scope.row.create_time | slice(0, 19) }}
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="trade_no"
        label="订单编号"
        align="center"
      />
      <el-table-column fixed="right" label="状态" align="center">
        <template #default="scope">
          {{ scope.row.status | getStatusStr }}
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      :current-page="queryForm.pageNum"
      :page-size="queryForm.pageSize"
      :layout="layout"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    ></el-pagination>
    <edit ref="edit" @fetchData="fetchData"></edit>
  </div>
</template>

<script>
  import { queryRecharge, exportRechargeOrders } from "@/api/order/recharge";
  import Edit from "./components/OrderRechargeEdit";
  import filters from "@/filters";
  export default {
    name: "Recharge",
    components: { Edit },
    filters: {
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
      getStatusStr(v) {
        return v === 0 ? "未支付" : v === 1 ? "已付款" : "";
      },
    },
    data() {
      return {
        list: null,
        listLoading: true,
        layout: "total, sizes, prev, pager, next, jumper",
        total: 0,
        selectRows: "",
        elementLoadingText: "正在加载...",
        queryForm: {
          pageNum: 1,
          pageSize: 10,
          trade_no: "",
          status: "",
          time: [],
          from: "",
          to: "",
        },
        statusOptions: [
          {
            label: "全部",
            value: "",
          },
          {
            label: "未支付",
            value: 0,
          },
          {
            label: "已付款",
            value: 1,
          },
        ],
      };
    },
    created() {
      this.fetchData();
    },
    methods: {
      handleSizeChange(val) {
        this.queryForm.pageSize = val;
        this.fetchData();
      },
      handleCurrentChange(val) {
        this.queryForm.pageNum = val;
        this.fetchData();
      },
      async handleExportOrders() {
        if (this.queryForm.time.length) {
          this.queryForm.from = this.queryForm.time[0];
          this.queryForm.to = this.queryForm.time[1];
        } else {
          this.queryForm.from = "";
          this.queryForm.to = "";
        }
        const {
          data: { excel_path },
        } = await exportRechargeOrders(this.queryForm);
        window.open(filters.imgBaseUrl(excel_path), "_parent");
      },
      queryData() {
        if (this.queryForm.time) {
          this.queryForm.from = this.queryForm.time[0];
          this.queryForm.to = this.queryForm.time[1];
        } else {
          this.queryForm.from = "";
          this.queryForm.to = "";
        }
        this.queryForm.pageNum = 1;
        this.fetchData();
      },
      async fetchData() {
        this.listLoading = true;
        const {
          data: { recharges },
        } = await queryRecharge(this.queryForm);
        this.list = recharges.list;
        this.total = recharges.total;
        setTimeout(() => {
          this.listLoading = false;
        }, 300);
      },
    },
  };
</script>
