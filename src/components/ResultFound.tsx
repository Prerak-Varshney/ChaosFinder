const ResultFound = ({ count }: { count: number }) => {
    return (
        <div className={`w-full h-full flex items-center justify-center text-black font-bold ${count > 0 ? "visible" : "invisible"}`}>
            <span className={`bg-gray-900 text-white px-2 rounded-md mr-1`}>{count}</span> Results Found
        </div>
    )
}

export default ResultFound;