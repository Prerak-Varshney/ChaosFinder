"use client";
import useAxios from "@/hooks/useAxios";
import Navbar from "@/components/Navbar";
import Loading from "@/components/Loading";
import Error from "@/components/Error";
import { use } from "react";

const BookPage = ({ params }: { params: Promise<{ slug: string }> }) => {

  const { slug } = use(params);
  const bookId = decodeURIComponent(slug);

  const { data, error, isLoading } = useAxios(`/books/${bookId}.json`);

  return (
    <div>
      {/* <Navbar /> */}
      <h1>Book: {decodeURIComponent(bookId)}</h1>
      <div>{isLoading ? <Loading /> : error ? <Error error={error} /> : <pre>{JSON.stringify(data, null, 2)}</pre>}</div>
    </div>
  );
};

export default BookPage;
