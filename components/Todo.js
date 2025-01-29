class Todo {
  constructor(data, selector, handleCheck, handleDelete) {
    this._data = data;
    this._templateElement = document.querySelector(selector);
    this._handleCheck = handleCheck;
    this._handleDelete = handleDelete;
  }

  _setEventListeners() {
    this._todoCheckboxEl.addEventListener("change", () => {
      this._data.completed = !this._data.completed;
      this._toggleCompletion();
      this._handleCheck(this._data.completed);
    });

    this._todoDeleteBtn.addEventListener("click", (evt) => {
      evt.stopPropagation();

      if (this._handleDelete) {
        this._handleDelete(this._data.id, this._data.completed);
      }
      this._todoElement.remove();
    });
  }

  _toggleCompletion() {
    if (this._data.completed) {
      this._todoElement.classList.add("todo_completed");
    } else {
      this._todoElement.classList.remove("todo_completed");
    }
  }

  _generateCheckboxEl() {
    this._todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
    this._todoLabel = this._todoElement.querySelector(".todo__label");

    const uniqueId = `todo-${this._data.id}-${Math.random()
      .toString(36)
      .slice(2, 9)}`;

    this._todoCheckboxEl.checked = this._data.completed;
    this._todoCheckboxEl.id = uniqueId;
    this._todoLabel.setAttribute("for", uniqueId);
  }

  getView() {
    this._todoElement = this._templateElement.content
      .querySelector(".todo")
      .cloneNode(true);

    const todoNameEl = this._todoElement.querySelector(".todo__name");
    const todoDate = this._todoElement.querySelector(".todo__date");
    this._todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn");

    todoNameEl.textContent = this._data.name;

    const dueDate = new Date(this._data.date);
    if (!isNaN(dueDate)) {
      todoDate.textContent = `Due: ${dueDate.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}`;
    } else {
      todoDate.textContent = "No due date";
    }

    this._generateCheckboxEl();
    this._setEventListeners();

    if (this._data.completed) {
      this._todoElement.classList.add("todo_completed");
    }

    return this._todoElement;
  }
}

export default Todo;
