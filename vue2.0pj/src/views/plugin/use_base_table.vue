<template>
  <div class="page-component">
    <h2>基础表格组件</h2>
    <h3>页面表格数据的基本展示操作</h3>
    <p></p>
    <div class="demo-block demo-zh-CN demo-select">
      <div class="source">
        <base-table
          :isPagination="true"
          :selectableSite="selectableSite"
          :summary="summary"
          :selectRadio="true"
          :selecCheckBox="true"
          :isShowIndex="true"
          :default-sort="defaultSort"
          :pageNum="1"
          :pageSize="10"
          :total="12"
          :data="tableData"
          :config="tableConfig"
          :cellClassSet="cellClassSet"
          :cellStyleSet="cellStyleSet"
          @formatterCell="formatterCell"
          @getRadioSelectRow="getRadioSelectRow"
          @rowClick="getRowInfo"
          @buttonClick="buttonClick"
          @inputConfirm="getInput"
          @getCheckBoxSelection="getCheckBoxSelection"
          @getCellCilck="getCellCilck"
          @getCurrentChange="getCurrentChange"
          @getSortChange="getSortChange"
          @getAllSelection="getAllSelection"
          operating
          :operatingWidth="150"
        >
          <template slot-scope="scope" fix="right">
            <el-button type="text" @click.stop.native>查看</el-button>
            <el-button type="text" @click.stop.native>编辑</el-button>
            <el-button type="text" @click.stop.native>删除</el-button>
          </template>
        </base-table>
      </div>
      <div class="meta" style="height: auto; clear: both;">
        <div class="highlight">
          <pre>
            <code ref="code" class="html hljs xml"></code>
          </pre>
        </div>
      </div>
    </div>
    <div class="content">
      <h3>表格基本属性配置说明</h3>
      
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
          <td>{{ item.parameter }}</td>
          <td>{{ item.explain }}</td>
          <td>{{ item.type || '-' }}</td>
          <td>{{ item.optionalValue || '-' }}</td>
          <td>{{ item.defaultValue || '-' }}</td>
        </tr>
        </tbody>
      </table>

      <h3>summary 参数的说明</h3>

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
          <td>{{ item.parameter }}</td>
          <td>{{ item.explain }}</td>
          <td>{{ item.type || '-' }}</td>
          <td>{{ item.optionalValue || '-' }}</td>
          <td>{{ item.defaultValue || '-' }}</td>
        </tr>
        </tbody>
      </table>
      <h3>config 参数的说明</h3>

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
        <tr v-for="(item, index) in tableData3" :key="index">
          <td>{{ item.parameter }}</td>
          <td>{{ item.explain }}</td>
          <td>{{ item.type || '-' }}</td>
          <td>{{ item.optionalValue || '-' }}</td>
          <td>{{ item.defaultValue || '-' }}</td>
        </tr>
        </tbody>
      </table>

      <h3>config---> filter 参数的说明</h3>

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
          <td>{{ item.parameter }}</td>
          <td>{{ item.explain }}</td>
          <td>{{ item.type || '-' }}</td>
          <td>{{ item.optionalValue || '-' }}</td>
          <td>{{ item.defaultValue || '-' }}</td>
        </tr>
        </tbody>
      </table>
      <h3>方法</h3>

      <table>
        <thead>
        <tr>
          <th>方法</th>
          <th>参数</th>
          <th>说明</th>
          <th>返回值</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item, index) in tableData5" :key="index">
          <td>{{item.method}}</td>
          <td>{{item.parameter || '-'}}</td>
          <td>{{item.explain}}</td>
          <td>{{item.returnValue || '-'}}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import hljs from 'highlight.js'
