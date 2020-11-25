<!--
 * @Author: yukang 1172248038@qq.com
 * @Description: 
 * @Date: 2020-11-25 20:52:46
 * @LastEditTime: 2020-11-25 20:56:37
-->
<template>
  <div id="vue-admin-beautiful">
    <router-view />
  </div>
</template>

<script>
  export default {
    name: "App",
    mounted() {},
  };
</script>

<style lang="scss" scoped>
  ::v-deep .el-table__fixed-right {
    height: 100% !important;
  }
</style>
