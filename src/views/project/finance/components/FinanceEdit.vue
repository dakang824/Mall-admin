<!--
 * @Author: yukang 1172248038@qq.com
 * @Description: 
 * @Date: 2020-12-19 12:57:50
 * @LastEditTime: 2020-12-26 17:34:30
-->
<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="名称">
        <el-input v-model="form.name" disabled></el-input>
      </el-form-item>
      <el-form-item label="账号">
        <el-input v-model="form.account" disabled></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="form.mobile" disabled></el-input>
      </el-form-item>
      <el-form-item label="账户余额">
        <el-input v-model="form.balance" disabled></el-input>
      </el-form-item>
      <el-form-item label="充值金额" prop="amount">
        <el-input v-model="form.amount" type="number"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import { mapState } from "vuex";
  import { adminRecharge } from "@/api/finance";

  export default {
    name: "FinanceEdit",
    data() {
      return {
        form: {
          amount: 0,
        },
        rules: {
          amount: [
            { required: true, trigger: "blur", message: "请输入充值金额" },
          ],
        },
        title: "充值",
        dialogFormVisible: false,
      };
    },
    computed: {
      ...mapState({
        admin_info: (state) => state.user.admin_info,
      }),
    },
    created() {},
    methods: {
      showEdit(row) {
        this.form = {
          user_id: row.id,
          amount: "",
          admin_id: this.admin_info.id,
          ...row,
        };
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
            this.$confirm(`确认充值${this.form.amount}元吗？`, "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning",
            })
              .then(async () => {
                const { msg } = await adminRecharge(this.form);
                this.$baseMessage(msg, "success");
                this.$emit("fetchData", false);
                this.close();
              })
              .catch(() => {});
          } else {
            return false;
          }
        });
      },
    },
  };
</script>
