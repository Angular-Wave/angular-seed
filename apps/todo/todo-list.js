import Todo from "./todo";

export default class ToDoList {
  constructor() {
    /** @type {import("./todo").Todo} */
    this.tasks = [
      new Todo("Learn AngularTS"),
      new Todo("Build an AngularTS app"),
    ];
  }
}
