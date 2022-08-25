import { Before, Given, Then, When } from "@cucumber/cucumber";
import { expect } from "expect";

Given("Lucy is located {float} meters away from Sean", function (distance) {
  console.log(`Lucy is ${distance} meters away from Sean`);
  this.distance = distance;
  this.listener = "Lucy";
  this.shouter = "Sean";
});

When("Sean shouts {string}", function (message) {
  this.shouter.shout(message);
  this.message = message;
});

Then("Lucy hears Sean's shout", function () {
  expect(this.listener.message).toContain(this.message);
});
