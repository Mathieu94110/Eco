import { mount } from "@vue/test-utils";
import PostAdd from "@/views/PostAdd.vue";
import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      user: { userId: "1125533495595" },
      windowWidth: 747,
      currentPost: {
        author: "",
        image: "image.png",
      },
    };
  },
});
describe("PostAdd Component", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(PostAdd, {
      data() {
        return {
          post: null,
          showCreatedPost: false,
        };
      },
      global: {
        plugins: [store],
      },
    });
  });

  test("should post-create component exist  ", async () => {
    const postCreateComponent = wrapper.findComponent({ ref: "post-create" });
    expect(postCreateComponent.exists()).toBe(true);
  });

  test("should post-created component not exist on the beginning", () => {
    const postCreated = wrapper.findComponent({ ref: "#post-created" });
    expect(postCreated.exists()).toBe(false);
  });
});
