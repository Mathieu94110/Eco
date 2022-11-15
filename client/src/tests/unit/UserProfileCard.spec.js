import { mount } from '@vue/test-utils';
import UserProfileCard from '@/components/User/UserProfileCard.vue';
import {
  describe, it, expect, vi,
} from 'vitest';

describe('UserProfileCard', () => {
  it('should props display correct infos', async () => {
    const wrapper = mount(UserProfileCard, {
      props: {
        userInfos: {
          userName: 'Tom',
          firstName: 'Despières',
          lastName: 'TomDes',
          email: 'tom31@gmail.com',
          phone: '0625852200',
          address: '15 rue du général leclerc',
          zip: '75011',
        },
      },
    });
    expect(wrapper.vm.userInfos.userName).toBe('Tom');
    expect(wrapper.vm.userInfos.firstName).toBe('Despières');
    expect(wrapper.vm.userInfos.lastName).toBe('TomDes');
    expect(wrapper.vm.userInfos.email).toBe('tom31@gmail.com');
    expect(wrapper.vm.userInfos.phone).toBe('0625852200');
    expect(wrapper.vm.userInfos.address).toBe('15 rue du général leclerc');
    expect(wrapper.vm.userInfos.zip).toBe('75011');
  });

  it('should userInfos props update successfully', async () => {
    const wrapper = mount(UserProfileCard, {
      props: {
        userInfos: {
          userName: '',
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          address: '',
          zip: '',
        },
      },
    });
    await wrapper.setProps({
      userInfos: {
        userName: 'Tom',
        firstName: 'Despières',
        lastName: 'TomDes',
        email: 'tom31@gmail.com',
        phone: '0625852200',
        address: '15 rue du général leclerc',
        zip: '75011',
      },
    });

    expect(wrapper.vm.userInfos).toEqual({
      userName: 'Tom',
      firstName: 'Despières',
      lastName: 'TomDes',
      email: 'tom31@gmail.com',
      phone: '0625852200',
      address: '15 rue du général leclerc',
      zip: '75011',
    });
  });

  it('should isEditMode to be false on the beginning', async () => {
    const wrapper = mount(UserProfileCard);
    expect(wrapper.vm.isEditMode).toBe(false);
  });

  it('should isEditMode to be true', async () => {
    const wrapper = mount(UserProfileCard);
    const spy = vi.spyOn(wrapper.vm, 'editProfileInfo');
    await wrapper.find('#edit-profile').trigger('click');
    expect(spy).toHaveBeenCalled();
    expect(wrapper.vm.isEditMode).toBe(true);
  });

  test('should updateUser emit with data', async () => {
    const wrapper = mount(UserProfileCard);
    await wrapper.find('#edit-profile').trigger('click');
    const newUserName = 'JohnDoe';
    const newFirstName = 'John';
    const newLastName = 'Doe';
    const newEmail = 'jDoe@gmail.com';
    const newPhone = '0606060606';
    const newAddress = '12 rue de paris';
    const newZip = '75010';

    await wrapper.get('[data-test="userName"]').setValue(newUserName);
    await wrapper.get('[data-test="firstName"]').setValue(newFirstName);
    await wrapper.get('[data-test="lastName"]').setValue(newLastName);
    await wrapper.get('[data-test="email"]').setValue(newEmail);
    await wrapper.get('[data-test="phone"]').setValue(newPhone);
    await wrapper.get('[data-test="address"]').setValue(newAddress);
    await wrapper.get('[data-test="zip"]').setValue(newZip);

    const spy = vi.spyOn(wrapper.vm, 'confirmInfo');
    await wrapper.find('#confirm-info').trigger('click');
    expect(spy).toHaveBeenCalled();
    expect(wrapper.emitted('updateUser')).toHaveLength(1);
    expect(wrapper.emitted('updateUser')[0][0]).toStrictEqual({
      userName: newUserName,
      firstName: newFirstName,
      lastName: newLastName,
      email: newEmail,
      phone: newPhone,
      address: newAddress,
      zip: newZip,
    });
    expect(wrapper.vm.isEditMode).toBe(false);
  });
});
