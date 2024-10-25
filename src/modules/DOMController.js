import { $, $$, c$, createImage } from "./DOMManipulationFunctions"

class DOMController {
    constructor(){
        this.categorys = [];
    }

    showTasks(list){
        let mainDiv = $(".main");
        list.forEach(todo => {
            let task = c$("div", "task-item")
            task.innerHTML = `
                <input type="checkbox" id="${todo.id}" class="todo-checkbox">
                <p class="todo-item-todo">${todo.task}</p>
            `
            mainDiv.appendChild(task);
        });
    }

    showCategory(list){
        let categoryNav = $(".category-nav");
        list.forEach(c => {
            let btn = c$("button", "category-item", c)
            btn.value = c;
            categoryNav.appendChild(btn);
        });
    }

    showTodoDetails(todo){
        let div = c$("div", "details", "details-" + todo.id);
        let prioritySelectedElement = this.determineSelectedByPriority(todo.priority);
        div.innerHTML = `
            <button class="close-details-btn">X</button>
            <h3 class="todo-task">${todo.task}</h3>
            <p class="todo-notes">${todo.notes}</p>
            <div class="todo-buttons">
                <p>
                    <label for="taskPriority">Prioridad:</label>
                    <select id="taskPriority" name="priority">
                        ${prioritySelectedElement}
                    </select>
                </p>
                <p>
                    <label for="todo-date">Date:</label>
                    <input type="date" name="date" id="todo-date" value="${todo.date}">
                </p>
                <p>
                    <label for="todo-category">Category: </label>
                    <input type="text" value="${todo.category}" id="todo-category">
                </p>
            </div>
        `
        document.body.appendChild(div);
        this.closeDetailsDiv(div);
        this.setDateofTodo(todo);

    }   

    setDateofTodo(todo){
        let inputDate = $('#todo-date');
        let date = todo.date;
        const formattedDate = date.toISOString().split('T')[0]; // Formato "YYYY-MM-DD"
        inputDate.value = formattedDate;
    }

    closeDetailsDiv(element){
        let closeBtn = $(".close-details-btn");
        closeBtn.addEventListener("click", () => document.removeChild(element));
    }

    determineSelectedByPriority(priority){
        switch (priority) {
            case 3:
                return `
                    <option value="low">low</option>
                    <option value="medium">medium</option>
                    <option value="high" selected>high</option>
                `;
            case 2:
                return `
                    <option value="low">low</option>
                    <option value="medium" selected>medium</option>
                    <option value="high">high</option>
                `;
            case 1:
                return `
                    <option value="low" selected>low</option>
                    <option value="medium">medium</option>
                    <option value="high">high</option>
                `;
            default:
                return `
                    <option value="low">low</option>
                    <option value="medium">medium</option>
                    <option value="high">high</option>
                `;
        }
    }

}   

export { DOMController };