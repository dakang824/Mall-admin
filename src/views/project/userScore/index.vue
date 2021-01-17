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
          成绩导入
        </el-button>
        <el-button
          icon="el-icon-download"
          type="success"
          :loading="downloadLoading"
          @click="handleExport"
        >
          成绩导出
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
  import {
    findUserScore,
    deleteUserScore,
    exportUserScore,
  } from "@/api/userScore";
  import filters from "@/filters";
  import Edit from "./components/Edit";
  import ImportTemplate from "./components/importTemplate";
  import { mapState } from "vuex";

  export default {
    name: "UserScore",
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
            },
            {
              prop: "user_account",
              label: "erp账户",
            },
            {
              prop: "test_name",
              label: "试卷名称",
            },
            {
              prop: "type",
              label: "类型",
              render: (h, scope) => {
                return (
                  <span>
                    {scope.row.type === 1
                      ? "理论"
                      : scope.row.type === 2
                      ? "实操"
                      : ""}
                  </span>
                );
              },
            },
            {
              prop: "prof_name",
              label: "专业",
            },
            {
              prop: "company_name",
              label: "单位",
            },

            {
              prop: "score",
              label: "得分",
            },
            {
              prop: "test_time",
              label: "考试时间",
              width: "140",
            },
            {
              prop: "pic_path",
              label: "图片",
              width: "140",
              render: (h, scope) => {
                return (
                  <el-image
                    src={filters.imgBaseUrl(scope.row.pic_path)}
                  ></el-image>
                );
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
                      type="warning"
                      onClick={() => {
                        this.handleUpload(scope.row);
                      }}
                    >
                      上传
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
            company_id: {
              type: "select",
              label: "公司",
              attrs: {
                clearable: true,
              },
              options: async () => {
                await this.$store.dispatch("globalRequest/findAllCompany");
                return this.companyLists;
              },
            },
            type: {
              type: "select",
              label: "类型",
              isOptions: true,
              attrs: {
                clearable: true,
              },
              options: [
                {
                  text: "理论",
                  value: 1,
                },
                {
                  text: "实操",
                  value: 2,
                },
              ],
            },
            name: {
              type: "input",
              label: "姓名",
              attrs: {
                clearable: true,
              },
            },
            test_name: {
              type: "input",
              label: "试卷名称",
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
          test_name: "",
          type: "",
          prof_id: "",
          company_id: "",
        },
      };
    },
    computed: {
      ...mapState({
        professions: (state) => state.globalRequest.professions,
        professionsKeyVal: (state) => state.globalRequest.professionsKeyVal,
        companyLists: (state) => state.globalRequest.companyLists,
        companyListsKeyVal: (state) => state.globalRequest.companyListsKeyVal,
      }),
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
        this.downloadLoading = true;
        const {
          data: { excel_path },
        } = await exportUserScore(this.queryForm);
        window.open(filters.imgBaseUrl(excel_path), "_parent");

        // import("@/components/vendor/Export2Excel").then((excel) => {
        //   excel.export_json_to_excel({
        //     header: [
        //       "序号",
        //       "姓名",
        //       "账号",
        //       "角色",
        //       "所属公司",
        //       "用户类型",
        //       "专业组",
        //     ],
        //     data: this.formatJson(),
        //     filename: "users",
        //     autoWidth: true,
        //     bookType: "xlsx",
        //   });
        this.downloadLoading = false;
        // });
      },
      formatJson() {
        return this.tableData.data.map((v) =>
          [
            "id",
            "name",
            "account",
            "roles",
            "company",
            "type",
            "prof_group",
          ].map((j) => {
            if (j === "roles") {
              return v[j] === 1 ? "学生" : v[j] === 2 ? "老师" : "";
            } else if (j === "company" || j === "prof_group") {
              return v[j].name;
            } else if (j === "type") {
              return v[j] === 1 ? "临时工" : v[j] === 2 ? "正式工" : "";
            } else {
              return v[j];
            }
          })
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
            const { msg } = await deleteUserScore({ ids: row.id });
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
              const { msg } = await deleteUserScore({ ids });
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
            userScores: { list, total },
          },
        } = await findUserScore(this.queryForm);
        this.tableData.data = list;
        this.total = total;
        setTimeout(() => {
          this.loading = false;
        }, 300);
      },
    },
  };
</script>
