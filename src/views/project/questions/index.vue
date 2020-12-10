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
          题库导入
        </el-button>
        <el-button
          icon="el-icon-download"
          type="success"
          :loading="downloadLoading"
          @click="handleExport"
        >
          题库导出
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
  import { findQuestions, deleteQuestion } from "@/api/questions";
  import filters from "@/filters";
  import Edit from "./components/Edit";
  import ImportTemplate from "./components/importTemplate";
  import { findAllProfession } from "@/api/professions";
  import { findModule } from "@/api/module";

  export default {
    name: "Questions",
    components: { Edit, ImportTemplate },
    data() {
      return {
        loading: true,
        downloadLoading: false,
        layout: "total, sizes, prev, pager, next, jumper",
        total: 0,
        selectRows: "",
        prof_name: {},
        module_name: {},
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
              prop: "content",
              label: "题目",
            },
            {
              prop: "prof_id",
              label: "专业",
              width: "90",
              render: (h, scope) => {
                return <span>{this.prof_name[scope.row.prof_id]}</span>;
              },
            },
            {
              prop: "module_id",
              label: "模块",
              width: "90",
              render: (h, scope) => {
                return <span>{this.module_name[scope.row.module_id]}</span>;
              },
            },
            {
              prop: "type",
              label: "类型",
              width: "80",
              render: (h, scope) => {
                return (
                  <span>
                    {scope.row.type === 1
                      ? "单选"
                      : scope.row.type === 2
                      ? "多选"
                      : scope.row.type === 3
                      ? "判断"
                      : ""}
                  </span>
                );
              },
            },
            {
              label: "操作",
              width: "150",
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
              options: [],
            },
            module_id: {
              type: "select",
              label: "模块",
              attrs: {
                clearable: true,
              },
              options: [],
            },
            type: {
              type: "select",
              label: "题目类型",
              attrs: {
                clearable: true,
              },
              options: [
                {
                  text: "单选",
                  value: 1,
                },
                {
                  text: "多选",
                  value: 2,
                },
                {
                  text: "判断",
                  value: 3,
                },
              ],
            },
            content: {
              type: "input",
              label: "题目",
              attrs: {
                clearable: true,
              },
            },
          },
        },
        queryForm: {
          pageNo: 1,
          pageSize: 10,
          type: "",
          content: "",
          prof_id: "",
          module_id: "",
        },
      };
    },
    async created() {
      // 获取专业数据
      const {
        data: { professionList },
      } = await findAllProfession({ pageNo: 1, pageSize: 50 });

      const professionLists = professionList.list.map((item) => {
        return { text: item.name, value: item.id };
      });

      this.formConfig.formDesc.prof_id.options = professionLists;

      this.prof_name = professionLists.reduce((a, b) => {
        a[b.value] = b.text;
        return a;
      }, {});

      // 获取模块数据
      const {
        data: { moduleList },
      } = await findModule({ pageNo: 1, pageSize: 50 });

      const moduleLists = moduleList.list.map((item) => {
        return { text: item.name, value: item.id };
      });

      this.formConfig.formDesc.module_id.options = moduleLists;

      this.module_name = moduleLists.reduce((a, b) => {
        a[b.value] = b.text;
        return a;
      }, {});

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
        this.downloadLoading = true;
        import("@/components/vendor/Export2Excel").then((excel) => {
          excel.export_json_to_excel({
            header: ["序号", "题目", "专业", "模块", "题目类型", "答案"],
            data: this.formatJson(),
            filename: "questions",
            autoWidth: true,
            bookType: "xlsx",
          });
          this.downloadLoading = false;
        });
      },
      formatJson() {
        return this.tableData.data.map((v) =>
          ["id", "content", "prof_id", "module_id", "type", "queOptions"].map(
            (j) => {
              if (j === "prof_id") {
                return this.prof_name[v[j]];
              } else if (j === "module_id") {
                return this.module_name[v[j]];
              } else if (j === "queOptions") {
                return v[j]
                  .map((item) => {
                    return `${item.content}--${
                      item.rig == 1 ? "正确" : "错误"
                    }`;
                  })
                  .join("/##/");
              } else if (j === "type") {
                return v[j] === 1
                  ? "单选"
                  : v[j] === 2
                  ? "多选"
                  : v[j] === 3
                  ? "判断"
                  : "";
              } else {
                return v[j];
              }
            }
          )
        );
      },
      handleImport() {
        this.$refs["import"].showImport(this.formConfig.formDesc);
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
            const { msg } = await deleteQuestion({ ids: row.id });
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
              const { msg } = await deleteQuestion({ ids });
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
            questions: { list, total },
          },
        } = await findQuestions(this.queryForm);
        this.tableData.data = list;
        this.total = total;
        setTimeout(() => {
          this.loading = false;
        }, 300);
      },
    },
  };
</script>
