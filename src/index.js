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
    

    const addEventListenerToBtnAdd = () => {
        let addTodoBtn = $(".add-task");

        if (!addTodoBtn) return;

        addTodoBtn.addEventListener("click", formController);
    };

    const formController = (idOfTodo = undefined, todo = undefined) => {
        const form = $(".details-form");
        if (!form) DOM.displayFormOfTodo(todo);
        // blockClicksOutsideForm();
        addEventListenerToRemoveTodo(idOfTodo);
        addEventListenerOfAddTodo(idOfTodo);
    };

    const addEventListenerToRemoveTodo = (id) => { 
        let btnClose = $(".remove-todo-btn");  
        if (!btnClose) return;
        btnClose.addEventListener("click", () => {
            StrgCtrl.removeTodo(id);
            DOM.removeClassFromNodes("clicked", $$(".section-option"));
            DOM.closeDetailsDiv();
            DOM.showTasks(StrgCtrl.todos);
        });
    };
    

    const addEventListenerOfAddTodo = (id) => {
        let form = $("#add-task-form");
        form.addEventListener("submit", event => {
            event.preventDefault()
            addTodo();
            StrgCtrl.removeTodo(id);
            DOM.removeClassFromNodes("clicked", $$(".section-option"));
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

    /*
    const blockClicksOutsideForm = () => {
        let form = $("#details-form");
        document.body.addEventListener("click", event => {
            if(!form.contains(event.target)){
                event.stopPropagation();
                event.preventDefault();
            }
        });
    };*/

    const filterTodosHandler = () => {
        const section = $(".main-sections");
        const options = $$(".section-option");

        section.addEventListener("click", (event) => {
            let classes = event.target.classList;
            let arrayOfClasses = Array.from(classes);
            let optionToRender = arrayOfClasses.filter(classe => classe.startsWith("show-")).join();
            filterTodos(optionToRender);
            DOM.toggleClassesBetweenElements(event.target, options,"clicked");
        });
    }; 

    const filterTodos = (key) => {
        switch (key) {
            case "show-todo":
                DOM.showTasks(StrgCtrl.getUndoneTodos());
                break;
            case "show-done":
                DOM.showTasks(StrgCtrl.getDoneTodos());
                break;
            case "show-all":
                DOM.showTasks(StrgCtrl.todos);
                break;
            default:
                DOM.showTasks(StrgCtrl.todos);
                break;
        }
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
                formController(idOFTodo, todo);
            }
        });
    };


    updateStatusOfTheTodos();
    filterTodosHandler();
    addEventListenerToBtnAdd();
})(new DOMController(), new StorageController());