<template>
  <div>
    <el-table
      :empty-text="emptyText"
      ref="table"
      border
      highlight-current-row
      lazy
      :data="data"
      :sum-text="summary ? summary.sumText ? summary.sumText : '合计' : '合计'"
      :show-summary="summary ? summary.showSummary ? summary.showSummary : false : false"
      :summary-method="summary ? summary.summaryMethod ? summary.summaryMethod : '' : ''"
      :default-sort="defaultSort"
      :cell-class-name="cellClassSet"
      :cell-style="cellStyleSet"
      @row-click="handleRowClick"
      @cell-click="handleCellCilck"
      @selection-change="handleCheckBoxSelection"
      @current-change="handleCurrentChange"
      @sort-change="handleSortChange"
      @select-all="selectAllSelection"
    >
      <!-- 多选框 -->
      <el-table-column :selectable="selectable" v-if="selecCheck" type="selection" width="50" align="center">
      </el-table-column>
      <!-- 单选框 -->
      <el-table-column v-if="selectRadio" width="80" align="center">
        <template slot-scope="scope">
            <el-radio v-model="radioSelectVal"
            @click.stop.native="handleRadioSelectRow($event,scope.$index,scope.row)" 
            :label="scope.$index"
            :value="scope.$index"></el-radio>
        </template>
      </el-table-column>
      <!-- 序号 -->
      <el-table-column
        label="序号"
        type="index"
        width="80"
        align="center"
        v-if="isShowIndex"
        :index="indexMethod"
      ></el-table-column>
      <!-- 其他有配置的列 -->
      <el-table-column
        v-for="(item,index) in config"
        :key="index"
        :prop="item.value"
        :label="item.label"
        :width="item.width"
        :formatter="item.formatter || null"
        :filters="item.filter ? item.filter.filters : null"
        :filter-method="item.filter ? item.filter.filterHandler : null"
        :sortable="item.sort ? 'custom' : false"
        :show-overflow-tooltip="item.tooltip"
        :align="item.align || 'center'"
        cell-class-name="item.cellClassName"
      >
        <template slot-scope="scope">
          <!-- input -->
          <el-input
            v-if="item.type === 'input'"
            v-model="scope.row[item.value]"
            @keyup.enter.native="handleInputConfirm(scope.row)"
            @blur="handleInputConfirm(scope.row)"
          ></el-input>

          <!-- button -->
          <el-button
            type="text"
            v-if="item.type === 'button'"
            @click.stop.native="handleButtonClick(scope.row)"
          >{{ scope.row[item.value] }}
          </el-button>

          <!-- image -->
          <div v-if="item.type === 'image'" class="table-column-image-wrap">
            <el-image style="width: 100%; height: 90px;" :src="scope.row[item.value]" alt></el-image>
            {{ scope.row[item.value] }}
          </div>

          <!-- switch -->
          <el-switch
            v-if="item.type === 'switch'"
            v-model="scope.row[item.value]"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="handleSwitch(scope.row)"
          ></el-switch>

          <!-- 没有功能，只做展示 -->
          <template v-if="item.isHtml">
            <div v-html="item.formatter(scope.row, scope.column)"></div>
          </template>
          <span :class="item.cellClassName" v-if="!item.type && !item.isHtml">{{ scope.row[item.value] }}</span>
        </template>
      </el-table-column>
      <el-table-column
        v-if="operating"
        :width="operatingWidth"
        label="操作"
        fixed="right"
        align="center"
      >
        <template slot-scope="scope">
          <slot :row="scope.row"></slot>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="m-t-10 text-center"
      v-if="isPagination"
      background
      @current-change="handlePageCurrentChange"
      @size-change="handleSizeChange"
      :page-sizes="[10, 20, 30, 40]"
      :current-page="pageNum"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: 'BaseTable',
  data () {
    return {
      radioSelectVal: this.radioSelect,
      checkboxSelectVal: this.selecCheckBox
    }
  },
  props: {
    emptyText: { // 暂无数据提示
      type: String,
      default: '加载中...'
    },
    isPagination: { // 是否有分页组件
      type: Boolean,
      default: false
    },
    radioSelect: { // 设置勾选中的 radio
      type: String,
      default: ''
    },
    selectableSite: { // 设置表格初始化 checkBox 哪些可编辑
      type: Array,
      required: false
    },
    selecCheckBox: { // 是否有checkbox
      type: Boolean,
      default: false,
    },
    selecCheckBoxList: { // 设置勾选中的 checkBox
      type: Array,
      default: () => {
        return []
      }
    },
    defaultSort: { // 默认的排序字段值设置
      type: Object,
      default: () => {
        return {}
      }
    },
    data: { // 表格数据
      type: Array,
      require: true,
      default: () => {
        return []
      }
    },
    config: {
      type: Array,
      required: true
    },
    // 表格是否支持序号
    isShowIndex: {
      type: Boolean,
      default: false
    },
    // 表格是否有合计行
    summary: {
      type: Object,
      default: () => {
        return {}
      }
    },
    // 设置具体单元格的ClassName
    cellClassSet: {
      type: Function,
      require: false
    },
    // 设置具体单元格的样式
    cellStyleSet: {
      type: Function,
      require: false
    },
    // 分页使用
    // 分页 - 用于计算序号
    pageNum: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 10
    },
    total: {
      type: Number,
      default: 1
    },
    // 表格单选
    selectRadio: {
      type: Boolean,
      default: false
    },
    // 是否可显示 checkBox
    selecCheck: {
      type: Boolean,
      default: false
    },
    // 表格是否支持操作
    operating: {
      type: Boolean,
      default: false
    },
    operatingWidth: {
      type: Number,
      default: 100
    }
  },
  watch: {
    data () {
      // if (this.data.length === 0) {
      //   this.emptyText = '暂无数据'
      // }
    }
  },
  methods: {
    // formatter (row, column) {
    //   this.$emit('formatterCell', row, column)
    // },
    indexMethod (index) {
      return (this.pageNum - 1) * this.pageSize + (index + 1)
    },
    // row
    handleRowClick (row) {
      this.$emit('rowClick', row)
    },
    // 单元格点击获取值
    handleCellCilck (row, column, cell, event) {
      this.$emit('getCellCilck', row, column, cell, event)
    },
    // input
    handleInputConfirm (row) {
      this.$emit('inputConfirm', row)
    },
    // button
    handleButtonClick (row) {
      this.$emit('buttonClick', row)
    },
    // switch
    handleSwitch (row) {
      this.$emit('switchChange', row)
    },
    // 获取复选框选中的相关信息
    handleCheckBoxSelection (val) {
      this.$emit('getCheckBoxSelection', val)
    },
    // 当前行被改变的时候触发
    handleCurrentChange (currentRow, oldCurrentRow) {
      this.$emit('currentChange', currentRow)
    },
    handleSortChange ({column, prop, order}) {
      this.$emit('getSortChange', {column, prop, order})
    },
    selectAllSelection (selection) {
      this.$emit('getAllSelection', selection)
    },
    // 获取单选框选中的行信息
    handleRadioSelectRow (e, index, row) {
      if (e.target.tagName === 'INPUT') return
      this.$emit('getRadioSelectRow', index, row)
    },
    selectable (row, index) { // 初始化，哪些行checkbox可选
      if (this.selectableSite) {
        let fg = true
        this.selectableSite.forEach(itm => {
          if (row[itm.key] === itm.val) {
            fg = true
          } else {
            fg = false
          }
        })
        return fg
      } else {
        return true
      }
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.$emit('changePageSize', val)
    },
    handlePageCurrentChange (val) {
      this.pageNum = val
      this.$emit('changePageNum', val)
    }
  }
}
</script>

<style type="text/css" scoped>
  .app-base-page .demo-select .el-select {
    width: inherit;
  }
</style>
