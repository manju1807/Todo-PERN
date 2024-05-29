import React from 'react'
import InputTodo from './components/Input'
import ListTodos from './components/ListTodo'

const App: React.FC = () => {
  return (
    <div className='container'>
      <InputTodo />
      <ListTodos />
    </div>
  )
}

export default App