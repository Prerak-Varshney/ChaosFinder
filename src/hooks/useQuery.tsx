"use client";
import { useEffect, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";

const useQuery = (query: string, searchType: string, page?: number, limit?: number, offset?: number) => {
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (pathname !== "/") return;

        const params = new URLSearchParams();
        if( searchType === "Genre") {
            router.replace(`/${params.toString() ? "?" + params.toString() : ""}`, {
                scroll: false,
            });
            return;
        }

        if (query.trim()) {
            params.set("q", encodeURIComponent(query));
            params.set("type", searchType);

            if (page && page > 0) params.set("page", page.toString());
            if (limit && limit > 0) params.set("limit", limit.toString());
            if (offset && offset > 0) params.set("offset", offset.toString());

        } else {
            params.delete("q");
            params.delete("type");
            params.delete("page");
            params.delete("limit");
            params.delete("offset");
        }

        router.replace(`/${params.toString() ? "?" + params.toString() : ""}`, {
            scroll: false,
        });

    }, [query, searchType, page, limit, offset, router, pathname]);
};

export const useHandleKeyPressQuery = (
  query: string,
  searchType: string,
  page?: number,
  limit?: number,
  offset?: number
) => {
  const router = useRouter();

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        const params = new URLSearchParams();

        if (query.trim()) {
          params.set("q", query);
          params.set("type", searchType);
          if (page && page > 0) params.set("page", page.toString());
          if (limit && limit > 0) params.set("limit", limit.toString());
          if (offset && offset > 0) params.set("offset", offset.toString());
        }

        router.push(`/${params.toString() ? "?" + params.toString() : ""}`);
      }
    },
    [query, searchType, page, limit, offset, router]
  );

  return handleKeyDown;
};


export default useQuery;