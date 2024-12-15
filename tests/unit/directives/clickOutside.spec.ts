import { mount } from '@vue/test-utils';
import clickOutsideDirective from '@/directives/clickOutside';

describe('clickOutsideDirective', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let wrapper: any;
  let mockMethod: jest.Mock;

  beforeEach(() => {
    mockMethod = jest.fn();
    wrapper = mount({
      template: '<div v-click-outside="mockMethod"></div>',
      directives: {
        clickOutside: clickOutsideDirective,
      },
      methods: {
        mockMethod,
      },
    });
  });

  it('should call the method when clicking outside the element', async () => {
    document.body.click();
    await wrapper.vm.$nextTick();
    expect(mockMethod).toHaveBeenCalled();
  });

  it('should not call the method when clicking inside the element', async () => {
    wrapper.trigger('click');
    await wrapper.vm.$nextTick();
    expect(mockMethod).not.toHaveBeenCalled();
  });

  afterEach(() => {
    wrapper.unmount();
  });
});
