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
          <el-form-item prop="name">
            <el-input
              v-model.trim="queryForm.name"
              placeholder="请输入用户名称"
              clearable
            />
          </el-form-item>
          <el-form-item prop="account">
            <el-input
              v-model.trim="queryForm.account"
              placeholder="请输入账号"
              clearable
            />
          </el-form-item>
          <el-form-item prop="mobile">
            <el-input
              v-model.trim="queryForm.mobile"
              placeholder="请输入手机号"
              clearable
            />
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

    <el-table
      v-loading="listLoading"
      :data="list"
      :element-loading-text="elementLoadingText"
      border
      @selection-change="setSelectRows"
    >
      <el-table-column
        show-overflow-tooltip
        prop="id"
        label="序号"
        align="center"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="name"
        label="名称"
        align="center"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="account"
        label="账号"
        align="center"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="mobile"
        label="手机号"
        align="center"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="balance"
        label="账户余额(元)"
        align="center"
      />
      <el-table-column fixed="right" label="操作" width="80" align="center">
        <template #default="scope">
          <el-button type="text" @click="handleEdit(scope.row)">充值</el-button>
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
  import { queryUsers, findAllUserRoles } from "@/api/userManagement";
  import Edit from "./components/FinanceEdit";

  export default {
    name: "Finance",
    components: { Edit },
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
        queryForm: {
          pageNum: 1,
          pageSize: 10,
          name: "",
          roles: "",
          state: "",
          account: "",
          mobile: "",
          status: "",
        },
      };
    },
    created() {
      this.fetchData();
      this.queryUsers();
    },
    methods: {
      setSelectRows(val) {
        this.selectRows = val;
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      handleEdit(row) {
        this.$refs["edit"].showEdit(row);
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
      async queryUsers() {
        const { data } = await findAllUserRoles();
        this.roles = data.roles;
      },
      async fetchData(listLoading = true) {
        this.listLoading = listLoading;
        const queryForm = JSON.parse(JSON.stringify(this.queryForm));
        if (queryForm.roles.length) {
          queryForm.roles = queryForm.roles.reduce((a, b) => a + b);
        }

        const {
          data: { users },
        } = await queryUsers(queryForm);
        this.list = users.list;
        this.total = users.total;
        setTimeout(() => {
          this.listLoading = false;
        }, 300);
      },
    },
  };
</script>
