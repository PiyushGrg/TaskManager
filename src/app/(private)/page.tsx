import React from "react";
import axios from "axios";
import { cookies } from "next/headers";
import CountCard from "./tasks/_components/CountCard";

async function getDashboardData(){
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;
    const response = await axios.get(`${process.env.DOMAIN}/api/dashboard`,{
      headers: {
        Cookie: `token=${token}`,
      },
    });

    // console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    return [];
  }
}

async function Home() {

  const dashboardData = await getDashboardData();

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-600">
        Welcome To Task-Manager
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-5 gap-10">
        <CountCard
          title="All Tasks"
          count={dashboardData.totalTasks}
          path='/tasks'
          queryParams={{
            status:"",
          }}
        />

        <CountCard
          title="Pending Tasks"
          count={dashboardData.pendingTasks}
          path='/tasks'
          queryParams={{
            status:"Pending",
          }}
        />

        <CountCard
          title="Completed Tasks"
          count={dashboardData.completedTasks}
          path='/tasks'
          queryParams={{
            status:"Completed",
          }}
        />

        <CountCard
          title="In Progress Tasks"
          count={dashboardData.progressTasks}
          path='/tasks'
          queryParams={{
            status:"In Progress",
          }}
        />

        <CountCard
          title="Low Priority Tasks"
          count={dashboardData.lowTasks}
          path='/tasks'
          queryParams={{
            priority:"Low",
          }}
        />

        <CountCard
          title="Medium Priority Tasks"
          count={dashboardData.mediumTasks}
          path='/tasks'
          queryParams={{
            priority:"Medium",
          }}
        />

        <CountCard
          title="High Priority Tasks"
          count={dashboardData.highTasks}
          path='/tasks'
          queryParams={{
            priority:"High",
          }}
        />

      </div>
    </div>
  );
}

export default Home;
