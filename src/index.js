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

        addTodoBtn.addEventListener("click", () => { 
            formController(); 
        });
    };

    const formController = (idOfTodo = false,todo = false) => {
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
            addTodo(id);
            DOM.removeClassFromNodes("clicked", $$(".section-option"));
            DOM.closeDetailsDiv();
            DOM.showTasks(StrgCtrl.todos);
        });
    };

    const addTodo = (id) => {
        let task = $("#todo-task")?.value || ""; // Encadenamiento opcional para evitar errores
        let done = $("#todo-check")?.checked || false; // Booleano para checkbox
        let notes = $("#todo-notes")?.value || "";
        let priority = $("#todo-priority")?.value || "";
        let date = $("#todo-date")?.value || "";
        let category = $("#todo-category")?.value || "";


        if (!task) return;

        if(id){
           StrgCtrl.todos[id].task = task;
           StrgCtrl.todos[id].done = done;
           StrgCtrl.todos[id].notes = notes;
           StrgCtrl.todos[id].priority = priority;
           StrgCtrl.todos[id].date = date;
           StrgCtrl.todos[id].category = category;
           console.log(StrgCtrl.todos);
           return;
        }
        
        StrgCtrl.addTodo(createTodo(task, done, notes, priority, date, category));
        console.log(StrgCtrl.todos);
        ;
    };

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

    const displaySearchForTodo = () => {
        const search = $(".search");
        search.addEventListener("click", (e) => {
            if (e.target.classList.contains("clickable")){
                DOM.searchInput();
                search.classList.remove("transform");
                search.classList.remove("clickable");

                let cancelBtn = $("#cancel-search-query");
                let searchInput = $("#search-query"); 

                cancelBtn.addEventListener("click", () => {
                    search.innerHTML = DOM.searchInputDefaultHTMLContent();
                    search.classList.add("transform");
                    search.classList.add("clickable");
                });
        
                searchInput.addEventListener("input", (e) => {
                    DOM.showTasks(StrgCtrl.filterTodosThatstartsWith(searchInput.value));
                    DOM.removeClassFromNodes("clicked", $$(".section-option"));
                });
            }
        });
    };

    displaySearchForTodo();
    updateStatusOfTheTodos();
    filterTodosHandler();
    addEventListenerToBtnAdd();
})(new DOMController(), new StorageController());