"use client";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Book from "@/components/Book";
import useAxios from "../hooks/useAxios";
import ResultFound from "@/components/ResultFound";
import Loading from "@/components/Loading";
import Pagination from "@/components/Pagination";
import { FETCH_LIMIT, NOT_FOUND_IMAGE_URL, GET_IMAGE_URL } from "../constants/constants";

export default function Home() {

  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [searchType, setSearchType] = useState<string>("Title");

  const { data, isLoading, responseCount, pageCount } = useAxios(searchType === 'Title' ? `/search.json?q=${query}&page=${page}&limit=${FETCH_LIMIT}` : searchType === 'Author' ? `/search/authors.json?q=${query}&page=${page}&limit=${FETCH_LIMIT}` : searchType === 'Genre' ? `` : ``);

  useEffect(() => {console.log(data)}, [data]);

  return (
    <div className={`w-full h-full`}>
      <div className={`w-full h-20`}>
        <Navbar query={query} setQuery={setQuery} searchType={searchType} setSearchType={setSearchType} />
      </div>
      <div className={`w-full h-10 flex items-center justify-between`}>
        <ResultFound count={responseCount} />
        <Pagination page={page} setPage={setPage} pageCount={pageCount} />
      </div>
      {
        isLoading ? <div className={`w-full h-[calc(100vh-7.5rem)]`}><Loading /></div> : 
        <div className={`w-full h-[calc(100vh-7.5rem)] gap-y-4 place-items-center grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 bg-[var(--background)] text-[var(--foreground)] overflow-x-hidden overflow-y-scroll scroll-smooth py-3`}>
        {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          data && data.docs.map((book: any, index: number) => {
            return (
              <Book 
                bookId={
                  searchType === 'Title' ? book.cover_edition_key :
                  searchType === 'Author' ? book.author_key.join(", ") :
                  searchType === 'Genre' ? book.id : "Genre Not Found"
                }
                bookName={
                  searchType === 'Title' ? book.title :
                  searchType === 'Author' ? book.name :
                  searchType === 'Genre' ? book.genre_name : "Genre Not Found"
                } 
                authorName={book.author_name.join(", ")} 
                key={index} 
                imageUrl={
                  searchType === 'Title' ? book.cover_i ? `${GET_IMAGE_URL}/${book.cover_i}.jpg` : NOT_FOUND_IMAGE_URL : 
                  searchType === 'Author' ? book.key ? `${GET_IMAGE_URL}/${book.key}.jpg` : NOT_FOUND_IMAGE_URL : 
                  searchType === 'Genre' ? book.genre_image ? `${GET_IMAGE_URL}/${book.genre_image}.jpg` : NOT_FOUND_IMAGE_URL : NOT_FOUND_IMAGE_URL
              } />
            )
          })
        }
      </div>
      }
    </div>
  );
}

// When clicked on authors there should be all their works
// When click on book show other details of book and the other works from the same author
// Add to favourite
// Responsive and Design edit
// FavIcon and stuff
// Deploy