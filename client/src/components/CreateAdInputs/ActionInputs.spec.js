import ActionInputs from "@/components/CreateAdInputs/ActionInputs.vue";
import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";

describe("Emitter", () => {
  it("should submit ad button been not present when isAddCreated is false", () => {
    const wrapper = mount(ActionInputs, {
      props: {
        isAdCreated: false,
        ad: {
          title: "crème nivea",
          description: "Crème de soin pour les peaux sensibles",
          category: "Cosmétiques",
          price: "12",
          image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEA",
        },
      },
    });
    expect(wrapper.findAll('[data-test="submit-button"]')).toHaveLength(0);
  });
  it("should emits submit-ad event", () => {
    const wrapper = mount(ActionInputs, {
      props: {
        isAdCreated: true,
        ad: {
          title: "crème nivea",
          description: "Crème de soin pour les peaux sensibles",
          category: "Cosmétiques",
          price: "12",
          image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEA",
        },
      },
    });
    expect(wrapper.findAll('[data-test="submit-button"]')).toHaveLength(1);
    wrapper.get('[data-test="submit-button"]').trigger("click");
    expect(wrapper.emitted()).toHaveProperty("submit-ad");
    expect(wrapper.emitted("submit-ad")).toHaveLength(1);
  });

});
