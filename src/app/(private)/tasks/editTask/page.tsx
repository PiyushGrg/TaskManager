"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import TaskForm from '@/components/TaskForm';
import { taskInterface } from '@/interfaces';
import { useSearchParams } from 'next/navigation';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { SetLoading } from '@/redux/loadersSlice';
import axios from 'axios';

function EditTask() {

    const searchParams = useSearchParams();
    const taskId = searchParams.get("taskId");
    const [task,setTask] = useState<taskInterface>({
        title:"",
        description:"",
        status:"Pending",
        category:"Personal",
        priority:"Low",
        dateToStart:"",
        dateToFinish:"",
        reference:"",
    });
    const router = useRouter();
    const dispatch = useDispatch();

    const onSave = async()=>{
        try {
            dispatch(SetLoading(true));
            await axios.put(`/api/tasks/${taskId}`,task);
            toast.success("Task Edited Successfully");
            router.push("/tasks");
            router.refresh();
        } catch (error:any) {
            toast.error(error.message || error.response.data.message);
        } finally {
            dispatch(SetLoading(false));
        }
    }

    const getTask = async()=>{
        try {
            dispatch(SetLoading(true));
            const response = await axios.get(`/api/tasks/${taskId}`);
            setTask(response.data.data);
        } catch (error:any) {
            toast.error(error.respnse.data.message || error.message);
        } finally {
            dispatch(SetLoading(false));
        }
    }

    useEffect(()=>{
        getTask();
    },[taskId]);

  return (
    <div>
        <div className='flex justify-between items-center'>
            <h1 className='text-2xl font-bold'>Edit Tasks</h1>
            <button className='btn-outlined' onClick={()=>router.push("/tasks")}>Back</button>
        </div>
        <TaskForm task={task} setTask={setTask} onSave={onSave}/>
    </div>
  )
}

export default EditTask;