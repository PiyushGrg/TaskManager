"use client";
import React,{useEffect} from "react";
import toast, { Toaster } from "react-hot-toast";
import { usePathname } from "next/navigation";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { SetCurrentUser } from "@/redux/usersSlice";
import { SetLoading } from "@/redux/loadersSlice";
import Spinner from "./Spinner";
import { useRouter } from "next/navigation";

function LayoutProvider({children}:{children:React.ReactNode}) {

  const {currentUser} = useSelector((state:any)=>state.users);
  const {loading} = useSelector((state:any)=>state.loaders);

  const pathname = usePathname();
  const publicRoute = pathname === "/login" || pathname === "/register";
  const dispatch = useDispatch();
  const router = useRouter();

  const getData = async()=>{
    try {
      dispatch(SetLoading(true));
      const response = await axios.get("/api/users/currentuser");
      dispatch(SetCurrentUser(response.data.data));
    } catch (error:any) {
      throw new Error(error.message);
    } finally {
      dispatch(SetLoading(false));
    }
  }

  const onLogout = async()=>{
    try {
      dispatch(SetLoading(true));
      await axios.post("/api/users/logout");
      dispatch(SetCurrentUser(null));
      router.push("/login");
      toast.success("Logout Successful");
    } catch (error:any) {
      toast.error(error.message);
    } finally {
      dispatch(SetLoading(false));
    }
  }

  useEffect(()=>{
    if(!publicRoute){
      getData();
    }
  },[pathname]); // whenver pathname changes,getData() gets called

    return (
        <html lang="en">
          <head>
            <link
              href="https://cdn.jsdelivr.net/npm/remixicon@4.1.0/fonts/remixicon.css"
              rel="stylesheet"
            />
          </head>
          <body>
            {loading && <Spinner/>}
            <Toaster position="top-center" reverseOrder={false}/>

            {!publicRoute &&             
              <div className="lg:mx-10 bg-primary text-white p-5 flex justify-between items-center rounded-b">
                <h1 className="text-2xl font-bold cursor-pointer" onClick={()=>{
                  router.push("/");
                  router.refresh();
                }}>Task Manager</h1>

                <div className="flex gap-5">
                  <h1 className="underline cursor-pointer">{currentUser?.userName}</h1>
                  <i className="ri-logout-box-r-line cursor-pointer" onClick={onLogout}></i>
                </div>
              </div>
            }
            
            {publicRoute ? <div>
              {children}
              </div> : <div className="h-[85vh] lg:mx-10 mx-3 mt-5">{children}</div>
            }
          </body>
        </html>
    );
}

export default LayoutProvider;