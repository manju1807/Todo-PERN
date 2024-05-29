import React, { Fragment, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import axios from "axios";
import toast from "react-hot-toast";

interface Todo {
  todo_id: number;
  description: string;
}

interface EditTodoProps {
  todo: Todo;
} 

const EditTodo: React.FC<EditTodoProps> = ({ todo }) => {
  const [description, setDescription] = useState<string>(todo.description);
  const [showModal, setShowModal] = useState<boolean>(false);

  const updateDescription = async () => {
    try {
      const body = { description };
      await axios.put(`http://localhost:5000/todos/${todo.todo_id}`, body);
      setShowModal(false);
      toast.success('Todo updated!!');
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
      <Button
        variant="outline"
        onClick={() => setShowModal(true)}
      >
        Edit
      </Button>

      {showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
              <div className="bg-gray-50 px-4 py-5 sm:px-6">
                <h4 className="text-lg font-semibold text-gray-900">Edit Todo</h4>
                <Button
                  variant="ghost"
                  className="absolute top-0 right-0 px-4 py-2 text-3xl"
                  onClick={() => setShowModal(false)}
                >
                  &times;
                </Button>
              </div>
              <div className="p-6">
                <Input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="bg-gray-50 px-4 py-3 flex gap-4 sm:px-6 sm:flex sm:flex-row-reverse">
                <Button
                  variant="outline"
                  onClick={updateDescription}
                >
                  Edit
                </Button>
                <Button
                  variant="default"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default EditTodo;
