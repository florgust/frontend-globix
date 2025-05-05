'use client';
import { BellDot, Bell } from "lucide-react";
import { useContext, createContext, useState } from "react"

const SidebarContext = createContext({expanded: true})
const user = "/images-home_page/carousel/carrossel.png";

export default function Sidebar({ children } : { children: React.ReactNode }) {
  const [expanded, setExpanded] = useState(true)
  
  return (
    <aside className="min-h-screen">
      <nav className="h-full flex flex-col bg-white border-r shadow-sm">
      <div className="p-4 pb-2 flex items-center justify-between">
        <button 
          onClick={() => setExpanded((curr) => !curr)} >
          <img
                src={user}
                className={`rounded-lg transition-all w-10 h-10 my-4 ${
                  expanded ? "mr-30" : "mr-0"
                  }`}
                alt=""
              />
        </button>
        {expanded && (
        <button
          onClick={() => setExpanded((curr) => !curr)}
          className="p-1.5 rounded-lg bg-[#092064] hover:bg-blue-700"
        >
          <Bell color="white" />
        </button>
        )}
      </div>

        <div className="border-t border-[#092064] border-2 mb-10 mt-2"></div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 ">{children}</ul>
        </SidebarContext.Provider>

        
      </nav>
    </aside>
  )
}

export function SidebarItem({ icon, text, active, alert }: { icon: React.ReactNode; text: string; active: boolean; alert?: boolean }) {
  const { expanded } = useContext(SidebarContext)
  return (
    <li
      className={`
        relative flex items-center py-3 px-4 my-1
        font-medium cursor-pointer
        transition-colors group
        ${
          active
            ? "bg-gradient-to-r from-white to-[#E4EDFC] text-[#0F2976] border-l-3 border-[#0F2976]"
            : "hover:bg-indigo-50 text-gray-600"
        }
      `}
    >
      
      <div
          className={`justify-center shrink-0 
            ${
            active ? "text-[#0F2976]" : "text-[#0F2976]"
          }`
        }
        >
            {icon}
        </div>
      
        <span
        className={`absolute left-16 transition-all ${
          expanded ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        {text}
      </span>
      {alert && (
        <div 
          className={`absolute right-2 w-2 h-2 rounded bg-blue-400 ${
            expanded ? "" : "top-2"
          }`}
        />
      )}

      {!expanded && (
        <div
          className={`
          absolute left-full rounded-md px-2 py-1 ml-6
          bg-indigo-100 text-[#0F2976] text-sm
          invisible opacity-20 -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
      `}
        >
          {text}
        </div>
      )}
    </li>
  )
}