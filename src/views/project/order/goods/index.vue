<template>
  <div class="order/goods-container">
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
              placeholder="请输入订单编号"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button icon="el-icon-search" type="primary" @click="queryData">
              查询
            </el-button>
          </el-form-item>
          <el-form-item>
            <el-button icon="el-icon-document" @click="show = true">
              菜品明细
            </el-button>
          </el-form-item>
          <el-form-item>
            <el-button icon="el-icon-download" @click="handleDown">
              订单导出
            </el-button>
          </el-form-item>
        </el-form>
      </vab-query-form-left-panel>
    </vab-query-form>

    <el-table
      v-loading="listLoading"
      border
      :data="list"
      :element-loading-text="elementLoadingText"
      @selection-change="setSelectRows"
    >
      <el-table-column show-overflow-tooltip label="商品信息" align="center">
        <template slot-scope="scope">
          {{ scope.row.items | getProdName }}
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="pay_amount"
        label="订单金额（元）"
        align="center"
      />
      <el-table-column show-overflow-tooltip label="支付方式" align="center">
        <template slot-scope="scope">
          {{ scope.row.pay_type | getPayName }}
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip label="下单时间" align="center">
        <template slot-scope="scope">
          {{ scope.row.pay_time | slice(0, 16) }}
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="trade_no"
        label="订单编号"
        align="center"
      />
      <el-table-column
        show-overflow-tooltip
        label="订单状态"
        align="center"
        width="80"
      >
        <template slot-scope="scope">
          {{ scope.row.status | getStatusStr }}
        </template>
      </el-table-column>

      <el-table-column fixed="right" label="操作" width="80" align="center">
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
    <foodDialog v-model="show" :model="queryForm" />
  </div>
</template>

<script>
  import { queryOrders, exportOrders } from "@/api/order/goods";
  import Edit from "./components/OrderGoodsEdit";
  import foodDialog from "./components/foodDialog";
  import filters from "@/filters";
  export default {
    name: "OrderGoods",
    components: { Edit, foodDialog },
    filters: {
      getProdName(v) {
        return v.map((item) => item.name).join();
      },
      getStatusStr(v) {
        return v === 0
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
        statusOptions: [
          {
            label: "全部订单",
            value: "",
          },
          {
            label: "待付款",
            value: 0,
          },
          {
            label: "待发货",
            value: 2,
          },
          {
            label: "待收货",
            value: 3,
          },
          {
            label: "已完成",
            value: 4,
          },
          {
            label: "已取消",
            value: 5,
          },
          {
            label: "待退款",
            value: 6,
          },
          {
            label: "已退款",
            value: 7,
          },
        ],
        list: null,
        listLoading: true,
        show: false,
        layout: "total, sizes, prev, pager, next, jumper",
        total: 0,
        selectRows: "",
        elementLoadingText: "正在加载...",
        queryForm: {
          pageNum: 1,
          pageSize: 10,
          id: "",
          status: "",
          order_no: "",
          time: [],
          from: "",
          to: "",
        },
      };
    },
    created() {
      this.fetchData();
    },
    methods: {
      setSelectRows(val) {
        this.selectRows = val;
      },
      handleEdit(row) {
        if (row.id) {
          this.$refs["edit"].showEdit(row);
        } else {
          this.$refs["edit"].showEdit();
        }
      },
      async handleDown() {
        this.queryForm.trade_no = this.queryForm.order_no;
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
      async fetchData() {
        this.listLoading = true;
        const {
          data: {
            data: { list, total },
          },
          totalCount,
        } = await queryOrders(this.queryForm);
        this.list = list;
        this.total = total;
        setTimeout(() => {
          this.listLoading = false;
        }, 300);
      },
    },
  };
</script>
