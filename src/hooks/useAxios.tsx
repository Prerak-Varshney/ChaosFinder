"use client";
import { useState, useEffect, useCallback } from "react";
import { BASE_URL } from "../constants/constants";
import axios from "axios";
import { FETCH_LIMIT } from "../constants/constants";

const useAxios = (url: string) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [responseCount, setResponseCount] = useState<number>(0);
  const [pageCount, setPageCount] = useState<number>(0);
  
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}${url}`);
      setData(response.data);
      setResponseCount(response.data.numFound);
      setPageCount(Math.ceil(response.data.numFound / FETCH_LIMIT));
    } catch (err) {
      setError("Error fetching data");
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, error, isLoading, responseCount, pageCount, refetch: fetchData };
};

export default useAxios;
