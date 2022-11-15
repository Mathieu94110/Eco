import { mount } from '@vue/test-utils';
import SignUp from '@/components/Login/SignUp.vue';
import { describe, it, expect } from 'vitest';

describe('SignUp Component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(SignUp);
  });

  it('should emit create account with good values', async () => {
    const spy = vi.spyOn(wrapper.vm, 'createAccount');
    // const newImage = 'test-image.png';
    const newUserName = 'JohnDoe';
    const newFirstName = 'John';
    const newLastName = 'Doe';
    const newEmail = 'jDoe@gmail.com';
    const newPhone = '0606060606';
    const newAddress = '12 rue de paris';
    const newZip = '75010';

    // await wrapper.find('#image').setValue(newImage);
    await wrapper.find('#userName').setValue(newUserName);
    await wrapper.find('#firstName').setValue(newFirstName);
    await wrapper.find('#lastName').setValue(newLastName);
    await wrapper.find('#email').setValue(newEmail);
    await wrapper.find('#phone').setValue(newPhone);
    await wrapper.find('#address').setValue(newAddress);
    await wrapper.find('#zip').setValue(newZip);

    await wrapper.find('form').trigger('submit.prevent');
    expect(spy).toHaveBeenCalled();
  });
});
