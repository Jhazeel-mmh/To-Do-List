import { $, $$, c$, createImage } from "./DOMManipulationFunctions"

class DOMController {
    constructor(){
        this.categorys = [];
    }

    updateCategorys(list){
        this.categorys = list;
    }
    // TODO: addthe add function to display a form that adds a div. Remember to get the categorys from all the task and display them in a select input,  probably you gotta add some other function in the storageController 
    // DONE, I UPDATE THE IMPLEMENTATION OF displayFormOfTodo() TO USE IN CASE OF ADD/SHOW A TODO 


    // ADD A ID TO THE TASK DIV TO IMPROVE THE JS DELEGATION EVENT WHEN SOMEONE CLICKS  IN THE TODO TO SHOW HIS INFO

    showTasks(list){
        let mainDiv = $(".main-todo-board");
        mainDiv.textContent = "";
        list.forEach(todo => {
            let task = c$("div", "task-item")
            task.innerHTML = `
                <input type="checkbox" id="${todo.id}" class="todo-checkbox" ${todo.done ? "checked" : ""}>
                <p class="todo-item-todo">${todo.task}</p>
            `
            task.id = "todo-id-" + todo.id;
            mainDiv.appendChild(task);
        });
    }

    displayCategorysNav(list = this.categorys){
        let categoryNav = $(".category-nav");
        list.forEach(c => {
            let btn = c$("button", "category-item", c)
            btn.value = c;
            btn.textContent = c;
            categoryNav.appendChild(btn);
        });
    }

    displayFormOfTodo(todo = false){
        let div = c$("div", "details-form", "details-form");
        div.classList.add("backdrop");
        let prioritySelectedElement, removeBtn;
        if (todo){
            prioritySelectedElement = this.determineSelectedByPriority(todo.priority);
            div.id = "details-" + todo.id;
            removeBtn = '<button class="remove-todo-btn">Remove</button>';
        } else {
            prioritySelectedElement = this.determineSelectedByPriority();
            removeBtn = "";
        }
       
        div.innerHTML = `
            <form id="add-task-form" class="modal">
                <button class="close-details-btn">X</button>
                ${removeBtn}
                <div class="todo-inputs">
                    <p id="todo-wrapper">
                        <input id="todo-task" placeholder="Task" value="${todo.task ? todo.task : ""}">
                    </p>
                    <p id="notes-wrapper">
                        <textarea id="todo-notes" placeholder="Notes">${todo.notes ? todo.notes : ""}</textarea>    
                    </p>
                    <p id="priority-wrapper">
                        <label for="todo-priority">Priority:</label>
                        <select id="todo-priority" name="priority">
                            ${prioritySelectedElement}
                        </select>
                    </p>
                    <p id="date-wrapper">
                        <label for="todo-date">Date:</label>
                        <input type="date" name="date" id="todo-date" value="${todo ? this.displayDateOfTodo(todo) : "" }">
                    </p>
                    <p id="category-wrapper">
                        <label for="todo-category">Category: </label>
                        <input type="text" value="${todo.category || ""}" list="categoryList" id="todo-category">
                        ${this.displayCategoryDatalist(this.categorys)}
                    </p>
                    <p id="check-wrapper">
                        <label for="todo-check">Done:</label>
                        <input type="checkbox" ${todo.done ? "checked" : ""} id="todo-check">
                    </p>
                    <p id="submit-wrapper">
                        <input type="submit" value="Save" id="submitform">
                    </p> 
                </div>
            </form>
        `

        document.body.appendChild(div);
        const btnOfClose = $(".close-details-btn");
        btnOfClose.addEventListener("click", this.closeDetailsDiv);
    }   

    displayCategoryInput(value){
        let categoryInput = c$("input", "ci","todo-category");
        categoryInput.type = "text";
        categoryInput.textContent = value;
        categoryInput.setAttribute("list", "categoryList");
        return categoryInput.outerHTML;
    }

    displayCategoryDatalist(list){
        let datalist = c$("datalist", "datalist", "categoryList");
        if (list){
            datalist.innerHTML = list.map(category => `<option value="${category}">`).join("");
        }
        return datalist.outerHTML;
    }

    displayDateOfTodo(todo){
        let date = todo.date;
        if (!date) return;
        const formattedDate = date.toISOString().split('T')[0]; // Formato "YYYY-MM-DD"
        return formattedDate;
    }

    closeDetailsDiv(){
        let div = $(".details-form");
        const body = $("body");
        body.removeChild(div); 
    }

    determineSelectedByPriority(priority){
        switch (priority) {
            case 3:
                return `
                    <option value="1">low</option>
                    <option value="2">medium</option>
                    <option value="3" selected>high</option>
                `;
            case 2:
                return `
                    <option value="1">low</option>
                    <option value="2" selected>medium</option>
                    <option value="3">high</option>
                `;
            case 1:
                return `
                    <option value="1" selected>low</option>
                    <option value="2">medium</option>
                    <option value="3">high</option>
                `;
            default:
                return `
                    <option value="1">low</option>
                    <option value="2">medium</option>
                    <option value="3">high</option>
                `;
        }
    }

    toggleClassesBetweenElements(target, nodes, cls){
        if (!(target && nodes && cls)) return;

        nodes.forEach(node => {
            if (node === target){
                target.classList.add(cls);
            } else {
                node.classList.remove(cls);
            }
        });       
    }

    removeClassFromNodes(cls, nodes){
        nodes.forEach(option => {
            if (option.classList.contains(cls)){
                option.classList.remove(cls);
            }
        });
    }

    searchInput(){
        const search = $(".search");
        search.textContent = "";
        search.innerHTML = `
            <form id="search-form">
                <input type="text" id="search-query" placeholder="Search">
                <button type="button" id="cancel-search-query">
                    x
                </button>
            </form>
        `;
    }

    searchInputDefaultHTMLContent(){
        return `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>magnify</title><path d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" /></svg>
        <button type="button">Search</button>
                `
    }
}   

export { DOMController };