<!--
 * @Author: yukang 1172248038@qq.com
 * @Description: 
 * @Date: 2020-12-19 12:57:50
 * @LastEditTime: 2020-12-24 21:22:05
-->
<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="115px">
      <el-form-item label="充值金额" prop="amount">
        <el-input v-model.number="form.amount"></el-input>
      </el-form-item>
      <el-form-item label="提现类型" prop="type">
        <el-select v-model="form.type" clearable style="width: 100%">
          <el-option
            v-for="item in typeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用户账户" prop="user_account">
        <el-input v-model="form.user_account"></el-input>
      </el-form-item>
      <el-form-item label="开户行" prop="bank_name">
        <el-input v-model="form.bank_name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="银行账户" prop="bank_account">
        <el-input v-model="form.bank_account" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="	银行账户姓名" prop="bank_acc_name">
        <el-input v-model="form.bank_acc_name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="form.common" type="textarea"></el-input>
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
  import { addStoreCashApply } from "@/api/audit";

  export default {
    name: "Edit",
    data() {
      return {
        form: {
          amount: 0,
        },
        rules: {
          amount: [
            { required: true, trigger: "blur", message: "请输入充值金额" },
            { type: "number", trigger: "blur", message: "金额必须为数字值" },
          ],
          type: { required: true, trigger: "blur", message: "请选择提现类型" },
          user_account: {
            required: true,
            trigger: "blur",
            message: "请输入用户账户",
          },
          bank_name: {
            required: true,
            trigger: "blur",
            message: "请输入开户行",
          },
          bank_account: {
            required: true,
            trigger: "blur",
            message: "请输入银行账户",
          },
          bank_acc_name: {
            required: true,
            trigger: "blur",
            message: "请输入银行姓名",
          },
        },
        title: "充值",
        dialogFormVisible: false,
        typeOptions: [
          {
            value: 1,
            label: "提现到账户",
          },
          {
            value: 2,
            label: "提现到银行卡",
          },
        ],
      };
    },
    computed: {
      ...mapState({
        admin_info: (state) => state.user.admin_info,
      }),
    },
    created() {},
    methods: {
      close() {
        this.$refs["form"].resetFields();
        this.form = this.$options.data().form;
        this.dialogFormVisible = false;
      },
      showEdit(row) {
        if (!row) {
          this.title = "添加提现申请";
        } else {
          this.title = "编辑提现申请";
          var row = JSON.parse(JSON.stringify(row));
          this.form = { ...this.form, ...row };
        }
        this.dialogFormVisible = true;
      },
      async save() {
        if (this.title.includes("添加")) {
          const {
            msg,
            data: { cashApply },
          } = await addStoreCashApply(this.form);
          // this.$emit("fetchData", false);
          this.$baseMessage(msg, "success");
          this.$emit("add", cashApply);
          this.close();
        } else {
          // const {
          //   msg,
          //   data: { category },
          // } = await modifyCategory(this.form);
          // this.$baseMessage(msg, "success");
          // this.$emit("update", category);
          // this.close();
        }
      },
    },
  };
</script>
