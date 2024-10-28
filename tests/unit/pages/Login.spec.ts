import { mount } from '@vue/test-utils';
import Login from '@/pages/Login.vue';
import { createRouter, createWebHistory, Router } from 'vue-router';
import { routes } from '@/router';

describe('Login.vue', () => {
  let router: Router;

  beforeEach(() => {
    router = createRouter({
      history: createWebHistory(),
      routes,
    });
    router.push = jest.fn();
  });

  it('renders the login form', () => {
    const wrapper = mount(Login, {
      global: {
        plugins: [router],
      },
    });

    expect(wrapper.find('h2').text()).toBe('ログイン');
    expect(wrapper.find('input#email').exists()).toBe(true);
    expect(wrapper.find('input#password').exists()).toBe(true);
    expect(wrapper.find('button').text()).toBe('ログイン');
  });
});
