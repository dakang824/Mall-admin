<!--
 * @Author: yukang 1172248038@qq.com
 * @Description: 试题弹窗表格
 * @Date: 2020-12-11 16:08:37
 * @LastEditTime: 2021-02-26 10:06:09
-->
<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    width="750px"
    destroy-on-close
    @closed="handleClose"
  >
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
      max-height="450"
      :pagination="false"
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
  import { getTestScoreResults } from "@/api/mockTest";
  const dayjs = require("dayjs");
  export default {
    components: {},
    data() {
      return {
        loading: true,
        title: "记录",
        dialogVisible: false,
        downloadLoading: false,
        layout: "total, sizes, prev, pager, next, jumper",
        total: 0,
        tableData: {
          column: [
            {
              prop: "index",
              label: "序号",
              width: "80",
            },
            {
              prop: "test_name",
              label: "考试名称",
              showOverflowTooltip: true,
            },
            {
              prop: "user_name",
              label: "用户名称",
              width: "90",
            },
            {
              prop: "right_count",
              label: "答对题数",
              width: "90",
            },
            {
              prop: "wrong_count",
              label: "答错题数",
              width: "90",
            },
            {
              prop: "score",
              label: "考试成绩",
              width: "90",
            },
            {
              prop: "time",
              label: "考试时间",
              width: "160",
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
      handleClose() {
        this.dialogVisible = false;
      },
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
              "考试名称",
              "用户名称",
              "答对题数",
              "答错题数",
              "考试成绩",
              "考试时间",
            ],
            data: this.formatJson(),
            filename: "score",
            autoWidth: true,
            bookType: "xlsx",
          });
          this.downloadLoading = false;
        });
      },
      formatJson() {
        return this.tableData.data.map((v) =>
          [
            "index",
            "test_name",
            "user_name",
            "right_count",
            "wrong_count",
            "score",
            "time",
          ].map((j) => {
            return v[j];
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
          data: { score },
        } = await getTestScoreResults(this.queryForm);
        const list = score.map((item, ind) => {
          item.time = dayjs(+item.code).format("YYYY-MM-DD HH:MM:ss");
          item.index = ind + 1;
          return item;
        });
        this.tableData.data = list;
        this.total = list.length;
        this.loading = false;
      },
    },
  };
</script>

<style lang="scss" scoped></style>
