<template>
  <div class="page-component">
    <h2>基础表单</h2>
    <h3>可适用于页面的查询部分和表单数据的填写收集</h3>
    <p></p>
    <div class="demo-block demo-zh-CN">
      <div class="source" style="width:500px">
        <base-form :inline="false" :labelWidth="150"  :config="formConfig" :form="form">
          <template slot="button" class="d-i-b">
            <el-button type="default" @click="search">查询</el-button>
          </template>
        </base-form>
      </div>
      <div class="meta" style="height: auto">
        <div class="description">
          <p>所有填写值都存储在 form 对象里,<b style="color: red">注意formConfig 里的数据类型和 form最终存储的数据类型要一致。</b></p>
        </div>
        <div class="highlight">
          <pre>
            <code ref="code" class="html hljs xml"></code>
          </pre>
        </div>
      </div>
    </div>
    <div class="content">
    <h3>Attributes</h3>

    <table>
      <thead>
      <tr>
        <th>参数</th>
        <th>说明</th>
        <th>类型</th>
        <th>可选值</th>
        <th>默认值</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item, index) in tableData1" :key="index">
        <td><span>{{ item.parameter }}</span></td>
        <td><span>{{ item.explain }}</span></td>
        <td><span>{{ item.type || '-' }}</span></td>
        <td><span>{{ item.optionalValue || '-' }}</span></td>
        <td><span>{{ item.defaultValue || '-' }}</span></td>
      </tr>
      </tbody>
    </table>

    <h3>form Attributes</h3>

    <table>
      <thead>
      <tr>
        <th>参数</th>
        <th>说明</th>
        <th>类型</th>
        <th>可选值</th>
        <th>默认值</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item, index) in tableData2" :key="index">
        <td><span>{{ item.parameter }}</span></td>
        <td><span>{{ item.explain }}</span></td>
        <td><span>{{ item.type || '-' }}</span></td>
        <td><span>{{ item.optionalValue || '-' }}</span></td>
        <td><span>{{ item.defaultValue || '-' }}</span></td>
      </tr>
      </tbody>
    </table>

    <h3>form---> option Attributes</h3>

    <table>
      <thead>
      <tr>
        <th>参数</th>
        <th>说明</th>
        <th>类型</th>
        <th>可选值</th>
        <th>默认值</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item, index) in tableData4" :key="index">
        <td><span>{{ item.parameter }}</span></td>
        <td><span>{{ item.explain }}</span></td>
        <td><span>{{ item.type || '-' }}</span></td>
        <td><span>{{ item.optionalValue || '-' }}</span></td>
        <td><span>{{ item.defaultValue || '-' }}</span></td>
      </tr>
      </tbody>
    </table>
    <h3>form---> option--> cascader Attributes</h3>

    <table>
      <thead>
      <tr>
        <th>参数</th>
        <th>说明</th>
        <th>类型</th>
        <th>可选值</th>
        <th>默认值</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item, index) in tableData5" :key="index">
        <td><span>{{ item.parameter }}</span></td>
        <td><span>{{ item.explain }}</span></td>
        <td><span>{{ item.type || '-' }}</span></td>
        <td><span>{{ item.optionalValue || '-' }}</span></td>
        <td><span>{{ item.defaultValue || '-' }}</span></td>
      </tr>
      </tbody>
    </table>
    </div>
  </div>
</template>
<script>
import BaseForm from '@/components/BaseForm'
import hljs from 'highlight.js'

