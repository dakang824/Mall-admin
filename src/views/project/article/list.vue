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

    <edit
      ref="edit"
      :options="{ formDesc: formConfig.formDesc }"
      @fetchData="fetchData"
      @update="updateData"
    ></edit>
  </div>
</template>

<script>
  import { findArticle, deleteArticle } from "@/api/list";
  import Edit from "./components/Edit";
  import filters from "@/filters";

  export default {
    name: "Curd",
    components: { Edit },
    data() {
      return {
        list: null,
        loading: true,
        layout: "total, sizes, prev, pager, next, jumper",
        total: 0,
        selectRows: "",
        queryForm: {
          pageNo: 1,
          pageSize: 10,
          title: "",
          author: "",
          cate1: "",
          cate2: "",
          cate3: "",
        },
        formConfig: {
          formDesc: {
            title: {
              type: "input",
              label: "标题",
              attrs: {
                clearable: true,
              },
            },
            author: {
              type: "input",
              label: "作者",
              attrs: {
                clearable: true,
              },
            },
            status: {
              type: "select",
              label: "状态",
              isOptions: true,
              attrs: {
                clearable: true,
              },
              options: () => {
                return this.$store.state.article.status;
              },
            },
            cate1: {
              type: "select",
              label: "一级栏目",
              attrs: {
                clearable: true,
              },
              options: () => {
                return this.$store.state.article.cate1;
              },
            },
            cate2: {
              type: "select",
              label: "二级栏目",
              attrs: {
                clearable: true,
              },
              options: () => {
                return this.$store.state.article.cate2;
              },
            },
            cate3: {
              type: "select",
              label: "三级栏目",
              attrs: {
                clearable: true,
              },
              options: () => {
                return this.$store.state.article.cate3;
              },
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
              prop: "title",
              label: "标题",
            },
            {
              prop: "author",
              label: "作者",
            },
            {
              prop: "create_time",
              label: "更新时间",
              width: "160",
              render: (h, scope) => {
                return <span>{scope.row.create_time.substr(0, 19)}</span>;
              },
            },
            {
              prop: "status",
              label: "状态",
              render: (h, scope) => {
                return (
                  <span>
                    {scope.row.status === 0
                      ? "未发布"
                      : scope.row.status === 1
                      ? "已发布"
                      : ""}
                  </span>
                );
              },
            },
            {
              label: "操作",
              width: "160",
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
      };
    },
    created() {
      this.fetchData();
    },
    methods: {
      setSelectRows(val) {
        this.selectRows = val;
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
        // this.$router.push({
        //   path: "/article/editor",
        //   query: { id: row.id || "" },
        // });
      },
      handleDelete(row) {
        if (row.id) {
          this.$baseConfirm("你确定要删除当前项吗?", null, async () => {
            const { msg } = await deleteArticle({ ids: row.id });
            this.$baseMessage(msg, "success");
            this.tableData.data.splice(
              this.tableData.data.findIndex((item) => item.id === row.id),
              1
            );
          });
        } else {
          if (this.selectRows.length > 0) {
            const ids = this.selectRows.map((item) => item.id).join();
            this.$baseConfirm("你确定要删除选中项吗?", null, async () => {
              const { msg } = await deleteArticle({ ids });
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
            articles: { list, total },
          },
        } = await findArticle(this.queryForm);
        list.map((item) => {
          item.cover_pic = filters.imgBaseUrl(item.cover_pic);
        });
        console.log(list);
        this.tableData.data = list;
        this.total = total;
        this.$store.commit("article/ChangeArticleList", list);
        setTimeout(() => {
          this.loading = false;
        }, 300);
      },
    },
  };
</script>
