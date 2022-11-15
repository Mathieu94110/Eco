import { mount } from '@vue/test-utils';
import PostCreate from '@/components/Posts/PostCreate/PostCreate.vue';
import { describe, it, expect } from 'vitest';

describe('SignIn Component', () => {
  it('should isAddCreated props value update correctly', async () => {
    const wrapper = mount(PostCreate, {
      props: {
        isAddCreated: false,
      },
    });
    expect(wrapper.props().isAddCreated).toBeFalsy();
    await wrapper.setProps({ isAddCreated: true });
    expect(wrapper.props().isAddCreated).toBeTruthy();
  });
});
