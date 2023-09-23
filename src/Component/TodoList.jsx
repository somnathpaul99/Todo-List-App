import TodoItem from "./TodoItem";

function TodoList({
  todos,
  handleEditTodo,
  handleDeleteTodo,
  handleToggleTodo,
}) {
  return (
    <ul className="todo-list">
      {todos
        .slice()
        .reverse()
        .map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            handleEditTodo={handleEditTodo}
            handleDeleteTodo={handleDeleteTodo}
            handleToggleTodo={handleToggleTodo}
          />
        ))}
    </ul>
  );
}

export default TodoList;
