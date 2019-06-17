<template>
  <div>
    <Row :gutter="16">
      <Col span="3">
        <Menu
          theme="light"
          v-for="(menu,index) in menuList"
          :active-name="currentMenu"
          :key="index"
        >
          <router-link :to="{name:menu.name}" class="side-menu-item">
            <MenuItem :name="menu.name">
              <Icon :type="menu.iconType"/>
              {{menu.title}}
            </MenuItem>
          </router-link>
        </Menu>
      </Col>
      <Col span="14">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </Col>
    </Row>
  </div>
</template>

<script>
import Vue from "vue";
import { Menu, MenuItem, Icon, Row, Col } from "iview";
import sideMenuMap from "@page/page1/sideMenuMap.ts";
Vue.component("Menu", Menu);
Vue.component("MenuItem", MenuItem);
Vue.component("Icon", Icon);
Vue.component("Row", Row);
Vue.component("Col", Col);
export default {
  data() {
    return {
      menuList: [],
      currentMenu: this.$route.name
    };
  },
  watch: {
    $route(to, from) {
      this.getSideMenuList(to.name);
    }
  },
  mounted() {
    this.getSideMenuList(this.$route.name);
  },
  methods: {
    getSideMenuList(routeName) {
      Object.keys(sideMenuMap).forEach(menu => {
        sideMenuMap[menu].forEach(item => {
          if (item.name === routeName || menu === routeName) {
            this.menuList = sideMenuMap[menu];
            return;
          }
        });
      });
    }
  }
};
</script>

