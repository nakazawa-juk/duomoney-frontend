import { mount, VueWrapper } from '@vue/test-utils';
import GlobalHeader from '@/components/lv3/GlobalHeader.vue';
import { createRouter, createWebHistory } from 'vue-router';
import { nextTick } from 'vue';
import { routes } from '@/router';

describe('GlobalHeader.vue', () => {
  let router;
  let wrapper: VueWrapper<typeof GlobalHeader>;

  beforeEach(() => {
    jest.clearAllMocks();
    router = createRouter({
      history: createWebHistory(),
      routes,
    });
    router.push = jest.fn();
    wrapper = mount(GlobalHeader, {
      global: {
        plugins: [router],
      },
    }) as VueWrapper<typeof GlobalHeader>;
    // Set the initial data
    wrapper.vm.userName = 'テストユーザー';
    wrapper.vm.isMenuOpen = false;
  });

  it('renders the logo', () => {
    const logo = wrapper.find('.navbar-brand img');
    expect(logo.exists()).toBe(true);
    expect(logo.attributes('alt')).toBe('DuoMoney Logo');
  });

  it('renders the user name', () => {
    const userName = wrapper.find('.nav-link');
    expect(userName.exists()).toBe(true);
    expect(userName.text()).toBe('テストユーザー');
  });

  it('renders the logout button', () => {
    const logoutButton = wrapper.find('.btn-outline-danger');
    expect(logoutButton.exists()).toBe(true);
    expect(logoutButton.text()).toBe('ログアウト');
  });
});
