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
          <el-form-item prop="roles">
            <el-select
              v-model="queryForm.roles"
              placeholder="请选择角色"
              multiple
            >
              <el-option
                v-for="item in roles"
                :key="item.id"
                :label="item.name"
                :value="item.no"
              ></el-option>
            </el-select>
          </el-form-item>
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
          <el-form-item prop="status">
            <el-select
              v-model="queryForm.status"
              placeholder="请选择用户状态"
              clearable
            >
              <el-option
                v-for="item in status"
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
      <el-table-column
        show-overflow-tooltip
        type="selection"
        align="center"
      ></el-table-column>
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
        prop="roles"
        label="角色"
        align="center"
      >
        <template v-slot="scope">
          {{ scope.row.roles | getRoles(roles) }}
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="status"
        label="状态"
        align="center"
      >
        <template v-slot="scope">
          <el-tag
            :type="scope.row.status === 1 ? 'success' : 'danger'"
            disable-transitions
          >
            {{ scope.row.status === 1 ? "启用" : "禁用" }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column
        show-overflow-tooltip
        fixed="right"
        label="操作"
        width="200"
        align="center"
      >
        <template v-slot="scope">
          <el-button type="primary" @click="handleEdit(scope.row)">
            编辑
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
    <edit
      ref="edit"
      :roles="roles"
      :status="status"
      @fetchData="fetchData"
      @update="update"
      @add="add"
    ></edit>
  </div>
</template>

<script>
  import {
    queryUsers,
    deleteUser,
    findAllUserRoles,
  } from "@/api/userManagement";
  import Edit from "./components/UserManagementEdit";

  export default {
    name: "UserManagement",
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
      // this.queryUsers();
    },
    methods: {
      setSelectRows(val) {
        this.selectRows = val;
      },
      add(e) {
        this.list.push(e);
      },
      update(e) {
        this.$set(
          this.list,
          this.list.findIndex((item) => item.id === e.id),
          e
        );
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
          this.$baseConfirm("你确定要删除当前项吗?", null, async () => {
            const { msg } = await deleteUser({ ids: row.id });
            this.$baseMessage(msg, "success");
            this.list.splice(
              this.list.findIndex((item) => item.id === row.id),
              1
            );
          });
        } else {
          if (this.selectRows.length > 0) {
            const ids = this.selectRows.map((item) => item.id).join();
            this.$baseConfirm("你确定要删除选中项吗?", null, async () => {
              const { msg } = await deleteUser({ ids });
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
      handleSizeChange(val) {
        this.queryForm.pageSize = val;
        this.fetchData();
      },
      handleCurrentChange(val) {
        this.queryForm.pageNum = val;
        this.fetchData();
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      queryData() {
        this.queryForm.pageNum = 1;
        this.fetchData();
      },
      async queryUsers() {
        const { data } = await findAllUserRoles();
        this.roles = data.roles;
      },
      async fetchData() {
        this.listLoading = true;
        const queryForm = JSON.parse(JSON.stringify(this.queryForm));
        if (queryForm.roles.length) {
          queryForm.roles = queryForm.roles.reduce((a, b) => a + b);
        }

        // const {
        //   data: { users },
        // } = await queryUsers(queryForm);
        // this.list = users.list;
        // this.total = users.total;
        setTimeout(() => {
          this.listLoading = false;
        }, 300);
      },
    },
  };
</script>
