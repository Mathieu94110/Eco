import ActionInputs from "@/components/CreateAddInputs/ActionInputs.vue";
import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";

describe("Emitter", () => {
  it("should emits an event with two arguments", () => {
    const wrapper = mount(ActionInputs, {
      props: {
        add: {
          title: "crème nivea",
          description: "Crème de soin pour les peaux sensibles",
          category: "Cosmétiques",
          price: "12",
          image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEA",
        },
      },
    });

    wrapper.vm.createAdd();

    expect(wrapper.emitted("createAdd")).toHaveLength(1);
  });
});
