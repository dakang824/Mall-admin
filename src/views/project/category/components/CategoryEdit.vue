<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="dialogFormVisible"
      width="500px"
      @close="close"
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item prop="name" label="分类名称">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="pos" label="排序">
          <el-input v-model.number="form.pos" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="subCategory" label="小分类">
          <div class="row">
            <el-tag
              v-for="(tag, index) in form.subCategory"
              :key="tag.name + index + num"
              class="tag"
              closable
              type="success"
              :disable-transitions="false"
              @close="handleDelTag(index)"
            >
              {{ tag.name }}
            </el-tag>
            <el-input
              v-if="inputVisible"
              ref="saveTagInput"
              v-model="inputValue"
              class="input-new-tag"
              size="small"
              @keyup.enter.native="handleInputConfirm"
              @blur="handleInputConfirm"
            ></el-input>
            <el-button
              v-else
              class="button-new-tag"
              size="small"
              @click="showInput"
            >
              + 添加小分类
            </el-button>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {
    modifyCategory,
    deleteSubCategory,
    addSubCategory,
    addCategory,
  } from "@/api/category";

  export default {
    name: "CategoryEdit",
    data() {
      return {
        num: 0,
        inputValue: "",
        inputVisible: false,
        form: {
          subCategory: [],
          name: "",
          pos: "",
        },
        rules: {
          id: [{ required: true, trigger: "blur", message: "请输入id" }],
        },
        title: "",
        dialogFormVisible: false,
      };
    },
    created() {},
    methods: {
      async handleDelTag(e) {
        if (this.form.subCategory[e].id) {
          const { msg } = await deleteSubCategory({
            id: this.form.subCategory[e].id,
          });
          this.$baseMessage(msg, "success");
        }
        this.form.subCategory.splice(e, 1);
        this.num += 1;
      },
      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          const isRepeat = this.form.subCategory.some((item) => {
            return item.value === inputValue;
          });
          if (isRepeat) {
            this.$message({
              message: "禁止重复添加",
              type: "warning",
            });
          } else {
            if (this.form.id) {
              addSubCategory({ cate_id: this.form.id, name: inputValue });
            }
            this.form.subCategory.push({
              value: inputValue,
              name: inputValue,
            });
          }
        }
        this.inputVisible = false;
        this.inputValue = "";
      },
      showInput() {
        this.inputVisible = true;
        this.$nextTick((_) => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },
      showEdit(row) {
        if (!row) {
          this.title = "添加分类";
        } else {
          this.title = "编辑分类";
          this.form = Object.assign({}, row);
          this.form.subCategory = JSON.parse(
            JSON.stringify(this.form.subCategoryList)
          );
          this.$store.dispatch("goods/findSubCategoryByCateId", {
            cate_id: row.id,
          });
        }
        this.dialogFormVisible = true;
      },
      close() {
        this.$refs["form"].resetFields();
        this.form = this.$options.data().form;
        this.dialogFormVisible = false;
      },
      async save() {
        this.$refs["form"].validate(async (valid) => {
          if (valid) {
            if (this.title.includes("添加")) {
              const form = JSON.parse(JSON.stringify(this.form));
              form.subCategory = form.subCategory
                .map((item) => item.name)
                .join();
              const {
                msg,
                data: { category },
              } = await addCategory(form);
              this.$baseMessage(msg, "success");
              this.$emit("add", category);
              this.close();
            } else {
              const {
                msg,
                data: { category },
              } = await modifyCategory(this.form);
              this.$baseMessage(msg, "success");
              this.$emit("update", category);
              this.close();
            }
          } else {
            return false;
          }
        });
      },
    },
  };
</script>
<style lang="scss" scope>
  .el-select {
    width: 100%;
  }

  .el-tag + .el-tag {
    margin-left: 0 !important;
  }

  .tag {
    margin: 0 10px 10px 0;
  }

  .button-new-tag {
    height: 25px;
    padding: 10px;
    padding-top: 0;
    padding-bottom: 0;
    line-height: 25px;
  }

  .input-new-tag {
    width: 80px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>
