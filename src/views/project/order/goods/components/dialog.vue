<!--
 * @Author: yukang 1172248038@qq.com
 * @Description: 确认汇款订单
 * @Date: 2020-10-30 21:33:18
 * @LastEditTime: 2020-11-22 12:28:05
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
        label-width="100px"
      >
        <el-form-item label="物流公司" prop="post_courier">
          <el-input
            v-model="formData.post_courier"
            placeholder="请输入物流公司名称"
            clearable
            :style="{ width: '100%' }"
          ></el-input>
        </el-form-item>
        <el-form-item label="单号" prop="post_track">
          <el-input
            v-model="formData.post_track"
            type="textarea"
            placeholder='请填写物流单号,多个单号以" ,"隔开'
            :autosize="{ minRows: 4, maxRows: 4 }"
            :style="{ width: '100%' }"
          ></el-input>
        </el-form-item>
      </el-form>
      <div class="dialog-footer">
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button @click="resetForm">重置</el-button>
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
      model: {
        type: Object,
        default: () => {},
      },
    },
    data() {
      return {
        formData: {
          post_courier: "",
          post_track: undefined,
        },
        rules: {
          post_courier: [
            {
              required: true,
              message: "请输入物流公司名称",
              trigger: "blur",
            },
          ],
          post_track: [
            {
              required: true,
              message: '请填写物流单号,多个单号以","隔开',
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
      async submitForm() {
        this.$refs["elForm"].validate(async (valid) => {
          if (valid) {
            const data = JSON.parse(JSON.stringify(this.formData));
            data.id = this.model.id;
            const { msg } = await orderPost(data);
            this.$baseMessage(msg, "success");
            this.$emit("change", data);
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
