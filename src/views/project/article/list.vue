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
          @reset="handleReset"
        ></ele-form>
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
      @add="addData"
    ></edit>

    <view-detail v-model="show" :model="model"></view-detail>
  </div>
</template>

<script>
  import { mapState } from "vuex";
  import { findArticle, deleteArticle, auditArticle } from "@/api/list";
  import Edit from "./components/Edit";
  import filters from "@/filters";
  import viewDetail from "./components/viewDetail";

  export default {
    name: "List",
    components: { Edit, viewDetail },
    data() {
      return {
        list: null,
        loading: true,
        layout: "total, sizes, prev, pager, next, jumper",
        total: 0,
        selectRows: "",
        show: false,
        model: {},
        queryForm: {
          pageNo: 1,
          pageSize: 10,
          title: "",
          author: "",
          cate1: "",
          nav_id: "",
          prof_id: "",
        },
        operator: {
          0: {
            text: "提交审核",
            status: 1,
          },
          2: {
            text: "发布",
            status: 3,
          },
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
                return this.status;
              },
            },
            cate1: {
              type: "select",
              label: "一级栏目",
              attrs: {
                clearable: true,
              },
              options: () => {
                return this.cate1;
              },
            },
            nav_id: {
              type: "select",
              label: "二级栏目",
              attrs: {
                clearable: true,
              },
              vif(data) {
                return data.cate1 === 1 || data.cate1 === "";
              },
              options: async () => {
                await this.$store.dispatch("article/getAllArtNav");
                return this.cate2;
              },
            },
            prof_id: {
              type: "select",
              label: "三级栏目",
              attrs: {
                clearable: true,
              },
              vif(data) {
                return data.cate1 === 1 || data.cate1 === "";
              },
              options: async () => {
                await this.$store.dispatch("globalRequest/findAllProfession");
                return this.professions;
              },
            },
            prof_id1: {
              type: "select",
              label: "二级栏目",
              attrs: {
                clearable: true,
              },
              vif(data) {
                data.show = false;
                data.show = true;
                return data.cate1 === 2;
              },
              options: async () => {
                await this.$store.dispatch("globalRequest/findAllProfession");
                return this.professions;
              },
            },
            module_id: {
              type: "select",
              label: "三级栏目",
              attrs: {
                clearable: true,
              },
              vif(data, e) {
                console.log(data);
                e.options =
                  data.prof_id1 && data.moduleLists.length
                    ? data.moduleLists.filter(
                        (item) => data.prof_id1 === item.prof_id
                      )
                    : data.moduleLists;
                return data.cate1 === 2;
              },
              isReloadOptions: true,
              options: [],
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
              prop: "title",
              label: "标题",
              render: (h, scope) => {
                return (
                  <el-link
                    onClick={() => {
                      this.handleLook(scope.row);
                    }}
                  >
                    {scope.row.title}
                  </el-link>
                );
              },
            },
            {
              prop: "author",
              label: "作者",
            },
            {
              prop: "create_time",
              label: "创建时间",
              width: "160",
              render: (h, scope) => {
                return <span>{scope.row.create_time.substr(0, 19)}</span>;
              },
            },
            {
              prop: "start_time",
              label: "开始时间",
              width: "160",
              render: (h, scope) => {
                return <span>{scope.row.start_time.substr(0, 19)}</span>;
              },
            },
            {
              prop: "end_time",
              label: "结束时间",
              width: "160",
              render: (h, scope) => {
                return <span>{scope.row.end_time.substr(0, 19)}</span>;
              },
            },
            {
              prop: "status",
              label: "状态",
              render: (h, scope) => {
                return <span>{this.statusTxt[scope.row.status]}</span>;
              },
            },
            {
              label: "操作",
              width: "200",
              render: (h, scope) => {
                return (
                  <div>
                    <el-button
                      type="text"
                      onClick={() => {
                        this.handleEdit(scope.row);
                      }}
                    >
                      编辑
                    </el-button>
                    <el-button
                      type="text"
                      onClick={() => {
                        this.handleDelete(scope.row);
                      }}
                    >
                      删除
                    </el-button>
                    <el-button
                      type="text"
                      onClick={() => {
                        this.handleLook(scope.row);
                      }}
                    >
                      预览
                    </el-button>
                    {(scope.row.status === 0 || scope.row.status === 2) && (
                      <el-button
                        type="text"
                        onClick={() => {
                          this.handleClick(scope.row);
                        }}
                      >
                        {this.operator[scope.row.status].text}
                      </el-button>
                    )}
                  </div>
                );
              },
            },
          ],
          data: [],
        },
        statusTxt: {},
      };
    },
    computed: {
      ...mapState({
        status: (state) => state.article.status,
        cate1: (state) => state.article.cate1,
        cate2: (state) => state.article.cate2,
        professions: (state) => state.globalRequest.professions,
        moduleLists: (state) => state.globalRequest.moduleLists,
      }),
    },
    async created() {
      await this.$store.dispatch("globalRequest/findModule");
      this.queryForm.moduleLists = this.moduleLists;
      const status = this.$store.state.article.status;
      this.statusTxt = status.reduce((a, b) => {
        a[b.value] = b.text;
        return a;
      }, {});
      this.fetchData();
    },
    methods: {
      handleReset() {
        this.queryForm = {
          pageNo: 1,
          pageSize: 10,
          title: "",
          author: "",
          cate1: "",
          nav_id: "",
          prof_id: "",
        };
      },
      async handleClick({ id, status }) {
        if (status === 0 || status === 2) {
          const { msg } = await auditArticle({
            id,
            status: this.operator[status].status,
          });
          this.$baseMessage(msg, "success");
          this.fetchData(false);
        }
      },
      handleLook(e) {
        this.show = true;
        this.model = e;
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
        const queryForm = JSON.parse(JSON.stringify(this.queryForm));
        queryForm.prof_id = queryForm.prof_id1 || queryForm.prof_id;
        this.loading = loading;
        const {
          data: {
            articles: { list, total },
          },
        } = await findArticle(queryForm);
        list.map((item) => {
          item.cover_pic = filters.imgBaseUrl(item.cover_pic);
        });
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
