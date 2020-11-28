<template>
  <section>
    <h2>时间进度条</h2>
    <h3></h3>
    <p>多用于时间的播放</p>
    <div class="demo-block demo-zh-CN demo-select">
      <div class="source">
        <timeProgressBar @notify="getTime" :config="timeProgressConfig" :currMark="currMark" :show="isShow" ref="timeBar"></timeProgressBar>
      </div>
      <div class="meta" style="height: auto">
        <div class="description">
          <p><b style="color: red">备注：ref="timeBar"</b>此配置为动态计算控件的宽度，不可修改且必须。</p>
        </div>
        <div class="highlight">
          <pre>
            <code ref="code" class="html hljs xml"></code>
          </pre>
        </div>
      </div>
    </div>

    <h3>Props 说明</h3>

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

    <h3>参数config相关配置说明 </h3>
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
import timeProgressBar from '@/components/timeProgressBar'
import hljs from 'highlight.js'
export default {
  name: 'timeProgressBarDemo',
  mixins: [],
  data () {
    return {
      // 定义的每个data 属性必须有注释
      // 注释规则： //
      isShow: true,
      currMark: 1,
      timeProgressConfig: {
        startTime: '2012-05-06 12:10:00', // 开始时间
        endTime: '2012-05-21 00:23:00', // 结束时间
        formartDate: 'YYYY-MM-DD HH:mm:ss', // 格式化时间格式
        type: 'day', // 刻度单位 minutes(分) day(天) hours(小时)
        timeSpace: 1, // 时间间隔 此处为15分钟
        // currPlace: 'end', // 进度条是开始：start（默认） 结束：end
        playTime: 10000 // 播放的速度 单位是毫秒
      },
      tableData1: [
        {
          parameter: 'config',
          explain: '传入的内容相关配置项，如（开始时间，结束时间，时间增量值......）',
          type: 'Object',
          optionalValue: '{}',
          defaultValue: ''
        },
        {
          parameter: 'currMark',
          explain: '设置当前的进度条的显示位置。可设置具体的位置点',
          type: 'Number',
          optionalValue: '1',
          defaultValue: ''
        },
        {
          parameter: 'show',
          explain: '是否显示时间进度条',
          type: 'Boolean',
          optionalValue: 'true or false',
          defaultValue: 'true'
        }
      ],
      tableData2: [
        {
          parameter: 'startTime',
          explain: '开始时间',
          type: 'String',
          optionalValue: '2012-05-06 12:10:00',
          defaultValue: ''
        },
        {
          parameter: 'endTime',
          explain: '结束时间',
          type: 'String',
          optionalValue: '2012-05-31 00:23:00',
          defaultValue: ''
        },
        {
          parameter: 'formartDate',
          explain: '设置返回的时间格式',
          type: 'string',
          optionalValue: 'YYYY-MM-DD HH:00:00',
          defaultValue: 'YYYY-MM-DD HH:mm:ss'
        },
        {
          parameter: 'type',
          explain: '刻度单位',
          type: 'string',
          optionalValue: 'minutes(分) days(天) hours(小时)',
          defaultValue: ''
        },
        {
          parameter: 'timeSpace',
          explain: '进度条的时间间隔。和type值相匹配。若，type = ‘days’ 则这的3表示为：3天',
          type: 'Number',
          optionalValue: '3',
          defaultValue: ''
        },
        {
          parameter: 'currPlace',
          explain: '可以设置进度条的初始化显示位置（进度条的开始或者进度条的结束位置）',
          type: 'string',
          optionalValue: 'start or end',
          defaultValue: 'start'
        },
        {
          parameter: 'playTime',
          explain: '进度条播放的速度值（单位是毫秒）',
          type: 'Number',
          optionalValue: '10',
          defaultValue: ''
        }
      ],
      tableData3: [
        {
          method: 'getTime',
          parameter: '',
          explain: '获取进度条当前播放的时间值',
          returnValue: '’2020-05-05 08:20:00‘'
        }
      ]
    }
  },
  props: {},
  components: { timeProgressBar },
  beforeCreate () {
  },
  created () {
  },
  beforeMount () {
  },
  mounted () {
    this.$refs.code.innerHTML = hljs.highlightAuto(`
   <timeProgressBar @notify="getTime" :config="timeProgressConfig" ref="timeBar"></timeProgressBar>
    import timeProgressBar from '@/components/timeProgressBar'
    export default {
      data() {
        return {
          isShow: true,
          currMark: 1,
          timeProgressConfig: {
            startTime: '2012-05-06 12:10:00',
            endTime: '2012-05-21 00:23:00',
            formartDate: 'YYYY-MM-DD HH:mm:ss',
            type: 'days',
            timeSpace: 3,
            currPlace: 'end',
            playTime: 10
          }
        }
      },
      components: { timeProgressBar },
      method: {
        getTime (value) {
          console.log(value) // 为返回的时间值
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
    value (val) {
      console.log('value:', val)
    }
  },
  computed: {},
  directives: {},
  filter: {},
  methods: {
    // 方法调用不需要注释，方法定义需要注释
    // 方法注释规则 /** */
    getTime (time) {
      console.log(time)
    }
  }
}
</script>