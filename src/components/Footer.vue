<!--
 * @Author: zyl
 * @Date: 2022-12-14 15:20:27
 * @LastEditors: zyl zyl14730@cnki.net
 * @LastEditTime: 2022-12-15 17:51:56
 * @Description: 
-->
<template>
  <div class="container" style="height:70px;margin-top:-10px;">
  <!--
              <div class="item-container">
                <span><i class="el-icon-circle-check">气象监测正常</i></span>&nbsp;
                <span><i class="el-icon-circle-check">NWP解析正常</i></span>&nbsp;
                <span><i class="el-icon-circle-check">实测功能正常</i></span>&nbsp;
                <span><i class="el-icon-circle-check">预测模型正常</i></span>&nbsp;
              </div>
          -->
    <div style="margin-top: 0px;font-size: 16px;">
      Copyright © 2022 &nbsp;&nbsp;| &nbsp;&nbsp;联系我们 &nbsp;&nbsp;| &nbsp;&nbsp;加入收藏 &nbsp;&nbsp;| &nbsp;&nbsp;当前版本：V1.0
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
@import "~@/styles/variables.less";

.container {
  height: 100%;
  background: @mainColor;
  text-align: center;
  color: #ffffff;
  font-size: 13px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
}

.item-container {
  :not(:first-child) {
    margin-left: 10px;
  }


  margin-bottom: -10px;
}
</style>
