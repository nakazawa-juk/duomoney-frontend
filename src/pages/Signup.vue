<template>
  <div class="signup-container">
    <h2>ユーザー登録</h2>
    <form @submit.prevent="handleSignup">
      <div class="form-group">
        <label for="username">ユーザー名</label>
        <input
          type="text"
          id="username"
          v-model="username"
          class="form-control"
        />
      </div>
      <div class="form-group">
        <label for="email">メールアドレス</label>
        <input type="text" id="email" v-model="email" class="form-control" />
      </div>
      <div class="form-group">
        <label for="password">パスワード</label>
        <input
          type="password"
          id="password"
          v-model="password"
          class="form-control"
        />
      </div>
      <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>
      <button type="submit" id="signup" class="btn btn-primary">
        アカウント作成
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { validateEmail, validatePassword } from '@/utils/validation';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const username = ref('');
const email = ref('');
const password = ref('');
const errorMessage = ref('');
const router = useRouter();

const handleSignup = async () => {
  try {
    // バリデーションチェック
    if (!username.value || !email.value || !password.value) {
      errorMessage.value =
        'ユーザー名、メールアドレス、パスワードを入力してください。';
      return;
    }
    if (!validateEmail(email.value)) {
      errorMessage.value = '有効なメールアドレスを入力してください。';
      return;
    }
    if (!validatePassword(password.value)) {
      errorMessage.value =
        'パスワードは8文字以上で、半角数字と半角文字の両方を含む必要があります。記号や特殊文字は使用できません。';
      return;
    }

    // TODO: アカウント作成のロジックを実装（API呼び出し）

    // 成功した場合、ログインページにリダイレクト
    console.log('アカウント作成:', username.value, email.value, password.value);
    router.push('/login');
  } catch (error) {
    errorMessage.value = 'アカウント作成に失敗しました。';
  }
};
</script>

<style scoped>
.signup {
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
