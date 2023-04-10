<!--
 * @Author: zyl
 * @Date: 2022-12-08 14:55:29
 * @LastEditors: zyl zyl14730@cnki.net
 * @LastEditTime: 2023-01-12 14:10:50
 * @Description: 
-->
<template>
  <el-container>
    <el-header>
      <div class="div-header">
        <p class="p-header">
          <img src="./logo.png" class="logo" />
          <span class="em">PVFS</span>&nbsp;&nbsp;&nbsp;光伏发电功率预测系统
        </p>
        <div class="sign">
          <div class="user">
            <img src="./img-user.png" class="img-user" />
            <a href="https://www.baidu.com/" target="_blank">用户</a>
          </div>
          <div class="help">
            <img src="./img-help.png" class="img-help" />
            <a href="https://www.baidu.com/" target="_blank">帮助</a>
          </div>
          <div class="sign-out">
            <img src="./img-signout.png" class="img-signout" />
            <a href="https://www.baidu.com/" target="_blank" onclick="add_part()">退出</a>
          </div>
        </div>
      </div>
      <el-menu class="el-menu-demo" mode="horizontal" @select="handleSelect" background-color="rgba(100,149,237,0.1)"
        text-color="#333333" active-text-color="#036AC9" :default-active="key">
        <el-menu-item v-for="item in menuList" :index="item.index" :key="item.index">
          {{ item.label }}
        </el-menu-item>
      </el-menu>
    </el-header>
    <el-main>
      <section class="app-main">
        <transition name="fade-transform" mode="out-in">
          <router-view :key="key" />
        </transition>
      </section>
    </el-main>
    <el-footer>
      <Footer></Footer>
    </el-footer>
  </el-container>
</template>

<script>
import Footer from "@/components/Footer.vue";
export default {
  data() {
    return {
      activeIndex: "1",
      menuList: [
        {
          label: "首  页",
          index: "/index",
        },
        {
          label: "气象监控",
          index: "/meteorological",
        },
        {
          label: "功率预测",
          index: "/power",
        },
        {
          label: "误差统计",
          index: "/errorStatistics",
        },
      ],
    };
  },
  components: {
    Footer,
  },
  methods: {
    handleSelect(key) {
      this.$router.push({
        path: key,
      });
    },
  },
  computed: {
    key() {
      return this.$route.path;
    },
  },
};
</script>

<style lang="less" scoped>
.div-header {
  height: 60px;
  line-height: 60px;
  padding-top: 10px;
  padding-bottom: 10px;
  position: relative;
  background-image: url(header.jpg);
  background-repeat: no-repeat;
  background-size: 100% auto;
}

.p-header {
  color: rgb(255, 252, 252);
  font-size: 30px;
  text-shadow: 2px 2px black;
}

.p-header .logo {
  width: 30px;
  height: 30px;
  position: absolute;
  top: 30%;
  left: 35%;
}

.p-header .em {
  font-style: italic;
  font-size: 25px;
  line-height: 25px;
}

.sign {
  /* border: 1px solid green;  */
  display: inline-block;
  position: absolute;
  top: 15px;
  right: 15px;
  font-size: 15px;
  color: color;
}

a:hover {
  margin-bottom: 1px;
  border-bottom: 1px solid black;
}

.sign .user {
  display: inline-block;

  margin-right: 35px;
}

.sign .user .img-user {
  position: absolute;
  top: 22px;
  left: -18px;
  height: 16px;
}

.sign .help {
  display: inline-block;
  margin-right: 30px;

}


.sign .help .img-help {
  position: absolute;
  top: 22px;
  left: 42px;
  height: 17px;

}

.sign .sign-out {
  display: inline-block;

}

.sign .sign-out .img-signout {
  position: absolute;
  top: 23px;
  left: 104px;
  height: 16px;
}

.el-menu--horizontal>.el-menu-item {
  height: 45px;
  line-height: 45px;
  font-size: 18px;
  font-weight: 500;
  padding: 0 40px;
}



.el-container {
  min-height: 100vh;
}

.el-main {
  margin-top: 70px;
  background-color: white;

}

.el-header {
  text-align: center;
  padding: 0;
}

.el-footer {
  padding: 0;
}
</style>
