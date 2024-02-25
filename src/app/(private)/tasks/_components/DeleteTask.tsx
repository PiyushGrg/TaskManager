"use client";
import { SetLoading } from '@/redux/loadersSlice';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React from 'react'
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';

function DeleteTask({taskId}:{taskId:string}) {
    const dispatch = useDispatch();
    const router = useRouter();

    const onDelete = async()=>{
        try {
            dispatch(SetLoading(true));
            await axios.delete(`/api/tasks/${taskId}`);
            toast.success("Task Deleted!");
            router.push("/tasks");
            router.refresh();
        } catch (error:any) {
            toast.error(error.message || error.response.data.message);
        } finally {
            dispatch(SetLoading(false));
        }
    }

  return (
    <button className='btn-outlined' onClick={onDelete}>Delete</button>
  )
}

export default DeleteTask;