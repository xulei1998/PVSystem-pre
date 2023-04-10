<!--
 * @Author: zyl
 * @Date: 2022-12-12 18:49:30
 * @LastEditors: zyl zyl14730@cnki.net
 * @LastEditTime: 2023-01-06 16:49:45
 * @Description: 
-->
<template>
  <div class="container">
    <div class="label">{{ label }}</div>
    <div class="data">{{ data }}</div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      default: "",
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/variables.less";

.container {
  width: 18%;
  border: 1px solid #666666;
  border-left: 15px solid @mainColor;
  margin-right: 2%;
  margin-left: 3%;
  text-align: center;

}

.data {
  color: @mainColor;
  font-size: 20px;
  height: 30px;
  line-height: 30px;

}

.label {
  height: 30px;
  line-height: 30px;
  font-size: 17px;
}
</style>
