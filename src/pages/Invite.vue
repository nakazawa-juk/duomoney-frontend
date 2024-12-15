<template>
  <div class="invite-container">
    <h2>パートナー招待</h2>
    <form @submit.prevent="handleInvite">
      <div class="form-group">
        <label for="email">招待するメールアドレス</label>
        <input type="text" v-model="email" id="email" class="form-control" />
      </div>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      <button type="submit" id="invite" class="btn btn-primary">
        招待する
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { validateEmail } from '@/utils/validation';

const email = ref('');
const errorMessage = ref('');
const router = useRouter();

const handleInvite = () => {
  try {
    // バリデーションチェック
    if (!email.value) {
      errorMessage.value = 'メールアドレスを入力してください。';
      return;
    }
    if (!validateEmail(email.value)) {
      errorMessage.value = '有効なメールアドレスを入力してください。';
      return;
    }
    // TODO: 招待メール送信のロジックを実装（API呼び出し）
    // TODO: API呼び出し実装時に、catch句のテストコードも実装する。
    errorMessage.value = ''; // 新しい試行時にはエラーメッセージをクリア
    console.log('招待メール送信:', email.value);
    // 成功時にはユーザー設定画面に遷移
    router.push('/setting');
  } catch (error) {
    errorMessage.value = 'パートナー招待に失敗しました。';
  }
};
</script>

<style scoped>
.invite-container {
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
