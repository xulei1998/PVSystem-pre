<!--
 * @Author: zyl
 * @Date: 2022-12-13 16:00:54
 * @LastEditors: zyl zyl14730@cnki.net
 * @LastEditTime: 2023-01-12 16:07:44
 * @Description: 
-->
<template>
  <div class="container">
    <div class="title-container">
      <div class="title">{{ title }}</div>
    </div>
    <div class="item-container">
      <div v-for="(item, index) in labelList" :key="`${title}-${index}`" class="item">
        <span class="num1">{{ item.label }}</span>
        <span class="num2">{{ list[item.data] ? list[item.data] : item.data }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
    list: {
      type: Object,
      default: () => { },
    },
  },
  data() {
    return {
      labelList: [
        {
          label: "平均绝对误差",
          data: "mean",
        },
        {
          label: "均方根误差",
          data: "rootMeanSquare",
        },
        {
          label: "准确率",
          data: "accuracy",
        },
        {
          label: "合格率",
          data: "100",
        },
      ],
    };
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/variables.less";

.container {
  display: flex;

}

.item {
  position: relative;
}

.num1 {
  position: absolute;
  top: 0px;
  left: 10px;
  color: #333;
}

.num2 {
  position: absolute;
  top: 0px;
  left: 165px;
  color: #333;
}

.title-container {
  width: 18%;
  height: 190px;
  background: @mainColor;
  position: relative;
}

.title {
  width: 18px;
  color: #fff;
  font-size: 18px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.item-container {
  border-top: 1px solid #e0e0e0;
  width: 80%;
}

.item {
  border-bottom: 1px solid #e0e0e0;
  height: 46px;
  line-height: 46px;
  padding-left: 10px;
}
</style>
