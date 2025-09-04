"use client";
import Link from "next/link";
import { useState, useMemo, useEffect } from "react";
import { BRAND_NAME, SEARCH_TYPES } from "@/constants/constants";
import Select from "./Select";

// import Home, Bookmark and My List icons from lucid-react
import { FaSearch, FaHome, FaBookmark, FaList } from "react-icons/fa";

interface NavbarProps {
    query: string;
    setQuery: (query: string) => void;
    searchType: string;
    setSearchType: (searchType: string) => void;
}
const Navbar = ({ query, setQuery, searchType, setSearchType }: NavbarProps) => {
    const items = [
    { name: "Home", icon: <FaHome /> },
    { name: "Saved", icon: <FaBookmark /> },
    { name: "My List", icon: <FaList /> },
  ];

    const [searchQueryLength, setSearchQueryLength] = useState<number>(0);

    useMemo(() => {
        setSearchQueryLength(query.length);
    }, [query]);
    
    useEffect(() => {
        const storedSearchQuery = sessionStorage.getItem("searchQuery");
        if (storedSearchQuery) {
            setQuery(storedSearchQuery);
        }
    }, [setQuery]);

    useEffect(() => {
        const storedSearchType = sessionStorage.getItem("searchType");
        if (storedSearchType) {
            setSearchType(storedSearchType);
        }
    }, [setSearchType]);

    useEffect(() => {
        if(searchQueryLength >= 3){
            sessionStorage.setItem("searchQuery", query);
        }else{
            sessionStorage.removeItem("searchQuery");
        }
    }, [query, setQuery, searchQueryLength]);

    useEffect(() => {
        if (searchType) {
            sessionStorage.setItem("searchType", searchType);
        }
    }, [searchType])

    return (
        <div className={`w-full h-full bg-gray-900 text-white flex justify-between items-center px-10`}>
            <h1 className="text-2xl lg:text-3xl font-bold">{BRAND_NAME}</h1>
            <div className={`w-110 hidden sm:flex items-center justify-center gap-2`}>
                <div className={`w-50 lg:w-80 h-8 hidden sm:flex lg:h-10 bg-transparent text-white border rounded-lg transition-color duration-300 ${searchQueryLength > 0 ? "border-pink-300" : "border-white"} ${searchType === 'Genre' ? 'opacity-50 border-gray-500' : 'hover:border-pink-300'}`}>
                    <input type="text" placeholder={searchType === 'Genre' ? 'Coming Soon' : 'Search'} className={`w-full h-full bg-transparent outline-none px-4 rounded-lg`} value={searchType === 'Genre' ? 'Coming Soon' : query} onChange={(e) => setQuery(e.target.value)} disabled={searchType === 'Genre'} />
                </div>
                <Select options={SEARCH_TYPES} searchType={searchType} setSearchType={setSearchType} />
            </div>
            <div className={`h-10 flex items-center justify-center gap-4`}>
                <button className={`text-white lg:hidden text-md sm:text-lg hover:text-pink-300 transition-all duration-500`}><FaSearch /></button>
                {
                    items.map((item, index) => (
                        <Link href={"/"} key={index} className={`rounded-full text-sm font-bold flex items-center justify-center transition-all duration-300 ${index === 0 ? "text-pink-300 hover:animate-bounce" : "text-white hover:text-pink-300"}`}>
                            <pre className="hidden lg:inline text-md">{item.name}</pre>
                            <span className="lg:hidden text-md sm:text-lg">{item.icon}</span>
                        </Link>
                    ))
                }
                <div className={`border border-pink-300 px-2 py-1 rounded-md text-xs sm:text-sm font-bold text-pink-300 flex items-center justify-center hover:text-white hover:bg-pink-300 transition-all duration-500 cursor-pointer`}>
                    Login
                </div>
            </div>
        </div>
    )
}

export default Navbar;