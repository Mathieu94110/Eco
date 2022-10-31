import { shallowMount } from "@vue/test-utils";
import PostAdd from "@/views/PostAdd.vue";
describe("PostAdd Component", () => {
  test("should post created component not existing", async () => {
    const wrapper = shallowMount(PostAdd);

    // Using `wrapper.get` would throw and make the test fail.
    expect(wrapper.find("#post-created").exists()).toBeFalsy();
    wrapper.vm.changedData["showCreatedPost"] = true;
    // await wrapper.vm.$nextTick();
    expect(wrapper.find("#post-created").exists()).eq(true);
  });
});
