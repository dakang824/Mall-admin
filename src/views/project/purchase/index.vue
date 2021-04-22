<template>
  <div class="finance-container">
    <vab-query-form>
      <vab-query-form-left-panel :span="24">
        <el-form
          ref="queryForm"
          :inline="true"
          :model="queryForm"
          @submit.native.prevent
        >
          <el-form-item prop="time">
            <el-date-picker
              v-model="queryForm.time"
              :clearable="false"
              type="datetimerange"
              start-placeholder="下单开始时间"
              end-placeholder="下单结束时间"
              format="yyyy-MM-dd HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
            />
          </el-form-item>
          <el-form-item prop="buy_status">
            <el-select
              v-model="queryForm.buy_status"
              placeholder="请选择采购状态"
              clearable
            >
              <el-option
                v-for="(item, index) in buy_statusOptions"
                :key="index"
                :label="item.label"
                :value="item.value"
                :disabled="item.disabled"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="mobile">
            <el-input
              v-model.trim="queryForm.mobile"
              placeholder="请输入订单编号"
              clearable
            />
          </el-form-item>
          <el-form-item prop="time1">
            <el-date-picker
              v-model="queryForm.time1"
              type="datetimerange"
              start-placeholder="采购开始时间"
              end-placeholder="采购结束时间"
              format="yyyy-MM-dd HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
            />
          </el-form-item>
          <el-form-item>
            <el-button icon="el-icon-search" type="primary" @click="queryData">
              查询
            </el-button>
            <el-button @click="resetForm('queryForm')">重置</el-button>
            <el-button @click="handleEdit">生成采购单</el-button>
          </el-form-item>
        </el-form>
      </vab-query-form-left-panel>
    </vab-query-form>

    <el-table
      v-loading="listLoading"
      table
      border
      :data="list"
      :element-loading-text="elementLoadingText"
      @selection-change="setSelectRows"
    >
      <el-table-column
        show-overflow-tooltip
        type="selection"
        align="center"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="id"
        label="商品信息"
        align="center"
      >
        <template #default="scope">
          {{ scope.row.items.map((item) => item.name).join(",") }}
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="id"
        label="菜盒明细"
        align="center"
      >
        <template #default="scope">
          {{
            scope.row.items
              .map(
                (item) => `${item.name} (${item.spe_name}) *${item.quantity}`
              )
              .join(",")
          }}
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="id"
        label="菜品明细"
        align="center"
      >
        <template #default="scope">
          {{
            scope.row.items
              .map((item) =>
                item.recipes.map((i) => {
                  return `${i.name} (${i.weight}g) ${
                    i.type == 1 ? "主配料" : "辅料"
                  } *${item.quantity}`;
                })
              )
              .join(",")
          }}
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="trade_no"
        label="订单编号"
        align="center"
        width="170"
      />
      <el-table-column
        show-overflow-tooltip
        prop="buy_status"
        label="采购状态"
        align="center"
        width="80"
      >
        <template #default="scope">
          {{
            scope.row.buy_status === 0
              ? "未采购"
              : scope.row.buy_status === 1
              ? "已采购"
              : ""
          }}
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="buy_time"
        label="采购时间"
        align="center"
        width="145"
      >
        <template #default="scope">
          {{ scope.row.buy_time | slice(0, 16) }}
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="80" align="center">
        <template #default="scope">
          <el-button type="text" @click="handleEdit(scope.row)">
            查看明细
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      :current-page="queryForm.pageNo"
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
  import { findShouldPostOrders } from "@/api/purchase";
  import Edit from "./components/Edit";
  const dayjs = require("dayjs");

  export default {
    name: "Purchase",
    components: { Edit },
    data() {
      return {
        list: null,
        listLoading: true,
        layout: "total, sizes, prev, pager, next, jumper",
        total: 0,
        selectRows: "",
        elementLoadingText: "正在加载...",
        queryForm: {
          pageNo: 1,
          pageSize: 10,
          from: "",
          to: "",
          buy_status: "",
          buy_time_from: "",
          buy_time_to: "",
          time: ["", ""],
          time1: ["", ""],
        },
        buy_statusOptions: [
          {
            label: "全部",
            value: "",
          },
          {
            label: "未采购",
            value: 0,
          },
          {
            label: "已采购",
            value: 1,
          },
        ],
      };
    },
    created() {
      this.queryForm.time = [
        dayjs().add(-90, "day").format("YYYY-MM-DD HH:mm:ss"),
        dayjs().format("YYYY-MM-DD") + " 23:59:59",
      ];
      this.fetchData();
    },
    methods: {
      setSelectRows(val) {
        this.selectRows = val;
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      handleEdit(row) {
        let ids = "";
        if (row.id) {
          ids = row.id;
        } else {
          if (this.selectRows.length > 0) {
            ids = this.selectRows.map((item) => item.id).join();
          } else {
            this.$baseMessage("未选中任何行", "error");
            return false;
          }
        }
        this.$refs["edit"].showEdit(ids, row);
      },
      handleSizeChange(val) {
        this.queryForm.pageSize = val;
        this.fetchData();
      },
      handleCurrentChange(val) {
        this.queryForm.pageNo = val;
        this.fetchData();
      },
      queryData() {
        this.queryForm.pageNo = 1;
        this.fetchData();
      },
      async fetchData(listLoading = true) {
        this.listLoading = listLoading;
        const queryForm = JSON.parse(JSON.stringify(this.queryForm));
        queryForm.from = queryForm.time[0];
        queryForm.to = queryForm.time[1];

        queryForm.buy_time_from = queryForm.time1[0];
        queryForm.buy_time_to = queryForm.time1[1];
        const {
          data: {
            orders: { list, total },
          },
          totalCount,
        } = await findShouldPostOrders(queryForm);
        this.list = list;
        this.total = total;
        setTimeout(() => {
          this.listLoading = false;
        }, 300);
      },
    },
  };
</script>
