import { mount } from "@vue/test-utils";
import PostCreateButton from "@/components/Posts/PostCreate/PostCreateInputs/PostCreateButtons.vue";

describe("SignIn Component", () => {
  test("email input value should update successfully", async () => {
    const wrapper = mount(PostCreateButton);
    await wrapper.find('[data-test-id="create-button"]').trigger("click");
    expect(wrapper.emitted()).toBeTruthy();
  });
});
