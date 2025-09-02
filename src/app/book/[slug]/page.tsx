"use client";
import useAxios from "@/hooks/useAxios";
import { use } from "react";

const BookPage = ({ params }: { params: Promise<{ slug: string }> }) => {

  const { slug } = use(params);
  const bookId = decodeURIComponent(slug);

  const { data, error, isLoading } = useAxios(`/books/${bookId}.json`);

  return (
    <div>
      <h1>Book: {decodeURIComponent(bookId)}</h1>
      <pre>{isLoading ? "Loading..." : error ? `Error: ${error}` : JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default BookPage;
