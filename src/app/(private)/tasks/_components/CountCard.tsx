import Link from 'next/link';
import React from 'react';

function CountCard({title,count,path,queryParams}:{title:string,count:number,path:string,queryParams:any}) {

    const getRandomTextColor = ()=>{
        const colors = [
            "#BB2525",
            "#5C5470",
            "#79155B",
            "#0C356A",
            "#445069",
            "#7EAA92",
            "#c0c0c0"
        ];

        const randomIndex = Math.floor(Math.random()*colors.length);

        return colors[randomIndex];
    }
  return (
    <Link className='no-underline'
        href={{
            pathname: path,
            query: queryParams
        }}
    >
        <div className='flex flex-col gap-5 p-5 border border-gray-300 items-center justify-center'>
            <h1 className='text-xl font-semibold text-gray-600'>{title}</h1>
            <h1 className="text-7xl font-semibold" style={{ color: getRandomTextColor() }}>{count}</h1>
        </div>
    </Link>
  )
}

export default CountCard;