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
      @fetchData="fetchData"
      @add="addData"
      @update="updateData"
    ></edit>
  </div>
</template>

<script>
  import { findFeedBack } from "@/api/opinion";
  import Edit from "./components/Edit";

  export default {
    name: "Opinion",
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
              prop: "users_id",
              label: "反馈人",
              width: "90",
              render: (h, scope) => {
                return <span>{scope.row.users.name}</span>;
              },
            },
            {
              prop: "role",
              label: "角色",
              width: "80",
              render: (h, scope) => {
                return (
                  <span>
                    {scope.row.users.roles === 1
                      ? "学生"
                      : scope.row.users.roles === 2
                      ? "老师"
                      : ""}
                  </span>
                );
              },
            },
            {
              label: "反馈时间",
              width: "180",
              render: (h, scope) => {
                return <div>{scope.row.create_time.slice(0, 19)}</div>;
              },
            },
            {
              prop: "content",
              label: "内容",
            },
          ],
          data: [],
        },
        formConfig: {
          formDesc: {
            time: {
              type: "datetimerange",
              label: "范围1",
              attrs: {
                clearable: true,
                valueFormat: "yyyy-MM-dd HH:mm:ss",
                pickerOptions: {
                  shortcuts: [
                    {
                      text: "最近一周",
                      onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit("pick", [start, end]);
                      },
                    },
                    {
                      text: "最近一个月",
                      onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        picker.$emit("pick", [start, end]);
                      },
                    },
                    {
                      text: "最近三个月",
                      onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        picker.$emit("pick", [start, end]);
                      },
                    },
                    {
                      text: "最近六个月",
                      onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 180);
                        picker.$emit("pick", [start, end]);
                      },
                    },
                  ],
                },
              },
            },
          },
        },
        queryForm: {
          pageNo: 1,
          pageSize: 10,
          time: [],
        },
      };
    },
    async created() {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 180);
      this.queryForm.time = [start, end];
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
            const { msg } = await deleteModule({ ids: row.id });
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
              const { msg } = await deleteModule({ ids });
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
        const { queryForm } = this;
        queryForm.from = queryForm.time[0] || "";
        queryForm.to = queryForm.time[1] || "";
        const {
          data: {
            feedBacks: { list, total },
          },
        } = await findFeedBack(queryForm);
        this.tableData.data = list;
        this.total = total;
        setTimeout(() => {
          this.loading = false;
        }, 300);
      },
    },
  };
</script>
