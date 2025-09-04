"use client";
import { useState, useEffect } from "react";
import { BASE_URL, FETCH_LIMIT } from "../constants/constants";
import axios from "axios";

const useAxios = (url: string, type: "book" | "author" = "book") => {
  const [data, setData] = useState(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [responseCount, setResponseCount] = useState<number>(0);
  const [pageCount, setPageCount] = useState<number>(0);

  useEffect(() => {
    if (!url) return;

    const controller = new AbortController();
    const delay = setTimeout(async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${BASE_URL}${url}`, {
          signal: controller.signal,
        });

        setData(response.data);
        setResponseCount(() => type === 'book' ? response.data.numFound : response.data.size);
        setPageCount(Math.ceil(responseCount / FETCH_LIMIT));

      } catch (err) {
        if (axios.isCancel(err)) {
          console.log("Request canceled:", err.message);
        } else {
          setError("Error fetching data");
        }
      } finally {
        setIsLoading(false);
      }
    }, 400); // debounce (400ms)

    return () => {
      clearTimeout(delay);
      controller.abort(); // cancel old request when url changes
    };
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return { data, error, isLoading, responseCount, pageCount };
};

export default useAxios;
