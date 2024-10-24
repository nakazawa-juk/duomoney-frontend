<template>
  <nav class="navbar navbar-expand-sm navbar-light bg-light">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">
        <img src="@/assets/logo.png" alt="DuoMoney Logo" class="logo" />
      </router-link>
      <button class="navbar-toggler" type="button" @click="toggleMenu">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto mb-2 mb-sm-0">
          <li class="nav-item">
            <span class="nav-link" @click="goToUserSettings">
              {{ userName }}
            </span>
          </li>
          <li class="nav-item">
            <button class="btn btn-outline-danger" @click="logout">
              ログアウト
            </button>
          </li>
        </ul>
      </div>
    </div>
    <div v-if="isMenuOpen" class="menu-overlay">
      <ul class="menu-list">
        <li @click="goToUserSettings">
          <span>
            {{ userName }}
          </span>
        </li>
        <li @click="logout">
          <span> ログアウト </span>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';

const userName = ref('John'); // TODO: ここに実際のユーザー名を設定するロジックを追加
const isMenuOpen = ref(false);
const router = useRouter();

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const handleResize = () => {
  if (window.innerWidth >= 576) {
    // 576pxはBootstrapのsmブレークポイント
    isMenuOpen.value = false;
  }
};

const goToUserSettings = () => {
  // TODO: ユーザー設定画面に遷移
  console.log('ユーザー設定画面に遷移します');
};

const logout = () => {
  // TODO: ログアウト処理を実装
  console.log('ログアウトしました');
  router.push('/login');
};

onMounted(() => {
  window.addEventListener('resize', handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
});
</script>

<style scoped>
.navbar {
  padding: 0; /* デフォルトだとスタイル崩れてしまうので上書き */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* ヘッダーに影を追加 */
  height: 70px; /* ヘッダーの高さを調整 */
  display: flex;
  align-items: center; /* ヘッダー内の要素を上下中央に配置 */
}

.container-fluid {
  height: 100%; /* コンテナの高さをヘッダーに合わせる */
  display: flex;
  align-items: center; /* コンテナ内の要素を上下中央に配置 */
}

.navbar-brand {
  padding: 0; /* デフォルトだとスタイル崩れてしまうので上書き */
}

.logo {
  height: 70px; /* ロゴの大きさを調整 */
}

.nav-link {
  cursor: pointer;
}

.nav-link:hover {
  color: #0056b3;
}

.btn-outline-danger {
  margin-left: 10px;
}

.menu-overlay {
  position: absolute;
  top: 70px; /* ヘッダーの下に表示 */
  left: 0;
  width: 100%;
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.menu-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.menu-list li {
  padding: 10px 20px;
  display: block;
  cursor: pointer;
  color: #000;
  text-align: center;
}

.menu-list li:hover {
  color: #0056b3;
  background-color: #f8f9fa;
  color: #0056b3;
  cursor: pointer; /* ホバー時にカーソルをポインターに変更 */
}
</style>
