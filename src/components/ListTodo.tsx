import React, { Fragment, useEffect, useState } from "react";
import axios from 'axios';
import EditTodo from "./Edit";
import { Table } from "./ui/table";
import { Button } from "./ui/button";
import toast from "react-hot-toast";

interface Todo {
  todo_id: number;
  description: string;
}

const ListTodos: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  // Delete todo function
  const deleteTodo = async (id: number) => {
    try {
      await axios.delete(`http://localhost:5000/todos/${id}`);
      setTodos(todos.filter(todo => todo.todo_id !== id));
      toast.success('Todo deleted!')
    setTimeout(() => {
    window.location.reload();
  }, 1000); 
    } catch (err) {
      toast.error('Error deleting todo!')
      console.error(err);
    }
  };

  const getTodos = async () => {
    try {
      const response = await axios.get("http://localhost:5000/todos");
      setTodos(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);


  return (
  <Fragment>
      <Table className="mt-5 mx-auto w-full rounded-md max-w-3xl">
        <thead className="bg-gray-200">
          <tr className="p-4 text-md">
            <th className="p-4">Todo id</th>
            <th className="text-center p-4">Description</th>
            <th className="p-4">Edit</th>
            <th className="p-4">Delete</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {todos.map((todo,index) => (
            <tr key={todo.todo_id}>
              <td className="p-4">{index+1}</td>
              <td className="p-4">{todo.description}</td>
              <td className="p-4">
                <EditTodo todo={todo} />
              </td>
              <td className="p-4">
                <Button
                  variant="default"
                  onClick={() => deleteTodo(todo.todo_id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Fragment>
  );
};

export default ListTodos;
