<template>
  <div :class="['left-menu', { 'menu-collapsed': isCollapsed }]">
    <div
      class="toggle-container"
      :class="{
        'toggle-collapsed': isCollapsed,
        'toggle-expanded': !isCollapsed,
      }"
    >
      <button class="toggle-btn" @click="toggleMenu" aria-label="Toggle Menu">
        <i :class="isCollapsed ? 'bi bi-list' : 'bi bi-x'"></i>
      </button>
    </div>
    <nav
      :class="{ 'nav-collapsed': isCollapsed, 'nav-expanded': !isCollapsed }"
    >
      <ul>
        <li :class="{ active: isActive('/dashboard') }">
          <router-link to="/dashboard">
            <i class="bi bi-speedometer2"></i>
            <span v-if="!isCollapsed">ダッシュボード</span>
          </router-link>
        </li>
        <li>
          <span v-if="!isCollapsed">収支管理</span>
          <ul>
            <li :class="{ active: isActive('/transaction/add') }">
              <router-link to="/transaction/add">
                <i class="bi bi-plus-circle"></i>
                <span v-if="!isCollapsed">収入・支出の追加</span>
              </router-link>
            </li>
            <li :class="{ active: isActive('/transactions') }">
              <router-link to="/transactions">
                <i class="bi bi-list-ul"></i>
                <span v-if="!isCollapsed">収支一覧</span>
              </router-link>
            </li>
            <li :class="{ active: isActive('/analysis') }">
              <router-link to="/analysis">
                <i class="bi bi-graph-up"></i>
                <span v-if="!isCollapsed">家計分析</span>
              </router-link>
            </li>
          </ul>
        </li>
        <li :class="{ active: isActive('/notifications') }">
          <router-link to="/notifications">
            <i class="bi bi-bell"></i>
            <span v-if="!isCollapsed">通知</span>
          </router-link>
        </li>
        <li>
          <span v-if="!isCollapsed">アカウント管理</span>
          <ul>
            <li :class="{ active: isActive('/signup') }">
              <router-link to="/signup">
                <i class="bi bi-person-plus"></i>
                <span v-if="!isCollapsed">ユーザー登録</span>
              </router-link>
            </li>
            <li :class="{ active: isActive('/login') }">
              <router-link to="/login">
                <i class="bi bi-box-arrow-in-right"></i>
                <span v-if="!isCollapsed">ログイン</span>
              </router-link>
            </li>
          </ul>
        </li>
        <li :class="{ active: isActive('/settings') }">
          <router-link to="/settings">
            <i class="bi bi-gear"></i>
            <span v-if="!isCollapsed">設定</span>
          </router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const isCollapsed = ref(false);
const route = useRoute();

const toggleMenu = () => {
  isCollapsed.value = !isCollapsed.value;
};

const isActive = (path: string) => {
  return route.path === path;
};
</script>

<style scoped>
.left-menu {
  position: fixed;
  top: 70px; /* ヘッダーの高さに合わせて調整 */
  left: 0;
  width: 250px;
  height: calc(100% - 60px); /* ヘッダーの高さを引いた高さに調整 */
  background-color: #343a40;
  color: #fff;
  transition: width 0.3s;
  overflow: hidden;
  z-index: 1000; /* ヘッダーやメインコンテンツの上に表示 */
}

.left-menu.menu-collapsed {
  width: 60px;
}

.toggle-container {
  display: flex;
  justify-content: flex-end;
  &.toggle-collapsed {
    padding: 15px;
  }
  &.toggle-expanded {
    padding: 10px;
  }
}

.toggle-btn {
  background: none;
  border: none;
  color: #fff;
  font-size: 1.5rem;
  cursor: pointer;
}

nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

nav.nav-expanded ul li {
  padding: 10px 20px;
}

nav.nav-collapsed > ul > li {
  padding: 5px 20px;
}

nav.nav-collapsed > ul > li > ul > li {
  padding: 10px 0;
}

nav ul li.active {
  background-color: #495057;
}

nav ul li > span {
  display: block;
  padding: 10px 0;
  font-weight: bold;
}

nav ul li ul li.active {
  background-color: #6c757d;
}

nav ul li a {
  color: #fff;
  text-decoration: none;
  display: flex;
  align-items: center;
}

nav ul li a i {
  margin-right: 10px;
}

@media (max-width: 575px) {
  .left-menu {
    display: none; /* 575px以下の画面幅ではレフトメニューを非表示にする */
  }
}
</style>
