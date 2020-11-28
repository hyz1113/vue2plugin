<!--公用组件：
 /**
  * @desc DateQuarterPinker
  * @module @/components
  * @desc 组件描述：
  * @author zkhq
  * @date 2020/7/20 16:59
  * @param {Object} [title]    - 参数说明
  * @param {String} [columns] - 参数说明
  * @example 调用示例
  *  <hbTable :title="title" :columns="columns" :tableData="tableData"></hbTable>
  */
-->
<template>
  <section>
    <h2>city-Select 城市选择</h2>
    <h3></h3>
    <p>城市可多选也可单选</p>

    <div class="demo-block demo-zh-CN demo-select">
      <div class="source">
        <city-Select muilt @getValue="getValue" :dafaultValue="dafaultValue"></city-Select>
      </div>
      <div class="meta" style="height: auto">
        <div class="highlight">
          <pre>
            <code ref="code" class="html hljs xml"></code>
          </pre>
        </div>
      </div>
    </div>

    <h3>Props 组件参数说明</h3>

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
        <td><span>{{item.parameter}}</span></td>
        <td><span>{{item.explain}}</span></td>
        <td><span>{{item.type || '-'}}</span></td>
        <td><span>{{item.optionalValue || '-'}}</span></td>
        <td><span>{{item.defaultValue || '-'}}</span></td>
      </tr>
      </tbody>
    </table>

    <h3>Methods</h3>

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
      <tr v-for="(item, index) in tableData3" :key="index">
        <td><span>{{item.method}}</span></td>
        <td><span>{{item.parameter || '-'}}</span></td>
        <td><span>{{item.explain}}</span></td>
        <td><span>{{item.returnValue || '-'}}</span></td>
      </tr>
      </tbody>
    </table>

  </section>
</template>

<script>
// import
import CitySelect from '@/components/citySelect'
import hljs from 'highlight.js'
export default {
  name: 'dateSelectDemo',
  mixins: [],
  data () {
    return {
      // 定义的每个data 属性必须有注释
      // 注释规则： //
      // 季度
      dafaultValue: ['130700'],
      tableData1: [
        {
          parameter: 'muilt',
          explain: '是否可以设置组件为多选',
          type: 'Boolean',
          optionalValue: 'true or false',
          defaultValue: 'false'
        },
        {
          parameter: 'dafaultValue',
          explain: '城市列表的默认值',
          type: 'Array',
          optionalValue: '[]',
          defaultValue: '[]'
        }
      ],
      tableData3: [
        {
          method: 'getValue',
          parameter: '',
          explain: '可获取选中的城市的citycode',
          returnValue: '【\'130700\'】'
        }
      ]
    }
  },
  props: {},
  components: { CitySelect },
  beforeCreate () {
  },
  created () {
  },
  beforeMount () {
  },
  mounted () {
    this.$refs.code.innerHTML = hljs.highlightAuto(`
    <template>
       <city-Select muilt @getValue="getValue" :dafaultValue="dafaultValue"></city-Select>
    </template>
    import dateSelect from '@/components/bdp/dateSelect'
    export default {
      data() {
        return {
          dafaultValue: ['130700']
        }
      },
      components: { dateSelect },
      method: {
        getValue (data) { // 可获取选中的城市的citycode
        }
      }
    }
    `).value
  },
  beforeUpdate () {
  },
  updated () {
  },
  beforeDestroy () {
  },
  destroyed () {
  },
  watch: {
  },
  computed: {},
  directives: {},
  filter: {},
  methods: {
    // 方法调用不需要注释，方法定义需要注释
    // 方法注释规则 /** */
    /**
     * select 的绑定值发生变化时
     * @param value 选定区县code
     */
    getValue (data) { // 可获取选中的城市的citycode
    }
  }
}
</script>
