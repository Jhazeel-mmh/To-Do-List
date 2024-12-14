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
        let addTodoBtn = $(".add-task");

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
            DOM.closeDetailsDiv();
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

    const filterTodos = () => {
        const section = $(".main-sections");
        const options = $$(".section-option");

        section.addEventListener("click", (event) => {
            if(event.target.classList.contains("show-todo")){
                DOM.showTasks(StrgCtrl.getUndoneTodos());
            }
            if(event.target.classList.contains("show-done")){
                DOM.showTasks(StrgCtrl.getDoneTodos());
            }
            if(event.target.classList.contains("show-all")){
                DOM.showTasks(StrgCtrl.todos);
            }

            DOM.toggleClassesBetweenElements(event.target, options,"clicked");
        });
    }; 

    const updateStatusOfTheTodos = () => {
        const todosBoard = $(".main-todo-board");
        todosBoard.addEventListener("click", (event) => {
            let target = event.target;
            if (target.classList.contains("todo-checkbox")){
                StrgCtrl.todos[target.id].done = !StrgCtrl.todos[target.id].done;
                DOM.showTasks(StrgCtrl.todos);
            } else if (target.classList.contains("todo-item-todo")){
                let parent = target.parentElement;
                let idOFTodo = parent.id.replace("todo-id-", "");
                let todo = StrgCtrl.getTodo(idOFTodo);
                DOM.displayFormOfTodo(todo);
            }
        });
    };

    updateStatusOfTheTodos();
    filterTodos();
    addEventListenerToDisplayForm();
})(new DOMController(), new StorageController());