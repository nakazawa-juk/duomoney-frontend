<template>
  <div>
    <GlobalHeader />
    <router-view />
  </div>
</template>

<script setup lang="ts">
import GlobalHeader from './components/lv3/GlobalHeader.vue';
import { RouterView } from 'vue-router';
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #f8f9fa; /* メインコンテンツの背景色を変更 */
  min-height: 100vh; /* ビューポート全体の高さを確保 */
}
</style>
