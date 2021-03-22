<template>
  <div class="profile-header u-flex">
    <div class="profile-header__image">
      <el-image :src="mode.icon | imgBaseUrl" fit="cover" />
    </div>
    <div class="profile-header__info">
      <div class="profile-header__info__name">{{ mode.name }}</div>
      <div class="profile-header__info__job">
        <span>{{ mode.department }}</span>
        <span>{{ mode.position }}</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    components: {},
    props: {
      mode: {
        type: Object,
        default: () => {},
      },
    },
    data() {
      return {};
    },
  };
</script>

<style lang="scss" scoped>
  .u-flex {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .profile-header {
    background-color: #fff;
    padding: 20px;
    &__image {
      .el-image {
        width: 60px;
        height: 60px;
        border-radius: 50px;
      }
    }
    &__info {
      margin-left: 20px;
      &__name {
        font-size: 16px;
        font-weight: bold;
      }
      &__job {
        font-size: 13px;
        color: #555;
        margin-top: 15px;
        text {
          padding-right: 15px;
        }
      }
    }
  }
</style>
