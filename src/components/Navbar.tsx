"use client";

import { useState, useMemo, useEffect } from "react";
import { BRAND_NAME, SEARCH_TYPES } from "@/app/constants/constants";
import Select from "./Select";

interface NavbarProps {
    query: string;
    setQuery: (query: string) => void;
    searchType: string;
    setSearchType: (searchType: string) => void;
}
const Navbar = ({ query, setQuery, searchType, setSearchType }: NavbarProps) => {
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
            <h1 className="text-3xl font-bold">{BRAND_NAME}</h1>
            <div className={`w-110 flex items-center justify-center gap-2`}>
                <div className={`w-80 h-10 bg-transparent text-white border rounded-lg transition-color duration-300 ${searchQueryLength > 0 ? "border-pink-300" : "border-white"} ${searchType === 'Genre' ? 'opacity-50 border-gray-500' : 'hover:border-pink-300'}`}>
                    <input type="text" placeholder={searchType === 'Genre' ? 'Coming Soon' : 'Search'} className={`w-full h-full bg-transparent outline-none px-4 rounded-lg`} value={searchType === 'Genre' ? 'Coming Soon' : query} onChange={(e) => setQuery(e.target.value)} disabled={searchType === 'Genre'} />
                </div>
                <Select options={SEARCH_TYPES} searchType={searchType} setSearchType={setSearchType} />
            </div>
            <div className={`w-40 h-10 border border-white`}>

            </div>
        </div>
    )
}

export default Navbar;