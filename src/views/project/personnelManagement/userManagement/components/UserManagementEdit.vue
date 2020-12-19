<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="用户名称" prop="name">
        <el-input v-model.trim="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="账号" prop="account">
        <el-input v-model.trim="form.account" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model.number="form.mobile" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pwd">
        <el-input
          v-model.number="form.pwd"
          autocomplete="off"
          type="password"
          :maxlength="8"
        ></el-input>
      </el-form-item>
      <el-form-item label="角色" prop="roles">
        <el-select v-model="form.roles" style="width: 100%" multiple>
          <el-option
            v-for="item in roles"
            :key="item.id"
            :label="item.name"
            :value="item.no"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="form.status" style="width: 100%">
          <el-option
            v-for="item in status"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="绑定城合店铺" prop="status">
        <addTag
          v-if="show"
          :vals="form.storesArr"
          verify
          txt="添加绑定"
          @enter="handleEnter"
          @delect="handleDelete"
        />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {
    addUser,
    doEdit,
    modifyUser,
    addUserStore,
    deleteUserStore,
    checkUserStoreAccount,
  } from "@/api/userManagement";
  import { isEmail } from "@/utils/validate";
  import addTag from "@/components/addTag";
  export default {
    name: "UserManagementEdit",
    components: { addTag },
    props: {
      roles: {
        type: Array,
        default: () => {
          return [];
        },
      },
      status: {
        type: Array,
        default: () => {
          return [];
        },
      },
    },
    data() {
      return {
        form: {
          name: "",
          mobile: "",
          account: "",
          pwd: "",
          roles: "",
          status: [],
          stores: [],
          storesArr: [],
        },
        show: 0,
        oldPwd: "",
        rules: {
          name: [{ required: true, trigger: "blur", message: "请输入用户名" }],
          account: [{ required: true, trigger: "blur", message: "请输入账号" }],
          mobile: [
            { required: true, trigger: "blur", message: "请输入手机号" },
            {
              pattern: /^1(3|4|5|7|8|9)\d{9}$/,
              message: "手机号格式错误",
              trigger: "blur",
            },
          ],
          pwd: [{ required: true, trigger: "blur", message: "请输入密码" }],
          roles: [{ required: true, trigger: "blur", message: "请选择角色" }],
        },
        title: "",
        dialogFormVisible: false,
      };
    },
    created() {},
    methods: {
      async handleEnter(account, callback) {
        const {
          data: { check_res, store },
        } = await checkUserStoreAccount({ account });
        if (store === null) {
          this.$baseMessage(check_res, "error");
        } else {
          await addUserStore({
            store_id: store.id,
            ignoreStoreId: true,
            user_id: this.form.id,
          });
        }
        callback(store !== null);
      },
      async handleDelete(e) {
        await deleteUserStore({ id: e.id, user_id: this.form.id });
      },
      showEdit(row) {
        this.show = true;
        if (!row) {
          this.title = "添加";
          this.form.status = 1;
        } else {
          this.title = "编辑";
          var row = JSON.parse(JSON.stringify(row));
          row.storesArr =
            row.userStores.map((item) => {
              return {
                name: item.store.account,
                id: item.id,
              };
            }) || [];
          row.roles = this.roles
            .map((item) => {
              if ((row.roles & item.no) > 0) {
                return item.no;
              }
            })
            .filter((item) => item !== undefined);
          this.oldPwd = row.pwd;
          this.form = Object.assign({}, row);
        }
        this.dialogFormVisible = true;
      },
      close() {
        this.$refs["form"].resetFields();
        this.form = this.$options.data().form;
        this.show = false;
        this.form.storesArr = [];
        this.dialogFormVisible = false;
      },
      save() {
        this.$refs["form"].validate(async (valid) => {
          if (valid) {
            const form = JSON.parse(JSON.stringify(this.form));
            if (this.oldPwd === form.pwd) {
              delete form.pwd;
            }
            form.roles = form.roles.reduce((a, b) => a + b);
            if (this.title.includes("添加")) {
              const {
                msg,
                data: { user },
              } = await addUser(form);
              this.$baseMessage(msg, "success");
              this.$emit("add", user);
              this.close();
            } else {
              const {
                msg,
                data: { user },
              } = await modifyUser(form);
              this.$baseMessage(msg, "success");
              this.$emit("update", user);
              this.close();
            }
          } else {
            return false;
          }
        });
      },
    },
  };
</script>
