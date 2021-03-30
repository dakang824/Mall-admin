<!--
 * @Author: yukang 1172248038@qq.com
 * @Description: 编辑用户信息表单
 * @Date: 2020-12-06 18:40:37
 * @LastEditTime: 2021-03-30 22:29:01
-->
<template>
  <ele-form-dialog
    v-model="formData"
    label-position="left"
    :form-desc="formDesc"
    :rules="rules"
    :visible.sync="dialogFormVisible"
    :title="title"
    width="620px"
    :request-fn="handleSubmit"
    @closed="handleClosed"
  ></ele-form-dialog>
</template>

<script>
  import {
    addProfGroup,
    modifyProfGroup,
    addProfToGroup,
    deleteProfFromGroup,
  } from "@/api/group";
  export default {
    props: {
      options: { type: Object, default: () => {} },
    },
    data() {
      return {
        title: "添加",
        dialogFormVisible: false,
        formData: {},
        formDesc: {},
        rules: {
          name: { required: true, message: "专业名称必填" },
          prof_ids: { required: true, message: "所属专业必选" },
        },
        prof_ids: [],
      };
    },
    methods: {
      showEdit(row) {
        if (!row) {
          this.title = "添加专业";
        } else {
          this.title = "编辑专业";
          row.role = row.roles;
          this.prof_ids = row.prof_ids || [];
          this.formData = JSON.parse(JSON.stringify(row));
        }
        this.formDesc = this.options.formDesc;
        this.dialogFormVisible = true;
      },
      handleClosed() {
        this.formData = {};
      },

      async handleSubmit(data) {
        const formData = JSON.parse(JSON.stringify(this.formData));
        formData.prof_ids = formData.prof_ids.join();
        if (this.title.includes("添加")) {
          const {
            data: { profGroup },
          } = await addProfGroup(formData);
          const { group_id } = profGroup.itemList[0];
          profGroup.prof_ids = formData.prof_ids.split(",").map(Number);
          // profGroup.itemList.map(async (item) => {
          //   const {
          //     msg,
          //     data: { profGroupItem },
          //   } = await addProfToGroup({
          //     group_id: item.group_id,
          //     prof_id: item.prof_id,
          //   });
          //   this.$baseMessage(msg, "success");
          // });

          this.$emit("add", profGroup);
        } else {
          const {
            msg,
            data: { profGroup },
          } = await modifyProfGroup(formData);

          const first = this.prof_ids;
          const second = formData.prof_ids.split(",").map(Number);

          const newAddData = second.filter((x) =>
            first.length ? !first.includes(x) : true
          );

          await newAddData.map(async (x) => {
            const {
              msg,
              data: { profGroupItem },
            } = await addProfToGroup({
              group_id: formData.id || formData.itemList[0].group_id,
              prof_id: x,
            });
          });

          const delAddData = first.filter((x) => !second.includes(x));

          await delAddData.map(async (x) => {
            await deleteProfFromGroup({
              id: formData.itemList.find((item) => item.prof_id === x).id,
            });
          });

          this.$baseMessage(msg, "success");
          this.$emit("fetchData", false);
        }

        // 更新全局缓存专业组数据
        await this.$store.dispatch("globalRequest/findAllProfGroup");

        // 关闭弹窗
        this.dialogFormVisible = false;
        // 重置formData
        this.formData = {};
      },
    },
  };
</script>

<style lang="scss" scoped>
  ::v-deep {
    .el-dialog {
      .ele-form-btns {
        text-align: right;
      }
      .el-dialog__body {
        padding: 20px 20px 5px;
      }
    }
  }
</style>
