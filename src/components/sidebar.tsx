import { Dispatch, SetStateAction, useState } from "react"
import React from "react"

const buttonClassName = "shadow-md text-white border-2 border-white  bg-blue-900 hover:border-blue-900  hover:bg-white hover:text-blue-900 hover:translate-x-1 border-gray-900 transition-all rounded-md w-32"

interface sidebarProps {
    setContent: Dispatch<SetStateAction<string>>;
    content: string; 
}


export const Sidebar: React.FC<sidebarProps> = ({setContent,content})=>{
    const [expand,setExpand]=useState<boolean>(true)

    const handleClick = (newContent: string)=>{
        if (newContent === content) {
            return
        }
        setContent(newContent)
    }

    const sidebarClassName = expand ? "" : "-translate-x-36";

    return (
        <div className="fixed left-0 top-0 h-full flex flex-row">
            <div className={`transform ${sidebarClassName} transition-all h-full bg-slate-500 flex flex-col justify-between py-1 items-center gap-1 w-36`}>
                <div className="flex flex-col items-center gap-1 font-medium">
                    <button onClick={() => handleClick("Main")} className={buttonClassName}>Main</button>
                    <button onClick={() => handleClick("Ventas")} className={buttonClassName}>Ventas</button>
                </div>
                <div className='w-11/12 h-4 bg-blue-900  border-2 border-white rounded-3xl'></div>
                <p></p>
            </div>
            <button onClick={() => setExpand(!expand)} className={`${sidebarClassName} transition-all ${expand?"bg-blue-900 text-white  border-white ":"bg-white text-blue-900 border-blue-900"} border-2 rounded-xl m-2 h-10 w-10 font-extrabold `}>{expand?"<":">"}</button>
        </div>
    );
};