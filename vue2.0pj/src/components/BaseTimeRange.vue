<template>
  <div class="d-i-b v-a-t">
    <el-radio-group v-model="type" @change="siteTimeRange">
      <el-radio-button :key="index" v-for="(item, index) in config" :disabled="item.disable" :label="item.id">
        {{ item.text }}
      </el-radio-button>
      <el-radio-button :label="999">自定义</el-radio-button>
    </el-radio-group>
    <div v-show="type === 999" class="d-i-b v-a-t m-l-20">
      <el-date-picker
        style="width: 360px"
        @change="setTimeAuto"
        v-model="timeAuto"
        format='yyyy-MM-dd HH:mm:ss'
        value-format="yyyy-MM-dd HH:mm:ss"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
      </el-date-picker>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'BaseTimeRange',
  props: {
    config: {
      default: () => {
        return {}
      },
      required: true
    },
    increment: { // 时间前后推迟计算的值
      default: function () {
        return {}
      },
      type: Object,
      required: false
    },
    timeFormat: { // 时间格式化设置
      default: 'YYYY-MM-DD HH:mm:ss',
      type: String,
      required: false
    },
    isDefault: { // 设置默认的按钮
      default: null,
      type: Number,
      required: true
    }
  },
  data () {
    return {
      valueFormat: 'yyyy-MM-dd HH:mm:ss',
      start: null,
      end: null,
      time: [],
      type: this.isDefault,
      timeAuto: [] // 时间
    }
  },
  mounted () {
    this.siteTimeRange()
  },
  methods: {
    getDiffTimeType (u, n, r = 0) {
      let end = moment().format(this.timeFormat)
      if (r) {
        end = moment().subtract(r, u).format(this.timeFormat)
      }
      let start = moment(end).subtract(n, u).format(this.timeFormat)
      return {
        end: end,
        start: start
      }
    },
    siteTimeRange () {
      if (this.type === 999) {
        return
      }
      let defaultValue = this.config.filter(item => {
        return item.id === this.type
      })
      this.getCurrTime(defaultValue)
    },
    /**
     * @desc 计算当前的时间类型的范围值
     * @param timeObj 为当前的时间类型的相关配置信息
     */
    resiteTime () {
      this.start = this.time[0] = moment(this.time[0]).format(this.timeFormat)
      this.end = this.time[1] = moment(this.time[1]).format(this.timeFormat)
      if (this.type === 999) {
        this.$emit('change', [this.start, this.end])
      } else {
        this.setTimeAuto()
      }
    },
    setTimeAuto () {
      if (this.timeAuto.length) {
        this.start = this.timeAuto[0] = moment(this.timeAuto[0]).format(this.timeFormat)
        this.end = this.timeAuto[1] = moment(this.timeAuto[1]).format(this.timeFormat)
        this.$emit('change', [this.start, this.end])
      }
    },
    /**
     * @desc 计算当前的时间类型的范围值
     * @param timeObj 为当前的时间类型的相关配置信息
     */
    getCurrTime (timeObj = {}) {
      if (timeObj) {
        let obj = this.getDiffTimeType(timeObj[0].unit, timeObj[0].num, timeObj[0].retrodictVal)
        this.end = obj ? moment(obj.end).format(this.timeFormat) : moment(this.end).format(this.timeFormat)
        this.start = obj ? moment(obj.start || this.start).format(this.timeFormat) : moment(this.end).format(this.timeFormat)
        this.time = [this.start, this.end]
        this.$emit('notify', [this.start, this.end])
        this.$emit('change', [this.start, this.end], this.type)
      }
    }
  },
  watch: {
    timeFormat: {
      handler (newVal) {
        this.resiteTime()
      },
      deep: true
    },
    config: {
      handler (newVal) {
        this.resiteTime()
      },
      deep: true
    }
  }
}
</script>
