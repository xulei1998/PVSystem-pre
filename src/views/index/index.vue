<!--
 * @Author: zyl
 * @Date: 2022-12-08 14:39:48
 * @LastEditors: zyl zyl14730@cnki.net
 * @LastEditTime: 2023-01-12 14:00:41
 * @Description: 
-->
<template>
  <div class="index-container">
    <!-- 实时气象数据 -->
    <div class="left-container">
      <meteorological-data :list="mList" :data="mData"></meteorological-data>
    </div>
    <div class="center-container">
      <!-- 中间栏：功率数据 -->
      <div class="card-container">
        <data-card v-for="(item, index) in cardData" :key="`card-${index}`" :label="item.label"
          :data="item.data"></data-card>
      </div>
      <div class="chart-container">
        <!-- 预测图 -->
        <line-chart v-if="xAxis.data.length" :yAxis="yAxis" :xAxis="xAxis" :list="lineData"
          class="chart-left-container"></line-chart>
        <!-- 右侧：误差统计 -->
        <div class="chart-right-container">
          <el-card>
            <div class="pre-card-title">
              <div class="static">
                <img src="./统计.png" />
                <span>
                  误差统计
                </span>
              </div>
              <div class="pre">
                <div class="pre-card-btn" :class="preCardType === 1 ? 'active-btn' : ''" @click="preCardType = 1">
                  昨日
                </div>
                <div class="pre-card-btn" :class="preCardType === 7 ? 'active-btn' : ''" @click="preCardType = 7">
                  前七日
                </div>
              </div>
            </div>
            <pre-card title="短期预测" :list="shortForecastList"></pre-card>
            <pre-card title="超短期预测" :list="ultraShortForecastList" style="margin-top: 30px"></pre-card>
          </el-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MeteorologicalData from "./MeteorologicalData.vue";
import dataCard from "./dataCard.vue";
import lineChart from "@/components/lineChart.vue";
import preCard from "./preCard.vue";
import {
  getMeteorologicalData,
  getHoursChart,
  getShortForecast,
  getUltraShortForecast,
} from "@/api/index";
export default {
  data() {
    return {
      mList: [
        {
          label: "太阳辐照度",
          data: "sun",
          unit: "W/㎡",
        },
        {
          label: "环境温度",
          data: "env_temperature",
          unit: "℃",
        },
        {
          label: "环境湿度",
          data: "env_humidity",
          unit: "%RH",
        },
        {
          label: "组件温度",
          data: "com_temperature",
          unit: "℃",
        },
        {
          label: "露点温度",
          data: "point_temperature",
          unit: "℃",
        },
        {
          label: "风速",
          data: "wind_speed",
          unit: "m/s",
        },
        {
          label: "风向",
          data: "wind_direction",
          unit: "°",
        },
      ],
      mData: {},
      cardData: [
        {
          label: "装机容量",
          data: "20.00 MW",
        },
        {
          label: "实测功率",
          data: "14.65 MW",
        },
        {
          label: "今日累计发电量",
          data: "11万 kwh",
        },
      ],
      yAxis: {
        type: "value",
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: [],
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
      preCardType: 1,
      shortForecastList: {}, //短期预测误差数据
      ultraShortForecastList: {}, //超短期预测误差数据
    };
  },
  components: {
    MeteorologicalData,
    dataCard,
    lineChart,
    preCard,
  },
  watch: {
    preCardType(newVal) {
      this.getShortForecastList(newVal);
      this.getUltraShortForecastList(newVal);
    },
  },
  methods: {
    async getTime() {
      let hours = new Date().getHours();
      let minutes = new Date().getMinutes();
      minutes = Math.floor(minutes / 10) * 10;
      minutes = minutes === 0 ? "00" : minutes;
      //查询实时气象数据
      const { data } = await getMeteorologicalData({
        time: `${hours}:${minutes}`,
      });
      this.mData = data.data;
    },
    //获取24小时功率预测图数据
    async getHoursChartData() {
      const { data } = await getHoursChart();
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
    //获取短期误差数据
    async getShortForecastList(id) {
      const { data } = await getShortForecast({
        end: id,
        start: id,
      });
      this.shortForecastList = data.data[0];
    },
    //获取超短期误差数据
    async getUltraShortForecastList(id) {
      const { data } = await getUltraShortForecast({
        id: id,
      });
      this.ultraShortForecastList = data.data;
    },
  },
  mounted() {
    this.getTime();
    this.getHoursChartData();
    this.getShortForecastList(1, 1);
    this.getUltraShortForecastList(1);
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/variables.less";

.static {
  font-size: 20px;
  color: #036AC9;
  font-weight: 600;

  img {
    width: 30px;
  }

  span {
    margin-left: -3px;
  }
}



.index-container {
  display: flex;
}

.left-container {
  width: 20%;
}

.center-container {
  width: 77%;
  margin-left: 3%;
}

.chart-container {
  display: flex;
  margin-top: 20px;
}

.chart-left-container {
  width: 75%;
}

.chart-right-container {
  width: 25%;
  margin-top: -7%;
  padding-top: 0%;
  font-size: 16px;
}

.card-container {
  display: flex;
}

/deep/ .el-card__body {
  padding: 0;
  color: #777;
  border-radius: 8px 8px 8px 8px;
  border: 1px solid #e0e0e0;
  box-shadow: 6.3px 6.3px 12.5px rgba(0, 0, 0, 0.03), 50px 50px 100px rgba(0, 0, 0, 0.06)
}

.pre-card-title {
  padding: 15px 0px;
  display: flex;
  justify-self: center;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;

  .pre {
    display: flex;
    justify-self: center;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
  }
}

.pre-card-btn {
  display: block;
  background: #e2e4e3;
  color: #ffffff;
  cursor: pointer;
  padding: 5px 8px;
  margin: 10px 15px;
  font-size: 14px;
  border-radius: 4px 4px 4px 4px;
}

.active-btn {
  background: @mainColor;
}
</style>
