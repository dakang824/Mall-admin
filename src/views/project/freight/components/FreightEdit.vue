<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="620px"
    lock-scroll
    @close="close"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="120px">
      <el-form-item label="模板名称" prop="name">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="首重（KG）" prop="baseWeight">
            <el-input
              v-model.number="form.baseWeight"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="首重金额（元）" prop="basePrice">
            <el-input
              v-model.number="form.basePrice"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="续重（KG）" prop="moreWeight">
            <el-input
              v-model.number="form.moreWeight"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="额外金额（元）" prop="morePrice">
            <el-input
              v-model.number="form.morePrice"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="可配送区域" prop="area">
        <el-checkbox
          v-model="checkAll"
          :indeterminate="isIndeterminate"
          @change="handleCheckAllChange"
        >
          全选
        </el-checkbox>
        <el-checkbox-group
          v-model="form.area"
          @change="handleCheckedCitiesChange"
        >
          <el-checkbox
            v-for="item in province"
            :key="item.id"
            :label="item.code"
          >
            {{ item.name }}
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import { addPostTemplateArea, modifyPostTemplate } from "@/api/freight";
  export default {
    name: "FreightEdit",
    props: {
      province: {
        type: Array,
        default: () => [],
      },
    },
    data() {
      return {
        checkAll: false,
        cities: [],
        isIndeterminate: true,
        form: {
          name: "",
          area: [],
          baseWeight: "",
          basePrice: "",
          moreWeight: "",
          morePrice: "",
        },
        rules: {
          name: [
            { required: true, trigger: "blur", message: "请输入模板名称" },
          ],
          basePrice: [
            { required: true, trigger: "blur", message: "请输入首重金额" },
          ],
          baseWeight: [
            { required: true, trigger: "blur", message: "请输入首重" },
          ],
          moreWeight: [
            { required: true, trigger: "blur", message: "请输入额外重量" },
          ],
          morePrice: [
            { required: true, trigger: "blur", message: "请输入额外金额" },
          ],
          area: [
            {
              type: "array",
              required: true,
              message: "请至少选择一个配送区域",
              trigger: "change",
            },
          ],
        },
        title: "",
        dialogFormVisible: false,
      };
    },
    computed: {},
    created() {},
    methods: {
      handleCheckAllChange(val) {
        this.form.area = val ? this.province.map((item) => item.code) : [];
        this.isIndeterminate = false;
      },
      handleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.province.length;
        this.isIndeterminate =
          checkedCount > 0 && checkedCount < this.province.length;
      },
      showEdit(row) {
        if (!row) {
          this.title = "添加运费模板";
        } else {
          this.title = "编辑运费模板";
          var row = JSON.parse(JSON.stringify(row));
          row.area = row.area.split(",");
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
            this.form.area = this.form.area.join();
            if (this.title.includes("添加")) {
              const { msg } = await addPostTemplateArea(this.form);
              this.$baseMessage(msg, "success");
            } else {
              const { msg } = await modifyPostTemplate(this.form);
              this.$baseMessage(msg, "success");
            }
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
