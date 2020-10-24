<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="990px"
    lock-scroll
    @close="close"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="120px">
      <el-form-item label="模板名称" prop="name">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
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
      <el-card
        class="box-card"
        shadow="never"
        :body-style="{ padding: '10px' }"
      >
        <div slot="header" class="clearfix" style="text-align: right">
          <el-button type="primary" @click="save">添加</el-button>
        </div>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="首重（KG）" prop="baseWeight">
              <el-input
                v-model.number="form.baseWeight"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="运费（元）" prop="basePrice">
              <el-input
                v-model.number="form.basePrice"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="续重（KG）" prop="moreWeight">
              <el-input
                v-model.number="form.moreWeight"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="额外金额（元）" prop="morePrice">
              <el-input
                v-model.number="form.morePrice"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>

      <el-table :data="postTempArea" stripe style="width: 100%" border>
        <el-table-column prop="name" label="可配送区域" align="center" />
        <el-table-column prop="baseWeight" label="首重（KG）" align="center" />
        <el-table-column prop="basePrice" label="运费（元" align="center" />
        <el-table-column prop="moreWeight" label="续重（KG）" align="center" />
        <el-table-column
          prop="morePrice"
          label="额外金额（元）"
          align="center"
        />
        <el-table-column fixed="right" label="操作" width="80" align="center">
          <template v-slot="scope">
            <el-button type="danger" @click="handleDelete(scope.row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
  </el-dialog>
</template>

<script>
  import {
    addPostTemplate,
    addPostTemplateArea,
    modifyPostTemplate,
  } from "@/api/freight";
  import { decode } from "@/utils";
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
        isIndeterminate: true,
        postTempArea: [],
        form: {
          name: "",
          area: [],
          baseWeight: "",
          basePrice: "",
          moreWeight: "",
          morePrice: "",
          temp_id: "",
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
        this.title = "添加运费模板";
        this.dialogFormVisible = true;
      },
      close() {
        this.$refs["form"].resetFields();
        this.form = this.$options.data().form;
        this.dialogFormVisible = false;
      },
      async save() {
        this.$refs["form"].validate(async (valid) => {
          if (valid) {
            const form = JSON.parse(JSON.stringify(this.form));
            form.area = form.area.reduce((a, b) => a + b);
            if (form.temp_id) {
              const {
                data: { postTempArea },
              } = await addPostTemplateArea(form);
              const name = decode(form.area, this.province, "code");
              this.postTempArea.push({ ...postTempArea, name });
            } else {
              const {
                data: {
                  postTemp: { id },
                },
              } = await addPostTemplate({ name: form.name });
              this.form.temp_id = id;
              form.temp_id = id;
              const {
                data: { postTempArea },
              } = await addPostTemplateArea(form);
              const name = decode(form.area, this.province, "code");
              this.postTempArea.push({ ...postTempArea, name });
            }
            this.form = {
              ...this.form,
              area: [],
              baseWeight: "",
              basePrice: "",
              moreWeight: "",
              morePrice: "",
            };

            // this.form.area = this.form.area.join();
            // if (this.title.includes("添加")) {
            //   const { msg } = await addPostTemplateArea(this.form);
            //   this.$baseMessage(msg, "success");
            // } else {
            //   const { msg } = await modifyPostTemplate(this.form);
            //   this.$baseMessage(msg, "success");
            // }
            this.$emit("fetchData");
          } else {
            return false;
          }
        });
      },
    },
  };
</script>

<style lang="scss" scoped>
  ::v-deep {
    .el-card {
      &__header {
        padding: 10px;
      }
    }
  }
</style>
