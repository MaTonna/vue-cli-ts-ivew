<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    {{count}}
    <button @click="copyCount">+</button>
  </div>
</template>

<script lang="ts">
import "@css/index.less";
import { Component, Prop, Vue, Emit } from "vue-property-decorator";

@Component
export default class HelloWorld extends Vue {
  count = 0;
  mounted() {}
  @Prop()
  private msg!: string;
  @Emit("copyCount")
  copyCount(e: MouseEvent) {
    return ++this.count;
  }
}
</script>
