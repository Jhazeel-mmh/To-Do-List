import "./normalize.css";
import "./style.css";
import { Todo } from "./modules/todo";
import { StorageController } from "./modules/storageController";
import { createTodo } from "./modules/createTodo";
import { DOMController } from "./modules/DOMController";
import { $, $$} from "./modules/DOMManipulationFunctions";                                                                                            


const App = (function (DOM, StrgCtrl){

    StrgCtrl.loadFromLocalStore();
    DOM.showTasks(StrgCtrl.todos);

    const addEventListenerToDisplayForm = () => {
        let addTodoBtn = $("#add-task-btn");

        if (!addTodoBtn) return;

        addTodoBtn.addEventListener("click", () => {
            const form = $("#details-form");
            if (!form) DOM.displayFormOfTodo();
            blockClicksOutsideForm();
            addEventListenerOfAddTodo();
        });
    };

    const addEventListenerOfAddTodo = () => {
        let form = $("#add-task-form");
        form.addEventListener("submit", event => {
            event.preventDefault()
            addTodo();
            DOM.showTasks(StrgCtrl.todos);
        });
    };

    const addTodo = () => {
        let task = $("#todo-task")?.value || ""; // Encadenamiento opcional para evitar errores
        let done = $("#todo-check")?.checked || false; // Booleano para checkbox
        let notes = $("#todo-notes")?.value || "";
        let priority = $("#todo-priority")?.value || "";
        let date = $("#todo-date")?.value || "";
        let category = $("#todo-category")?.value || "";


        if (!task) return;
        
        StrgCtrl.addTodo(createTodo(task, done, notes, priority, date, category));
        console.log(StrgCtrl.todos);
        ;
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