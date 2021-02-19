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
  </div>
</template>

<script>
  import { mapState } from "vuex";
  import { querySkillTreeScore } from "@/api/skills";
  import filters from "@/filters";
  import Tree from "@/components/tree";

  export default {
    name: "SkillScore",
    components: {},
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
          nav_id: "",
          prof_id: "",
        },
        formConfig: {
          formDesc: {
            user_name: {
              type: "input",
              label: "用户姓名",
              attrs: {
                clearable: true,
              },
            },
            skill_name: {
              type: "input",
              label: "技能树名称",
              attrs: {
                clearable: true,
              },
            },
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
          },
        },
        tableData: {
          column: [
            {
              prop: "user_name",
              label: "用户姓名",
              width: "90",
            },
            // {
            //   prop: "skilTree",
            //   label: "技能树名称",
            //   render: (h, scope) => {
            //     return scope.row.skilTree ? (
            //       <Tree
            //         tree-data={scope.row.skilTree}
            //         isSuperuser={false}
            //         default-expand-all
            //       />
            //     ) : (
            //       ""
            //     );
            //   },
            // },
            {
              prop: "skilTree",
              label: "一级技能树",
              render: (h, scope) => {
                return <span>{scope.row.arr[0]}</span>;
              },
            },
            {
              prop: "skilTree",
              label: "二级技能树",
              render: (h, scope) => {
                return <span>{scope.row.arr[1]}</span>;
              },
            },
            {
              prop: "skilTree",
              label: "三级技能树",
              render: (h, scope) => {
                return <span>{scope.row.arr[2]}</span>;
              },
            },
            {
              prop: "skilTree",
              label: "四级技能树",
              render: (h, scope) => {
                return <span>{scope.row.arr[3]}</span>;
              },
            },
            {
              prop: "skilTree",
              label: "五级技能树",
              render: (h, scope) => {
                return <span>{scope.row.arr[4]}</span>;
              },
            },
            // {
            //   prop: "prof_id",
            //   label: "专业",
            //   render: (h, scope) => {
            //     return scope.row.skilTree ? (
            //       <span>
            //         {this.professionsKeyVal[scope.row.skilTree[0].prof_id]}
            //       </span>
            //     ) : (
            //       ""
            //     );
            //   },
            // },
            {
              prop: "res",
              label: "成绩",
              render: (h, scope) => {
                return (
                  <el-tag type={scope.row.res === 1 ? "success" : "warning"}>
                    {scope.row.res === 1 ? "通过" : "未通过"}
                  </el-tag>
                );
              },
            },
            {
              prop: "create_time",
              label: "创建时间",
              render: (h, scope) => {
                return <span>{scope.row.create_time.substr(0, 10)}</span>;
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
        professions: (state) => state.globalRequest.professions,
        professionsKeyVal: (state) => state.globalRequest.professionsKeyVal,
      }),
    },
    created() {
      const status = this.$store.state.article.status;
      this.statusTxt = status.reduce((a, b) => {
        a[b.value] = b.text;
        return a;
      }, {});
      this.fetchData();
    },
    methods: {
      processingData(data) {
        return (
          data.length &&
          data.map((item) => {
            item.label = item.name;
            item.downSkillTree.length ? (item.child = item.downSkillTree) : "";
            this.processingData(item.downSkillTree);
            return item;
          })
        );
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
            skillTreeScores: { list, total },
          },
        } = await querySkillTreeScore(queryForm);

        function deep(data, d) {
          return data.map((item) => {
            if (item.child.length) {
              deep(item.child, d);
            } else {
              item.child = [d];
            }
            return item;
          });
        }
        list.map((item) => {
          const arr = [item.skill_name];
          for (let i = 0; i < 10; i++) {
            if (`up${i}_name` in item && item[`up${i}_name`]) {
              arr.push(item[`up${i}_name`]);
            }
          }
          item.arr = arr.reverse();
        });

        list.map((item) => {
          item.skilTree = [];
          for (let i = 0; i < item.arr.length; i++) {
            if (i === 0) {
              item.skilTree.push({
                id: i,
                name: item.arr[i],
                level: i,
                child: [],
              });
            } else {
              item.skilTree = deep(item.skilTree, {
                id: i,
                name: item.arr[i],
                level: i,
                child: [],
              });
            }
          }
          return item;
        });

        this.tableData.data = list;

        this.total = total;
        setTimeout(() => {
          this.loading = false;
        }, 300);
      },
    },
  };
</script>
