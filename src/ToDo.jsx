import React, { useEffect, useRef, useState } from "react";
import todo_icon from "./assets/todo_icon.png";
import TodoItems from "./Todoitems";

const ToDo = () => {
  const [todoList, setTodoList] = useState(() => {
    return JSON.parse(localStorage.getItem("todos")) || [];
  });

  const inputRef = useRef();
  const add = () => {
    const inputText = inputRef.current.value.trim();

    if (inputText === "") {
      return null;
    }
    const newTodo = {
      id: Date.now(),
      text: inputText,
      isComplete: false,
    };
    setTodoList((prev) => [...prev, newTodo]);
    inputRef.current.value = "";
  };
  const deleteTodo = (id) => {
    setTodoList((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };
  const toggle = (id) => {
    setTodoList((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isComplete: !todo.isComplete };
        }
        return todo;
      });
    });
  };
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoList));
  }, [todoList]);
  return (
    <div className="bg-white place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[550px] rounded-xl">
      {/* ---------------title----------- */}

      <div className="flex items-center mt-7 gap-2">
        <img className=" w-8 " src={todo_icon} alt=" " />
        <h1 className="text-3xl font-semibold ">To-Do List</h1>
      </div>
      {/* --------input box------------ */}
      <div className="flex items-center my-7 bg-gray-200 rounded-full">
        <input
          ref={inputRef}
          className="bg-transparent border-0 outline-none flex-1 h-12 pl-6 pr-2 placeholder:text-slate-600"
          type="text"
          placeholder="Add your task"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              add();
            }
          }}
        />
        <button
          onClick={add}
          className="border-none rounded-full bg-orange-600 hover:bg-blue-700 active:bg-orange-800 w-28 h-12 text-white text-lg font-medium cursor-pointer transition-all duration-300 shadow-md hover:shadow-lg"
        >
          ADD +
        </button>
      </div>
      {/* -------------todo list */}

      <div>
        {todoList.map((items, index) => {
          return (
            <TodoItems
              key={index}
              text={items.text}
              id={items.id}
              isComplete={items.isComplete}
              deleteTodo={deleteTodo}
              toggle={toggle}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ToDo;
