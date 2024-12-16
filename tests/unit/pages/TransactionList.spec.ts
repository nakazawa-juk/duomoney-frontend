import { mount } from '@vue/test-utils';
import TransactionList from '@/pages/TransactionList.vue';
import { createRouter, createWebHistory, Router } from 'vue-router';
import { routes } from '@/router';

describe('TransactionList.vue', () => {
  let router: Router;

  beforeEach(() => {
    router = createRouter({
      history: createWebHistory(),
      routes,
    });
    router.push = jest.fn();
  });

  it('renders the transaction list', () => {
    const wrapper = mount(TransactionList, {
      global: {
        plugins: [router],
      },
    });

    expect(wrapper.find('h2').text()).toBe('収支一覧');
    expect(wrapper.find('table.transaction-table').exists()).toBe(true);
    expect(wrapper.findAll('tbody tr').length).toBe(4); // 初期トランザクション数
  });
});
