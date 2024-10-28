import { mount } from '@vue/test-utils';
import Invite from '@/pages/Invite.vue';
import { createRouter, createWebHistory, Router } from 'vue-router';
import { routes } from '@/router';

describe('Invite.vue', () => {
  let router: Router;

  beforeEach(() => {
    router = createRouter({
      history: createWebHistory(),
      routes,
    });
    router.push = jest.fn();
  });

  it('renders the invite form', () => {
    const wrapper = mount(Invite, {
      global: {
        plugins: [router],
      },
    });

    expect(wrapper.find('h2').text()).toBe('パートナー招待');
    expect(wrapper.find('input#email').exists()).toBe(true);
    expect(wrapper.find('button').text()).toBe('招待する');
  });
});
