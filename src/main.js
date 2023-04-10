/*
 * @Author: zyl
 * @Date: 2022-12-08 10:23:36
 * @LastEditors: zyl zyl14730@cnki.net
 * @LastEditTime: 2022-12-08 16:13:02
 * @Description:
 */
import Vue from "vue";
import App from "./App.vue";

// 引入路由
import router from "./router";
// 引入echarts
import echarts from "./utils/echarts";
// 引入element
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "./styles/index.less";

Vue.config.productionTip = false;

// 挂载到vue实例中
Vue.prototype.$echarts = echarts;
Vue.use(ElementUI);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
