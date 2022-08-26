import { Before, Given, Then, When } from "@cucumber/cucumber";
import Network from "../../app/models/Network.js";
import Person from "../../app/models/Person.js";
import { expect } from "expect";
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

When("{shouter} shouts {string}", function (shouter, message) {
  this.persons[shouter.toLowerCase()].shout(message);
});

// TODO: Take the flat array, and use `forEach` to shout all of the messages...

When("{shouter} shouts:", function (name, dataTable) {
  dataTable.rawTable
    .flat()
    .forEach((shout) => this.persons[name.toLowerCase()].shout(shout));
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
