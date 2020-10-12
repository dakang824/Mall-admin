<!--
 * @Author: yukang 1172248038@qq.com
 * @Date: 2020-10-08 21:53:12
 * @LastEditTime: 2020-10-12 20:38:21
-->
<template>
  <div class="index-container">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8"></el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8"></el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8"></el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "Index",
    components: {},
    data() {
      return {
        nodeEnv: process.env.NODE_ENV,
      };
    },
    created() {},
    mounted() {},
    methods: {},
  };
</script>

<style lang="scss" scoped>
  .index-container {
    ::v-deep {
      .el-card__body {
        > div {
          min-height: 70vh;
          padding: 20px;

          > ul {
            > li {
              line-height: 30px;
            }
          }

          > img {
            display: block;
            margin: 40px auto;
            border: 1px solid #dedede;
          }
        }
      }
    }
  }
</style>
