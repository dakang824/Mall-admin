<template>
  <div class="demo-container">
    <vab-query-form>
      <vab-query-form-left-panel :span="12">
        <el-button icon="el-icon-plus" type="primary" @click="handleEdit">
          添加
        </el-button>
      </vab-query-form-left-panel>
      <vab-query-form-right-panel :span="12">
        <el-button icon="el-icon-refresh" @click="fetchData">刷新</el-button>
      </vab-query-form-right-panel>
    </vab-query-form>
    <el-row v-loading="loading" :gutter="20">
      <el-col v-for="(item, index) in tableData.data" :key="index" :span="8">
        <div class="grid-content bg-purple"></div>
        <el-card>
          <div slot="header" style="text-align: right">
            <el-button
              type="danger"
              size="mini"
              icon="el-icon-delete"
              @click="handleDelete"
            >
              删除
            </el-button>
          </div>
          <tree :tree-data="[item]" />
        </el-card>
      </el-col>
    </el-row>
    <edit ref="edit" @add="addData" />
  </div>
</template>

<script>
  import { mapState } from "vuex";
  import { findSkillTree } from "@/api/skills";
  import Tree from "@/components/tree";
  import Edit from "./components/Edit";

  export default {
    name: "Group",
    components: { Edit, Tree },
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
              prop: "name",
              label: "技能树",
              render: (h, scope) => {
                return <Tree></Tree>;
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
                await this.$store.dispatch("globalRequest/findAllProfession");
                return this.professions;
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
    computed: {
      ...mapState({
        professions: (state) => state.globalRequest.professions,
        professionsKeyVal: (state) => state.globalRequest.professionsKeyVal,
      }),
    },
    async created() {
      this.fetchData();
    },
    methods: {
      addData(e) {
        this.tableData.data.unshift(e);
      },
      updateData(e) {
        const index = this.tableData.data.findIndex((item) => item.id === e.id);
        this.$set(this.tableData.data, index, e);
      },

      handleEdit(row) {
        this.$refs["edit"].showEdit();
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
      processingData(data) {
        return data.map((item) => {
          item.label = item.name;
          item.downSkillTree.length ? (item.child = item.downSkillTree) : "";
          this.processingData(item.downSkillTree);

          return item;
        });
      },
      async fetchData(loading = true) {
        this.loading = loading;
        const {
          data: {
            skillTree: { list, total },
          },
        } = await findSkillTree(this.queryForm);
        const d = this.processingData(list);
        // console.log(d);
        this.tableData.data = d;
        this.total = total;
        setTimeout(() => {
          this.loading = false;
        }, 300);
      },
    },
  };
</script>

<style lang="scss" scoped>
  ::v-deep {
    .el-card {
      &__header {
        padding: 10px;
      }
    }
  }
</style>
