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
      </vab-query-form-left-panel>
      <vab-query-form-right-panel :span="12">
        <el-button icon="el-icon-refresh" @click="fetchData">刷新</el-button>
      </vab-query-form-right-panel>
    </vab-query-form>
    <el-row v-loading="loading" :gutter="20">
      <el-col v-for="(item, index) in tableData.data" :key="index" :span="8">
        <div class="grid-content bg-purple"></div>
        <el-card>
          <div
            slot="header"
            style="display: flex; justify-content: space-between"
          >
            <span>{{ professionsKeyVal[item.prof_id] }}</span>
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-s-promotion"
              @click="clickPublish(item)"
            >
              发布
            </el-button>
          </div>
          <tree
            :tree-data="[item]"
            default-expand-all
            @add="clickAddData"
            @delete="clickDelete"
            @modify="clickModify"
          />
        </el-card>
      </el-col>

      <div style="height: 500px">
        <my-empty v-if="!tableData.data.length" fit></my-empty>
      </div>
    </el-row>
    <edit ref="edit" @add="addData" />
  </div>
</template>

<script>
  import { MyEmpty } from "$ui";
  import { mapState } from "vuex";
  import {
    findSkillTree,
    publicSkillTree,
    addSkillTree,
    modifySkillTree,
  } from "@/api/skills";
  import Tree from "@/components/tree";
  import Edit from "./components/Edit";

  export default {
    name: "Group",
    components: { Edit, Tree, MyEmpty },
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
              label: "名称",
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
      async clickDelete() {
        const {
          msg,
          data: { skillTree },
        } = await addSkillTree(e);
        callback(skillTree);
        this.$baseMessage(msg, "success");
      },
      async clickModify(e) {
        const {
          msg,
          data: { skillTree },
        } = await modifySkillTree(e);
        this.$baseMessage(msg, "success");
      },
      async clickAddData(e, callback) {
        const {
          msg,
          data: { skillTree },
        } = await addSkillTree(e);
        callback(skillTree);
        this.$baseMessage(msg, "success");
      },
      async clickPublish(e) {
        const { msg } = await publicSkillTree({ ids: e.id });
        this.$baseMessage(msg, "success");
      },
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
        this.tableData.data = this.processingData(list);
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
