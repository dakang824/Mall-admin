<!--
 * @Author: yukang 1172248038@qq.com
 * @Description: 确认汇款订单
 * @Date: 2020-10-30 21:33:18
 * @LastEditTime: 2021-03-22 21:30:44
-->
<template>
  <div>
    <el-dialog
      width="500px"
      title="文章详情"
      :close-on-click-modal="false"
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
          >
            {{ item.path }}
            <div slot="placeholder" class="image-slot">
              拼命加载中
              <span class="loader-15"></span>
            </div>
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
  .image-slot {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    text-align: center;
    color: rgba(47, 150, 136, 0.5);
    padding: 1em;
    margin-bottom: 0.25em;
    -webkit-transition: 0.3s color, 0.3s border;
    transition: 0.3s color, 0.3s border;

    .loader-15 {
      background: currentcolor;
      position: relative;
      -webkit-animation: loader-15 1s ease-in-out infinite;
      animation: loader-15 1s ease-in-out infinite;
      -webkit-animation-delay: 0.4s;
      animation-delay: 0.4s;
      width: 0.25em;
      height: 0.5em;
      margin-left: 10px;
    }
    .loader-15:after,
    .loader-15:before {
      content: "";
      position: absolute;
      width: inherit;
      height: inherit;
      background: inherit;
      -webkit-animation: inherit;
      animation: inherit;
    }
    .loader-15:before {
      right: 0.5em;
      -webkit-animation-delay: 0.2s;
      animation-delay: 0.2s;
    }
    .loader-15:after {
      left: 0.5em;
      -webkit-animation-delay: 0.6s;
      animation-delay: 0.6s;
    }
    @-webkit-keyframes loader-15 {
      0%,
      100% {
        box-shadow: 0 0 0 currentcolor, 0 0 0 currentcolor;
      }
      50% {
        box-shadow: 0 -0.25em 0 currentcolor, 0 0.25em 0 currentcolor;
      }
    }
    @keyframes loader-15 {
      0%,
      100% {
        box-shadow: 0 0 0 currentcolor, 0 0 0 currentcolor;
      }
      50% {
        box-shadow: 0 -0.25em 0 currentcolor, 0 0.25em 0 currentcolor;
      }
    }
  }
  [class*="loader-"] {
    display: inline-block;
    width: 1em;
    height: 1em;
    color: inherit;
    vertical-align: middle;
    pointer-events: none;
  }
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
      width: 100%;
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
