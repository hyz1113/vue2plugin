<template>
  <div>
    <div class="el-time-line auto" v-show="show">
      <div class="play-btn-group auto">
        <button class="prev-btn d-i-b el-icon-arrow-left" :disabled="isBack" :class="!isBack?'acitve':''"
                @click="back"></button>
        <button class="d-i-b play-btn el-icon-video-play active" type="primary"
                :class="!isPlay?'el-icon-video-play':'el-icon-video-pause'" round size="mini"
                @click="tooglePlayPause"></button>
        <button class="next-btn d-i-b el-icon-arrow-right" :disabled="isPrev" :class="!isPrev?'acitve':''"
                @click="forward"></button>
      </div>
      <div class="time-line ovh m-t-10">
        <div class="curr-time-line" :style="{width:currTimeLineWidth+'px'}"></div>
      </div>
      <div class="time-tag" v-if='config.type !== "minutes"'>
        <span v-for="(item, index) in daysList" :key="index" :style="{width: 100 / daysList.length + '%'}">
        {{ item.day!=''?item.day+'日':'' }}
        <template>
          <el-tooltip class="item" effect="dark" :content="getTooltipContent(item)" placement="top-start">
            <i class="i" @click="currPoint = index + 1; calcPlayTime(true); judgeDirectBack(false); judgeDirectforWard(false)"></i>
          </el-tooltip>
        </template>
        </span>
      </div>
      <div class="time-tag" v-else>
        <span v-for="(item, index) in daysList" :key="index" :style="{width: 100 / daysList.length + '%'}">
        {{ item.day!=''?item.day+'日': '' }}
        <template>
          <el-tooltip class="item" effect="dark" :content="(parseInt((index) / timeSpace)) * timeSpace  + '分'" placement="top-start">
            <i class="i" v-if="index % timeSpace === 0" :style="{'border-left':getMinitesColor(index)}" @click="timeRangeLineClick(index)"></i>
          </el-tooltip>
        </template>
        </span>
      </div>
    </div>
  </div>
</template>
<script>
import moment from 'moment'

