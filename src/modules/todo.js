class Todo {
    constructor(task, done = false, priority = null, date = new Date(), category = "", id = null){
        this.task = task;
        this.done = done;
        this.priority = priority;
        this.date = date;
        this.category = category;
        this.id = id;
    }

    toggleComplete(){
        this.done = !this.done;
    }

    set date(date){
        let objDate = new Date(date);
        if(!isNaN(objDate.getTime())){
            this._date = objDate;
        } else {
            console.log("Invalid date");
        }
    } 

    get date(){
        return this._date;
    }
}

export { Todo };