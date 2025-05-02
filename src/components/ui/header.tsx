import React from "react";
import { Search } from "lucide-react";

const logo = "images-home_page/logo-globix.png";

export default function Header() {
    return (
        <header className="w-full">
            <div className="bg-[#102976] p-5">
                <div className="flex items-center space-x-2">
                    <div className="relative w-full max-w-md pl-10 ">
                        <input
                            type="text"
                            placeholder="Pesquisar"
                            className="w-80 p-2 pl-12 rounded-md bg-[#111315] focus:outline-none text-white placeholder-gray-200"
                        />
                        <Search
                            size={20}
                            color="#fff"
                            className="absolute left-15 top-1/2 transform -translate-y-1/2"
                        />
                    </div>
                    <img src={logo} className="ml-auto pr-10"></img>
                </div>
            </div>
        </header>
    );

}