<template>
  <div class="profile-block">
    <div class="profile-block__title u-flex u-row-between van-hairline--bottom">
      <div>{{ title }}</div>
    </div>
    <div v-if="type === 1">
      <div v-for="(item, index) in mode" :key="index">
        <div v-if="showJump" class="profile-block__cell">
          <div class="u-flex u-row-between">
            <div class="profile-block__cell__title">{{ item.name }}</div>
          </div>
          <div class="profile-block__cell__tag">
            <span>
              {{ item.start_time | slice(0, 10) }} -
              {{ item.end_time | slice(0, 10) }}
            </span>
            <span>{{ item.roles }}</span>
          </div>
        </div>

        <div class="profile-block__info">
          <span space="emsp" decode>{{ item.intro }}</span>
          <div v-if="item.perfor">
            <span space="emsp" decode>{{ item.perfor }}</span>
          </div>
        </div>
      </div>
    </div>

    <div v-if="type === 2">
      <div v-for="(item, index) in mode" :key="index">
        <div v-if="showJump" class="profile-block__cell">
          <div class="u-flex u-row-between">
            <div class="profile-block__cell__title">
              <span v-if="item.time">{{ item.time | slice(0, 10) }}</span>
              {{ item.name }}
            </div>
          </div>
        </div>
        <div class="profile-block__info">
          <el-image
            width="100%"
            height="333rpx"
            :src="item.pic_path | imgBaseUrl"
            bind:click="handlePredivImage"
          ></el-image>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    components: {},
    props: {
      mode: {
        type: Array,
        default: () => [],
      },
      showJump: {
        type: Boolean,
        default: true,
      },
      icon: {
        type: String,
        default: "edit",
      },
      type: {
        type: Number,
        default: 1,
      },
      title: {
        type: String,
        default: "",
      },
    },
    data() {
      return {};
    },
  };
</script>

<style lang="scss" scoped>
  .van-hairline--bottom {
    border-bottom: 1px solid #ebedf0;
  }
  .u-flex {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .u-row-between {
    -webkit-box-pack: justify;
    -webkit-justify-content: space-between;
    justify-content: space-between;
  }
  .profile-block {
    background-color: #fff;
    margin-top: 10px;
    &__title {
      font-size: 15px;
      font-weight: bold;
      padding: 15px;
    }
    &__cell {
      padding: 15px;
      padding-bottom: 0;
      &__title {
        font-size: 14px;
        font-weight: bold;
        text {
          margin-right: 10px;
        }
      }
      &__tag {
        font-size: 12px;
        color: #a5a5a5;
        margin-top: 10px;
        text {
          padding-right: 20px;
        }
      }
    }
    &__info {
      font-size: 12px;
      color: #888;
      padding: 15px;
    }
  }
</style>
