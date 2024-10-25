import "./normalize.css";
import "./style.css";
import { Todo } from "./modules/todo";
import { StorageController } from "./modules/storageController";
import { createTodo } from "./modules/createTodo";

const c = new StorageController();
c.loadFromLocalStore()

/*
c.addTodo(createTodo("Wash my theet"));
c.addTodo(createTodo("Wash my a"));
c.addTodo(createTodo("Wash my ass"));
c.addTodo(createTodo("Wash my feet"));
c.addTodo(createTodo("Wash my aaa"));


*/

console.log((c.todos));