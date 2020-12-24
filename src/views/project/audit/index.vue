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
          <el-form-item prop="type">
            <el-select
              v-model="queryForm.type"
              placeholder="请输入店铺名称"
              clearable
            >
              <el-option
                v-for="item in typeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item prop="time">
            <el-date-picker
              v-model="queryForm.time"
              type="daterange"
              format="yyyy-MM-dd HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
              range-separator="至"
              start-placeholder="开始提现时间"
              end-placeholder="结束提现时间"
            ></el-date-picker>
          </el-form-item>
          <el-form-item prop="status">
            <el-select
              v-model="queryForm.status"
              placeholder="请选择当前状态"
              clearable
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button icon="el-icon-search" type="primary" @click="queryData">
              查询
            </el-button>
            <el-button @click="resetForm('queryForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </vab-query-form-left-panel>
    </vab-query-form>
    <vab-query-form>
      <vab-query-form-left-panel :span="24">
        <el-button icon="el-icon-plus" type="primary" @click="handleEdit">
          添加提现申请
        </el-button>
        <el-button icon="el-icon-delete" type="danger" @click="handleDelete">
          批量删除
        </el-button>
      </vab-query-form-left-panel>
    </vab-query-form>

    <el-table
      v-loading="listLoading"
      :data="list"
      :element-loading-text="elementLoadingText"
      border
      @selection-change="setSelectRows"
    >
      <el-table-column
        show-overflow-tooltip
        type="selection"
        align="center"
        :selectable="checkSelectable"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="id"
        label="序号"
        align="center"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="store_id"
        label="店铺名称"
        align="center"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="amount"
        label="提现金额"
        align="center"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="type"
        label="提现类型"
        align="center"
      >
        <template #default="scope">
          {{ scope.row.type === 1 ? "提现到账户" : "提现到银行卡" }}
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="balance"
        label="当前状态"
        align="center"
      >
        <template #default="scope">
          {{
            scope.row.status === 0
              ? "待审核"
              : scope.row.status === 1
              ? "已提现"
              : "审核拒绝"
          }}
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="balance"
        label="提现时间"
        align="center"
      />
      <el-table-column
        show-overflow-tooltip
        prop="bank_name"
        label="开户行"
        align="center"
      />
      <el-table-column
        show-overflow-tooltip
        prop="bank_account"
        label="银行账号"
        align="center"
      />

      <el-table-column
        show-overflow-tooltip
        prop="bank_acc_name"
        label="账户姓名"
        align="center"
      />
      <el-table-column
        show-overflow-tooltip
        prop="user_account"
        label="提现账户"
        align="center"
      />
      <el-table-column
        show-overflow-tooltip
        prop="common"
        label="备注"
        align="center"
      />
      <el-table-column fixed="right" label="操作" width="150" align="center">
        <template #default="scope">
          <el-button type="primary" @click="handleEdit(scope.row)">
            审核
          </el-button>
          <el-button type="danger" @click="handleDelete(scope.row)">
            删除
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
    <edit ref="edit" @fetchData="fetchData" @add="add"></edit>
    <edit1 ref="edit1" @fetchData="fetchData" @add="add"></edit1>
  </div>
</template>

<script>
  import { findStoreCashApply, deleteStoreCashApply } from "@/api/audit";
  import Edit from "./components/Edit";
  import Edit1 from "./components/Edit1";
  export default {
    name: "Audit",
    components: { Edit, Edit1 },
    filters: {
      getRoles: (value, roles) => {
        return roles
          .map((item) => {
            if ((value & item.no) > 0) {
              return item.name;
            }
          })
          .filter((item) => item !== undefined)
          .join();
      },
    },
    data() {
      return {
        status: [
          {
            value: 1,
            label: "启用",
          },
          {
            value: 0,
            label: "禁用",
          },
        ],
        roles: [],
        list: null,
        listLoading: true,
        layout: "total, sizes, prev, pager, next, jumper",
        total: 0,
        selectRows: "",
        elementLoadingText: "正在加载...",
        options: [
          {
            value: 0,
            label: "待审核",
          },
          {
            value: 1,
            label: "已提现",
          },
          {
            value: 2,
            label: "审核拒绝",
          },
        ],
        typeOptions: [
          {
            value: 1,
            label: "提现到账户",
          },
          {
            value: 2,
            label: "提现到银行卡",
          },
        ],
        queryForm: {
          pageNum: 1,
          pageSize: 10,
          type: "",
          time: "",
          state: "",
          from: "",
          to: "",
          status: "",
        },
      };
    },
    created() {
      this.fetchData();
    },
    methods: {
      checkSelectable(val, row) {
        return val.status !== 1;
      },
      setSelectRows(val) {
        this.selectRows = val;
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      add(e) {
        this.list.unshift(e);
      },
      update(e) {
        const index = this.list.findIndex((item) => item.id === e.id);
        this.$set(this.list, index, e);
      },
      handleDelete(row) {
        if (row.id) {
          if (row.status !== 1) {
            this.$baseConfirm("你确定要删除当前项吗?", null, async () => {
              const { msg } = await deleteStoreCashApply({ ids: row.id });
              this.$baseMessage(msg, "success");
              this.list.splice(
                this.list.findIndex((item) => item.id === row.id),
                1
              );
            });
          } else {
            this.$baseMessage("审核通过的不允许删除", "error");
          }
        } else {
          if (this.selectRows.length > 0) {
            const ids = this.selectRows.map((item) => item.id).join();
            this.$baseConfirm("你确定要删除选中项吗?", null, async () => {
              const { msg } = await deleteStoreCashApply({ ids });
              this.$baseMessage(msg, "success");
              this.selectRows.map((item) => {
                this.list.splice(
                  this.list.findIndex((it) => it.id === item.id),
                  1
                );
              });
            });
          } else {
            this.$baseMessage("未选中任何行", "error");
            return false;
          }
        }
      },
      handleEdit(row) {
        if (row.id) {
          this.$refs["edit1"].showEdit(row);
        } else {
          this.$refs["edit"].showEdit();
        }
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
        this.queryForm.pageNum = 1;
        this.fetchData();
      },

      async fetchData(listLoading = true) {
        this.listLoading = listLoading;
        const queryForm = JSON.parse(JSON.stringify(this.queryForm));
        if (queryForm.time !== null && queryForm.time.length) {
          queryForm.form = queryForm.time[0];
          queryForm.to = queryForm.time[1];
        }

        const {
          data: { data },
        } = await findStoreCashApply(queryForm);
        this.list = data.list;
        this.total = data.total;
        setTimeout(() => {
          this.listLoading = false;
        }, 300);
      },
    },
  };
</script>
