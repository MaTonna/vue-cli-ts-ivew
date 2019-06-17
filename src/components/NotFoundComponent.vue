<template>
  <div>
    404了，
    <button @click="goback">返回上一页</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default class NotFoundComponent extends Vue {
  goback() {
    window.history.back();
  }
}
</script>