<!--
 * @Author: zyl
 * @Date: 2022-12-08 17:29:25
 * @LastEditors: zyl zyl14730@cnki.net
 * @LastEditTime: 2023-01-12 16:12:51
 * @Description: 功率展示页面
-->
<template>
  <div>
    <el-date-picker size="medium" v-model="date" :picker-options="pickerOptions" :clearable="false" @change="changeDate"
      value-format="timestamp">
    </el-date-picker>
    <el-button type="primary" size="medium" @click="search" style="margin-left: 20px">查询</el-button>
    <line-chart v-if="xAxis.data.length" :key="dateString" :yAxis="yAxis" :xAxis="xAxis" :list="lineData"
      style="margin-top: 20px"></line-chart>

    <el-table :data="tableList" border :header-cell-style="{ background: '#F2F2F2' }">
      <el-table-column prop="time" label="时间">
        <template slot-scope="scope">
          {{ `${dateString} ${scope.row.time}` }}
        </template>
      </el-table-column>
      <el-table-column prop="measured_power" label="实测功率">
      </el-table-column>
      <el-table-column prop="s_pre_power" label="短期预测功率">
      </el-table-column>
      <el-table-column prop="ss_pre_power" label="超短期预测功率">
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
import lineChart from "@/components/lineChart.vue";
import { getHistoryMeteorologicalData } from "@/api/index";
import { timestampToTime } from "@/utils/tools";
export default {
  data() {
    return {
      date: "",
      dateString: "",
      pickerOptions: {
        disabledDate: (time) => {
          let now = Date.now();
          let seven = 60 * 60 * 24 * 8 * 1000;
          let sevenDays = now - seven;
          return (
            time.getTime() > now - 60 * 60 * 24 * 1000 ||
            time.getTime() < sevenDays
          );
        },
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: [],
      },
      yAxis: {
        type: "value",
      },
      lineData: [
        {
          name: "实测功率（MV）",
          type: "line",
          smooth: true,
          data: [],
        },
        {
          name: "短期预测功率（MV）",
          type: "line",
          smooth: true,
          data: [],
        },
        {
          name: "超短期预测功率（MV）",
          type: "line",
          smooth: true,
          data: [],
        },
      ],
      tableList: [],
    };
  },
  components: {
    lineChart,
  },
  methods: {
    changeDate(e) {
      console.log(timestampToTime(e));
    },
    async search() {
      let now = new Date(); //当前日期
      let time = Math.floor((now - this.date) / (1000 * 60 * 60 * 24)); //当前日期距离查询结束日期的天数（判断数据表用）
      await this.getData(time);
      this.dateString = timestampToTime(this.date);
    },
    async getData(no) {
      const { data } = await getHistoryMeteorologicalData({ no: no });
      this.tableList = data.data;
      let timeList = [];
      let measuredPower = [];
      let sPrePower = [];
      let ssPrePower = [];
      data.data.map((item) => {
        timeList.push(item.time);
        measuredPower.push(item.measured_power);
        sPrePower.push(item.s_pre_power);
        ssPrePower.push(item.ss_pre_power);
      });
      this.lineData[0].data = measuredPower;
      this.lineData[1].data = sPrePower;
      this.lineData[2].data = ssPrePower;
      this.xAxis.data = timeList;
    },
  },
  mounted() {
    this.getData(1);
  },
  created() {
    //获取当前日期，筛选框默认为昨天
    let year = new Date().getFullYear();
    let month = new Date().getMonth();
    let day = new Date().getDate();
    let d = `${year}-${month + 1}-${day}`;
    this.date = new Date(d).valueOf() - 86400000;
    this.dateString = timestampToTime(this.date);
  },
};
</script>

<style lang="less" scoped></style>
