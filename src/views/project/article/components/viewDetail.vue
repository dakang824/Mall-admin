<!--
 * @Author: yukang 1172248038@qq.com
 * @Description: 确认汇款订单
 * @Date: 2020-10-30 21:33:18
 * @LastEditTime: 2021-02-04 17:53:22
-->
<template>
  <div>
    <el-dialog
      width="500px"
      title="文章详情"
      :visible="value"
      :modal-append-to-body="false"
      append-to-body
      :lock-scroll="false"
      @close="handleClose"
    >
      <div class="detail">
        <div class="detail__header van-hairline--bottom">
          <div class="detail__header__txt">{{ model.title }}</div>
          <div class="u-flex u-row-between">
            <div>{{ model.author }}</div>
            <div>{{ model.create_time | slice(0, 10) }}</div>
            <div class="u-flex u-col-center">
              <i class="el-icon-star-off"></i>
              收藏
            </div>
          </div>
        </div>
        <div class="detail__content">
          <el-image
            v-for="(item, index) in model.articleContent"
            :key="index"
            width="100%"
            fit="contain"
            :src="item.path | imgBaseUrl"
            lazy-load
            use-loading-slot
          >
            {{ item.path | imgBaseUrl }}
            <van-loading slot="loading" type="spinner" size="20" vertical />
          </el-image>
        </div>
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
      submitForm() {
        this.$refs["elForm"].validate(async (valid) => {
          if (valid) {
            const data = this.formData;
            data.id = this.model.id;
            const { msg } = await orderPost(data);
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
  .u-flex {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;

    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -webkit-flex-direction: row;
    flex-direction: row;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
  }
  .u-row-between {
    -webkit-box-pack: justify;
    -webkit-justify-content: space-between;
    justify-content: space-between;
  }
  .u-col-center {
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
  }
  .detail {
    max-height: calc(100vh / 2);
    overflow: auto;
    .el-image {
      vertical-align: middle;
    }
    &__header {
      padding: 0 15px;
      font-size: 22rpx;
      color: #999;
      &__txt {
        font-size: 35rpx;
        font-weight: bold;
        color: #333;
        padding-bottom: 15px;
      }
    }
    &__content {
      padding: 12px;
    }
    &__collect {
      margin-right: 10rpx;
    }
    image,
    .van-image {
      vertical-align: middle;
    }
  }
</style>
