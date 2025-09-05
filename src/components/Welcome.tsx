"use client";
import { useSharedRef } from "../app/context/RefContext";
import { BRAND_NAME } from "@/constants/constants";
const Welcome = () => {
    const searchInputRef = useSharedRef();
    return (
        <div className={`w-full h-full flex flex-col items-center justify-center bg-gray-950 gap-10`}>
            <h1 className={`text-white text-2xl sm:text-3xl md:text-6xl font-bold text-center`}>Welcome To <span className={`text-pink-300`}>{BRAND_NAME}</span></h1>
            <h2 className={`text-white text-md sm:text-lg md:text-3xl font-medium text-center`}>Where I make your Book Hunt Easy, Intuitive and Modern </h2>
            <button className={`text-white font-bold border border-pink-300 text-xs md:text-sm md:text-md px-4 py-2 rounded-lg hover:bg-pink-300 transition-colors duration-300`} onClick={() => searchInputRef.current?.focus()}>Start the search</button>
        </div>
    )
}

export default Welcome;