import { mount } from '@vue/test-utils';
import PostCreate from '@/components/Posts/PostCreate/PostCreate.vue';

describe('SignIn Component', () => {
  test('should isAddCreated props value update correctly', async () => {
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
