import { mount } from "@vue/test-utils";
import CreateAdd from "@/views/CreateAdd.vue";
import { createStore } from "vuex";
import { beforeEach, describe, it, expect } from "vitest";

const store = createStore({
  state() {
    return {
      user: { userId: "1125533495595" },
      windowWidth: 747,
      currentPost: {
        image: "image.png",
      },
    };
  },
});
describe("CreateAdd Component", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(CreateAdd, {
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

  it("should create-add component exist  ", async () => {
    const createAddComponent = wrapper.findComponent({ ref: "create-add" });
    expect(createAddComponent.exists()).toBe(true);
  });

  it("should createdAddCard component not exist on the beginning", () => {
    const createdAddCard = wrapper.findComponent({ ref: "#created-add" });
    expect(createdAddCard.exists()).toBe(false);
  });
});
