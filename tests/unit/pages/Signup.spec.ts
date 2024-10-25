import { mount } from '@vue/test-utils';
import Signup from '@/pages/Signup.vue';
import { createRouter, createWebHistory, Router } from 'vue-router';
import { routes } from '@/router';

jest.mock('@/utils/validation', () => ({
  validateEmail: jest.fn(),
  validatePassword: jest.fn(),
}));

describe('Signup.vue', () => {
  let router: Router;

  beforeEach(() => {
    router = createRouter({
      history: createWebHistory(),
      routes,
    });
    router.push = jest.fn();
  });

  it('renders the signup form', () => {
    const wrapper = mount(Signup, {
      global: {
        plugins: [router],
      },
    });

    expect(wrapper.find('h2').text()).toBe('ユーザー登録');
    expect(wrapper.find('input#username').exists()).toBe(true);
    expect(wrapper.find('input#email').exists()).toBe(true);
    expect(wrapper.find('input#password').exists()).toBe(true);
    expect(wrapper.find('button').text()).toBe('アカウント作成');
  });
});
