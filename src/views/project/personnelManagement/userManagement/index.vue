<template>
  <div class="userManagement-container">
    <vab-query-form>
      <vab-query-form-left-panel :span="24">
        <el-form
          ref="queryForm"
          :inline="true"
          :model="queryForm"
          @submit.native.prevent
        >
          <el-form-item prop="role">
            <el-select v-model="queryForm.role" placeholder="请选择角色">
              <el-option
                v-for="item in roleOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="userName">
            <el-input
              v-model.trim="queryForm.userName"
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
          <el-form-item prop="state">
            <el-select v-model="queryForm.state" placeholder="请选择用户状态">
              <el-option
                v-for="item in statusOptions"
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
      <vab-query-form-left-panel :span="12">
        <el-button icon="el-icon-plus" type="primary" @click="handleEdit">
          添加用户
        </el-button>
        <el-button icon="el-icon-delete" type="danger" @click="handleDelete">
          批量删除
        </el-button>
      </vab-query-form-left-panel>
    </vab-query-form>

    <el-table
      v-loading="listLoading"
      border
      :default-sort="{ prop: 'id' }"
      :data="list"
      :element-loading-text="elementLoadingText"
      @selection-change="setSelectRows"
    >
      <el-table-column show-overflow-tooltip type="selection"></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="id"
        sortable
        label="序号"
        width="80"
        align="center"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="userName"
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
        prop="role"
        label="角色"
        align="center"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="state"
        label="状态"
        align="center"
      ></el-table-column>

      <el-table-column
        show-overflow-tooltip
        fixed="right"
        label="操作"
        width="200"
        align="center"
      >
        <template v-slot="scope">
          <el-button type="text" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="text" @click="handleDelete(scope.row)">
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
    <edit ref="edit" @fetchData="fetchData"></edit>
  </div>
</template>

<script>
  import { getList, doDelete } from "@/api/userManagement";
  import Edit from "./components/UserManagementEdit";

  export default {
    name: "UserManagement",
    components: { Edit },
    data() {
      return {
        statusOptions: [
          {
            value: "启用",
            label: "启用",
          },
          {
            value: "禁用",
            label: "禁用",
          },
        ],
        roleOptions: [
          {
            value: "餐厅",
            label: "餐厅",
          },
          {
            value: "加盟商",
            label: "加盟商",
          },
          {
            value: "城市合伙人",
            label: "餐城市合伙人",
          },
        ],
        list: null,
        listLoading: true,
        layout: "total, sizes, prev, pager, next, jumper",
        total: 0,
        selectRows: "",
        elementLoadingText: "正在加载...",
        queryForm: {
          pageNo: 1,
          pageSize: 10,
          userName: "",
          role: "",
          state: "",
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
      handleEdit(row) {
        if (row.id) {
          this.$refs["edit"].showEdit(row);
        } else {
          this.$refs["edit"].showEdit();
        }
      },
      handleDelete(row) {
        if (row.id) {
          this.$baseConfirm("你确定要删除当前项吗", null, async () => {
            const { msg } = await doDelete({ ids: row.id });
            this.$baseMessage(msg, "success");
            this.fetchData();
          });
        } else {
          if (this.selectRows.length > 0) {
            const ids = this.selectRows.map((item) => item.id).join();
            this.$baseConfirm("你确定要删除选中项吗", null, async () => {
              const { msg } = await doDelete({ ids });
              this.$baseMessage(msg, "success");
              this.fetchData();
            });
          } else {
            this.$baseMessage("未选中任何行", "error");
            return false;
          }
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
      resetForm(formName) {
        console.log(formName);
        this.$refs[formName].resetFields();
      },
      queryData() {
        this.queryForm.pageNo = 1;
        this.fetchData();
      },
      async fetchData() {
        this.listLoading = true;
        const { data, totalCount } = await getList(this.queryForm);
        this.list = data;
        this.total = totalCount;
        setTimeout(() => {
          this.listLoading = false;
        }, 300);
      },
    },
  };
</script>
