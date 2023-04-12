import { Inter } from 'next/font/google'
import AddTask from './components/AddTask'
import TodoList from './components/TodoList'
import { getAllTodos } from '@/api'


export default async function Home() {
  const tasks = await getAllTodos()
  console.log(tasks);


  return (
    <main className=' max-w-4xl mx-auto mt-10'>
      <div className="text-center my-5 flex flex-col gap-4">
        <h1 className='text-white text-5xl font-bold'>Next.JS 13</h1>
        <AddTask />
      </div>
      <TodoList tasks={tasks}  />
    </main>
  )
}
