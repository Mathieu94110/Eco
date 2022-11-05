import { mount } from '@vue/test-utils';
import UserProfileCard from '@/components/User/UserProfileCard.vue';

describe('UserProfileCard', () => {
  test('email input value should update successfully', async () => {
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
    const inputName = wrapper.get('#userName');
    expect(inputName.text()).toBe('Tom');

    const firstName = wrapper.get('#firstName');
    expect(firstName.text()).toBe('Despières');

    const lastName = wrapper.get('#lastName');
    expect(lastName.text()).toBe('TomDes');

    const email = wrapper.get('#email');
    expect(email.text()).toBe('tom31@gmail.com');

    const phone = wrapper.get('#phone');
    expect(phone.text()).toBe('0625852200');

    const address = wrapper.get('#address');
    expect(address.text()).toBe('15 rue du général leclerc');

    const zip = wrapper.get('#zip');
    expect(zip.text()).toBe('75011');
  });
});
