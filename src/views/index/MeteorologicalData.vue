<!--
 * @Author: zyl
 * @Date: 2022-12-12 16:03:30
 * @LastEditors: zyl zyl14730@cnki.net
 * @LastEditTime: 2023-01-06 17:15:02
 * @Description: 
-->
<template>
  <div class="container">
    <p class="title">
      <img src="./weather.png" />
      <span>
        实时气象数据
      </span>
    </p>
    <el-row v-for="(item, index) in list" :key="`row${index}`">
      <el-col :span="12"><span>{{ item.label }}</span></el-col>
      <el-col :span="7"><span class="data">{{ data[item.data] }}</span></el-col>
      <el-col :span="5"><span>{{ item.unit }}</span></el-col>
    </el-row>
    <!--国家能源网站链接-->
    <div class="link">
      <div class="title">
        <img src="./link.png" />
        <span>相关链接</span>
      </div>
      <span class="link-left">国家能源局 ></span>
      <span class="link-right">中国能源网 ></span>
      <span class="link-left">全国能源信息平台 ></span>
      <span class="link-right">光伏网 > </span>


    </div>
  </div>
</template>
<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    data: {
      type: Object,
      default: () => { },
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
  border: 1px solid #e0e0e0;
  font-size: 18px;
  font-weight: 500;
  border-radius: 8px 8px 8px 8px;
  box-shadow:
    6.3px 6.3px 12.5px rgba(0, 0, 0, 0.03),
    50px 50px 100px rgba(0, 0, 0, 0.06);
  position: relative;

  .link {
    position: absolute;
    top: 445px;
    left: 0;
    border: 1px solid #e0e0e0;
    width: 100%;
    height: 30%;
    border-radius: 8px 8px 8px 8px;
    box-shadow:
      6.3px 6.3px 12.5px rgba(0, 0, 0, 0.03),
      50px 50px 100px rgba(0, 0, 0, 0.06);

    .title {
      text-align: center;
      line-height: 40px;
      height: 40px;
      color: #036AC9;
      font-weight: 600;
      font-size: 20px;

      img {
        width: 30px;
        margin-top: 5px;
        margin-left: -15px;
        margin-right: 3px;
      }
    }

    .link-left {
      border-bottom: 1px solid black;
      font-size: 17px;
      float: left;
      margin: 5px 0 5px 30px;

    }

    .link-right {
      border-bottom: 1px solid black;
      font-size: 17px;
      float: right;
      margin: 5px 30px 5px 0px;


    }
  }
}

.title {
  border-bottom: 1px solid #e0e0e0;
  text-align: center;
  line-height: 60px;
  height: 60px;
  color: #036AC9;
  font-weight: 600;
  font-size: 20px;

  img {
    width: 32px;
    margin-top: 13px;
  }

  span {
    margin-left: -2px;
  }
}

.el-row {
  border-bottom: 1px solid #e0e0e0;
  height: 52px;
  line-height: 52px;
  padding: 0 30px;
  font-size: 17px;
}

.data {
  color: @mainColor;
}
</style>
