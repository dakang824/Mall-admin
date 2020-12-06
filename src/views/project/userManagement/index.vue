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
          :request-fn="handleRequest"
          @request-success="handleRequestSuccess"
        />
      </vab-query-form-left-panel>
      <vab-query-form-left-panel :span="12">
        <el-button icon="el-icon-plus" type="primary" @click="handleEdit">
          添加
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
    ></lb-table>
    <edit
      ref="edit"
      :options="{ roles, typeOptions, companys, professions }"
      @fetchData="fetchData"
    ></edit>
  </div>
</template>

<script>
  import { mapState } from "vuex";
  import { findUsers, doDelete } from "@/api/userManagement";
  import Edit from "./components/Edit";

  export default {
    name: "UserManagement",
    components: { Edit },
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
            },
            {
              prop: "name",
              label: "姓名",
            },
            {
              prop: "per",
              label: "ERP",
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
              width: "100",
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
              width: "100",
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
          list: null,
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
              label: "ERP号",
            },
            role: {
              type: "select",
              label: "角色",
              isOptions: true,
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
              prop: { text: "name", value: "id" },
              options: [],
            },
            prof_group_id: {
              type: "select",
              label: "专业组",
              prop: { text: "name", value: "id" },
              options: [],
            },
            type: {
              type: "select",
              label: "用户类型",
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
    computed: {
      ...mapState({
        professions: (state) => state.userManagement.professions,
        companys: (state) => state.userManagement.companys,
      }),
    },
    watch: {
      companys: {
        handler: function () {
          this.$store.dispatch("userManagement/getData");
          this.formConfig.formDesc.comp_id.options = this.companys;
          this.formConfig.formDesc.prof_group_id.options = this.professions;
        },
        immediate: true,
      },
    },
    created() {
      this.fetchData();
    },
    methods: {
      setSelectRows(val) {
        this.selectRows = val;
      },
      handleEdit(row) {
        this.$store.dispatch("userManagement/getData");
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
      async fetchData() {
        this.loading = true;
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
