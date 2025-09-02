interface PaginationProps {
    page: number;
    pageCount: number;
    setPage: (page: number) => void;
}

const COMMON_STYLE = `bg-gray-900 text-white px-2 rounded-md transition-colors duration-300 enabled:hover:bg-pink-400 disabled:opacity-50`;
const Pagination = ({ page, setPage, pageCount }: PaginationProps) => {
    return(
        <div className={`w-full h-full flex items-center justify-center gap-3 text-black font-bold ${pageCount > 0 ? "visible" : "invisible"}`}>
            <button className={COMMON_STYLE} onClick={() => setPage(page - 1)} disabled={page <= 1}>Prev</button>
            <span className={`border bg-gray-900 text-white px-2 rounded-full text-md`}>{pageCount > 0 ? page : 0}</span>
            <button className={COMMON_STYLE} onClick={() => setPage(page + 1)} disabled={page === pageCount || pageCount <= 1}>{page < pageCount ? "Next" : "Last"}</button>
            <button className={COMMON_STYLE} onClick={() => setPage(pageCount)} disabled={page === pageCount || pageCount <= 1}>...{pageCount}</button>
        </div>
    )
}

export default Pagination;