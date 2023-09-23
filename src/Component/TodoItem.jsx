function TodoItem({
  todo,
  handleEditTodo,
  handleDeleteTodo,
  handleToggleTodo,
}) {
  return (
    <li className="todo-items">
      <span>{todo.text}</span>

      <div>
        <button onClick={() => handleToggleTodo(todo.id)}>
          {todo.completed ? "Incomplete" : "Complete"}
        </button>
        <button onClick={() => handleEditTodo(todo.id)}>Edit</button>
        <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
      </div>
    </li>
  );
}

export default TodoItem;
