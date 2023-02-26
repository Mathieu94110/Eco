import ActionInputs from "@/components/CreateAdInputs/ActionInputs.vue";
import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";

describe("Emitter", () => {
  it("should emits an event with two arguments", () => {
    const wrapper = mount(ActionInputs, {
      props: {
        ad: {
          title: "crème nivea",
          description: "Crème de soin pour les peaux sensibles",
          category: "Cosmétiques",
          price: "12",
          image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEA",
        },
      },
    });

    wrapper.vm.createAd();

    expect(wrapper.emitted("createAd")).toHaveLength(1);
  });
});
