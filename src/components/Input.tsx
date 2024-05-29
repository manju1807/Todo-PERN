import React, { Fragment, useState } from "react";
import axios from "axios";
import { Button } from "./ui/button";
import { CardDescription, CardHeader } from "./ui/card";
import { Input } from "./ui/input";
import toast from "react-hot-toast";

const InputTodo: React.FC = () => {
  const [description, setDescription] = useState<string>("");

  const onSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const body = { description };
      await axios.post("http://localhost:5000/todos", body);
      toast.success('Todo List added!');
        setTimeout(() => {
    window.location.reload();
  }, 1000);
    } catch (err) {
      toast.error('Error updating todo!')
      console.error(err);
    }
  };

  return (
      <Fragment>
      <div className="mx-auto mt-5 w-full max-w-xl">
        <CardHeader className="text-center">
          <h1 className="text-2xl font-bold">Pern Stack Todo List App</h1>
        </CardHeader>
        <CardDescription className="p-4">
          <form className="flex flex-row justify-center items-center gap-4" onSubmit={onSubmitForm}>
            <Input
              type="text"
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Enter your todo"
            />
            <Button type="submit" variant="default">
              Add
            </Button>
          </form>
        </CardDescription>
      </div>
    </Fragment>
  );
};

export default InputTodo;
