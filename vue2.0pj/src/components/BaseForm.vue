<template>
  <el-form class="v-a-t" ref='form' :label-position="labelPosition" :model='form' :rules='rules' :inline='inline'
           :label-width='labelWidth === "auto" ? null : labelWidth + "px"'>
    <el-form-item
      v-for='(item, index) in config'
      :key='index'
      :label='item.label'
      :prop='item.value'
      v-if='item.show'
    >
      <div v-if='item.type==="text"'>{{ form[item.value] }}</div>
      <div v-if="item.type==='BaseTimeRange'">
        <base-time-range
          :isDefault="2"
          :config="item.option.plugin.config"
          :time-format="item.option.plugin.formatStr"
          @change="pluginChange($event, item.option.plugin.func.change)"
        >
        </base-time-range>
      </div> 
      <!--动态组件-->
      <component
        :class="item.className ? item.className : ''"
        :multiple="item.multiple || false"
        @change="change(arguments, item.option ? item.option.func ? item.option.func.change : '' : '', item.option.func ? item.option.func.param ? item.option.func.param : '' : '')"
        :style="{width:item.width ? item.width+'px' : ''}"
        :placeholder="item.option.placeholder"
        :disabled="item.option.disabled"
        :type="item.option.type"
        v-model="form[item.value]"
        :is='components[index].tag'
        :filterable="item.option.cascader ? item.option.cascader.filterable : false"
        :clearable="item.option.cascader ? item.option.cascader.clearable : false"
        :collapseTags="item.option.cascader ? item.option.cascader.collapseTags : false"
        :props="item.option.cascader ? item.option.cascader.props : {}"
        :options="item.option.cascader ? item.option.cascader.data : []"
        :format="item.option.format"
        :value-format="item.option.valueFormat"
        :is-range="item.option.isRange || false"
        range-separator="至"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
        :picker-options="item.option.pickerOptions"
      >
        <div v-if="item.option.data">
          <component
            v-for="option in item.option.data"
            :key="option.value"
            :is="`el-${item.type === 'select' ? 'option' : item.option.type === 'button' ? 'radio-button' : components[index].type}`"
            :label="item.type === 'select' ? item.option.bind ? option[item.option.bind.label] : option.label : option.value"
            :value="item.option.bind ? option[item.option.bind.value] : option.value"
            :disabled="option.disabled"
          >{{ item.option.bind ? option[item.option.bind.label] :option.label }}
          </component>
        </div>
      </component>
    </el-form-item>
    <slot name="button"></slot>
  </el-form>
</template>

<script>
import BaseTimeRange from '@/components/BaseTimeRange'
export default {
  name: 'BaseForm',
  computed: {
    components () {
      const component = {
        input: 'el-input',
        textarea: 'el-input',
        button: 'el-button',
        select: 'el-select',
        date: 'el-date-picker',
        time: 'el-time-picker',
        datetimerange: 'el-date-picker',
        switch: 'el-switch',
        checkbox: 'el-checkbox-group',
        radio: 'el-radio-group',
        // radiobutton: 'el-radio-button',
        cascader: 'el-cascader'
      }
      const config = this.config
      const componentName = config.map(item => item.type)
      let components = componentName.map(item => {
        return {
          type: item, // 传递的值
          tag: component[item] // 实际标签的名
        }
      })
      return components
    }
  },
  props: {
    // 表单数据对象
    form: {
      type: Object,
      required: true
    },
    // 表单配置信息
    config: {
      type: Array,
      required: true
    },
    labelWidth: {
      type: Number,
      default: 90
    },
    // 行内表单模式
    inline: {
      type: Boolean,
      default: false
    },
    rules: {
      type: Object,
      default: () => {
      }
    },
    labelPosition: {
      type: String,
      default: 'right'
    }
  },
  watch: {
    form: {
      deep: true,
      handler: function (newVal, oldVal) {
        this.form = newVal
      }
    },
    config: {
      deep: true,
      handler: function (newVal, oldVal) {
        this.config = newVal
      }
    }
  },
  components: {BaseTimeRange},
  methods: {
    change (data, funcName = '', param) {
      if (funcName !== '') {
        if (param !== '') {
          data.length === 1 ? this.$parent[funcName](data[0], param) : this.$parent[funcName](data, param)
        } else {
          data.length === 1 ? this.$parent[funcName](data[0]) : this.$parent[funcName](data)
        }
      }
    },
    btnClick (funcName) {
      this.$parent[funcName]()
    },
    pluginChange (data, funcName = '') {
      if (funcName !== '') {
        data.length === 1 ? this.$parent[funcName](data[0]) : this.$parent[funcName](data)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .el-form--inline{
    .el-form-item{
      margin-right: 20px;
    }
  }
</style>
