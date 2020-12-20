<!--
 * @Author: yukang 1172248038@qq.com
 * @Description: 确认汇款订单
 * @Date: 2020-10-30 21:33:18
 * @LastEditTime: 2020-12-20 23:16:20
-->
<template>
  <div>
    <el-dialog
      title="填写退款金额"
      :visible="value"
      :modal-append-to-body="false"
      append-to-body
      :lock-scroll="false"
      destroy-on-close
      @close="handleClose"
    >
      <el-form
        ref="elForm"
        :model="formData"
        :rules="rules"
        size="medium"
        label-width="100px"
      >
        <el-form-item label="退款金额" prop="num">
          <el-input
            v-model="formData.num"
            type="number"
            placeholder="请输入退款金额"
            clearable
            :style="{ width: '100%' }"
            :max="money"
            :min="0"
          ></el-input>
        </el-form-item>
      </el-form>
      <div class="dialog-footer">
        <el-button type="primary" @click="submitForm">提交</el-button>
        <!-- <el-button @click="resetForm">重置</el-button> -->
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { orderPost } from "@/api/order/goods";
  export default {
    components: {},
    props: {
      value: {
        type: Boolean,
        default: false,
      },
      money: {
        type: Number,
        default: 0,
      },
    },
    data() {
      return {
        formData: {
          num: 0,
        },
        rules: {
          num: [
            {
              validator: (rule, value, callback) => {
                if (value === "") {
                  callback(new Error("请输入退款金额"));
                } else {
                  if (this.money < value) {
                    callback(new Error("退款金额不能大于付款金额"));
                  }
                  callback();
                }
              },
              trigger: "blur",
            },
          ],
        },
      };
    },
    methods: {
      handleClose() {
        this.$emit("input", false);
      },
      handleInit(e) {
        this.formData.num = e;
      },
      async submitForm() {
        this.$refs["elForm"].validate(async (valid) => {
          if (valid) {
            this.$emit("handleBackMoney", this.formData.num);
            this.resetForm();
            this.handleClose();
          } else {
            return false;
          }
        });
      },
      resetForm() {
        this.$refs["elForm"].resetFields();
      },
    },
  };
</script>

<style lang="scss" scoped>
  .dialog-footer {
    text-align: right;
  }
</style>
