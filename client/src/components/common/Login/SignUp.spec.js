import { mount, flushPromises } from "@vue/test-utils";
import { createStore } from "vuex";
import SignUp from "@/components/common/Login/SignUp.vue";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { nextTick } from "vue";

describe("SignUp Component", () => {
  const dispatchMock = vi.fn();

  const store = createStore({
    actions: {
      createAccount: dispatchMock,
    },
    mutations: {
      setStatus: vi.fn(),
    },
  });

  let wrapper;

  beforeEach(async () => {
    dispatchMock.mockClear();

    wrapper = mount(SignUp, {
      props: {
        status: "",
      },
      global: {
        plugins: [store],
      },
    });

    await nextTick();
  });

  it("should dispatch createAccount action on submit", async () => {
    await wrapper.find('input[name="pseudo"]').setValue("JohnDoe");
    await wrapper.find('input[name="email"]').setValue("jDoe@gmail.com");
    await wrapper.find('input[name="password"]').setValue("password123");

    await flushPromises(); // waiting for vee-validate detect changes

    await wrapper.vm.onSubmit();

    expect(dispatchMock).toHaveBeenCalledTimes(1);
    expect(dispatchMock).toHaveBeenCalledWith(expect.anything(), {
      pseudo: "JohnDoe",
      email: "jDoe@gmail.com",
      password: "password123",
    });
  });
});
