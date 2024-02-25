"use client";
import React from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';


function ClearFilters() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const filtersApplied = searchParams.get("status") || searchParams.get("priority");

    // check if there are any search params
    if(!filtersApplied){
        return null;
    }

    const onClear = ()=>{
        router.push("/tasks");
        router.refresh();
    }

  return (
    <div>
        <h1 className='underline cursor-pointer' onClick={onClear}>Clear Filters</h1>
    </div>
  )
}

export default ClearFilters;