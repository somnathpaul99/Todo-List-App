import { useState, useEffect, useRef } from "react";
import TodoList from "./TodoList";
import "../Styles/Todo.css";
import {
  BsFillSunFill,
  BsFillMoonStarsFill,
  BsToggle2On,
  BsToggle2Off,
} from "react-icons/bs";

function Todo() {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [dayNight, setDayNight] = useState(false);
  const inputRef = useRef(null);
  //   console.log(todos);
  //   console.log(editingId);
  // console.log(dayNight);

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos-list");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    if (todos.length !== 0) {
      localStorage.setItem("todos-list", JSON.stringify(todos));
    }
  }, [todos]);

  const handleInput = (event) => {
    setInput(event.target.value);
  };

  const handleAddTodo = () => {
    if (input === "") {
      return;
    }
    if (editingId !== null) {
      const updatedTodos = todos.map((todo) =>
        todo.id === editingId ? { ...todo, text: input, isEdit: false } : todo
      );
      setTodos(updatedTodos);
      setEditingId(null);
    } else {
      const newTodoItem = {
        id: Date.now(),
        text: input,
        completed: false,
        isEdit: false,
      };
      setTodos([...todos, newTodoItem]);
    }
    setInput("");
  };

  const handleEditTodo = (id) => {
    const todoToEdit = todos.find((todo) => todo.id === id);

    console.log(todoToEdit);
    if (todoToEdit.completed !== true) {
      setInput(todoToEdit.text);
      setEditingId(id);
      const updatedTodos = todos.map((todo) =>
        todo.id === id ? { ...todo, isEdit: true } : todo
      );
      setTodos(updatedTodos);
      inputRef.current.focus();
    }
  };

  const handleDeleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    if (updatedTodos.length === 0) {
      localStorage.removeItem("todos-list");
    }
    console.log(updatedTodos);
    setTodos(updatedTodos);
  };

  const handleToggleTodo = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
    setInput("");
  };

  const handleToggleDayNight = () => {
    setDayNight(!dayNight);
  };

  return (
    <div className={dayNight ? "todo-container-toggle" : "todo-container"}>
      <h1 style={dayNight ? { color: "white" } : {}}>Todo List App</h1>

      <div className="toggle-day-night">
        <div>
          {dayNight ? (
            <span style={{ color: "white" }}>
              <BsFillSunFill />{" "}
            </span>
          ) : (
            <BsFillMoonStarsFill />
          )}
        </div>

        <div onClick={handleToggleDayNight} className="toggleButtonDayNight">
          {dayNight ? (
            <span style={{ color: "white" }}>
              <BsToggle2On />
            </span>
          ) : (
            <BsToggle2Off />
          )}
        </div>
      </div>

      <div
        className="output-container"
        style={dayNight ? { backgroundColor: "black" } : {}}
      >
        <div>
          <input
            type="text"
            value={input}
            placeholder="Add todos..."
            onChange={handleInput}
            ref={inputRef}
          />
          <button
            className="add-button"
            onClick={handleAddTodo}
            style={
              dayNight
                ? {
                    backgroundColor: "lightgreen",
                    color: "black",
                    fontWeight: "600",
                  }
                : {}
            }
          >
            {editingId ? "Update" : "Add"}
          </button>
        </div>

        <TodoList
          todos={todos}
          handleEditTodo={handleEditTodo}
          handleDeleteTodo={handleDeleteTodo}
          handleToggleTodo={handleToggleTodo}
        />
      </div>
    </div>
  );
}

export default Todo;
