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

  it('toggles the menu when the hamburger button is clicked', async () => {
    const hamburgerButton = wrapper.find('.navbar-toggler');
    // toggleMenu called.
    await hamburgerButton.trigger('click');
    expect(wrapper.vm.isMenuOpen).toBe(true);
    expect(wrapper.find('.menu-overlay').exists()).toBe(true);

    // toggleMenu called.
    await hamburgerButton.trigger('click');
    expect(wrapper.vm.isMenuOpen).toBe(false);
    expect(wrapper.find('.menu-overlay').exists()).toBe(false);
  });

  it('closes the menu when the window is resized to a large width', async () => {
    wrapper.vm.isMenuOpen = true;
    window.innerWidth = 1200;
    // handleResize called.
    window.dispatchEvent(new Event('resize'));
    await nextTick();
    expect(wrapper.vm.isMenuOpen).toBe(false);
    expect(wrapper.find('.menu-overlay').exists()).toBe(false);
  });

  it("calls the logout method and route 'logout' when the logout button is clicked", async () => {
    const logoutButton = wrapper.find('.btn-outline-danger');
    await logoutButton.trigger('click');
    expect(router.push).toHaveBeenCalledWith('/login');
  });

  // TODO: goToUserSettingsメソッドのテストを追加してください
});
