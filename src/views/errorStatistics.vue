<!--
 * @Author: zyl
 * @Date: 2023-01-04 15:25:30
 * @LastEditors: zyl zyl14730@cnki.net
 * @LastEditTime: 2023-01-12 16:12:42
 * @Description: 
-->
<template>
  <div>
    <el-date-picker size="medium" v-model="date" type="daterange" :picker-options="pickerOptions" :clearable="false"
      range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
    </el-date-picker>
    <el-button type="primary" size="medium" @click="search" style="margin-left: 20px">查询</el-button>
    <el-table :data="tableData" border :header-cell-style="{ background: '#F2F2F2' }" style="margin-top: 20px">
      <el-table-column prop="time" label="时间"> </el-table-column>

      <el-table-column prop="mean" label="短期平均绝对误差">
        <template slot-scope="scope">
          {{ `${scope.row.mean}` }}
        </template>
      </el-table-column>
      <el-table-column prop="rootMeanSquare" label="短期均方根误差">
        <template slot-scope="scope">
          {{ `${scope.row.rootMeanSquare}` }}
        </template>
      </el-table-column>
      <el-table-column prop="accuracy" label="短期平均绝对误差百分比">
        <template slot-scope="scope">
          {{ `${scope.row.accuracy}%` }}
        </template>
      </el-table-column>
      <el-table-column prop="name" label="短期合格率">
        <template> 100% </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { getShortForecast } from "@/api/index";
import { timestampToTime } from "@/utils/tools";
export default {
  data() {
    return {
      tableData: [],
      date: [],
      pickerOptions: {
        //只能选前7天
        disabledDate: (time) => {
          let now = Date.now();
          let seven = 60 * 60 * 24 * 8 * 1000;
          let sevenDays = now - seven;
          return time.getTime() > now || time.getTime() < sevenDays;
        },
      },
      now: new Date(),
    };
  },
  methods: {
    search() {
      let start = this.date[0]; //选择的开始日期
      let end = this.date[1]; //选择的结束日期
      let t1 = Math.floor((this.now - end) / (1000 * 60 * 60 * 24)); //结束日期距今天的天数;
      let t2 = Math.floor((this.now - start) / (1000 * 60 * 60 * 24)); //开始日期距今天的天数;
      console.log(t1);
      console.log(t2);
      this.getData(t1, t2);
    },
    async getData(end, start) {
      const { data } = await getShortForecast({
        end: end,
        start: start,
      });
      this.tableData = data.data;
      this.tableData.map((item) => {
        item.time = timestampToTime(this.now - 1000 * 60 * 60 * 24 * item.id);
      });
    },
  },
  mounted() {
    this.getData(0, 0);
  },
  created() {
    //获取当前日期，筛选框默认为昨天
    let year = new Date().getFullYear();
    let month = new Date().getMonth();
    let day = new Date().getDate();
    let d = `${year}-${month + 1}-${day}`;
    this.date[0] = new Date(d).valueOf();
    this.date[1] = new Date(d).valueOf();
  },
};
</script>
