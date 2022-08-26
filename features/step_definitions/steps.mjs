import { Before, Given, Then, When } from "@cucumber/cucumber";
import Network from "../../app/models/Network.js";
import Person from "../../app/models/Person.js";
import { expect } from "expect";
import { isExportDeclaration } from "typescript";

Before(function () {
  this.persons = {};
});
Given("the range is {float}", function (range) {
  this.Network = new Network(range);
});
Given("{person} is located at {float}", function (name, position) {
  this.persons[name.toLowerCase()] = new Person({
    name,
    network: this.network,
    position,
  });
});

Given("the maximum character length is {int}", function (maxLength) {
  this.network = new Network(15, maxLength);
});

When("{shouter} shouts {string}", function (shouter, message) {
  this.persons[shouter.toLowerCase()].shout(message);
});

// TODO: Take the flat array, and use `forEach` to shout all of the messages...

When("{shouter} shouts:", function (name, dataTable) {
  dataTable.rawTable
    .flat()
    .forEach((shout) => this.persons[name.toLowerCase()].shout(shout));
});
When("{shouter} shouts,", function (shouter, longMsg) {
  try {
    this.persons[shouter.toLowerCase()] = new Person({
      name: shouter,
      network: this.network,
    });

    this.persons[shouter.toLowerCase()].shout(longMsg);
  } catch (error) {
    this.error = error;
  }
});

Then("{listener} hears {shouter}'s shout", function (listener, shouter) {
  expect(this.persons[listener.toLowerCase()].messages).toEqual(
    this.persons[shouter.toLowerCase()].shouts
  );
});

Then("{listener} hears {shouter}'s shout", function (listener, shouter) {
  expect(this.persons[listener.toLowerCase()].messages).not.toEqual(
    this.persons[shouter.toLowerCase()].shouts
  );
});

Then(
  'an error message is received that states "Message is too long"',
  function () {
    expect(this.error).toBeDefined();
    expect(this.error.message.toLowerCase()).toContain("Message is too long");
  }
);
