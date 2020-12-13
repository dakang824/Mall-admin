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
      table
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
        label="序号"
        align="center"
      />
      <el-table-column
        show-overflow-tooltip
        prop="id"
        label="名称"
        align="center"
      />
      <el-table-column
        show-overflow-tooltip
        prop="id"
        label="账号"
        align="center"
      />
      <el-table-column
        show-overflow-tooltip
        prop="id"
        label="手机号"
        align="center"
      />
      <el-table-column
        show-overflow-tooltip
        prop="id"
        label="账户余额"
        align="center"
      />
      <el-table-column fixed="right" label="操作" width="80">
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
  import { getList, doDelete } from "@/api/finance";
  import Edit from "./components/FinanceEdit";

  export default {
    name: "Finance",
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
          name: "",
          account: "",
          mobile: "",
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
        this.queryForm.pageNo = 1;
        this.fetchData();
      },
      async fetchData() {
        this.listLoading = true;
        // const { data, totalCount } = await getList(this.queryForm);
        // this.list = data;
        // this.total = totalCount;
        setTimeout(() => {
          this.listLoading = false;
        }, 300);
      },
    },
  };
</script>
