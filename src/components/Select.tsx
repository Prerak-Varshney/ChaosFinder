interface SelectProps {
    options: string[];
    searchType: string;
    setSearchType: (option: string) => void;
}
const Select = ({options, searchType, setSearchType}: SelectProps) => {
    return (
        <div className="w-28 h-10 border border-white rounded-lg px-2">
            <select className={`w-full h-full bg-transparent text-white outline-0 rounded-lg transition-color duration-300 hover:border-pink-300`} value={searchType} onChange={(e) => setSearchType(e.target.value)}>
                {
                    options.map((option, index) => (
                        <option key={index} value={option}>{option}</option>
                    ))
                }
            </select>
        </div>
    )
}

export default Select;