function TodoItem({
  todo,
  handleEditTodo,
  handleDeleteTodo,
  handleToggleTodo,
}) {
  return (
    <li className="todo-items">
      {todo.completed ? (
        <span className="output-text-compelete"> {todo.text}</span>
      ) : todo.isEdit ? (
        <span className="output-text-edit">{todo.text}</span>
      ) : (
        <span className="output-text">{todo.text}</span>
      )}

      <div className="button-container">
        <button
          className={
            todo.completed ? "button-toggle-done btn" : "button-toggle btn"
          }
          onClick={() => handleToggleTodo(todo.id)}
        >
          {todo.completed ? "Completed" : "incomplete"}
        </button>
        <button
          className="button-edit btn"
          onClick={() => handleEditTodo(todo.id)}
        >
          Edit
        </button>
        <button
          className="button-delete btn"
          onClick={() => handleDeleteTodo(todo.id)}
        >
          Delete
        </button>
      </div>
    </li>
  );
}

export default TodoItem;
