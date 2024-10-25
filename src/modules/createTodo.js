import { Todo } from "./todo";

export function createTodo(task, done = false, notes = "", priority = null, date = new Date(), category = "", id = null){
    return new Todo(task, done, notes, priority, date, category, id);
}