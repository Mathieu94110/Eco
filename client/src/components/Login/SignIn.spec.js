import { mount } from "@vue/test-utils";
import SignIn from "@/components/Login/SignIn.vue";
import { createStore } from "vuex";
import { beforeEach, describe, it, expect, vi } from "vitest";

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

describe("SignIn Component", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(SignIn, {
      global: {
        plugins: [store],
      },
    });
  });

  it("should email input value update successfully", async () => {
    const emailInput = wrapper.find("#email");
    await emailInput.setValue("myName@gmail.com");
    expect(emailInput.element.value).toBe("myName@gmail.com");
  });

  it("should password input value update successfully", async () => {
    const passwordInput = wrapper.find("#password");
    await passwordInput.setValue("toto94");
    expect(passwordInput.element.value).toBe("toto94");
  });

  it("should submit has been called", async () => {
    const spy = vi.spyOn(wrapper.vm, "submit");
    const newEmail = "toto94@gmail.com";
    const newPassword = "toto941";
    await wrapper.find("#email").setValue(newEmail);
    await wrapper.find("#password").setValue(newPassword);
    await wrapper.find("form").trigger("submit.prevent");
    expect(spy).toHaveBeenCalled();
  });

  it("should no email value or no password value locked login button", async () => {
    const newEmail = "toto94@gmail.com";
    const newPassword = "toto941";
    await wrapper.find("#email").setValue(newEmail);
    await wrapper.find("#email").setValue("");
    await wrapper.find("#password").setValue(newPassword);
    await wrapper.find("#password").setValue("");
    const loginBtn = wrapper.find("#login-button");
    expect(loginBtn.element.disabled).toBe(true);
  });

  it("renders generic error if status prop is error_login", () => {
    const wrapper = mount(SignIn, {
      props: {
        status: "error_login",
      },
      data() {
        return {
          password: "short",
        };
      },
    });
    const emailInput = wrapper.find("#generic-error");
    expect(emailInput.html()).toContain("Adresse mail et/ou mot de passe invalide");
  });
});
