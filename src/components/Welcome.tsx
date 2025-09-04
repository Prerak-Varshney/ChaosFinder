"use client";
import { useSharedRef } from "../app/context/RefContext";
const Welcome = () => {
    const searchInputRef = useSharedRef();
    return (
        <div className={`w-full h-full flex flex-col items-center justify-center bg-gray-950 gap-10`}>
            <h1 className={`text-white text-6xl font-bold`}>Welcome To <span className={`text-pink-300`}>ChaosLancer</span></h1>
            <h2 className={`text-white text-3xl font-medium`}>Where I will make your Book Hunt Easy</h2>
            <button className={`text-white font-bold border border-pink-300 px-4 py-2 rounded-lg hover:bg-pink-300 transition-colors duration-300`} onClick={() => searchInputRef.current?.focus()}>Start the search</button>
        </div>
    )
}

export default Welcome;