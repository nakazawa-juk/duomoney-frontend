import { mount } from '@vue/test-utils';
import GlobalLeftMenu from '@/components/lv3/GlobalLeftMenu.vue';
import { createRouter, createWebHistory } from 'vue-router';
import { routes } from '@/router';

describe('GlobalLeftMenu.vue', () => {
  let router: ReturnType<typeof createRouter>;

  beforeEach(() => {
    router = createRouter({
      history: createWebHistory(),
      routes,
    });
  });

  it('renders correctly when collapsed and expanded', async () => {
    const wrapper = mount(GlobalLeftMenu, {
      global: {
        plugins: [router],
      },
    });

    // 初期状態は展開されている
    expect(wrapper.find('.menu-collapsed').exists()).toBe(false);
    expect(wrapper.find('.nav-expanded').exists()).toBe(true);
    expect(wrapper.find('nav').text()).toContain('ダッシュボード');

    // メニューを閉じる
    await wrapper.find('.toggle-btn').trigger('click');
    expect(wrapper.find('.menu-collapsed').exists()).toBe(true);
    expect(wrapper.find('.nav-collapsed').exists()).toBe(true);
    expect(wrapper.find('nav').text()).not.toContain('ダッシュボード');

    // メニューを再度開く
    await wrapper.find('.toggle-btn').trigger('click');
    expect(wrapper.find('.menu-collapsed').exists()).toBe(false);
    expect(wrapper.find('.nav-expanded').exists()).toBe(true);
    expect(wrapper.find('nav').text()).toContain('ダッシュボード');
  });

  it('renders correct links', async () => {
    const wrapper = mount(GlobalLeftMenu, {
      global: {
        plugins: [router],
      },
    });

    const links = [
      { path: '/dashboard', icon: 'bi-speedometer2', text: 'ダッシュボード' },
      {
        path: '/transaction/add',
        icon: 'bi-plus-circle',
        text: '収入・支出の追加',
      },
      { path: '/transactions', icon: 'bi-list-ul', text: '収支一覧' },
      { path: '/analysis', icon: 'bi-graph-up', text: '家計分析' },
      { path: '/notifications', icon: 'bi-bell', text: '通知' },
      { path: '/signup', icon: 'bi-person-plus', text: 'ユーザー登録' },
      { path: '/setting', icon: 'bi-gear', text: 'ユーザー設定' },
    ];

    for (const link of links) {
      const routerLink = wrapper.find(`a[href="${link.path}"]`);
      expect(routerLink.exists()).toBe(true);
      expect(routerLink.find(`i.${link.icon}`).exists()).toBe(true);
      expect(routerLink.text()).toContain(link.text);
    }
  });

  it('highlights the active link', async () => {
    router.push('/dashboard');
    await router.isReady();

    const wrapper = mount(GlobalLeftMenu, {
      global: {
        plugins: [router],
      },
    });

    expect(wrapper.find('li.active a[href="/dashboard"]').exists()).toBe(true);
  });
});
