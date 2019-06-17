<template>
  <div id="app">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" @copyCount="showCount"/>
    copyNumber:{{copyCount}}
  </div>
</template>

<script lang="ts">
// 常规写法
// import HelloWorld from "./HelloWorld.vue";

// export default {
//   name: "App",
//   components: {
//     HelloWorld
//   },
//   data() {
//     return {
//       copyCount: 0
//     };
//   },
//   methods: {
//     showCount(count: number) {
//       this.copyCount = count;
//     }
//   }
// };
// class写法
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "./HelloWorld.vue";

@Component({
  components: {
    HelloWorld
  }
})
export default class App extends Vue {
  copyCount = 0;
  publicPath = process.env.BASE_URL;
  showCount(count: number) {
    this.copyCount = count;
  }
}
</script>

