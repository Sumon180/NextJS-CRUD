"use client"
import { FiEdit } from 'react-icons/fi';
import { BsTrash } from 'react-icons/Bs';
import { ITask } from "@/types/tasks"
import { FormEventHandler, useState } from 'react';
import Modal from './Modal';
import { useRouter } from 'next/navigation';
import { deleteTodo, editTodo } from '@/api';
import { v4 as uuidv4 } from 'uuid';

interface TaskProps {
    task: ITask
}

const Task: React.FC<TaskProps> = ({ task }) => {
    const [editModal, setEditModal] = useState<boolean>(false)
    const [deleteModal, setDeleteModal] = useState<boolean>(false)
    const [edit, setEdit] = useState<string>(task.text)

    const router = useRouter()

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        await editTodo({
            id: task.id,
            text: edit,
        });
        setEditModal(false)
        router.refresh()
    };


    const handleDeleteTask = async (id: string) => {
        await deleteTodo(id)
        setDeleteModal(false)
        router.refresh()
    }

    return (
        <tr key={task.id}>
            <td className='w-full'>{task.text}</td>
            <td className='flex gap-10'>
                <FiEdit onClick={() => setEditModal(true)} cursor="Pointer" className=' text-blue-500' size={20} />
                <Modal modalOpen={editModal} setModalOpen={setEditModal}>
                    <form onSubmit={handleSubmit}>
                        <h3 className=' font-bold text-lg '>Edit Task</h3>
                        <div className='modal-action'>
                            <input
                                value={edit}
                                onChange={(e) => setEdit(e.target.value)}
                                type="text"
                                placeholder="Type here"
                                className="input input-bordered w-full"
                            />
                            <button type='submit' className='btn'>Edit</button>
                        </div>
                    </form>
                </Modal>
                <BsTrash onClick={() => setDeleteModal(true)} cursor="Pointer" className=' text-red-500' size={20} />
                <Modal modalOpen={deleteModal} setModalOpen={setDeleteModal}>
                    <h3 className='text-lg'>Are you sure, you want to delete this task?</h3>
                    <div className='modal-action'>
                        <button onClick={() => handleDeleteTask(task.id)} className='btn'>Yes</button>
                    </div>
                </Modal>
            </td>
        </tr>
    )
}

export default Task
