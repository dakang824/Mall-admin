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
          <el-button type="primary" @click="handleAddArea">添加</el-button>
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
        <el-table-column prop="name" label="可配送区域" align="center">
          <template v-slot="scope">
            {{ scope.row.area | getName(province) }}
          </template>
        </el-table-column>
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
            <el-button
              type="danger"
              @click="handleDelete(scope.row, scope.$index)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
    <div slot="footer" class="dialog-footer" style="text-align: center">
      <el-button type="primary" @click="save">确 定</el-button>
      <el-button @click="close">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {
    addPostTemplate,
    addPostTemplateArea,
    deletePostTemplateArea,
    modifyPostTemplate,
  } from "@/api/freight";
  import { decode } from "@/utils";
  export default {
    name: "FreightEdit",
    filters: {
      getName(val, code) {
        return decode(val, code, "code");
      },
    },
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
      handleAddArea() {
        this.$refs["form"].validate(async (valid) => {
          if (valid) {
            const form = JSON.parse(JSON.stringify(this.form));
            form.area = form.area.reduce((a, b) => a + b);
            form.name = decode(form.area, this.province, "code");
            this.postTempArea.push(form);
            this.form = {
              ...this.form,
              area: [],
              baseWeight: "",
              basePrice: "",
              moreWeight: "",
              morePrice: "",
            };
          } else {
            return false;
          }
        });
      },
      handleDelete(e, index) {
        if (e.temp_id) {
          this.$baseConfirm("你确定要删除当前项吗", null, async () => {
            const { msg } = await deletePostTemplateArea({ ids: e.id });
            this.$baseMessage(msg, "success");
            this.postTempArea.splice(index, 1);
            this.$emit("fetchData");
          });
        } else {
          this.postTempArea.splice(index, 1);
        }
      },
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
          this.postTempArea = [];
          this.title = "添加运费模板";
        } else {
          this.title = "编辑运费模板";
          var row = JSON.parse(JSON.stringify(row));
          this.postTempArea = row.areas;
          this.form = { ...this.form, ...row };
        }
        this.dialogFormVisible = true;
      },
      close() {
        this.$refs["form"].resetFields();
        this.form = this.$options.data().form;
        this.dialogFormVisible = false;
      },
      async save() {
        if (this.title.includes("添加")) {
          const {
            data: {
              postTemp: { id },
            },
          } = await addPostTemplate({ name: this.form.name });

          await this.postTempArea.map(async (item) => {
            item.temp_id = id;
            await addPostTemplateArea(item);
          });

          this.$emit("fetchData");
          this.close();
        } else {
          await modifyPostTemplate({
            name: this.form.name,
            id: this.form.id,
          });
          const arr = this.postTempArea
            .filter((item) => item.temp_id === "")
            .map((item) => {
              item.temp_id = this.form.id;
              return item;
            });
          await arr.map(async (item) => {
            await addPostTemplateArea(item);
          });
          this.$emit("fetchData");
          this.close();
        }
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
