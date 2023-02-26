import { mount } from "@vue/test-utils";
import CreateAd from "@/views/CreateAd.vue";
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
describe("CreateAd Component", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(CreateAd, {
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

  it("should create-ad component exist  ", async () => {
    const createAdComponent = wrapper.findComponent({ ref: "create-ad" });
    expect(createAdComponent.exists()).toBe(true);
  });

  it("should createdAdCard component not exist on the beginning", () => {
    const createdAdCard = wrapper.findComponent({ ref: "#created-ad" });
    expect(createdAdCard.exists()).toBe(false);
  });
});
