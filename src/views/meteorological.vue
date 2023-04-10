<!--
 * @Author: zyl
 * @Date: 2022-12-08 17:29:45
 * @LastEditors: zyl zyl14730@cnki.net
 * @LastEditTime: 2023-01-12 16:12:48
 * @Description: 气象数据页面
-->
<template>
  <div>
    <div>
      <el-date-picker size="medium" v-model="date" type="date" :picker-options="pickerOptions" :clearable="false"
        @change="changeDate" value-format="timestamp">
      </el-date-picker>
      <el-button type="primary" size="medium" @click="search" style="margin-left: 20px">查询</el-button>
    </div>
    <div class="content-container">
      <div class="btn-group">
        <el-button size="medium" v-for="item in options" type="primary" :key="item.value"
          :plain="activeOption.value === item.value ? false : true" @click="clickOption(item)">{{ item.label
          }}</el-button>
      </div>
      <line-chart :key="activeOption.value" v-if="lineData[1].data.length" :yAxis="yAxis" :xAxis="xAxis" :list="lineData"
        style="width: 80%"></line-chart>
    </div>
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
      list: {}, //气象数据
      activeOption: {
        label: "太阳辐照度",
        value: "sun",
        unit: "W/㎡",
      },
      options: [
        {
          label: "太阳辐照度",
          value: "sun",
          unit: "W/㎡",
        },
        {
          label: "环境温度",
          value: "env_temperature",
          unit: "℃",
        },
        {
          label: "环境湿度",
          value: "env_humidity",
          unit: "%RH",
        },
        {
          label: "组件温度",
          value: "com_temperature",
          unit: "℃",
        },
        {
          label: "露点温度",
          value: "point_temperature",
          unit: "℃",
        },
        {
          label: "风速",
          value: "wind_speed",
          unit: "m/s",
        },
        {
          label: "风向",
          value: "wind_direction",
          unit: "°",
        },
      ],
      yAxis: [
        {
          type: "value",
          name: "发电功率(MW)",
          min: 0,
          max: 0,
        },
        {
          type: "value",
          name: "太阳辐照度",
          min: 0,
          max: 0,
        },
      ],
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: [],
      },
      lineData: [
        {
          name: "实测功率（MV）",
          type: "line",
          yAxisIndex: 0,
          smooth: true,
          data: [],
        },
        {
          name: "",
          type: "line",
          yAxisIndex: 1,
          smooth: true,
          data: [],
        },
      ],
      pickerOptions: {
        //只能选前7天
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
    };
  },
  components: {
    lineChart,
  },
  watch: {
    "activeOption.value": {
      handler(newVal) {
        console.log(newVal);
        this.options.map((item) => {
          if (newVal === item.value) {
            this.lineData[1].name = item.label;
            this.lineData[1].data = this.list[item.value];
            this.yAxis[1].name = `${item.label}(${item.unit})`;
            this.yAxis[1].max = Math.max(...this.list[item.value]);
            this.yAxis[1].min =
              Math.min(...this.list[item.value]) >= 0
                ? 0
                : Math.min(...this.list[item.value]);
          }
        });
      },
    },
  },
  methods: {
    changeDate(e) {
      console.log(this.date);
    },
    async search() {
      let now = new Date(); //当前日期
      let time = Math.floor((now - this.date) / (1000 * 60 * 60 * 24)); //当前日期距离查询结束日期的天数（判断数据表用）
      this.activeOption = {};
      await this.getData(time);
      this.activeOption = {
        label: "太阳辐照度",
        value: "sun",
        unit: "W/㎡",
      };
    },
    clickOption(value) {
      this.activeOption = value;
    },
    async getData(no) {
      const { data } = await getHistoryMeteorologicalData({ no: no });
      this.options.map((option) => {
        this.list[option.value] = [];
      });
      let time = [];
      let measuredPower = [];
      data.data.map((item) => {
        time.push(item.time);
        this.options.map((option) => {
          this.list[option.value].push(item[option.value]);
        });
        measuredPower.push(item.measured_power);
      });
      this.xAxis.data = time;
      this.lineData[1].name = "太阳辐照度";
      this.lineData[1].data = this.list.sun;
      this.lineData[0].data = measuredPower;
      this.yAxis[0].max = Math.max(...measuredPower);
      this.yAxis[0].min =
        Math.min(...measuredPower) >= 0 ? 0 : Math.min(...measuredPower);
      this.yAxis[1].max = Math.max(...this.list.sun);
      this.yAxis[1].min =
        Math.min(...this.list.sun) >= 0 ? 0 : Math.min(...this.list.sun);
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
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/variables.less";



.content-container {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}

.btn-group {
  display: flex;
  flex-direction: column;
  width: 10%;
  margin: 30px 0 0 50px;


  .el-button {
    width: 110px;
    font-size: 15px;
  }
}

.el-button+.el-button {
  margin-left: 0;
  margin-top: 10px;
}
</style>
