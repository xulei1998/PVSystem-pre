<!--
 * @Author: zyl
 * @Date: 2022-12-13 10:38:38
 * @LastEditors: zyl zyl14730@cnki.net
 * @LastEditTime: 2023-01-05 16:50:38
 * @Description: 
-->
<template>
  <div id="app">
    <div id="main" style="width: 100%;height:60vh"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  props: {
    yAxis: {
      type: Array | Object,
      required: true,
    },
    xAxis: {
      type: Object,
      required: true,
    },
    list: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {};
  },
  methods: {
    drawChart() {
      // 基于准备好的dom，初始化echarts实例  这个和上面的main对应
      let myChart = this.$echarts.init(document.getElementById("main"));
      // 指定图表的配置项和数据
      let option = {
        tooltip: {
          trigger: "axis",
        },
        legend: {},
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: this.xAxis,
        yAxis: this.yAxis,
        series: this.list,
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
  },
  mounted() {
    this.drawChart();
  },
};
</script>

<style lang="less" scoped>