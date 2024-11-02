import "./normalize.css";
import "./style.css";
import { Todo } from "./modules/todo";
import { StorageController } from "./modules/storageController";
import { createTodo } from "./modules/createTodo";
import { DOMController } from "./modules/DOMController";                                                                                                            

const c = new StorageController();
const dom = new DOMController();
c.loadFromLocalStore()

/*
c.addTodo(createTodo("Wash my theet"));
c.addTodo(createTodo("Wash my a"));
c.addTodo(createTodo("Wash my ass"));
c.addTodo(createTodo("Wash my feet"));
c.addTodo(createTodo("Wash my aaa"));


*/

dom.updateCategorys(c.getCategorys())
dom.showTasks(c.todos);


dom.displayFormOfTodo(c.todos[7]);

console.log((c.todos));

