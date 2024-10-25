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

dom.showTasks(c.todos);

console.log((c.todos));

