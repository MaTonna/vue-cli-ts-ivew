<template>
  <div>
    <Menu mode="horizontal" theme="dark" :active-name="currentTopMenu">
      <Row :gutter="16">
        <Col span="3" class="logo">xx后台管理系统</Col>
        <Col span="13">
          <MenuItem name="contentManage">
            <router-link :to="{name:'contentManage'}" class="menu-item">内容管理</router-link>
          </MenuItem>
          <MenuItem name="statisticsManage">
            <router-link :to="{name:'statisticsManage'}" class="menu-item">
              <Icon type="ios-people"/>统计中心
            </router-link>
          </MenuItem>
        </Col>
      </Row>
    </Menu>
    <!-- 这里是左侧菜单 -->
    <router-view></router-view>
  </div>
</template>

<script>
import Vue from "vue";
import { Button, Table, Menu, MenuItem, Icon, Row, Col } from "iview";
import sideMenuMap from "@page/page1/sideMenuMap.ts";
Vue.component("Button", Button);
Vue.component("Table", Table);
Vue.component("Menu", Menu);
Vue.component("MenuItem", MenuItem);
Vue.component("Icon", Icon);
Vue.component("Row", Row);
Vue.component("Col", Col);
export default {
  data() {
    return { currentTopMenu: "" };
  },
  mounted() {
    this.getTopMenu(this.$route.name);
  },
  methods: {
    getTopMenu(routeName) {
      Object.keys(sideMenuMap).forEach(menu => {
        sideMenuMap[menu].forEach(item => {
          if (item.name === routeName || menu === routeName) {
            this.currentTopMenu = menu;
            return;
          }
        });
      });
    }
  }
};
</script>
