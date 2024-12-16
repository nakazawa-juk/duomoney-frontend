<template>
  <div class="add-transaction-container">
    <h2>収支追加</h2>
    <form @submit.prevent="handleTransaction">
      <div class="form-group">
        <label for="type">タイプ</label>
        <select v-model="transaction.type" id="type" class="form-control">
          <option value="income">収入</option>
          <option value="expense">支出</option>
        </select>
      </div>
      <div class="form-group">
        <label for="amount">金額</label>
        <input
          type="text"
          v-model="transaction.amount"
          id="amount"
          class="form-control"
        />
      </div>
      <div class="form-group">
        <label for="category">カテゴリ</label>
        <select
          v-model="transaction.category"
          id="category"
          class="form-control"
        >
          <option
            v-for="category in TRANSACTION_CATEGORYS"
            :key="category.value"
            :value="category.value"
          >
            {{ category.name }}
          </option>
        </select>
      </div>
      <div class="form-group">
        <label for="date">日付</label>
        <input
          type="date"
          v-model="transaction.date"
          id="date"
          class="form-control"
        />
      </div>
      <div class="form-group">
        <label for="description">メモ</label>
        <input
          type="text"
          v-model="transaction.description"
          id="description"
          class="form-control"
        />
      </div>
      <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>
      <button type="submit" class="btn btn-primary">追加</button>
    </form>
    <div v-if="successMessage" class="success-message">
      {{ successMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { TRANSACTION_CATEGORYS } from '@/constants';

const transaction = ref<{
  type: 'income' | 'expense';
  amount: string;
  category: string;
  date: string;
  description: string;
}>({
  type: 'income',
  amount: '',
  category: '',
  date: '',
  description: '',
});
const errorMessage = ref('');
const successMessage = ref('');

const handleTransaction = async () => {
  // 金額のバリデーション
  const amountValue = transaction.value.amount.trim();
  if (!/^[1-9]\d*$/.test(amountValue)) {
    errorMessage.value = '有効な金額を入力してください。';
    return;
  }

  // カテゴリと日付のバリデーション
  if (!transaction.value.category) {
    errorMessage.value = 'カテゴリを選択してください。';
    return;
  }
  if (!transaction.value.date) {
    errorMessage.value = '日付を選択してください。';
    return;
  }

  try {
    // 収支登録APIを呼び出し
    // ここで実際のAPI呼び出しを行います
    // 例: await api.addTransaction(transaction.value);

    // 成功した場合
    errorMessage.value = '';
    successMessage.value = '追加完了';
    transaction.value.amount = '';
    transaction.value.description = '';

    // 一定時間後にメッセージを消す
    setTimeout(() => {
      successMessage.value = '';
    }, 3000); // 3秒後に消える
  } catch (error) {
    errorMessage.value = '収支の追加に失敗しました。';
  }
};
</script>

<style scoped>
.add-transaction-container {
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

.success-message {
  color: green;
  margin-top: 15px;
}
</style>
