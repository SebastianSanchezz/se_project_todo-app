class TodoCounter {
  constructor(todos, selector) {
    this._element = document.querySelector(selector);
    this._total = todos.length;
    this._completed = todos.filter((todo) => todo.completed).length;

    this._updateText();
  }

  updateCompleted = (increment) => {
    this._completed = Math.max(
      0,
      Math.min(this._total, this._completed + increment)
    );
    this._updateText();
  };

  updateTotal = (increment) => {
    this._total = Math.max(0, this._total + increment);

    this._completed = Math.min(this._completed, this._total);

    this._updateText();
  };

  _updateText() {
    this._element.textContent = `Showing ${this._completed} out of ${this._total} completed`;
  }
}

export default TodoCounter;