import BaseTable from '@/components/BaseTable'
export default {
  name: 'BaseFormDesc',
  data () {
    return {
      defaultSort: {prop: 'id', order: 'descending'}, // 设置默认排序规则
      summary: { // 表格合计行的相关设置
        showSummary: true, // 表格是否有合计行
        sumText: '汇总',
        summaryMethod: this.summaryMethod
      },
      selectableSite: [],
      tableConfig: [
        {
          type: '',
          label: '方案名称',
          value: 'actionName',
          tooltip: true,
          filter: {
            filters: [{text: '应急减排111', value: '应急减排111'}], // 设置可筛选字段名
            filterHandler (value, row, column) {
              const property = column['property']
              return row[property] === value
            }
          },
          isHtml: true,
          formatter: (row, column) => { // 绑定的处理的方法
            return `<b>${row.actionName}</b>`
            // return row.actionName
          }
        },
        {
          type: '',
          label: '执行时间',
          value: 'time',
          tooltip: true
        },
        {
          type: 'switch',
          label: '清单id',
          value: 'id',
          tooltip: true
        },
        {
          type: 'button',
          label: '基准清单',
          value: 'measured',
          tooltip: true
        },
        {
          type: 'image',
          label: '数据时间',
          value: 'BR.jpeg',
          tooltip: true
        },
        {
          type: 'input',
          label: '型号',
          value: 'deviceModel',
          tooltip: true
        },
        {
          type: '',
          label: '添加时间',
          value: 'createTime',
          tooltip: true
        }
      ],
      tableData: [
        {
          id: 7,
          actionName: '应急减排111',
          time: '2020年2月11日-2020年2月29日',
          measured: '清单1',
          dataTime: '2020年2月29日',
          deviceModel: '黑烟车',
          createTime: '2020年2月11日'
        },
        {
          id: 4,
          actionName: '应急减排222',
          time: '2020年1月11日-2020年12月05日',
          measured: '清单2',
          dataTime: '2020年2月29日',
          deviceModel: '黑烟车',
          createTime: '2020年2月11日'
        }
      ],
      // 组件的使用说明文档
      tableData1: [
        {
          parameter: 'isPagination',
          explain: '是否显示分页',
          type: 'boolean',
          optionalValue: 'true or false',
          defaultValue: 'false'
        },
        {
          parameter: 'selectableSite',
          explain: '用来设置table初始化时哪些checkBox可点击（对有复选框的table内容生效）可设置多个，多个可并列做为筛选条件。',
          type: 'array',
          optionalValue: '例如： [{key: \'color\',val: \'蓝色\'}] 意思为：当前行 color字段的值 === 蓝色 的checkbox 设置为不可点击 ',
          defaultValue: '[]'
        },
        {
          parameter: 'summary',
          explain: '表格底部的合并行配置项',
          type: 'Object',
          optionalValue: '{}',
          defaultValue: '{}'
        },
        {
          parameter: 'selectRadio',
          explain: '是否增加一列单选按钮',
          type: 'boolean',
          optionalValue: 'true or false',
          defaultValue: 'false'
        },
        {
          parameter: 'selecCheckBox',
          explain: '是否增加一列复选选按钮',
          type: 'boolean',
          optionalValue: 'true or false',
          defaultValue: 'false'
        },
        {
          parameter: 'isShowIndex',
          explain: '是否显示序号列',
          type: 'boolean',
          optionalValue: 'true or false',
          defaultValue: 'false'
        },
        {
          parameter: 'default-sort',
          explain: '默认的排序设置',
          type: 'Object',
          optionalValue: '{}',
          defaultValue: '{}'
        },
        {
          parameter: 'pageNum',
          explain: '用来计算序号一列的值。如果需要显示序号列的话，请设置此值。',
          type: 'Number',
          optionalValue: '1,2,3',
          defaultValue: '1'
        },
        {
          parameter: 'pageSize',
          explain: '用来计算序号一列的值。如果需要显示序号列的话，请设置此值。',
          type: 'Number',
          optionalValue: '',
          defaultValue: '10'
        },
        {
          parameter: 'total',
          explain: '数据总条数',
          type: 'Number',
          optionalValue: '',
          defaultValue: ''
        },
        {
          parameter: 'cellClassSet',
          explain: '用来动态设置单元格的className值',
          type: 'Function',
          optionalValue: '',
          defaultValue: ''
        },
        {
          parameter: 'cellStyleSet',
          explain: '用来动态设置单元格的Style 样式',
          type: 'Function',
          optionalValue: '',
          defaultValue: ''
        },
        {
          parameter: 'config',
          explain: '表格的基本相关配置',
          type: 'Array',
          optionalValue: '[]',
          defaultValue: '[]'
        },
        {
          parameter: 'data',
          explain: '表格的绑定的展示数据',
          type: 'Array',
          optionalValue: '[]',
          defaultValue: '[]'
        },
        {
          parameter: 'operating',
          explain: '是否开启表格最后一栏（操作栏）',
          type: 'boolean',
          optionalValue: 'true or false',
          defaultValue: 'false'
        },
        {
          parameter: 'operatingWidth',
          explain: '表格操作一栏的宽度',
          type: 'Number',
          optionalValue: '',
          defaultValue: '100'
        }
      ],
      tableData2: [
        {
          parameter: 'showSummary',
          explain: '表格是否有合计行',
          type: 'Boolean',
          optionalValue: 'false or true',
          defaultValue: ''
        },
        {
          parameter: 'sumText',
          explain: '合计行第一列的文本。注意：此字段会再设置了 汇总方法summaryMethod后失效 ',
          type: 'String',
          optionalValue: '',
          defaultValue: ''
        },
        {
          parameter: 'summaryMethod',
          explain: '自定义的合计计算方法',
          type: 'Function',
          optionalValue: '',
          defaultValue: ''
        }
      ],
      tableData3: [
        {
          parameter: 'type',
          explain: '用来标识单元格中展示的内容的类型。（默认为空串，只做展示数据）',
          type: 'string',
          optionalValue: 'input，button，image，switch，’空串‘',
          defaultValue: '空串'
        },
        {
          parameter: 'label',
          explain: '表头名称 ',
          type: 'String',
          optionalValue: '',
          defaultValue: ''
        },
        {
          parameter: 'value',
          explain: '绑定的字段值',
          type: 'string',
          optionalValue: '',
          defaultValue: ''
        },
        {
          parameter: 'isHtml',
          explain: '是否可以启用自定义html展示',
          type: 'boolean',
          optionalValue: 'true or false',
          defaultValue: 'false'
        },
        {
          parameter: 'filter',
          explain: '表格自定义筛选内容',
          type: 'Object',
          optionalValue: '{}',
          defaultValue: '{}'
        },
        {
          parameter: 'tooltip',
          explain: '当内容过长被隐藏时显示 tooltip',
          type: 'Boolean',
          optionalValue: 'true or false',
          defaultValue: 'false'
        },
        {
          parameter: 'formatter',
          explain: '表格的单元格格式化展示函数。如果isHtml = true 则 此函数可以 return ’html 格式内容‘',
          type: 'Function',
          optionalValue: 'formatter(row, column)=> {return row.name}',
          defaultValue: ''
        }
      ],
      tableData4: [
        {
          parameter: 'filters',
          explain: '用来格式化显示日期格式的',
          type: 'boolean',
          optionalValue: 'true, false',
          defaultValue: 'true'
        },
        {
          parameter: 'filterHandler',
          explain: '自定义数据过滤方法。函数值返回值必须为 true或false。满足条件的数据返回 true 就会显示。',
          type: 'function',
          optionalValue: 'filterHandler (value, row, column) => return true',
          defaultValue: ''
        }
      ],
      tableData5: [
        {
          method: 'formatterCell',
          parameter: 'row, column',
          explain: '格式化单元格内容',
          returnValue: ''
        },
        {
          method: 'getRadioSelectRow',
          explain: '当启用radio一列展示的时候。获取选中一行的值',
          parameter: 'index, val',
          returnValue: 'index（行号）, val（row数据）'
        },
        {
          method: 'rowClick',
          explain: '行点击事件。可获取当前行信息',
          parameter: 'row',
          returnValue: 'row'
        },
        {
          method: 'buttonClick',
          explain: '行内按钮点击事件。此按钮非插槽内按钮。可获取当前行信息',
          parameter: 'row',
          returnValue: 'row（row数据）'
        },
        {
          method: 'inputConfirm',
          explain: '当前行内的input 输入的值获取方法',
          parameter: 'row',
          returnValue: '可获取当前行信息。（包含更改后的input框的值）'
        },
        {
          method: 'getCheckBoxSelection',
          explain: '获取checkbox 选中的行的所有行信息',
          parameter: 'val',
          returnValue: 'Object'
        },
        {
          method: 'getCellCilck',
          explain: '当前单元格点击事件，获取当前单元格相关的信息。',
          parameter: 'row, column, cell, event',
          returnValue: 'row, column, cell, event'
        },
        {
          method: 'getCurrentChange',
          explain: '当行内值被修改后，返回修改后行信息。',
          parameter: 'currRow',
          returnValue: 'row'
        },
        {
          method: 'getSortChange',
          explain: '当表格的排序条件发生变化的时候会触发该事件',
          parameter: 'Obj',
          returnValue: 'Object'
        },
        {
          method: 'getAllSelection',
          explain: '开启了checkbox一列显示后，如果选择了表头的checkbox 则会触发此函数。',
          parameter: 'all',
          returnValue: 'Object（为所有的显示的行信息）'
        }
      ]
    }
  },
  components: {BaseTable},
  mounted () {
    this.$refs.code.innerHTML = hljs.highlightAuto(`
    <template>
        <base-table
          :isPagination="true"
          :selectableSite="selectableSite"
          :summary="summary"
          :selectRadio="true"
          :selecCheckBox="true"
          :isShowIndex="true"
          :default-sort="defaultSort"
          :pageNum="1"
          :pageSize="10"
          :total="12"
          :data="tableData"
          :config="tableConfig"
          :cellClassSet="cellClassSet"
          :cellStyleSet="cellStyleSet"
          @formatterCell="formatterCell"
          @getRadioSelectRow="getRadioSelectRow"
          @rowClick="getRowInfo"
          @buttonClick="buttonClick"
          @inputConfirm="getInput"
          @getCheckBoxSelection="getCheckBoxSelection"
          @getCellCilck="getCellCilck"
          @getCurrentChange="getCurrentChange"
          @getSortChange="getSortChange"
          @getAllSelection="getAllSelection"
          operating
          :operatingWidth="150"
        >
          <template slot-scope="scope" fix="right">
            <el-button type="text" @click.stop.native>查看</el-button>
            <el-button type="text" @click.stop.native>编辑</el-button>
            <el-button type="text" @click.stop.native>删除</el-button>
          </template>
        </base-table>
    </template>
    import BaseTable from '@/components/BaseTable'
    export default {
      data() {
        return {
          defaultSort: {prop: 'id', order: 'descending'}, // 设置默认排序规则
          summary: { // 表格合计行的相关设置
            showSummary: true, // 表格是否有合计行
            sumText: '合计的每一列的值',
            summaryMethod: this.summaryMethod
          },
          selectableSite: [],
          tableData: [], // 为表格数据
          tableConfig: [
            {
              type: '',
              label: '方案名称',
              value: 'actionName',
              tooltip: true,
              filter: {
                filters: [{text: '应急减排111', value: '应急减排111'}], // 设置可筛选字段名
                filterHandler (value, row, column) {
                  const property = column['property']
                  return row[property] === value
                }
              },
              isHtml: true,
              formatter: (row, column) => { // 绑定的处理的方法
                return '<b>' + row.actionName + '</b>' // isHtml == true
                // return row.actionName  // isHtml == false
              }
            },
            {
              type: '',
              label: '执行时间',
              value: 'time',
              tooltip: true
            },
            {
              type: 'switch',
              label: '清单id',
              value: 'id',
              tooltip: true
            },
            {
              type: 'button',
              label: '基准清单',
              value: 'measured',
              tooltip: true
            },
            {
              type: 'image',
              label: '数据时间',
              value: 'BR.jpeg(图片地址)',
              tooltip: true
            },
            {
              type: 'input',
              label: '型号',
              value: 'deviceModel',
              tooltip: true
            },
            {
              type: '',
              label: '添加时间',
              value: 'createTime',
              tooltip: true
            }
          ]
        }
      },
      components: { BaseTable },
      method: {
            formatterCell (row, column) { // 格式化行列信息
              console.log(row, column)
            },
            summaryMethod (param) {
              console.log('合计的方法！请务必return 一个返回值')
              return '12345'
            },
            getRowInfo (row) {
              console.log('获取的行信息是  ' + row)
            },
            buttonClick (row) {
              console.log(\`按钮点击后获取的行信息是\` + row)
            },
            getInput (row) {
              console.log(\`input输入后获取整行输入值  \` + row)
            },
            getCheckBoxSelection (val) {
              console.log(\`获取selct 选中所有行的值  \` + val)
            },
            getAllSelection (all) {
              console.log(\`获取所有的 勾选了checkBox的  \` + all)
            },
            getRadioSelectRow (index, val) {
              console.log(\`获取radio 选中所有行的 行数：index  值：val\` + index + val)
            },
            getCellCilck (row, column, cell, event) {
              console.log(\`获取当前单元格相关的信息 行值：row  列值：column 单元格值：cell 事件：event\`)
            },
            getCurrentChange (currRow) {
              console.log(\`当前变化后行信息 currRow\`)
            },
            getSortChange (Obj) {
              console.log(\`当表格的排序条件发生变化的时候会触发该事件 Obj\`)
            },
            cellClassSet ({row, column, rowIndex, columnIndex}) {
              return 'className'
            },
            cellStyleSet ({row, column, rowIndex, columnIndex}) {
              return 'color: gray'
            }
      }
    }
    `).value
  },
  methods: {
    formatterCell (row, column) { // 格式化行列信息
      console.log(row, column)
    },
    summaryMethod (param) {
      console.log('合计的方法！请务必return 一个返回值')
      return '合计'
    },
    getRowInfo (row) {
      console.log(`获取的行信息是  ${row}`)
    },
    buttonClick (row) {
      console.log(`按钮点击后获取的行信息是  ${row}`)
    },
    getInput (row) {
      console.log(`input输入后获取整行输入值  ${row}`)
    },
    getCheckBoxSelection (val) {
      console.log(`获取selct 选中所有行的值  ${val}`)
    },
    getAllSelection (all) {
      console.log(`获取所有的 勾选了checkBox的  ${all}`)
    },
    getRadioSelectRow (index, val) {
      console.log(`获取radio 选中所有行的 行数：${index}  值：${val}`)
    },
    getCellCilck (row, column, cell, event) {
      console.log(`获取当前单元格相关的信息 行值：${row}  列值：${column} 单元格值：${cell} 事件：${event}`)
    },
    getCurrentChange (currRow) {
      console.log(`当前变化后行信息 ${currRow}`)
    },
    getSortChange (Obj) {
      console.log(`当表格的排序条件发生变化的时候会触发该事件 ${Obj}`)
    },
    cellClassSet ({row, column, rowIndex, columnIndex}) {
      // let obj = {row, column, rowIndex, columnIndex}
      return 'className'
    },
    cellStyleSet ({row, column, rowIndex, columnIndex}) {
      // let obj = {row, column, rowIndex, columnIndex}
      return 'color: gray'
    }
  }
}
</script>
