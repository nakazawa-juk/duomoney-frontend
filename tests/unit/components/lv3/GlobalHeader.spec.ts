import { shallowMount, VueWrapper } from '@vue/test-utils';
import GlobalHeader from '@/components/lv3/GlobalHeader.vue';
import { Router, useRouter } from 'vue-router';
import { nextTick } from 'vue';

// モックの設定
jest.mock('vue-router', () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
  }),
}));

describe('GlobalHeader.vue', () => {
  let wrapper: VueWrapper<typeof GlobalHeader>;
  let router: Router;

  beforeEach(() => {
    jest.clearAllMocks();
    router = useRouter();
    wrapper = shallowMount(GlobalHeader) as VueWrapper<typeof GlobalHeader>;

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
