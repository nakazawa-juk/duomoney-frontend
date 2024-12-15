import { mount } from '@vue/test-utils';
import Setting from '@/pages/Setting.vue';
import { createRouter, createWebHistory, Router } from 'vue-router';
import { routes } from '@/router';

jest.mock('@/utils/validation', () => ({
  validateEmail: jest.fn(),
}));

describe('Setting.vue', () => {
  let router: Router;

  beforeEach(() => {
    router = createRouter({
      history: createWebHistory(),
      routes,
    });
    router.push = jest.fn();
  });

  it('renders the settings form', () => {
    const wrapper = mount(Setting, {
      global: {
        plugins: [router],
      },
    });

    expect(wrapper.find('h2').text()).toBe('ユーザー設定');
    expect(wrapper.find('input#username').exists()).toBe(true);
    expect(wrapper.find('input#email').exists()).toBe(true);
    expect(wrapper.find('button.btn-primary').text()).toBe('更新');
    expect(wrapper.find('button.btn-secondary').text()).toBe(
      'パートナー招待画面へ'
    );
    expect(wrapper.find('button.btn-danger').text()).toBe('アカウント削除');
  });
});
