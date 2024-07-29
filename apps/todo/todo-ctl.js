import Todo from "./todo";
import ToDoList from "./todo-list";

export default class TodoController {
  constructor() {
    /** @type {ToDoList} */
    this.list = new ToDoList();
    /** @type {Todo?} */
    this.newTodo;
  }

  add() {
    this.list.tasks.push(new Todo(this.newTodo));
  }

  archive() {
    this.list.tasks = this.list.tasks.filter((task) => !task.done);
  }
}
