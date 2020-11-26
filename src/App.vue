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
