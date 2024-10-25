<template>
  <div id="app">
    <GlobalHeader />
    <div class="main-content">
      <GlobalLeftMenu />
      <div class="content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import GlobalHeader from './components/lv3/GlobalHeader.vue';
import GlobalLeftMenu from './components/lv3/GlobalLeftMenu.vue';
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-color: #f8f9fa; /* メインコンテンツの背景色を変更 */
  min-height: 100vh; /* ビューポート全体の高さを確保 */
  display: flex;
  flex-direction: column;
}

.main-content {
  display: flex;
  flex: 1;
}

.content {
  flex: 1;
  padding: 10px;
  margin-left: 250px; /* 左メニューの幅に合わせて調整 */
}

.left-menu.menu-collapsed + .content {
  margin-left: 60px; /* 左メニューが折りたたまれたときの幅に合わせて調整 */
}

@media (max-width: 575px) {
  .content {
    margin-left: 0; /* 575px以下の画面幅ではメインコンテンツを画面いっぱいに広げる */
  }
}
</style>
