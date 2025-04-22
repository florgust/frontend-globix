import React from "react";

interface TabSwitcherProps {
    tabs: string[];
    activeTab: string;
    onTabChange: (tab: string) => void;
}

const TabSwitcher: React.FC<TabSwitcherProps> = ({ tabs, activeTab, onTabChange }) => {
    return (
        <div className="flex justify-center gap-0 mb-6">
            {tabs.map((tab) => (
                <button
                    key={tab}
                    className={`text-[1.5rem] cursor-pointer px-4 py-2 font-bold focus:outline-none ${activeTab === tab
                            ? "bg-[#1C4CDC] text-white"
                            : "bg-[#D9D9D9] text-[#0F2976]"
                        } ${tab === tabs[0] ? "rounded-l-full" : ""} ${tab === tabs[tabs.length - 1] ? "rounded-r-full" : ""
                        }`}
                    onClick={() => onTabChange(tab)}
                >
                    {tab}
                </button>
            ))}
        </div>
    );
};

export default TabSwitcher;