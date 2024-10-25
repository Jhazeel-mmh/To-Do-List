import { Todo } from "./todo";

export function createTodo(task, done = false, priority = null, date = new Date(), category = "", id = null){
    return new Todo(task, done, priority, date, category, id);
}