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
          添加计划
        </el-button>
        <el-button icon="el-icon-upload2" type="warning" @click="handleImport">
          计划导入
        </el-button>
        <el-button
          icon="el-icon-download"
          type="success"
          :loading="downloadLoading"
          @click="handleExport"
        >
          计划导出
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

    <import-template ref="import" @fetchData="fetchData" />
  </div>
</template>

<script>
  import { mapState } from "vuex";
  import { findTest, deleteTest } from "@/api/mockTest";
  import Edit from "./components/Edit";
  import ImportTemplate from "./components/importTemplate";

  export default {
    name: "PlanSum",
    components: { Edit, ImportTemplate },
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
              label: "姓名",
              width: "80",
            },
            {
              prop: "name",
              label: "ERP",
            },
            {
              prop: "name",
              label: "所属公司",
            },
            {
              prop: "prof_id",
              label: "考核专业",
              render: (h, scope) => {
                return <span>{this.professionsKeyVal[scope.row.prof_id]}</span>;
              },
            },
            {
              prop: "module_id",
              label: "考核模块",
              render: (h, scope) => {
                return (
                  <span>{this.moduleListsKeyVal[scope.row.module_id]}</span>
                );
              },
            },

            {
              prop: "start_time",
              label: "考核时间",
              width: "140",
              render: (h, scope) => {
                return <span>{scope.row.start_time.substr(0, 16)}</span>;
              },
            },
            {
              prop: "company_id",
              label: "参与工程项目",
              render: (h, scope) => {
                return (
                  <span>{this.companyListsKeyVal[scope.row.company_id]}</span>
                );
              },
            },
            {
              prop: "name",
              label: "带教老师",
            },
            {
              prop: "name",
              label: "实操内容",
            },
            {
              label: "操作",
              width: "90",
              render: (h, scope) => {
                return (
                  <div>
                    <el-button
                      type="warning"
                      onClick={() => {
                        this.handleLookTests(scope.row);
                      }}
                    >
                      未考核
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
            teacher: {
              type: "select",
              label: "带教老师",
              attrs: {
                clearable: true,
              },
              options: async () => {
                await this.$store.dispatch("globalRequest/findAllCompany");
                return this.companyLists;
              },
            },
            time: {
              type: "monthrange",
              label: "考评时间",
              attrs: {
                clearable: true,
                startPlaceholder: "考评开始月份",
                endPlaceholder: "考评结束月份",
              },
            },
            result: {
              type: "select",
              label: "计划结果",
              attrs: {
                clearable: true,
              },
              options: [
                {
                  text: "通过",
                  value: 1,
                },
                {
                  text: "未通过",
                  value: 2,
                },
              ],
            },
            company_id: {
              type: "select",
              label: "分公司",
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
              label: "员工姓名",
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
      handleImport() {
        this.$refs["import"].showImport(
          this.formConfig.formDesc,
          this.professions,
          this.moduleLists
        );
      },
      async handleExport() {
        this.downloadLoading = true;
        const {
          data: { excel_path },
        } = await exportQuestion(this.queryForm);
        window.open(filters.imgBaseUrl(excel_path), "_parent");
        // import("@/components/vendor/Export2Excel").then((excel) => {
        //   excel.export_json_to_excel({
        //     header: ["序号", "题目", "专业", "模块", "题目类型"],
        //     data: this.formatJson(),
        //     filename: "questions",
        //     autoWidth: true,
        //     bookType: "xlsx",
        //   });
        // });
        this.downloadLoading = false;
      },
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
