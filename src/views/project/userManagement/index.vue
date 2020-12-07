<template>
  <div class="demo-container">
    <vab-query-form>
      <vab-query-form-left-panel :span="24">
        <ele-form
          v-model="queryForm"
          class="clear-col-6"
          v-bind="formConfig"
          is-show-reset-btn
          inline
          :is-show-label="false"
          :request-fn="queryData"
        />
      </vab-query-form-left-panel>
      <vab-query-form-left-panel :span="12">
        <el-button icon="el-icon-plus" type="primary" @click="handleEdit">
          添加
        </el-button>
        <el-button icon="el-icon-upload2" type="warning" @click="handleImport">
          用户导入
        </el-button>
        <el-button icon="el-icon-download" type="success" @click="handleExport">
          用户导出
        </el-button>
        <el-button icon="el-icon-delete" type="danger" @click="handleDelete">
          批量删除
        </el-button>
      </vab-query-form-left-panel>
    </vab-query-form>

    <lb-table
      v-loading="loading"
      border
      :column="tableData.column"
      :data="tableData.data"
      align="center"
      pagination
      background
      :layout="layout"
      :current-page.sync="queryForm.pageNo"
      :total="total"
      :page-size="queryForm.pageSize"
      @size-change="handleSizeChange"
      @p-current-change="handleCurrentChange"
      @selection-change="setSelectRows"
    />
    <edit
      ref="edit"
      :options="{ formDesc: formConfig.formDesc }"
      @fetchData="fetchData"
      @update="updateData"
    ></edit>
    <import-template ref="import" title="用户导入" />
  </div>
</template>

<script>
  import {
    findUsers,
    deleteUser,
    findAllCompany,
    findAllProfGroup,
    exportUsers,
  } from "@/api/userManagement";
  import filters from "@/filters";
  import Edit from "./components/Edit";
  import ImportTemplate from "./components/importTemplate";

  export default {
    name: "UserManagement",
    components: { Edit, ImportTemplate },
    data() {
      return {
        loading: true,
        layout: "total, sizes, prev, pager, next, jumper",
        total: 0,
        selectRows: "",
        tableData: {
          column: [
            {
              type: "selection",
            },
            {
              prop: "id",
              label: "序号",
              width: "80",
            },
            {
              prop: "name",
              label: "姓名",
            },
            {
              prop: "account",
              label: "账户",
            },
            {
              prop: "company",
              label: "角色",
              render: (h, scope) => {
                return (
                  <span>
                    {scope.row.roles === 1
                      ? "学生"
                      : scope.row.roles === 2
                      ? "老师"
                      : ""}
                  </span>
                );
              },
            },
            {
              prop: "company",
              label: "所属公司",
              render: (h, scope) => {
                return <span>{scope.row.company.name}</span>;
              },
            },
            {
              prop: "type",
              label: "用户类型",
              render: (h, scope) => {
                return (
                  <span>
                    {scope.row.type === 1
                      ? "临时工"
                      : scope.row.type === 2
                      ? "正式工"
                      : ""}
                  </span>
                );
              },
            },
            {
              prop: "group",
              label: "专业组",
              render: (h, scope) => {
                return <span>{scope.row.prof_group.name}</span>;
              },
            },
            {
              label: "操作",
              width: "230",
              render: (h, scope) => {
                return (
                  <div>
                    <el-button
                      type="primary"
                      onClick={() => {
                        this.handleEdit(scope.row);
                      }}
                    >
                      编辑
                    </el-button>
                    <el-button
                      type="danger"
                      onClick={() => {
                        this.handleDelete(scope.row);
                      }}
                    >
                      删除
                    </el-button>
                    <el-button type="warning">未绑定</el-button>
                  </div>
                );
              },
            },
          ],
          data: [],
        },
        formConfig: {
          formDesc: {
            name: {
              type: "input",
              label: "姓名",
              attrs: {
                clearable: true,
              },
            },
            account: {
              type: "input",
              label: "账户",
              attrs: {
                clearable: true,
              },
            },
            role: {
              type: "select",
              label: "角色",
              isOptions: true,
              attrs: {
                clearable: true,
              },
              options: [
                {
                  text: "学生",
                  value: 1,
                },
                {
                  text: "老师",
                  value: 2,
                },
              ],
            },
            comp_id: {
              type: "select",
              label: "所属公司",
              attrs: {
                clearable: true,
              },
              options: async () => {
                const {
                  data: {
                    companyList: { list },
                  },
                } = await findAllCompany({ pageNo: 1, pageSize: 50 });
                return list.map((item) => {
                  return { text: item.name, value: item.id };
                });
              },
            },
            prof_group_id: {
              type: "select",
              label: "专业组",
              attrs: {
                clearable: true,
              },
              options: async () => {
                const {
                  data: {
                    profGroup: { list },
                  },
                } = await findAllProfGroup({ pageNo: 1, pageSize: 50 });
                return list.map((item) => {
                  return { text: item.name, value: item.id };
                });
              },
            },
            type: {
              type: "select",
              label: "用户类型",
              attrs: {
                clearable: true,
              },
              options: [
                {
                  text: "临时工",
                  value: 1,
                },
                {
                  text: "正式工",
                  value: 2,
                },
              ],
            },
          },
        },
        queryForm: {
          pageNo: 1,
          pageSize: 10,
          name: "",
          account: "",
          role: "",
          comp_id: "",
          prof_group_id: "",
          type: "",
        },
      };
    },
    async created() {
      this.fetchData();
    },
    methods: {
      setSelectRows(val) {
        this.selectRows = val;
      },
      addData(e) {
        this.tableData.data.unshift(e);
      },
      updateData(e) {
        const index = this.tableData.data.findIndex((item) => item.id === e.id);
        this.$set(this.tableData.data, index, e);
      },
      async handleExport() {
        const {
          data: { excel_path },
        } = await exportUsers(this.queryForm);
        window.open(filters.imgBaseUrl(excel_path), "_parent");
      },
      handleImport() {
        this.$refs["import"].showImport();
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
            const { msg } = await deleteUser({ ids: row.id });
            this.$baseMessage(msg, "success");
            this.tableData.data.splice(
              this.tableData.data.findIndex((item) => item.id === row.id),
              1
            );
          });
        } else {
          if (this.selectRows.length > 0) {
            const ids = this.selectRows.map((item) => item.id).join();
            this.$baseConfirm("你确定要删除选中项吗", null, async () => {
              const { msg } = await deleteUser({ ids });
              this.$baseMessage(msg, "success");
              this.selectRows.map((item) => {
                this.tableData.data.splice(
                  this.tableData.data.findIndex((it) => it.id === item.id),
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
      handleResetForm(e) {
        this.$refs[e].resetFields();
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
      async fetchData(loading = true) {
        this.loading = loading;
        const {
          data: {
            userList: { list, total },
          },
        } = await findUsers(this.queryForm);
        this.tableData.data = list;
        this.total = total;
        setTimeout(() => {
          this.loading = false;
        }, 300);
      },
    },
  };
</script>
