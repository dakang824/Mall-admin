<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="用户名称" prop="userName">
        <el-input v-model.trim="form.userName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="账号" prop="account">
        <el-input v-model.trim="form.account" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model.trim="form.mobile" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model.trim="form.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="角色" prop="role">
        <el-select v-model="form.role">
          <el-option
            v-for="item in roleOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态" prop="state">
        <el-select v-model="form.state">
          <el-option
            v-for="item in statusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import { doEdit } from "@/api/userManagement";

  export default {
    name: "UserManagementEdit",
    data() {
      return {
        statusOptions: [
          {
            value: "启用",
            label: "启用",
          },
          {
            value: "禁用",
            label: "禁用",
          },
        ],
        roleOptions: [
          {
            value: "餐厅",
            label: "餐厅",
          },
          {
            value: "加盟商",
            label: "加盟商",
          },
          {
            value: "城市合伙人",
            label: "餐城市合伙人",
          },
        ],
        form: {
          userName: "",
          password: "",
          email: "",
          permissions: [],
        },
        rules: {
          userName: [
            { required: true, trigger: "blur", message: "请输入用户名" },
          ],
          password: [{ trigger: "blur", message: "请输入密码" }],
          email: [{ required: true, trigger: "blur", message: "请输入邮箱" }],
          permissions: [
            { required: true, trigger: "blur", message: "请选择权限" },
          ],
        },
        title: "",
        dialogFormVisible: false,
      };
    },
    created() {},
    methods: {
      showEdit(row) {
        if (!row) {
          this.title = "添加";
        } else {
          this.title = "编辑";
          this.form = Object.assign({}, row);
        }
        this.dialogFormVisible = true;
      },
      close() {
        this.$refs["form"].resetFields();
        this.form = this.$options.data().form;
        this.dialogFormVisible = false;
      },
      save() {
        this.$refs["form"].validate(async (valid) => {
          if (valid) {
            const { msg } = await doEdit(this.form);
            this.$baseMessage(msg, "success");
            this.$emit("fetchData");
            this.close();
          } else {
            return false;
          }
        });
      },
    },
  };
</script>
