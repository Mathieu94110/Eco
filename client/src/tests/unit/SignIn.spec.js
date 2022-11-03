import { mount } from "@vue/test-utils";
import SignIn from "@/components/Login/SignIn.vue";
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

describe("SignIn Component", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(SignIn, {
      global: {
        plugins: [store],
      },
    });
  });

  test("email input value should update successfully", async () => {
    const emailInput = wrapper.find("#email");
    await emailInput.setValue("myName@gmail.com");
    expect(emailInput.element.value).toBe("myName@gmail.com");
  });

  test("password input value should update successfully", async () => {
    const passwordInput = wrapper.find("#password");
    await passwordInput.setValue("toto94");
    expect(passwordInput.element.value).toBe("toto94");
  });

  test("email value and password value should be emitted successfully", async () => {
    const newEmail = "toto94@gmail.com";
    const newPassword = "toto941";
    await wrapper.find("#email").setValue(newEmail);
    await wrapper.find("#password").setValue(newPassword);
    await wrapper.find("form").trigger("submit.prevent");

    expect(wrapper.emitted("login")[0][0]).toStrictEqual({
      email: newEmail,
      password: newPassword,
    });
  });

  test("no email value or no password value should locked login button", async () => {
    const newEmail = "toto94@gmail.com";
    const newPassword = "toto941";
    await wrapper.find("#email").setValue(newEmail);
    await wrapper.find("#email").setValue("");
    await wrapper.find("#password").setValue(newPassword);
    await wrapper.find("#password").setValue("");
    const loginBtn = wrapper.find("#login-button");
    expect(loginBtn.element.disabled).toBe(true);
  });
});
