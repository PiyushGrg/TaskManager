export const revalidate = 0 
import Link from 'next/link';
import React from 'react';
import { cookies } from 'next/headers';
import { taskInterface } from '@/interfaces';
import DeleteTask from './_components/DeleteTask';
import axios from 'axios';
import ClearFilters from './_components/ClearFilters';

async function getTasks(searchParams={}){
  try {
    const searchParamsString = new URLSearchParams(searchParams).toString();
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;
    const response = await axios.get(`${process.env.DOMAIN}/api/tasks?${searchParamsString}`,{
      headers: {
        Cookie: `token=${token}`,
      },
    });

    return response.data.data;
  } catch (error) {
    return [];
  }
}

async function Tasks({searchParams}:{searchParams:any}) {
  const tasks = await getTasks(searchParams);
  // console.log(tasks);
  const filtersApplied = {
    status: searchParams.status,
    priority: searchParams.priority,
  }

  const getProperty = (key:string,value:any)=>(
    <div className='flex flex-col text-sm'>
      <span className='text-gray-700 font-semibold'>{key}</span>
      <span className='text-gray-600 uppercase'>{value}</span>
    </div>
  )

  return (
    <div>
        <div className='flex justify-between items-center'>
            <div>
              <h1 className='text-2xl font-bold'>Tasks</h1>
              <p className='text-gray-600 text-sm uppercase'>
                {tasks.length} Tasks Found
                {filtersApplied.status && (
                  <span>
                    {" "}
                    with status <strong>{filtersApplied.status}</strong>
                  </span>
                )}
                {filtersApplied.priority && (
                  <span>
                    {" "}
                    with priority <strong>{filtersApplied.priority}</strong>
                  </span>
                )}
              </p>
            </div>
            <div className='flex gap-5 items-center'>
              <ClearFilters/>
              <button className='btn-primary'>
                <Link href="/tasks/addTask" className='no-underline'>Add Task</Link>
              </button>
            </div>
        </div>
        
        <div className='flex flex-col gap-5 mt-5'>
            {tasks.map((task:taskInterface)=>(
              <div key={task._id} className='p-5 border border-gray-300 rounded flex flex-col gap-2'>
                <h1 className='text-xl text-gray-700'>{task.title}</h1>

                <p className='text-gray-600 text-sm'>{task.description}</p>
                
                <hr/>

                <div className='grid grid-cols-2 lg:grid-cols-3 gap-5'>
                  {getProperty("Status:",task.status)}
                  {getProperty("Category:",task.category)}
                  {getProperty("Start Date:",task.dateToStart)}
                  {getProperty("Finish Date:",task.dateToFinish)}
                  {getProperty("Reference:",task.reference)}
                  {getProperty("Priority:",task.priority)}
                  {getProperty("Created At:",new Date(task.createdAt!).toLocaleDateString())}
                  {getProperty("Updated At:",new Date(task.updatedAt!).toLocaleDateString())}
                </div>

                <div className='flex justify-end gap-5 mt-5'>
                  <DeleteTask taskId={task._id!}/>
                  <button className='btn-primary'>
                    <Link href={`tasks/editTask?taskId=${task._id}`} className='no-underline'>Edit</Link>
                  </button>
                </div>
              </div>
            ))}
        </div>
    </div>
  )
}

export default Tasks;