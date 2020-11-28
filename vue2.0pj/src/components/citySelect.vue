<template>
  <div class="el-city-select d-i-b">
    <div class="el-muilt-select-city" @click.stop="closeDrop=false">
      <div>
        <span class="d-i-b" v-show="showSelectName.length>0">
          {{ showSelectName[showSelectName.length - 1] }}
          <i v-show="showSelectName.length>0" class="el-icon-close" @click.stop="handleIconClick"></i>
        </span>
        <b class="d-i-b" v-show="showSelectName.length>0 && muilt">{{ showSelectName.length }}</b>
      </div>
      <b class="d-i-b clear-btn pull-right f-12" v-show="showSelectName.length>0 && muilt" @click.stop="clearSelect">X</b>
    </div>
    <el-card class="box-card" v-show="closeDrop===false">
      <div>
        <div class="query-key">
          <div class="title1 f-b g-373737 m-b-10">
            按省份
            <i class="closeWindow" @click="closeWindow">X</i>
          </div>
          <span class="c-p" v-for="item in pinyin" :key="item" :class="currKey === item?'active':''"
                @click="queryForPy(item)">
             {{ item }}
          </span>
          <b class="f-w-n" @click="queryForPy()">清空</b>
        </div>
        <div class="city-list">
          <div v-for="province in source" :key="province.citycode" class="text">
            <div class="m-t-20 f-14">
              <i class="d-i-b"></i>{{ province.cityname }}
              <b class="pull-right province-key f-w-n">{{ province.provincename_phoneticize }}</b>
            </div>
            <span class="d-i-b circle-radio c-p" :class="province.hasAllSelect ? 'active' : '' "
                  @click="selectAllProvince(province.cityname,$event)"></span>
            <div class="d-i-b">
              <span @click="handleSelect(city,$event)" class="f-14 c-p" v-for="city in province.children"
                    :key="city.citycode" :class="showSelectName.join(',').includes(city.cityname)?'active':''">
              {{ city.cityname }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
import city from '@/mock/city'
export default {
  name: 'citySelect',
  mixins: [city],
  data () {
    return {
      pinyin: ['A', 'B', 'C', 'D', 'F', 'G', 'H', 'J', 'L', 'N', 'Q', 'S', 'T', 'X', 'Y', 'Z'],
      source: [], // 记录的返回数据
      sourceCopy: [], // 返回数据备份
      showSelectName: [], // input框内回显的选中城市值
      value: [], // 记录的选中的值
      closeDrop: true, // 是否关闭下拉菜单
      currKey: '' // 当前选中的拼音
    }
  },
  props: {
    muilt: {
      default: false,
      type: Boolean
    },
    dafaultValue: { // 初始设置默认值
      default () {
        return []
      },
      type: Array
    }
  },
  mounted () {
    this.querySearch()
    document.addEventListener('click', (e) => { // 增加点击其他空白区域收起多选面板
      if (!this.$el.contains(e.target)) this.closeDrop = true
    })
  },
  methods: {
    closeWindow () { // 关闭弹窗
      this.closeDrop = true
    },
    setDefault () { // 初始化设置默认显示
      let that = this
      if (this.dafaultValue.length > 1) {
        this.muilt = true // 重置成多选项
      }
      if (this.dafaultValue.length > 0) {
        this.source.forEach(item => {
          if (item.children) {
            item.children.forEach(itm => {
              that.dafaultValue.forEach(im => {
                if (im === itm.citycode) {
                  // that.handleSelect(itm)
                  that.showSelectName.push(itm.cityname)
                  that.value.push(itm)
                }
              })
            })
          }
        })
      }
      this.$emit('getValue', this.value)
    },
    querySearch () {
      let that = this
      this.cityList.forEach(item => {
        item.hasAllSelect = false
      })
      that.source = this.cityList
      that.sourceCopy = JSON.parse(JSON.stringify(that.source))
      that.setDefault() // 设置默认值
      // queryCityTreeAll({}).then((response) => {
      //   if (response.data.code === 0) {
      //     response.data.data.forEach(item => {
      //       item.hasAllSelect = false
      //     })
      //     console.log('1', response)
      //     that.source = response.data.data
      //     that.sourceCopy = JSON.parse(JSON.stringify(that.source))
      //     that.setDefault() // 设置默认值
      //   }
      // })
    },
    delArrStrItem (arr, item, key) { // 删除数组中多余选中值
      let newArr = []
      arr.forEach(im => {
        if (im !== item[key]) {
          newArr.push(im)
        }
      })
      return newArr
    },
    delArrItem (arr, item, key) { // 删除数组中多余选中值
      let newArr = []
      arr.forEach(im => {
        if (im[key] !== item[key]) {
          newArr.push(im)
        }
      })
      return newArr
    },
    toogleCitySelect (fg, name) { // 切换选中城市
      let that = this
      this.sourceCopy.forEach(item => {
        if (item.cityname === name) {
          item.children.map(im => {
            if (fg) {
              that.remCity(im)
            } else {
              that.showSelectName = that.delArrStrItem(that.showSelectName, im, 'cityname')
              that.value = that.delArrItem(that.value, im, 'cityname')
            }
          })
        }
      })
      this.$emit('getValue', this.value)
    },
    selectAllProvince (name, event) { // 选中全省
      let fg // 判断是增加还是减少选中城市的标识
      if (!event.target.className.includes('active')) { // 未选中
        event.target.className = 'd-i-b circle-radio active'
        fg = true
      } else { // 取消选中省份
        event.target.className = 'd-i-b circle-radio c-p'
        fg = false
      }
      this.toogleCitySelect(fg, name)
      this.checkProvince(name, fg)
    },
    remCity (item) { // 全选省份记录城市
      let str = this.showSelectName.join(',')
      let remfg = false
      if (!str.includes(item.cityname)) { // 回显城市名去重
        this.showSelectName.push(item.cityname)
      }
      this.value.forEach(im => {
        if (im.cityname === item.cityname) {
          remfg = true
        }
      })
      if (!remfg) {
        this.value.push(item)
      }
      this.$emit('getValue', this.value)
    },
    checkProvince (name, fg) { // 勾选对应的省
      let lengthCity = 0
      let lengthProvince = 0
      this.value.forEach(item => {
        if (item['provincename'] === name) {
          lengthCity++
        }
      })
      for (let i = 0; i < this.source.length; i++) {
        lengthProvince = 0
        let item = this.source[i]
        if (item['cityname'] === name) {
          lengthProvince = item.children.length
          if (lengthCity === lengthProvince) {
            this.$set(this.source[i], 'hasAllSelect', fg)
            return
          }
        }
      }
    },
    handleSelect (item, event) { // 存储选中的值
      if (!this.muilt) {
        this.showSelectName = []
        this.value = []
      }
      if (!event.target.className.includes('active')) { // 未选中
        event.target.className = 'f-14 m-t-10 c-p active'
        this.showSelectName.push(item.cityname)
        this.value.push(item)
        this.checkProvince(item.provincename, true) // 勾选对应的全选省份按钮
      } else { // 取消选中城市
        event.target.className = 'f-14 m-t-10 c-p'
        // this.showSelectName.slice()
        this.checkProvince(item.provincename, false) // 取消勾选对应的全选省份按钮
        this.showSelectName = this.delArrStrItem(this.showSelectName, item, 'cityname')
        this.value = this.delArrItem(this.value, item, 'cityname')
      }
      this.$emit('getValue', this.value)
    },
    handleIconClick () { // 删除最后一个数组数据
      let n = this.showSelectName.length - 1
      this.showSelectName.splice(n, 1)
      this.value.splice(n, 1)
      this.$emit('getValue', this.value)
    },
    queryForPy (str = '') { // 按照拼音进行查询
      this.currKey = str
      if (str === '') {
        this.source = JSON.parse(JSON.stringify(this.sourceCopy))
      } else {
        let nlist = []
        this.sourceCopy.forEach(item => {
          if (item.provincename_phoneticize === str) {
            nlist.push(item)
          }
        })
        this.source = nlist
      }
      this.clearSelect()
    },
    clearSelect () {
      this.showSelectName = []
      this.value = []
      this.$emit('getValue', this.value)
    }
  }
}
</script>
<style scoped lang="scss">
 .b-r-3{
  border-radius: 3px;
}
.el-city-select {
  font-size: 14px;
  position: relative;
  vertical-align: middle;
  .el-muilt-select-city {
    width: 200px;
    height: 28px;
    border: solid 1px #dedfe2;
    padding: 5px;
    display: flex;
    color: #373737;
    justify-content: space-between;
    span{
      max-width: 132px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      background-color: #f4f4f5;
      border:solid 1px #e9e9eb;
      color: #909399;
      padding: 2px 8px;
      font-size: 14px;
      margin-right: 10px;
      @extend .b-r-3;
      .el-icon-close{
        background-color: #C0C4CC;
        border-radius: 10px;
      }
    }
    b{
      font-weight: normal;
      vertical-align: top;
      display: inline-block;
      margin-top: 5px;
    }
    .clear-btn{
       cursor: pointer;
        color: #7d8097;
        border: solid 1px #dedfe2;
        border-radius: 7px;
        padding: 2px 4px;
        line-height: 22px;
        margin-top: 2px;
    }
  }
  .box-card{
    width: 432px;
    overflow: hidden;
    position: absolute;
    z-index: 2;
    height: 300px;
    .el-card__body{
      padding: 10px;
    }
    .query-key{
      border-bottom:solid 1px #dedfe2;
      padding-bottom: 10px;
      color: #7d8097;
      font-size: 12px;
      span{
        margin-right: 10px;
      }
      .active{
        color: #15559a;
      }
      .closeWindow{
        float: right;
        font-style: normal;
        color: #7d8097;
        font-size: 16px;
        font-weight: normal;
        cursor: pointer;
      }
    }
    .text{
      text-align: left;
      div{
        color: #373737;
        width: 362px;
        i{
          width: 4px;
          height: 14px;
          background: #15559A;
          border-radius: 10px;
          vertical-align: top;
          margin: 1px 2px 0 0 ;
        }
        span{
          color: #7d8097;
          margin:7px 10px 0 0;
          display: inline-block;
        }
      }
    }
    .city-list{
      height: 226px;
      overflow: auto;
      .active{
        color: #15559a;
      }
      .province-key{
        color: #7d8097;
      }
      .circle-radio{
        width: 8px;
        height: 8px;
        vertical-align: top;
        background: #dedfe2;
        margin: 10px 5px 0 0;
        border-radius: 5px;
        &.active{
          background: #15559a;
        }
      }
    }
  }
}
.selectCityClass {
  width: 432px;
  overflow: hidden;
  z-index: 2;
  height: 300px;
  .el-card__body{
    padding: 10px;
  }
  .query-key{
    border-bottom:solid 1px #dedfe2;
    padding-bottom: 10px;
    color: #7d8097;
    span{
      margin-right: 10px;
    }
    .active{
      color: #15559a;
    }
    .closeWindow{
      float: right;
      font-style: normal;
      color: #7d8097;
      font-size: 16px;
      font-weight: normal;
      cursor: pointer;
    }
  }
  .text{
    div{
      color: #373737;
      width: 382px;
      i{
        width: 4px;
        height: 14px;
        background: #15559A;
        border-radius: 10px;
        vertical-align: top;
        margin: 1px 2px 0 0 ;
      }
      span{
        color: #7d8097;
        margin:7px 10px 0 0;
        display: inline-block;
      }
    }
  }
  .city-list{
    height: 226px;
    overflow: auto;
    .active{
      color: #15559a;
    }
    .province-key{
      color: #7d8097;
    }
    .circle-radio{
      width: 8px;
      height: 8px;
      vertical-align: top;
      background: #dedfe2;
      margin: 10px 5px 0 0;
      border-radius: 5px;
      &.active{
        background: #15559a;
      }
    }
  }
}
</style>