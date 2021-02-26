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
    <test-table ref="testTable" />
    <result-table ref="resultTable" />
  </div>
</template>

<script>
  import { mapState } from "vuex";
  import { findTest, deleteTest } from "@/api/mockTest";
  import Edit from "./components/Edit";
  import TestTable from "./components/testTable";
  import ResultTable from "./components/resultTable";

  export default {
    name: "MockTest",
    components: { Edit, TestTable, ResultTable },
    data() {
      return {
        loading: true,
        downloadLoading: false,
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
              label: "名称",
            },
            {
              prop: "prof_id",
              label: "专业",
              render: (h, scope) => {
                return <span>{this.professionsKeyVal[scope.row.prof_id]}</span>;
              },
            },
            {
              prop: "module_id",
              label: "模块",
              render: (h, scope) => {
                return (
                  <span>{this.moduleListsKeyVal[scope.row.module_id]}</span>
                );
              },
            },
            {
              prop: "company_id",
              label: "单位",
              render: (h, scope) => {
                return (
                  <span>{this.companyListsKeyVal[scope.row.company_id]}</span>
                );
              },
            },
            {
              prop: "start_time",
              label: "开始时间",
              width: "140",
              render: (h, scope) => {
                return <span>{scope.row.start_time.substr(0, 16)}</span>;
              },
            },
            {
              prop: "end_time",
              label: "结束时间",
              width: "140",
              render: (h, scope) => {
                return <span>{scope.row.end_time.substr(0, 16)}</span>;
              },
            },
            {
              label: "操作",
              width: "280",
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
                      type="warning"
                      onClick={() => {
                        this.handleLookTests(scope.row);
                      }}
                    >
                      试题
                    </el-button>
                    <el-button
                      type="success"
                      onClick={() => {
                        this.handleLookResult(scope.row);
                      }}
                    >
                      记录
                    </el-button>
                    <el-button
                      type="danger"
                      onClick={() => {
                        this.handleDelete(scope.row);
                      }}
                    >
                      删除
                    </el-button>
                  </div>
                );
              },
            },
          ],
          data: [],
        },
        formConfig: {
          formDesc: {
            prof_id: {
              type: "select",
              label: "专业",
              attrs: {
                clearable: true,
              },
              options: async () => {
                await this.$store.dispatch("globalRequest/findAllProfession");
                return this.professions;
              },
            },
            module_id: {
              type: "select",
              label: "模块",
              attrs: {
                clearable: true,
              },
              vif(data, e) {
                e.options =
                  data.prof_id && data.moduleLists.length
                    ? data.moduleLists.filter(
                        (item) => data.prof_id === item.prof_id
                      )
                    : data.moduleLists;
                return true;
              },
              isReloadOptions: true,
              options: [],
            },
            company_id: {
              type: "select",
              label: "单位",
              attrs: {
                clearable: true,
              },
              options: async () => {
                await this.$store.dispatch("globalRequest/findAllCompany");
                return this.companyLists;
              },
            },
            name: {
              type: "input",
              label: "考试名称",
              attrs: {
                clearable: true,
              },
            },
          },
        },
        queryForm: {
          pageNo: 1,
          pageSize: 10,
          name: "",
          company_id: "",
          prof_id: "",
          module_id: "",
        },
      };
    },
    computed: {
      ...mapState({
        professions: (state) => state.globalRequest.professions,
        professionsKeyVal: (state) => state.globalRequest.professionsKeyVal,
        moduleLists: (state) => state.globalRequest.moduleLists,
        moduleListsKeyVal: (state) => state.globalRequest.moduleListsKeyVal,
        companyLists: (state) => state.globalRequest.companyLists,
        companyListsKeyVal: (state) => state.globalRequest.companyListsKeyVal,
      }),
    },
    async created() {
      await this.$store.dispatch("globalRequest/findModule");
      this.queryForm.moduleLists = this.moduleLists;
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
      handleLookTests(row) {
        this.$refs["testTable"].showEdit(row);
      },
      handleLookResult(row) {
        this.$refs["resultTable"].showEdit(row);
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
            const { msg } = await deleteTest({ ids: row.id });
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
              const { msg } = await deleteTest({ ids });
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
            tests: { list, total },
          },
        } = await findTest(this.queryForm);
        this.tableData.data = list;
        this.total = total;
        setTimeout(() => {
          this.loading = false;
        }, 300);
      },
    },
  };
</script>
