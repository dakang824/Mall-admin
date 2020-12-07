<template>
  <div class="demo-container">
    <vab-query-form>
      <vab-query-form-left-panel :span="12">
        <el-button icon="el-icon-plus" type="primary" @click="handleEdit">
          添加
        </el-button>
        <el-button icon="el-icon-delete" type="danger" @click="handleDelete">
          批量删除
        </el-button>
      </vab-query-form-left-panel>
      <vab-query-form-right-panel :span="12">
        <el-button icon="el-icon-refresh" @click="fetchData">刷新</el-button>
      </vab-query-form-right-panel>
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
      :options="{ formDesc: formConfig.formDesc }"
      @fetchData="fetchData"
      @add="addData"
      @update="updateData"
    ></edit>
  </div>
</template>

<script>
  import { findAllProfGroup, deleteProfGroup } from "@/api/group";
  import { findAllProfession } from "@/api/professions";
  import Edit from "./components/Edit";

  export default {
    name: "Group",
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
              width: "80",
            },
            {
              prop: "name",
              label: "专业组名称",
            },
            {
              prop: "itemList",
              label: "拥有专业",
              render: (h, scope) => {
                return (
                  <span>
                    {scope.row.itemList.map((item) => item.prof.name).join(",")}
                  </span>
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
            name: {
              type: "input",
              label: "专业组名称",
              attrs: {
                clearable: true,
              },
            },
            prof_ids: {
              type: "checkbox",
              label: "所属专业",
              attrs: {
                clearable: true,
              },
              options: async () => {
                const {
                  data: {
                    professionList: { list },
                  },
                } = await findAllProfession({ pageNo: 1, pageSize: 50 });

                return list.map((item) => {
                  return { text: item.name, value: item.id };
                });
              },
            },
          },
        },
        queryForm: {
          pageNo: 1,
          pageSize: 10,
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
            const { msg } = await deleteProfGroup({ ids: row.id });
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
              const { msg } = await deleteProfGroup({ ids });
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
            profGroup: { list, total },
          },
        } = await findAllProfGroup(this.queryForm);

        list.map(
          (item) => (item.prof_ids = item.itemList.map((i) => i.prof_id))
        );
        console.log(list);
        this.tableData.data = list;
        this.total = total;
        setTimeout(() => {
          this.loading = false;
        }, 300);
      },
    },
  };
</script>
