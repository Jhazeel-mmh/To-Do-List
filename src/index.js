import "./normalize.css";
import "./style.css";
import { Todo } from "./modules/todo";
import { StorageController } from "./modules/storageController";
import { createTodo } from "./modules/createTodo";
import { DOMController } from "./modules/DOMController";
import { $, $$} from "./modules/DOMManipulationFunctions";                                                                                            


const App = (function (DOM, StrgCtrl){

    StrgCtrl.loadFromLocalStore();
    DOM.displayCategorysNav();
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
        let btnRemove = $(".remove-todo-btn");  
        if (!btnRemove) return;
        btnRemove.addEventListener("click", () => {
            categoryUpdate();
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
            categoryUpdate();
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

    const filterTodosForDate = () => {
        const todayBtn = $(".today");
        const upcomingBtn = $(".upcoming");

        todayBtn.addEventListener("click", () => {
            DOM.showTasks(StrgCtrl.getTodosOfToday());
            DOM.removeClassFromNodes("clicked", $$(".section-option"));
        });

        upcomingBtn.addEventListener("click", () => {
            DOM.showTasks(StrgCtrl.getTodosOfTheWeek());
            DOM.removeClassFromNodes("clicked", $$(".section-option"));
        });
    };

    const categoryUpdate = () => {
        DOM.updateCategorys(StrgCtrl.getCategorys());
        DOM.displayCategorysNav();
    };

    const filterTodosForCategory = () => {
        let categoryNodes = $$(".category-item");
        categoryNodes.forEach(btn => {
            btn.addEventListener("click", () => {
                DOM.showTasks(StrgCtrl.getTodosOfCategory(btn.id));
            });
        });
    };

    const createDefaultTodos = () => {
        let todayDate = new Date();
        let tomorrowDate = new Date();
        tomorrowDate.setDate(tomorrowDate.getDate() + 4);

        StrgCtrl.addTodo(createTodo("This task is meant to doing it Today", false, "", "", todayDate, "Example Category"));
        StrgCtrl.addTodo(createTodo("This task is meant for doing it in the upcoming days", false, "", "", tomorrowDate, "Example Category"));
        StrgCtrl.addTodo(createTodo("This task is meant for doing it in the upcoming days 2", false, "", "", tomorrowDate, "Example Category"));
        StrgCtrl.addTodo(createTodo("This task isn’t meant for doing it", true, "", "", tomorrowDate, "Example 2"));

        localStorage.setItem("setDefaultTodos", "Done");
        
        DOM.displayCategorysNav();
    };

    
    if (!localStorage.getItem("setDefaultTodos")){
        createDefaultTodos();
    }
    
    console.log(StrgCtrl.todos);
    

    DOM.showTasks(StrgCtrl.todos);
    filterTodosForCategory();
    filterTodosForDate();
    displaySearchForTodo();
    updateStatusOfTheTodos();
    filterTodosHandler();
    addEventListenerToBtnAdd();
})(new DOMController(), new StorageController());
