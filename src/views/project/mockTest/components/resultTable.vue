<!--
 * @Author: yukang 1172248038@qq.com
 * @Description: 试题弹窗表格
 * @Date: 2020-12-11 16:08:37
 * @LastEditTime: 2020-12-11 17:35:34
-->
<template>
  <el-dialog :title="title" :visible.sync="dialogVisible" width="700px">
    <div style="margin-bottom: 20px">
      <el-button
        type="primary"
        icon="el-icon-download"
        :loading="downloadLoading"
        @click="handleExport"
      >
        成绩导出
      </el-button>
    </div>

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
    />
  </el-dialog>
</template>

<script>
  import { findTestQues } from "@/api/mockTest";
  export default {
    components: {},
    data() {
      return {
        loading: true,
        title: "试卷",
        dialogVisible: false,
        downloadLoading: false,
        layout: "total, sizes, prev, pager, next, jumper",
        total: 0,
        tableData: {
          column: [
            {
              prop: "id",
              label: "序号",
              width: "80",
            },
            {
              prop: "que",
              label: "题目",
              showOverflowTooltip: true,
              render: (h, scope) => {
                return <span>{scope.row.que.content}</span>;
              },
            },
            {
              prop: "prof_id",
              label: "专业",
              width: "90",
              render: (h, scope) => {
                return (
                  <span>
                    {
                      this.$store.state.globalRequest.professionsKeyVal[
                        scope.row.que.prof_id
                      ]
                    }
                  </span>
                );
              },
            },
            {
              prop: "module_id",
              label: "模块",
              width: "90",
              render: (h, scope) => {
                return (
                  <span>
                    {
                      this.$store.state.globalRequest.moduleListsKeyVal[
                        scope.row.que.module_id
                      ]
                    }
                  </span>
                );
              },
            },
            {
              prop: "type",
              label: "试题类型",
              width: "90",
              render: (h, scope) => {
                return <span>{this.type[scope.row.que.type]}</span>;
              },
            },
            {
              prop: "company_id",
              label: "答案",
              width: "90",
              render: (h, scope) => {
                return <span>{this.getAnswer(scope.row.que.queOptions)}</span>;
              },
            },
          ],
          data: [],
        },
        queryForm: {
          pageNo: 1,
          pageSize: 10,
          test_id: "",
        },
        type: {
          1: "单选",
          2: "多选",
          3: "判断",
        },
      };
    },
    methods: {
      getAnswer: (v) => {
        const current = v.filter((item) => item.rig === 1);

        return current ? current.map((item) => item.name).toString() : "";
      },
      async handleExport() {
        this.downloadLoading = true;
        import("@/components/vendor/Export2Excel").then((excel) => {
          excel.export_json_to_excel({
            header: [
              "序号",
              "姓名",
              "账号",
              "角色",
              "所属公司",
              "用户类型",
              "专业组",
            ],
            data: this.formatJson(),
            filename: "users",
            autoWidth: true,
            bookType: "xlsx",
          });
          this.downloadLoading = false;
        });
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
      handleSizeChange(val) {
        this.queryForm.pageSize = val;
        this.fetchData();
      },
      handleCurrentChange(val) {
        this.queryForm.pageNo = val;
        this.fetchData();
      },
      showEdit(row) {
        this.queryForm.test_id = row.id;
        this.fetchData();
        this.dialogVisible = true;
      },
      async fetchData() {
        this.loading = true;
        const {
          data: {
            testQues: { list, total },
          },
        } = await findTestQues(this.queryForm);
        this.tableData.data = list;
        this.total = total;
        this.loading = false;
      },
    },
  };
</script>

<style lang="scss" scoped></style>
