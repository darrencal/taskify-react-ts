import React, { useEffect, useRef, useState } from 'react';
import { Todo } from '../models/todo';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { MdDone } from 'react-icons/md';
import './styles.css';

interface Props {
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoCard: React.FC<Props> = ({ todo, todos, setTodos }) => {
  const [editing, setEditing] = useState<boolean>(false);
  const [editValue, setEditValue] = useState<string>(todo.todo);

  const inputRef = useRef<HTMLInputElement>(null);

  // Focus the input when editing
  useEffect(() => {
    inputRef.current?.focus();
  }, [editing]);

  const handleDone = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleEdit = () => {
    if (!todo.isDone) setEditing(!editing);
  };

  const handleUpdate = (e: React.FormEvent, id: number) => {
    e.preventDefault();

    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, todo: editValue } : todo
      )
    );

    setEditing(false);
  };

  return (
    <form className="todos__card" onSubmit={(e) => handleUpdate(e, todo.id)}>
      {editing ? (
        <input
          ref={inputRef}
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          className="todos__card--text"
        />
      ) : todo.isDone ? (
        <s className="todos__card--text">{todo.todo}</s>
      ) : (
        <span className="todos__card--text" onDoubleClick={handleEdit}>
          {todo.todo}
        </span>
      )}
      <div>
        <span className="icon" onClick={handleEdit}>
          <AiFillEdit />
        </span>
        <span className="icon" onClick={() => handleDelete(todo.id)}>
          <AiFillDelete />
        </span>
        <span className="icon" onClick={() => handleDone(todo.id)}>
          <MdDone />
        </span>
      </div>
    </form>
  );
};

export default TodoCard;
