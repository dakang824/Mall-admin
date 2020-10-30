<!--
 * @Author: yukang 1172248038@qq.com
 * @Description: 确认汇款订单
 * @Date: 2020-10-30 21:33:18
 * @LastEditTime: 2020-10-30 22:47:49
-->
<template>
  <div>
    <el-dialog
      title="收货地址"
      :visible="value"
      :modal-append-to-body="false"
      append-to-body
      :lock-scroll="false"
      @close="handleClose"
    >
      <el-form
        ref="elForm"
        :model="formData"
        :rules="rules"
        size="medium"
        label-width="120px"
      >
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="formData.status" size="medium">
            <el-radio
              v-for="(item, index) in statusOptions"
              :key="index"
              :label="item.value"
              :disabled="item.disabled"
            >
              {{ item.label }}
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="审核拒绝原因" prop="reasion">
          <el-input
            v-model="formData.reasion"
            type="textarea"
            placeholder="请输入审核拒绝原因"
            :autosize="{ minRows: 4, maxRows: 4 }"
            :style="{ width: '100%' }"
          ></el-input>
        </el-form-item>
        <div class="dialog-footer">
          <el-button type="primary" @click="submitForm">提交</el-button>
          <el-button @click="resetForm">重置</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import { conformRemittance } from "@/api/order/remittance";
  export default {
    components: {},
    props: {
      value: {
        type: Boolean,
        default: false,
      },
      id: {
        type: [String, Number],
        default: 0,
      },
    },
    data() {
      return {
        formData: {
          status: 1,
          reasion: "",
        },
        rules: {
          status: [],
          reasion: [],
        },
        statusOptions: [
          {
            label: "待审核",
            value: 0,
          },
          {
            label: "已审核确认",
            value: 1,
          },
          {
            label: "汇款异常",
            value: 2,
          },
        ],
      };
    },
    methods: {
      handleClose() {
        this.$emit("input", false);
      },
      submitForm() {
        this.$refs["elForm"].validate(async (valid) => {
          if (valid) {
            const data = this.formData;
            data.id = this.id;
            const { msg } = await conformRemittance(data);
            this.$baseMessage(msg, "success");
            this.$emit("change", data.status);
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
