<template>
  <div class="curd-container">
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
    <vab-query-form>
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

    <edit ref="edit" @fetchData="fetchData"></edit>
  </div>
</template>

<script>
  import { getList, doDelete } from "@/api/list";
  import Edit from "./components/CurdEdit";

  export default {
    name: "Curd",
    components: { Edit },
    data() {
      return {
        list: null,
        listLoading: true,
        layout: "total, sizes, prev, pager, next, jumper",
        total: 0,
        selectRows: "",
        elementLoadingText: "正在加载...",
        queryForm: {
          pageNo: 1,
          pageSize: 10,
        },
        formConfig: {
          formDesc: {
            name: {
              type: "input",
              label: "文章标题",
              attrs: {
                clearable: true,
              },
            },
            account: {
              type: "input",
              label: "文章作者",
              attrs: {
                clearable: true,
              },
            },
            role: {
              type: "select",
              label: "文章状态",
              isOptions: true,
              attrs: {
                clearable: true,
              },
              options: [
                {
                  text: "发布中",
                  value: 1,
                },
                {
                  text: "审核中",
                  value: 2,
                },
                {
                  text: "已下架",
                  value: 3,
                },
                {
                  text: "未发布",
                  value: 4,
                },
              ],
            },
            comp_id: {
              type: "select",
              label: "一级栏目",
              attrs: {
                clearable: true,
              },
              options: [
                {
                  text: "首页",
                  value: 1,
                },
                {
                  text: "课件",
                  value: 2,
                },
              ],
            },
            prof_group_id: {
              type: "select",
              label: "二级栏目",
              attrs: {
                clearable: true,
              },
              options: [
                {
                  text: "公共",
                  value: 1,
                },
                {
                  text: "标准",
                  value: 2,
                },
                {
                  text: "技能树",
                  value: 3,
                },
                {
                  text: "影像",
                  value: 4,
                },
                {
                  text: "总结",
                  value: 5,
                },
              ],
            },
            type: {
              type: "select",
              label: "三级栏目",
              attrs: {
                clearable: true,
              },
              options: [
                {
                  text: "公共",
                  value: 1,
                },
                {
                  text: "标准",
                  value: 2,
                },
                {
                  text: "技能树",
                  value: 3,
                },
                {
                  text: "影像",
                  value: 4,
                },
                {
                  text: "总结",
                  value: 5,
                },
              ],
            },
          },
        },
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
              label: "内容",
            },
            {
              prop: "account",
              label: "栏目",
            },
            {
              prop: "company",
              label: "作者",
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
              label: "更新时间",
              render: (h, scope) => {
                return <span>{scope.row.company.name}</span>;
              },
            },
            {
              prop: "type",
              label: "状态",
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
      };
    },
    created() {
      this.fetchData();
    },
    methods: {
      setSelectRows(val) {
        this.selectRows = val;
      },
      handleEdit(row) {
        // if (row.id) {
        //   this.$refs["edit"].showEdit(row);
        // } else {
        //   this.$refs["edit"].showEdit();
        // }
        this.$router.push({
          path: "/article/editor",
          query: { id: row.id || "" },
        });
      },
      handleDelete(row) {
        if (row.id) {
          this.$baseConfirm("你确定要删除当前项吗?", null, async () => {
            const { msg } = await doDelete({ ids: row.id });
            this.$baseMessage(msg, "success");
            this.fetchData();
          });
        } else {
          if (this.selectRows.length > 0) {
            const ids = this.selectRows.map((item) => item.id).join();
            this.$baseConfirm("你确定要删除选中项吗?", null, async () => {
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
        this.listLoading = true;
        // const { data, totalCount } = await getList(this.queryForm);
        // this.list = data;
        // this.total = totalCount;
        setTimeout(() => {
          this.listLoading = false;
        }, 300);
      },
    },
  };
</script>
