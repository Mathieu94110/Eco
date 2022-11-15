import { mount } from '@vue/test-utils';
import UserProfileCard from '@/components/User/UserProfileCard.vue';
import { describe, it, expect } from 'vitest';

describe('UserProfileCard', () => {
  it('should email input value update successfully', async () => {
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
});