export default {
  name: 'timeProgressBar',
  data () {
    return {
      startTime: '', // 开始时间
      endTime: '', // 结束时间
      type: '', // 刻度类型
      currPlace: '', // 进度条是开始（start）还是结束 （end）
      currTime: '', // 记录当前的播放时间
      playTime: 0, // 播放的速度  单位：毫秒
      num: null, // 总的时间分隔段
      containerWidth: 0, // 計算容器的寬度
      markWidth: 0, // 单个的刻度的宽度
      currPoint: 0, // 当前指示的位置标示
      currTimeLineWidth: 0, // 当前的行进的宽度值
      isPlay: false, // 是否播放
      daysList: [], // 显示的天数列表
      formartDate: '', // 格式化代码
      isBack: true, // 是否可以后退
      isPrev: false, // 是否可以前进
      timeSpace: 1, // 时间跳跃步长值
      tagWidth: null, // 标签的宽度
      playSettimoutObj: null // 记录不同实例的时间定时器对象
    }
  },
  props: {
    config: {
      type: Object,
      default () {
        return {}
      }
    },
    currMark: {
      type: Number,
      required: false
    },
    show: {
      type: Boolean,
      required: false
    }
  },
  watch: {
    isPlay: {
      handler (now) {
        this.resiteContainer()
        if (this.isPlay) {
          this.play()
        } else {
          this.pause()
        }
      }
    },
    config: {
      deep: true,
      handler (now) {
        this.init()
      }
    },
    show () {
      this.resiteCurrTimeLinePlace()
      this.pause() // 暂停播放
    },
    currMark () {
      this.resiteCurrTimeLinePlace()
      // this.pause() // 暂停播放
    }
  },
  mounted () {
    this.$nextTick(function () {
      this.init()
    })
  },
  methods: {
    // 分钟时间线的点上的颜色值设置
    getMinitesColor (index) {
      if (index % this.timeSpace === 0) {
        return 'solid 0px red'
      } else {
        return 'solid 0px blue'
      }
    },
    // 时间线的点击事件
    timeRangeLineClick (index) {
      this.currPoint = parseInt((index) / this.timeSpace)
      this.calcPlayTime(true)
      this.judgeDirectBack(false)
      this.judgeDirectforWard(false)
    },
    getTooltipContent (item) { // 获取显示的进度条的tips 信息
      let str = ''
      switch (this.config.type) {
        case 'minutes':
          // debugger
          str = '分'
          break
        case 'hours':
          str = '时'
          break
        case 'day':
          str = '日'
          break
      }
      return item[this.config.type] !== '' ? item[this.config.type] + str : item.day + '日'
    },
    init () { // 初始化数据
      this.$nextTick(() => {
        this.daysList = [] // 清空日期列表
        this.startTime = this.config.startTime // 开始时间
        this.endTime = this.config.endTime // 结束时间
        this.type = this.config.type // 刻度类型
        this.currPlace = this.config.currPlace // 进度条是开始（start）还是结束 （end）
        this.formartDate = this.config.formartDate // 格式化时间配置
        this.timeSpace = this.config.timeSpace // 时间跳跃步长值
        this.playTime = this.config.playTime // 进度条是开始（start）还是结束 （end）
        this.num = moment(this.endTime).diff(moment(this.startTime), this.type) / this.timeSpace // 按照设置的步长值
        this.containerWidth = this.$el.clientWidth // 设置进度条总的宽度
        this.markWidth = this.containerWidth / this.num // 计算出单个的刻度的宽度值
        this.getDaysList()
        this.clearMark()
        // this.calcTagPlace()
        // 初始化配置位置项
        // debugger
        if (this.currPlace === 'end') {
          this.currPoint = this.num
          this.forward()
        } else if (this.currMark && this.currMark > 0) {
          this.resiteCurrTimeLinePlace() // 重新计算位置
          this.forward()
        } else {
          this.calcPlayTime(true) // 初始化计算
        }
      })
    },
    calcTagPlace () { // 计算天的位置
      const date1 = moment(this.startTime, this.formartDate)
      const date2 = moment(this.endTime, this.formartDate)
      let date3 = date2.diff(date1, this.type) // 计算相差的分钟数
      let h = Math.floor(100 / (Math.floor(date3 / 24)))
      this.tagWidth = h
    },
    resiteCurrTimeLinePlace () {
      this.currPoint = this.currMark <= this.num ? (this.currMark <= 0 ? 0 : this.currMark) : this.num
      this.containerWidth = this.$el.clientWidth // 设置进度条总的宽度
      this.markWidth = this.containerWidth / this.num // 计算出单个的刻度的宽度值
      this.currTimeLineWidth = this.markWidth * this.currPoint
    },
    clearMark () { // 清除进度条位置
      this.currPoint = 0
      this.resiteCurrTimeLinePlace()
    },
    resiteContainer () { // 重新计算时间进度条的宽度
      this.$nextTick(function () {
        this.containerWidth = this.$el.clientWidth // 设置进度条总的宽度
        this.markWidth = this.containerWidth / this.num // 计算出单个的刻度的宽度值
      })
    },
    getDaysList () { // 获取天数的列表
      const date1 = moment(this.startTime)
      const date2 = moment(this.endTime)
      const date3 = date2.diff(date1, this.type) // 计算两个时间的时间差
      let daysNum = null
      for (let i = 0; i <= date3; i++) {
        let date = moment(moment(date1).add(this.type, i).format(this.formartDate))
        let nDays = date.get('date')
        let arr = {
          year: date.get('year'),
          // month: date.get('month') + 1 > 9 ? date.get('month') + 1 : `0${date.get('month') + 1}`,
          month: date.get('month') + 1,
          day: daysNum !== nDays ? nDays : '',
          hours: date.get('hour') || '',
          minutes: date.get('minutes') || ''
        }
        if (i === 0) {
          arr.day = nDays
        }
        if (daysNum !== nDays) {
          daysNum = nDays
        }
        this.daysList.push(arr)
      }
    },
    calcPlayTime (fg) { // 计算当前的播放时间
      let date
      if (fg) { // 前进
        // debugger
        let step = this.currPoint === 0 ? this.timeSpace : this.currPoint * this.timeSpace
        if (this.currPoint === 1) { // 第一个时间刻度，重置为开始时间
          date = moment(this.startTime).format(this.formartDate)
        } else { // 以开始时间为基准，递增步长值
          if (this.config.type === 'hours') {
            step = step - 1
          }
          date = moment(moment(this.startTime).add(this.type, step)).format(this.formartDate)
        }
      } else { // 后退
        if (this.currPoint === 1) {
          date = moment(this.startTime).format(this.formartDate)
        } else {
          date = moment(moment(this.currTime).subtract(this.type, this.timeSpace)).format(this.formartDate)
        }
      }
      this.currTime = date
      console.log(this.currTime)
      // this.back() // 判断是否可以后退
      this.$emit('notify', this.currTime, this.currPoint)
    },
    // 判断时间轴的后退按钮的是否有效，fg == false 则是否给当前进度点赋值
    judgeDirectBack (fg = true) {
      let nCurrPoint = this.currPoint - 1
      let currPoint = nCurrPoint <= 1 ? 0 : nCurrPoint // 后退结束的判断
      this.isBack = currPoint <= 1 // 是否可后退判断
      if (fg) {
        this.currPoint = currPoint
      }
      this.currTimeLineWidth = this.markWidth * this.currPoint > this.$el.clientWidth ? this.$el.clientWidth : this.markWidth * this.currPoint
    },
    back () { // 后退
      this.resiteContainer()
      this.judgeDirectBack() // 判断是否可以后退
      this.isPrev = false // 开启前进按钮
      this.calcPlayTime(false)
    },
    // 判断时间轴的前进按钮的是否有效，fg == false 则是否给当前进度点赋值
    judgeDirectforWard (fg = true) {
      let nCurrPoint = this.currPoint + 1
      let currPoint = nCurrPoint >= this.num ? this.num : nCurrPoint // 前进结束的判断
      this.isPrev = currPoint >= this.num // 是否可前进判断
      if (fg) {
        this.currPoint = currPoint
      }
      this.currTimeLineWidth = this.markWidth * this.currPoint
    },
    forward () { // 前进
      this.resiteContainer()
      this.judgeDirectforWard() // 判断是否可以向前
      this.isBack = false // 开启后退按钮
      this.calcPlayTime(true)
      if (this.currPoint >= this.num) {
        this.isPlay = false
      }
    },
    tooglePlayPause () { // 切换播放和暂停的选项
      if (this.currPoint >= this.num) {
        this.isPlay = false // 播放
        this.currPoint = -1 // 从头播放
      }
      this.isPlay = !this.isPlay
    },
    play () { // 播放进度条
      let that = this
      this.playSettimoutObj = setInterval(function () {
        that.forward()
      }, this.playTime)
    },
    pause () { // 暂停播放
      clearInterval(this.playSettimoutObj)
      this.isPlay = false
    }
  }
}
</script>
<style scoped lang="scss">
.el-time-line{
  .el-time-play-btn{
    display: flex;
    justify-content: center;
    background: #dedfe2;
  }
  .time-line,.curr-time-line{
    height: 10px;
    border-radius: 10px;
  }
  .time-line{
    width: 100%;
    background:#dedfe2;
  }
  .curr-time-line{
    background: #15559a;
    width: 50%;
  }
  .time-tag{
    width: 100%;
    font-size: 14px;
    color: #7d8097;
    display: flex;
    justify-content: space-between;
    margin-top: 5px;
    span{
      display: inline-block;
      text-align: center;
      white-space: nowrap;      
      height: 19px;      
      position: relative;      
      .i {
        color: #999;
        position: absolute;
        top: -17px;
        left: 0;
        cursor: pointer;
        height: 12px;
        text-align: right;
        overflow: hidden;
        width: 100%;
      }
    }
  }
  .play-btn-group{
    width: 130px;
    .prev-btn,.next-btn{
      border: solid 2px #dedfe2;
      border-radius: 9px;
      cursor: pointer;
      margin-top: 5px;
      vertical-align: middle;
      width: 18px;
      height: 18px;
      font-weight: bold;
    }
    button{
      text-align: center;
      padding: 0;
      background: #fff;
      &.acitve{
        color: #15559a;
        border: solid 2px #15559A;
      }
    }
    .play-btn{
      width: 30px;
      height: 30px;
      font-size: 25px;
      border: 0;
      padding: 0;
      margin: 5px 28px 0 28px;
      vertical-align: middle;
      background: #fff;
      color: #15559a;
    }
  }
}

</style>
