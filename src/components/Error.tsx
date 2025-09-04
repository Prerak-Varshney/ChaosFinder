const Error = ({error}: {error: string}) => {
    return (
        <div className={`w-full h-full bg-gray-300 flex items-center justify-center text-black text-2xl font-bold z-[9999]`}>
            {error}
        </div>
    )
}

export default Error;