"use client";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Card from "@/components/Card";
import useAxios from "../hooks/useAxios";
import ResultFound from "@/components/ResultFound";
import Loading from "@/components/Loading";
import Pagination from "@/components/Pagination";
import Error from "@/components/Error";
import Welcome from "@/components/Welcome";
import { FETCH_LIMIT, NOT_FOUND_IMAGE_URL, GET_IMAGE_URL } from "../constants/constants";

interface ApiResponse {
  docs?: Array<{
    cover_edition_key?: string;
    title?: string;
    name?: string;
    genre_name?: string;
    key?: string;
    author_name?: string[];
    cover_i?: string;
    genre_image?: string;
  }>;
}

export default function Home() {

  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [searchType, setSearchType] = useState<string>("Title");
  const [bookData, setBookData] = useState<ApiResponse | null>(null);
  const shouldFetch = searchType !== "Genre" && query.length >= 3;
  const url = searchType === 'Title' ? `/search.json?q=${query}&page=${page}&limit=${FETCH_LIMIT}&offset=${page>0 ? (page-1)*FETCH_LIMIT : 0}` : searchType === 'Author' ? `/search/authors.json?q=${query}&page=${page}&limit=${FETCH_LIMIT}&offset=${page>0 ? (page-1)*FETCH_LIMIT : 0}` : searchType === 'Author' ? `/search/authors.json?q=${query}&page=${page}&limit=${FETCH_LIMIT}&offset=${(page - 1) * FETCH_LIMIT}` : searchType === 'Genre' ? `` : ``

  const { data, error, isLoading, responseCount, pageCount } = useAxios(shouldFetch ? url : "");

  useEffect(() => {
    if (data) {
      setBookData(data);
    }
  }, [data]);

  // useEffect(() => {console.log(data)}, [data]);

  useEffect(() => {
    if(query.length <= 3 || searchType === 'Genre') setPage(1);
  }, [query, searchType]);



  return (
    <div className={`w-full h-full`}>
      <div className={`w-full h-20`}>
        <Navbar query={query} setQuery={setQuery} searchType={searchType} setSearchType={setSearchType} />
      </div>
      <div className={`w-full ${isLoading || error || !shouldFetch ? 'hidden' : 'flex'} h-10 items-center justify-between`}>
        <ResultFound count={responseCount} />
        <Pagination page={page} setPage={setPage} pageCount={pageCount} />
      </div>
      {
        // searchType === 'Genre' && !shouldFetch ? <div className={`w-full h-[calc(100vh-5rem)] flex items-center justify-center text-black text-2xl font-bold`}><h1>Comming Soon...</h1></div> :  (
        !shouldFetch ? <div className={`w-full h-[calc(100vh-5rem)]`}><Welcome /></div> : searchType === 'Genre' && !shouldFetch ? <div className={`w-full h-[calc(100vh-5rem)] flex items-center justify-center text-black text-2xl font-bold`}><h1>Comming Soon...</h1></div> : (
          <>
            {
              isLoading ? <div className={`w-full h-[calc(100vh-5rem)]`}><Loading /></div> : 
              (
                bookData ? (
                  <div className={`w-full h-[calc(100vh-7.5rem)] gap-y-4 place-items-center grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 bg-[var(--background)] text-[var(--foreground)] overflow-x-hidden overflow-y-scroll scroll-smooth py-3`}>
                  {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    bookData.docs ? bookData.docs.map((book: any, index: number) => (
                      <Card 
                        searchType={searchType}
                        bookId={
                          searchType === 'Title' ? book.cover_edition_key ? book.cover_edition_key : "Book ID not found" : "Book ID is not called here"
                        }
                        bookName={
                          searchType === 'Title' ? book.title :
                          searchType === 'Author' ? book.name :
                          searchType === 'Genre' ? book.genre_name : "Genre Not Found"
                        } 
                        authorId={
                          searchType === 'Author' ? book.key ? book.key : "Author ID not found" : "Author ID is not called here"
                        }
                        authorName={book.author_name ? book.author_name.join(", ") : ""} 
                        key={index} 
                        imageUrl={
                          searchType === 'Title' ? book.cover_i ? `${GET_IMAGE_URL}/${book.cover_i}.jpg` : NOT_FOUND_IMAGE_URL : 
                          searchType === 'Author' ? book.key ? `${GET_IMAGE_URL}/${book.key}.jpg` : NOT_FOUND_IMAGE_URL : 
                          searchType === 'Genre' ? book.genre_image ? `${GET_IMAGE_URL}/${book.genre_image}.jpg` : NOT_FOUND_IMAGE_URL : NOT_FOUND_IMAGE_URL
                      } />
                    )) : <div className="w-full h-[calc(100vh-5rem)]">{error ? <Error error={error} /> : <Error error={"Ohoo, Some Problem Occured"} />}</div>
                  }
                  </div>
                ) : 
                  <div className="w-full h-[calc(100vh-5rem)]">{error && <Error error={error} />}</div>
              )
            }
          </>
        )
      }
        
    </div>
  );
}