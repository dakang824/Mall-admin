<!--
 * @Author: yukang 1172248038@qq.com
 * @Description: 
 * @Date: 2020-12-19 12:57:50
 * @LastEditTime: 2020-12-24 22:01:54
-->
<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="115px">
      <el-form-item label="审核结果" prop="audit_result">
        <el-select v-model="form.audit_result" clearable style="width: 100%">
          <el-option
            v-for="item in typeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
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
  import { auditStoreCashApply } from "@/api/audit";

  export default {
    name: "Edit",
    data() {
      return {
        form: {
          common: "",
          audit_result: "",
        },
        rules: {
          audit_result: {
            required: true,
            trigger: "blur",
            message: "请选择提现结果",
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
          this.title = "审核";
          var row = JSON.parse(JSON.stringify(row));
          this.form = { ...row, ...this.form };
        }
        this.dialogFormVisible = true;
      },
      async save() {
        this.$refs["form"].validate(async (valid) => {
          if (valid) {
            const { msg } = await auditStoreCashApply({
              ...this.form,
              operator: this.$store.state.user.username,
            });
            this.$emit("fetchData", false);
            this.$baseMessage(msg, "success");
            this.close();
          } else {
            return false;
          }
        });
      },
    },
  };
</script>
