"use client";
import { use, useEffect, useState } from "react";
import useAxios from "@/hooks/useAxios";
import Card from "@/components/Card";
import Navbar from "@/components/Navbar";
import ResultFound from "@/components/ResultFound";
import Pagination from "@/components/Pagination";
import {FETCH_LIMIT, NOT_FOUND_IMAGE_URL} from "@/constants/constants";
import Loading from "@/components/Loading";
import Error from "@/components/Error";

interface ApiResponse {
  entries?: Array<{
    title?: string;
    key?: string;
  }>;
  size?: number;
}

const AuthorPage = ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = use(params);
    const [query, setQuery] = useState("");
    const [searchType, setSearchType] = useState("Title");
    const [page, setPage] = useState<number>(1);
    const [authorData, setAuthorData] = useState<ApiResponse | null>(null);

    // slug looks lik OL23919A&page=1&limit=20 i want only OL23919A
    const authorId = decodeURIComponent(slug).split("&")[0];

    const { data, error, isLoading, responseCount, pageCount } = useAxios(`/authors/${authorId}/works.json?&page=${page}&limit=${FETCH_LIMIT}&offset=${page>0 ? (page-1)*FETCH_LIMIT : 0}`, "author");

    useEffect(() => {
        if (data) {
            setAuthorData(data);
        }
    }, [data]);

    return (
        <div className={`w-full h-full`}>
            <div className={`w-full h-20`}>
                <Navbar query={query} setQuery={setQuery} searchType={searchType} setSearchType={setSearchType} />
            </div>
            <div className={`w-full h-10 flex items-center justify-between`}>
                <ResultFound count={responseCount} />
                <pre>Author Id: {authorId}</pre>
                <Pagination page={page} setPage={setPage} pageCount={pageCount} />
            </div>
            {
                searchType === 'Genre' ? <div className={`w-full h-[calc(100vh-5rem)] flex items-center justify-center text-black text-2xl font-bold`}><h1>Comming Soon...</h1></div> : (
                <div>
                    {
                        isLoading ? <div className={`w-full h-[calc(100vh-5rem)]`}><Loading /></div> : 
                        (
                            authorData ? (
                            <div className={`w-full h-[calc(100vh-7.5rem)] gap-y-4 place-items-center grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 bg-[var(--background)] text-[var(--foreground)] overflow-x-hidden overflow-y-scroll scroll-smooth py-3`}>
                            {
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                authorData.entries ? authorData.entries.map((book: any, index: number) => (
                                    <Card 
                                        key={index}
                                        searchType={"Title"}
                                        bookName={book.title}
                                        imageUrl={NOT_FOUND_IMAGE_URL}
                                        authorName={""}
                                        // bookId={book.id}
                                        authorId={authorId}
                                    />
                                )) : <pre>No Data Entries Found</pre>
                            } 
                            </div>
                            ) : <div className="w-full h-[calc(100vh-5rem)]">{error ? <Error error={error} /> : "No Data Found"}</div>
                        )
                    }
                </div>
            )}
        </div>
    )
}

export default AuthorPage;