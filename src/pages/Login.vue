<template>
  <div class="login-container">
    <h2>ログイン</h2>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="email">メールアドレス</label>
        <input type="text" v-model="email" id="email" class="form-control" />
      </div>
      <div class="form-group">
        <label for="password">パスワード</label>
        <input
          type="password"
          v-model="password"
          id="password"
          class="form-control"
        />
      </div>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      <button type="submit" id="login" class="btn btn-primary">ログイン</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const errorMessage = ref('');
const router = useRouter();

const handleLogin = () => {
  // バリデーションチェック
  if (!email.value || !password.value) {
    errorMessage.value = 'メールアドレス、パスワードを入力してください。';
  }

  // TODO: ログイン処理のロジックを実装（API呼び出し）
  // 失敗時には処理を止めてエラーメッセージを表示
  errorMessage.value = ''; // 新しい試行時にはエラーメッセージをクリア
  console.log('ログイン試行:', email.value, password.value);
  // 成功時には別のページに遷移
  router.push('/dashboard');
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 40px auto 0 auto;
  padding: 1em;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
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
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  font-size: 16px;
}

.error-message {
  color: red;
  margin-bottom: 15px;
}
</style>
