import "./normalize.css";
import "./style.css";
import { Todo } from "./modules/todo";
import { StorageController } from "./modules/storageController";
import { createTodo } from "./modules/createTodo";
import { DOMController } from "./modules/DOMController";
import { $, $$} from "./modules/DOMManipulationFunctions";                                                                                            

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

dom.displayFormOfTodo(c.todos[16]);

console.log((c.todos));

const App = (function (DOM, StrgCtrl){

    StrgCtrl.loadFromLocalStore();


    const addEventListenerToDisplayForm = () => {
        let addTodoBtn = $("#add-task-btn");

        if (!addTodoBtn) return;

        addTodoBtn.addEventListener("click", () => {
            DOM.displayFormOfTodo();
            blockClicksOutsideForm();
            addEventListenerOfAddTodo();
        });
    };

    const addEventListenerOfAddTodo = () => {
        let form = $(".details-form");
        form.addEventListener("submit", event => {
            event.preventDefault()
            addTodo();
        });
    };

    const addTodo = () => {
        let task = $("#todo-task").value;
        let done = $("#todo-check").value;
        let notes = $("#todo-notes").value;
        let priority = $("#todo-priority").value;
        let date = $("#todo-date").value;
        let category = $("#todo-category").value;

        StrgCtrl.addTodo(createTodo(task, done, notes, priority, date, category));
        DOM.closeDetailsDiv();
    };

    const blockClicksOutsideForm = () => {
        const form = $("#details-form");
        document.body.addEventListener("click", event => {
            if(!form.contains(event.target)){
                event.stopPropagation();
                event.preventDefault();
            }
        });
    };

    // add a function that enables remove a todo and add elements to the form to delete the actual todo

    
    addEventListenerToDisplayForm();
})(new DOMController(), new StorageController());