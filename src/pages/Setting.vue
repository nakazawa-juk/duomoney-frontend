<template>
  <div class="settings-container">
    <h2>ユーザー設定</h2>

    <!-- 基本情報 -->
    <section class="basic-info">
      <h3>基本情報</h3>
      <form @submit.prevent="updateProfile">
        <div class="form-group">
          <label for="username">ユーザー名</label>
          <input
            type="text"
            v-model="username"
            id="username"
            class="form-control"
          />
        </div>
        <div class="form-group">
          <label for="email">メールアドレス</label>
          <input type="text" v-model="email" id="email" class="form-control" />
        </div>
        <div v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>
        <button type="submit" id="update-profile" class="btn btn-primary">
          更新
        </button>
      </form>
    </section>

    <!-- パートナー招待 -->
    <section class="invite-partner">
      <h3>パートナー招待</h3>
      <button @click="goToInvite" id="invite" class="btn btn-secondary">
        パートナー招待画面へ
      </button>
    </section>

    <!-- アカウント削除 -->
    <section class="delete-account">
      <h3>アカウント削除</h3>
      <button @click="deleteAccount" id="delete-account" class="btn btn-danger">
        アカウント削除
      </button>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { validateEmail } from '@/utils/validation';

const username = ref('');
const email = ref('');
const errorMessage = ref('');
const router = useRouter();

const updateProfile = () => {
  try {
    // バリデーションチェック
    if (!username.value || !email.value) {
      errorMessage.value = 'ユーザー名、メールアドレスを入力してください。';
      return;
    }
    if (!validateEmail(email.value)) {
      errorMessage.value = '有効なメールアドレスを入力してください。';
      return;
    }

    // TODO: ユーザー設定更新のロジックを実装（API呼び出し）
    // TODO: API呼び出し実装時に、catch句のテストコードも実装する。
    errorMessage.value = ''; // 新しい試行時にはエラーメッセージをクリア
    console.log('ユーザーを更新:', username.value, email.value);

    // 成功した場合、ログインページに遷移
  } catch (error) {
    errorMessage.value = '更新に失敗しました。';
  }
  // TODO: プロフィール更新のロジックを実装（API呼び出し）
  console.log('プロフィール更新:', username.value, email.value);
};

const goToInvite = () => {
  router.push('/invite');
};

const deleteAccount = () => {
  // TODO: アカウント削除のロジックを実装（API呼び出し）
  console.log('アカウント削除');
  router.push('/login');
};
</script>

<style scoped>
.settings-container {
  max-width: 600px;
  margin: 40px auto;
  padding: 1em;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;

  & > section {
    margin-top: 30px;
  }
}

h2,
h3 {
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

.form-control {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.btn {
  margin-top: 10px;
}

.error-message {
  color: red;
  margin-bottom: 15px;
}
</style>
