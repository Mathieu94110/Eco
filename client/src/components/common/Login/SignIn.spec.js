import { mount } from "@vue/test-utils";
import { beforeEach, describe, it, expect, vi } from "vitest";

const dispatchMock = vi.fn();
const pushMock = vi.fn();

vi.mock("vuex", () => ({
  useStore: () => ({
    dispatch: dispatchMock,
  }),
}));

vi.mock("vue-router", () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

import SignIn from "@/components/common/Login/SignIn.vue";

describe("SignIn Component", () => {
  let wrapper;

  beforeEach(() => {
    dispatchMock.mockReset();
    pushMock.mockReset();

    wrapper = mount(SignIn, {
      props: {
        status: "",
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

  it("should dispatch login action on submit", async () => {
    dispatchMock.mockResolvedValue(true);

    await wrapper.find("#email").setValue("toto94@gmail.com");
    await wrapper.find("#password").setValue("toto941");
    await wrapper.find("form").trigger("submit.prevent");

    expect(dispatchMock).toHaveBeenCalledWith("login", {
      email: "toto94@gmail.com",
      password: "toto941",
    });

    expect(pushMock).toHaveBeenCalledWith("/home");
  });

  it("should disable login button if fields are empty", async () => {
    const loginBtn = wrapper.find("#login-button");
    expect(loginBtn.element.disabled).toBe(true);

    await wrapper.find("#email").setValue("toto94@gmail.com");
    expect(loginBtn.element.disabled).toBe(true);

    await wrapper.find("#password").setValue("toto941");
    expect(loginBtn.element.disabled).toBe(false);
  });

  it("renders generic error if status prop is error-login", () => {
    const errorWrapper = mount(SignIn, {
      props: {
        status: "error-login",
      },
    });

    const errorMessage = errorWrapper.find("#generic-error");
    expect(errorMessage.exists()).toBe(true);
    expect(errorMessage.html()).toContain("Adresse mail et/ou mot de passe invalide");
  });
});
