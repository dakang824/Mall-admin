<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="dialogFormVisible"
      width="500px"
      @close="close"
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item prop="id" label="分类名称">
          <el-input v-model="form.type" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="id" label="排序">
          <el-input v-model="form.id" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="id" label="小分类">
          <div class="row">
            <el-select v-model="form.child" multiple placeholder="请选择小分类">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </el-form-item>
        <el-tag
          v-for="(tag, index) in copyOptions"
          :key="tag.value"
          class="tag"
          closable
          :disable-transitions="false"
          @close="handleDelTag(index)"
        >
          {{ tag.value }}
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
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { doEdit } from "@/api/category";

  export default {
    name: "CategoryEdit",
    data() {
      return {
        inputValue: "",
        inputVisible: false,
        copyOptions: [],
        options: [
          {
            value: "叶菜类",
            label: "叶菜类",
          },
          {
            value: "西红柿/茄果类",
            label: "西红柿/茄果类",
          },
          {
            value: "花菜/球茎类",
            label: "花菜/球茎类",
          },
          {
            value: "土豆/根茎类",
            label: "土豆/根茎类",
          },
          {
            value: "菌菇类",
            label: "菌菇类",
          },
          {
            value: "豆类/芽苗类",
            label: "豆类/芽苗类",
          },
          {
            value: "葱姜蒜椒",
            label: "葱姜蒜椒",
          },
          {
            value: "豆制品",
            label: "豆制品",
          },
        ],
        form: {
          id: "",
        },
        rules: {
          id: [{ required: true, trigger: "blur", message: "请输入id" }],
        },
        title: "",
        dialogFormVisible: false,
      };
    },
    created() {
      this.copyOptions = JSON.parse(JSON.stringify(this.options));
    },
    methods: {
      handleDelTag(e) {
        this.copyOptions.splice(e, 1);
      },
      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          const isRepeat = this.copyOptions.some((item) => {
            return item.value === inputValue;
          });
          if (isRepeat) {
            this.$message({
              message: "禁止重复添加",
              type: "warning",
            });
          } else {
            this.copyOptions.push({
              value: inputValue,
              label: inputValue,
            });
          }
        }
        this.inputVisible = false;
        this.inputValue = "";
      },
      showInput() {
        this.inputVisible = true;
      },
      showEdit(row) {
        if (!row) {
          this.title = "添加";
        } else {
          this.title = "编辑";
          this.form = Object.assign({}, row);
        }
        this.dialogFormVisible = true;
      },
      close() {
        this.$refs["form"].resetFields();
        this.form = this.$options.data().form;
        this.dialogFormVisible = false;
      },
      save() {
        this.$refs["form"].validate(async (valid) => {
          if (valid) {
            const { msg } = await doEdit(this.form);
            this.$baseMessage(msg, "success");
            this.$emit("fetchData");
            this.close();
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

  .tag {
    margin-right: 10px;
    margin-bottom: 10px;
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
