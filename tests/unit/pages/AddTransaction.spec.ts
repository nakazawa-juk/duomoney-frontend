import { mount } from '@vue/test-utils';
import AddTransaction from '@/pages/AddTransaction.vue';
import { createRouter, createWebHistory, Router } from 'vue-router';
import { routes } from '@/router';

describe('AddTransaction.vue', () => {
  let router: Router;

  beforeEach(() => {
    router = createRouter({
      history: createWebHistory(),
      routes,
    });
    router.push = jest.fn();
  });

  it('renders the add transaction form', () => {
    const wrapper = mount(AddTransaction, {
      global: {
        plugins: [router],
      },
    });

    expect(wrapper.find('h2').text()).toBe('収支追加');
    expect(wrapper.find('select#type').exists()).toBe(true);
    expect(wrapper.find('input#amount').exists()).toBe(true);
    expect(wrapper.find('select#category').exists()).toBe(true);
    expect(wrapper.find('input#date').exists()).toBe(true);
    expect(wrapper.find('input#description').exists()).toBe(true);
    expect(wrapper.find('button').text()).toBe('追加');
  });

  it('displays error message when amount is invalid', async () => {
    const wrapper = mount(AddTransaction, {
      global: {
        plugins: [router],
      },
    });

    await wrapper.find('form').trigger('submit.prevent');
    expect(wrapper.find('.error-message').text()).toBe(
      '有効な金額を入力してください。'
    );
  });
});
