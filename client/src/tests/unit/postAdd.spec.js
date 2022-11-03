import { shallowMount } from "@vue/test-utils";
import PostAdd from "@/views/PostAdd.vue";
import { createStore } from "vuex";
import PostCreateButton from "@/components/Posts/PostCreate/PostCreateInputs/PostCreateButtons.vue";
import PostCreate from "@/components/Posts/PostCreate/PostCreate.vue";

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
    wrapper = shallowMount(PostAdd, {
      data() {
        return {
          post: null,
          showCreatedPost: true,
        };
      },
      global: {
        plugins: [store],
      },
    });
  });

  test("PostCreate exist", async () => {
    const postCreateComponent = wrapper.findComponent({ ref: "post-create" });
    expect(postCreateComponent.exists()).toBe(true);
  });

  test("isaddCreated props should be false by default", async () => {
    const PostCreateComponent = wrapper.findComponent(PostCreate);
    expect(PostCreateComponent.attributes("isaddcreated")).toBe("false");
  });

  test("should post-created component not exist at the beginning", () => {
    const postCreated = wrapper.find("#post-created");
    expect(postCreated.exists()).toBe(false);
  });
});
