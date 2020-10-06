<!--
 * @Author: yukang 1172248038@qq.com
 * @Description: 
 * @Date: 2020-10-03 11:00:21
 * @LastEditTime: 2020-10-06 17:03:03
-->
<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="排序" prop="pos">
        <el-input v-model="form.pos" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="产地" prop="address">
        <el-input v-model="form.address" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import { addProdAddress, modifyProdAddress } from "@/api/produce";

  export default {
    name: "ProduceEdit",
    data() {
      return {
        form: {
          id: "",
        },
        rules: {
          pos: [{ required: true, trigger: "blur", message: "请输入排序" }],
          address: [{ required: true, trigger: "blur", message: "请输入产地" }],
        },
        title: "",
        dialogFormVisible: false,
      };
    },
    created() {},
    methods: {
      showEdit(row) {
        if (!row) {
          this.title = "添加产地";
        } else {
          this.title = "编辑产地";
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
            if (this.title.includes("添加")) {
              const { msg } = await addProdAddress(this.form);
              this.$baseMessage(msg, "success");
            } else {
              const { msg } = await modifyProdAddress(this.form);
              this.$baseMessage(msg, "success");
            }
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
