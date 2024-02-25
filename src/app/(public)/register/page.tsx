'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from 'next/navigation';

function Register() {
    const router = useRouter();
    const [loading,setLoading] = useState(false);
    const [user,setUser] = useState({
        userName: "",
        password: "",
        email: ""
    });

    const isRegisterDisable = ()=>{
        return !user.userName || !user.email || !user.password;
    }

    const onRegister = async()=>{
        try {
            setLoading(true);
            await axios.post(`/api/users/register`,user);
            toast.success("User Registered!");
            router.push("/login");
        } catch (error:any) {
            toast.error(error.response.data.message || error.message);
        } finally {
            setLoading(false);
        }
    }

  return (
    <div className='bg-primary flex flex-col justify-center items-center h-screen lg:p-0 p-5'>
        <div className='flex flex-col gap-5 bg-white p-5 lg:w-[500px] w-[325px] text-gray-700'>
            <h1 className='text-2xl font-bold uppercase'>
                Register
            </h1>
            <hr/>

            <div className='flex flex-col'>
                <label htmlFor='userName' className='text-sm'>UserName</label>
                <input type='text' name='userName' id='userName'
                    onChange={(e)=> setUser({...user,userName: e.target.value})}
                    value={user.userName}
                />
            </div>

            <div className='flex flex-col'>
                <label htmlFor='email' className='text-sm'>Email</label>
                <input type='email' name='email' id='email'
                    onChange={(e)=> setUser({...user,email: e.target.value})}
                    value={user.email}
                />
            </div>

            <div className='flex flex-col'>
                <label htmlFor='password' className='text-sm'>Password</label>
                <input type='password' name='password' id='password'
                    onChange={(e)=> setUser({...user,password: e.target.value})}
                    value={user.password}
                />
            </div>

            <button className={isRegisterDisable()? "btn-disabled cursor-not-allowed" : "btn-primary"} onClick={onRegister}>
                {loading ? "Registering User..." : "Register"}
            </button>

            <Link href="/login" className='text-center'>
                Already have an account? Login
            </Link>
        </div>
    </div>
  )
}

export default Register