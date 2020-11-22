<template>
  <div>
    <el-form
      ref="form"
      :label-position="labelPosition"
      :model="form"
      :rules="rules"
      :inline="inline"
      label-width="120px">
      <el-form-item
        v-for="(item, index) in config"
        :key="index"
        :label="item.label"
        :prop="item.value"
        v-show="item.show"
      >
        <div v-if="item.type === 'text'">{{ form[item.value] }}</div>
        <!--动态组件-->
        <component
          :class="item.className ? item.className : ''"
          :multiple="item.multiple ? item.multiple : false"
          :collapseTags="
            item.option
              ? item.option.cascader
                ? item.option.cascader.collapseTags
                : false
              : false
          "
          @change="selectChange(item.option.selectOnChange)"
          :style="{ width: item.width ? item.width + 'px' : '' }"
          :placeholder="item.option.placeholder"
          :disabled="item.option.disabled"
          :type="item.option.type"
          :model="form[item.value]"
          :is="components[index].tag"
          :filterable="
            item.option.cascader ? item.option.cascader.filterable : false
          "
          :clearable="
            item.option.cascader ? item.option.cascader.clearable : false
          "
          :props="item.option.cascader ? item.option.cascader.props : {}"
          :options="item.option.cascader ? item.option.cascader.data : []"
          :format="item.option.format"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
        >
          <div v-if="item.option.data">
            <component
              v-for="option in item.option.data"
              :key="option.value"
              :is="
                `el-${
                  item.type === 'select'
                    ? 'option'
                    : item.option.type === 'button'
                    ? 'radio-button'
                    : components[index].type
                }`
              "
              :label="item.type === 'select' ? option.label : option.value"
              :value="option.value"
              :disabled="option.disabled"
              >{{ option.label }}
            </component>
          </div>
        </component>
      </el-form-item>
      <slot name="button"></slot>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "BaseForm",
  computed: {
    components() {
      const component = {
        input: "el-input",
        textarea: "el-input",
        button: "el-button",
        select: "el-select",
        date: "el-date-picker",
        switch: "el-switch",
        checkbox: "el-checkbox-group",
        radio: "el-radio-group",
        // radiobutton: 'el-radio-button',
        cascader: "el-cascader",
      };
      const config = this.config;
      const componentName = config.map((item) => item.type);
      let components = componentName.map((item) => {
        return {
          type: item, // 传递的值
          tag: component[item], // 实际标签的名
        };
      });
      return components;
    },
  },
  props: {
    // 表单数据对象
    form: {
      type: Object,
      required: true,
    },
    // 表单配置信息
    config: {
      type: Array,
      required: true,
    },
    labelWidth: {
      type: String,
      default: "90px",
    },
    // 行内表单模式
    inline: {
      type: Boolean,
      default: false,
    },
    rules: {
      type: Object,
      default: () => {},
    },
    labelPosition: {
      type: String,
      default: "right",
    },
  },
  methods: {
    selectChange(funcName) {
      if (funcName !== undefined) {
        this.$parent.$parent[funcName]();
      }
    },
    btnClick(funcName) {
      this.$parent.$parent[funcName]();
    },
  },
};
</script>
<style lang="scss" scoped>
.a-form--inline {
  .a-form-item {
    margin-right: 20px;
  }
}
</style>
