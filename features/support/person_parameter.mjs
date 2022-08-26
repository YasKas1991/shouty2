import { defineParameterType } from "@cucumber/cucumber";

["person", "listener", "shouter"].forEach((type) => {
  defineParameterType({
    name: type,
    regexp: /S.*|L.*/,
  });
});
