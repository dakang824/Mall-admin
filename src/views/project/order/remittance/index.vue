<template>
  <div class="order/remittance-container">
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
          <el-form-item prop="user_account">
            <el-input
              v-model="queryForm.user_account"
              placeholder="请输入买家账号"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item prop="order_no">
            <el-input
              v-model="queryForm.order_no"
              placeholder="请输入店铺账号"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item prop="mobile">
            <el-input
              v-model="queryForm.mobile"
              placeholder="请输入买家手机号"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button icon="el-icon-search" type="primary" @click="queryData">
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

    <el-table
      v-loading="listLoading"
      :data="list"
      :element-loading-text="elementLoadingText"
      border
    >
      <el-table-column
        show-overflow-tooltip
        prop="name"
        label="姓名"
        align="center"
        width="90"
      />
      <el-table-column
        show-overflow-tooltip
        prop="user_account"
        label="用户名"
        align="center"
      />
      <el-table-column
        show-overflow-tooltip
        prop="bank_account"
        label="汇款账号"
        align="center"
      />
      <el-table-column
        show-overflow-tooltip
        prop="bank_name"
        label="汇款银行"
        align="center"
      />
      <el-table-column
        show-overflow-tooltip
        prop="amount"
        label="汇款金额（元）"
        align="center"
        width="120"
      />
      <el-table-column
        show-overflow-tooltip
        prop="time"
        label="汇款时间"
        align="center"
        width="160"
      />
      <el-table-column
        show-overflow-tooltip
        prop="mobile"
        label="电话"
        align="center"
      />
      <el-table-column
        show-overflow-tooltip
        prop="status"
        label="状态"
        align="center"
        width="110"
      >
        <template slot-scope="scope">
          {{ scope.row.status | getStatusStr }}
        </template>
      </el-table-column>

      <el-table-column fixed="right" label="操作" width="90" align="center">
        <template v-slot="scope">
          <el-button type="text" @click="handleEdit(scope.row)">
            查看订单
          </el-button>
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
  import { findMyRemittance } from "@/api/order/remittance";
  import Edit from "./components/OrderRemittanceEdit";

  export default {
    name: "OrderRemittance",
    components: { Edit },
    filters: {
      getStatusStr(v) {
        return v === 0 ? "待审核 " : v === 1 ? "已审核确认" : "";
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
        statusOptions: [
          {
            label: "全部订单",
            value: "",
          },
          {
            label: "待审核",
            value: 0,
          },
          {
            label: "已审核确认",
            value: 1,
          },
        ],
        queryForm: {
          pageNum: 1,
          pageSize: 10,
          user_account: "",
          mobile: "",
          status: "",
          from: "",
          to: "",
        },
      };
    },
    created() {
      this.fetchData();
    },
    methods: {
      handleEdit(row) {
        if (row.id) {
          this.$refs["edit"].showEdit(row);
        } else {
          this.$refs["edit"].showEdit();
        }
      },
      async handleExportOrders() {
        if (this.queryForm.time) {
          this.queryForm.from = this.queryForm.time[0];
          this.queryForm.to = this.queryForm.time[1];
        }
        const {
          data: { excel_path },
        } = await exportOrders(this.queryForm);
        window.open(filters.imgBaseUrl(excel_path));
      },
      handleSizeChange(val) {
        this.queryForm.pageSize = val;
        this.fetchData();
      },
      handleCurrentChange(val) {
        this.queryForm.pageNum = val;
        this.fetchData();
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
      async fetchData(loading = true) {
        this.listLoading = loading;
        const {
          data: { remittances },
        } = await findMyRemittance(this.queryForm);
        this.list = remittances.list;
        this.total = remittances.total;
        setTimeout(() => {
          this.listLoading = false;
        }, 300);
      },
    },
  };
</script>
