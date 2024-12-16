<template>
  <div class="transaction-list-container">
    <h2>収支一覧</h2>
    <table class="transaction-table">
      <thead>
        <tr>
          <th>タイプ</th>
          <th>金額</th>
          <th>カテゴリ</th>
          <th>日付</th>
          <th>メモ</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="transaction in transactions" :key="transaction.id">
          <td>{{ transaction.type === 'income' ? '収入' : '支出' }}</td>
          <td>{{ transaction.amount }}</td>
          <td>{{ transaction.category.name }}</td>
          <td>{{ transaction.date }}</td>
          <td>{{ transaction.description }}</td>
          <td>
            <button
              @click.stop="editTransaction(transaction)"
              class="btn btn-edit"
            >
              編集
            </button>
            <button
              @click="deleteTransaction(transaction.id)"
              class="btn btn-delete"
            >
              削除
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="showEditModal" class="modal">
      <div class="modal-content" v-click-outside="closeModal">
        <span class="close" @click="closeModal">&times;</span>
        <h3>収支編集</h3>
        <form @submit.prevent="updateTransaction">
          <div class="form-group">
            <label for="editAmount">金額</label>
            <input
              type="text"
              v-model="editTransactionData.amount"
              id="editAmount"
              class="form-control"
            />
          </div>
          <div class="form-group">
            <label for="editCategory">カテゴリ</label>
            <select
              v-model="editTransactionData.category.value"
              id="editCategory"
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
            <label for="editDate">日付</label>
            <input
              type="date"
              v-model="editTransactionData.date"
              id="editDate"
              class="form-control"
            />
          </div>
          <div class="form-group">
            <label for="editDescription">メモ</label>
            <input
              type="text"
              v-model="editTransactionData.description"
              id="editDescription"
              class="form-control"
            />
          </div>
          <div v-if="errorMessage" class="error-message">
            {{ errorMessage }}
          </div>
          <div v-if="successMessage" class="success-message">
            {{ successMessage }}
          </div>
          <button type="submit" class="btn btn-primary">更新</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { TRANSACTION_CATEGORYS } from '@/constants';

interface Transaction {
  id: number;
  type: 'income' | 'expense';
  amount: string;
  category: { value: string; name: string };
  date: string;
  description: string;
}

const transactions = ref<Transaction[]>([
  {
    id: 1,
    type: 'income',
    amount: '5000',
    category: { value: 'salary', name: '給料' },
    date: '2023-10-01',
    description: '10月の給料',
  },
  {
    id: 2,
    type: 'expense',
    amount: '1500',
    category: { value: 'food', name: '食費' },
    date: '2023-10-02',
    description: 'スーパーでの買い物',
  },
  {
    id: 3,
    type: 'income',
    amount: '2000',
    category: { value: 'salary', name: '給料' },
    date: '2023-10-03',
    description: 'プロジェクトAの報酬',
  },
  {
    id: 4,
    type: 'expense',
    amount: '300',
    category: { value: 'transportation', name: '交通費' },
    date: '2023-10-04',
    description: '電車代',
  },
]);

const showEditModal = ref(false);
const editTransactionDataDefault: Transaction = {
  id: 0,
  type: 'income',
  amount: '',
  category: { value: '', name: '' },
  date: '',
  description: '',
};
const editTransactionData = ref<Transaction>({ ...editTransactionDataDefault });
const errorMessage = ref('');
const successMessage = ref('');

const editTransaction = (transaction: Transaction) => {
  console.log('edit transaction');
  editTransactionData.value = { ...transaction };
  showEditModal.value = true;
};

const closeModal = () => {
  console.log('close modal');
  showEditModal.value = false;
  editTransactionData.value = { ...editTransactionDataDefault };
};

const updateTransaction = () => {
  if (editTransactionData.value) {
    // 金額のバリデーション
    const amountValue = editTransactionData.value.amount.trim();
    if (!/^[1-9]\d*$/.test(amountValue)) {
      errorMessage.value = '有効な金額を入力してください。';
      return;
    }

    // カテゴリと日付のバリデーション
    if (!editTransactionData.value.category) {
      errorMessage.value = 'カテゴリを選択してください。';
      return;
    }
    if (!editTransactionData.value.date) {
      errorMessage.value = '日付を選択してください。';
      return;
    }

    try {
      // ここでAPIを呼び出してデータを更新します
      // 例: await api.updateTransaction(editTransactionData.value);

      // 成功した場合
      errorMessage.value = '';
      successMessage.value = '更新完了';

      // 一定時間後にメッセージを消す
      setTimeout(() => {
        successMessage.value = '';
      }, 3000); // 3秒後に消える
    } catch (error) {
      errorMessage.value = '収支の更新に失敗しました。';
    }
  }
};

const deleteTransaction = (id: number) => {
  // ここでAPIを呼び出してデータを削除します
  // 例: await api.deleteTransaction(id);

  // ローカルのデータを更新
  transactions.value = transactions.value.filter((t) => t.id !== id);
};
</script>

<style scoped>
.transaction-list-container {
  max-width: 800px;
  margin: 40px auto;
  padding: 1em;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
}

.transaction-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.transaction-table th,
.transaction-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.btn {
  padding: 5px 10px;
  margin-right: 5px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

.btn-edit {
  background-color: #4caf50;
  color: white;
}

.btn-delete {
  background-color: #f44336;
  color: white;
}

.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  position: relative;
  background-color: #fefefe;
  padding: 20px;
  border: 1px solid #888;
  width: 400px;
  border-radius: 5px;
}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
  color: #aaa;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
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
