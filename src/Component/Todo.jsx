import { useState } from "react";
import TodoList from "./TodoList";
import "../Styles/Todo.css";

function Todo() {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [editingId, setEditingId] = useState(null);
  //   console.log(todos);
  //   console.log(editingId);

  const handleInput = (event) => {
    setInput(event.target.value);
  };

  const handleAddTodo = () => {
    if (input === "") {
      return;
    }
    if (editingId !== null) {
      const updatedTodos = todos.map((todo) =>
        todo.id === editingId ? { ...todo, text: input, editing: false } : todo
      );
      setTodos(updatedTodos);
      setEditingId(null);
    } else {
      const newTodoItem = {
        id: Date.now(),
        text: input,
        completed: false,
      };
      setTodos([...todos, newTodoItem]);
    }
    setInput("");
  };

  const handleEditTodo = (id) => {
    const todoToEdit = todos.find((todo) => todo.id === id);
    setInput(todoToEdit.text);
    setEditingId(id);
  };

  const handleDeleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const handleToggleTodo = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  return (
    <div className="todo-container">
      <h1>Todo List App</h1>
      <div>
        <input
          type="text"
          value={input}
          placeholder="Add todos..."
          onChange={handleInput}
        />
        <button onClick={handleAddTodo}>Add</button>
      </div>

      <TodoList
        todos={todos}
        handleEditTodo={handleEditTodo}
        handleDeleteTodo={handleDeleteTodo}
        handleToggleTodo={handleToggleTodo}
      />
    </div>
  );
}

export default Todo;