export default {
  name: 'useBaseForm',
  data () {
    return {
      form: {
        projectid: '',
        case: 0,
        areaCode: '130300',
        time: [],
        planTime: [],
        mode: 1,
        summary: '这是汇总的描述信息',
        pol: 'pm25',
        timeType: 0
      },
      formConfig: [
        {
          type: 'select',
          label: '车辆颜色：',
          value: 'case',
          show: true,
          option: {
            disabled: false,
            bind: { // 绑定的option显示的名和值
              value: 'id',
              label: 'name'
            },
            func: {
              param: 1,
              change: 'getCase'
            },
            data: [{
              id: 0,
              name: '红色'
            }, {
              id: 1,
              name: '黄色'
            }, {
              id: 2,
              name: '绿色'
            }, {
              id: 3,
              name: '其他'
            }
            ]
          }
        },
        {
          type: 'cascader',
          label: '区域：',
          value: 'areaCode',
          show: true,
          option: {
            cascader: {
              filterable: true,
              clearable: true,
              props: {
                checkStrictly: true,
                expandTrigger: 'hover',
                emitPath: false
              },
              data: []
            },
            func: {
              param: 1,
              change: 'getAreaCode'
            },
            placeholder: '请选择',
            disabled: false
          }
        },
        {
          type: 'radio',
          label: '时间类型：',
          value: 'timeType',
          show: true,
          option: {
            type: 'button',
            disabled: false,
            data: [
              {
                label: '分钟',
                value: 0 // 此处如果是 '0' 表示字符串 0
              },
              {
                label: '小时',
                value: 1
              },
              {
                label: '日累计',
                value: 2
              }
            ]
          }
        },
        {
          type: 'date',
          label: '',
          value: 'time',
          show: true,
          option: {
            format: 'yyyy-MM-dd',
            valueFormat: 'yyyy-MM-dd',
            type: 'daterange',
            placeholder: '请选择',
            disabled: false,
            pickerOptions: {
              disabledDate (time) {
                // const a = vm.form.planTime[0]
                // const b = vm.form.planTime[1]
                // if (time >= vm.$common.stringToDate(a) && time <= vm.$common.stringToDate(b)) {
                //   return false
                // } else {
                //   return true
                // }
              }
            },
            func: {
              change: 'getTimeValue'
            }
          }
        },
        {
          type: 'text',
          label: '汇总方式：',
          value: 'summary',
          show: true,
          option: {
            placeholder: '请选择',
            disabled: false
          }
        },
        {
          type: 'BaseTimeRange',
          label: '日期选择插件',
          value: 'time',
          show: true,
          option: {
            plugin: {
              config: [
                {
                  id: 1,
                  text: '近一天',
                  unit: 'hours', // 需要按照小时计算，请填写 hours
                  num: 1,
                  retrodictVal: 1, // 结束时间往前推 1 小时,注意此处是整数
                  disable: true
                },
                {
                  id: 2,
                  text: '近三天',
                  unit: 'days',
                  num: 3,
                  retrodictVal: 1,
                  disable: false
                },
                {
                  id: 3,
                  text: '近一周',
                  unit: 'days',
                  num: 7,
                  disable: false
                },
                {
                  id: 4,
                  text: '近一个月',
                  unit: 'months',
                  num: 1,
                  disable: false
                },
                {
                  id: 5,
                  text: '近三个月',
                  unit: 'months',
                  num: 3,
                  disable: false
                },
                {
                  id: 6,
                  text: '近半年',
                  unit: 'months',
                  num: 6,
                  disable: false
                },
                {
                  id: 7,
                  text: '近一年',
                  unit: 'years',
                  num: 1,
                  disable: false
                }
              ],
              formatStr: 'YYYY-MM-DD HH:mm:ss',
              func: {
                change: 'getTimeValue'
              }
            },
            disabled: false
          }
        }
      ],
      tableData1: [
        {
          parameter: 'inline',
          explain: 'true：表单开启一行显示模式   false：开启垂直显示模式',
          type: 'boolean',
          optionalValue: 'true, false',
          defaultValue: 'false'
        },
        {
          parameter: 'config',
          explain: '表单的绑定值和显示内容基本配置',
          type: 'Object',
          optionalValue: '{}',
          defaultValue: '{}'
        },
        {
          parameter: 'form',
          explain: '表单的返回值',
          type: 'Object',
          optionalValue: '{}',
          defaultValue: '{}'
        }
      ],
      tableData2: [
        {
          parameter: 'type',
          explain: '表单的具体对象的类型值',
          type: 'string',
          optionalValue: 'text,input,textarea,button,select,date,switch,checkbox,radio,radiobutton,cascader,BaseTimeRange(月日年选择组件),StationByTypes（站点选择组件）',
          defaultValue: '不可以空串'
        },
        {
          parameter: 'label',
          explain: 'form表单前显示的文字内容',
          type: 'String',
          optionalValue: '',
          defaultValue: ''
        },
        {
          parameter: 'value',
          explain: '绑定的显示值，此值需和定义的form对象里的值保持一致。否则可能获取不到表单的数据。',
          type: 'String',
          optionalValue: '',
          defaultValue: ''
        },
        {
          parameter: 'width',
          explain: '用来控制控件的显示的宽度',
          type: 'Number',
          optionalValue: '',
          defaultValue: ''
        },
        {
          parameter: 'show',
          explain: '是否显示控件，可在使用的时候视具体情况对某一个控件进行显示隐藏操作',
          type: 'boolean',
          optionalValue: 'true, false',
          defaultValue: 'true'
        },
        {
          parameter: 'option',
          explain: '不同控件的相关配置项',
          type: 'object',
          optionalValue: '{}',
          defaultValue: '{}'
        }
      ],
      tableData4: [
        {
          parameter: 'format',
          explain: '用来格式化显示日期格式的',
          type: 'boolean',
          optionalValue: 'true, false',
          defaultValue: 'true'
        },
        {
          parameter: 'pickerOptions',
          explain: '设置日期控件，那些日期可以选择',
          type: 'function',
          optionalValue: 'disabledDate () => return false',
          defaultValue: ''
        },
        {
          parameter: 'func',
          explain: '指定回调函数所执行的方法',
          type: 'Object',
          optionalValue: 'change: \'getTimeValue1\' , param: "getTimeValue1函数，传入的参数",   ',
          defaultValue: ''
        },
        {
          parameter: 'cascader',
          explain: '级联菜单专属配置项',
          type: 'Object',
          optionalValue: '{}',
          defaultValue: ''
        },
        {
          parameter: 'bind',
          explain: '此项多用于select 下拉选择项时使用。当需要变更，下拉列表中 value 和label 的显示值时，可以通过配置这两个值来更改。',
          type: 'Object',
          optionalValue: '{value: \'id\',label: \'name\'}',
          defaultValue: ''
        }
      ],
      tableData5: [
        {
          parameter: 'collapseTags',
          explain: '多选项可自动合并',
          type: 'boolean',
          optionalValue: 'true, false',
          defaultValue: 'false'
        },
        {
          parameter: 'filterable',
          explain: '是否可以搜索',
          type: 'boolean',
          optionalValue: 'true， false',
          defaultValue: ''
        },
        {
          parameter: 'clearable',
          explain: '是否支持清空选项',
          type: 'Boolean',
          optionalValue: '',
          defaultValue: ''
        },
        {
          parameter: 'props',
          explain: '级联菜单官方参数配置',
          type: 'Object',
          optionalValue: '具体参照element',
          defaultValue: ''
        },
        {
          parameter: 'data',
          explain: '级联菜单的数据值',
          type: 'Array',
          optionalValue: '',
          defaultValue: ''
        }
      ]
    }
  },
  components: {BaseForm},
  mounted () {
    this.$refs.code.innerHTML = hljs.highlightAuto(`
    <template>
        <baseForm :inline="false" :config="formConfig" :form="form">
          <template slot="button" class="d-i-b">
            <el-button type="primary" @click="search">我是插槽中按钮</el-button>
          </template>
        </baseForm>
    </template>
    import baseForm from '@/components/BaseForm'
    export default {
      data() {
        return {
          form: {}, // 可获取到的form表单提取的数据值
          formConfig: [] // 各form表单原素配置项
        }
      },
      components: { baseForm },
      method: {
            search () {
              this.$message(this.form)
            },
            getAreaCode (value, data) {},
            getTimeValue (value) {}
      }
    }
    `).value
  },
  methods: {
    search () {
      this.$message(this.form)
    },
    getAreaCode (value, data) {},
    getTimeValue (value) {
      console.log(value)
    }
  }
}
</script>
