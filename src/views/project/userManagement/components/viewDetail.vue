<!--
 * @Author: yukang 1172248038@qq.com
 * @Description: 确认汇款订单
 * @Date: 2020-10-30 21:33:18
 * @LastEditTime: 2021-03-22 23:18:11
-->
<template>
  <div>
    <el-dialog
      width="500px"
      title="个人档案详情"
      :close-on-click-modal="false"
      :visible="dialogFormVisible"
      :modal-append-to-body="false"
      append-to-body
      :lock-scroll="false"
      @close="handleClose"
    >
      <div class="detail">
        <profile-header :mode="resume" />
        <profile-block :mode="info" :show-jump="false" title="个人介绍" />
        <profile-block :mode="resume.projects" icon="add-o" title="项目经历" />
        <profile-block :mode="resume.edus" icon="add-o" title="教育经历" />
        <profile-block
          :mode="resume.certs"
          :type="2"
          icon="add-o"
          title="资格证书"
        />
        <profile-block
          :mode="resume.honors"
          :type="2"
          icon="add-o"
          title="获得荣誉"
        />
        <profile-block
          :mode="resume.thesis"
          :type="2"
          icon="add-o"
          title="发布论文"
        />
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { findMyResume } from "@/api/userManagement";
  import profileBlock from "./profile-block";
  import profileHeader from "./profile-header";
  export default {
    components: {
      profileHeader,
      profileBlock,
    },
    props: {
      model: {
        type: Object,
        default: () => {},
      },
    },
    data() {
      return {
        dialogFormVisible: false,
        resume: "",
        info: [],
      };
    },
    methods: {
      handleClose() {
        this.dialogFormVisible = false;
      },
      async showEdit(row) {
        const {
          data: { resume },
        } = await findMyResume({ ope_id: row.id });
        this.resume = resume;
        this.info = [{ intro: resume.summary }];
        this.dialogFormVisible = true;
      },
      submitForm() {
        this.$refs["elForm"].validate(async (valid) => {
          if (valid) {
            const data = this.formData;
            data.id = this.model.id;

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
  ::v-deep {
    .el-dialog__body {
      background-color: #f3f4f6;
      padding: 10px 2px 10px 10px;
    }
  }
  .detail {
    max-height: calc(100vh / 2);
    overflow: auto;
  }
</style>
