"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { DEFAULT_SEARCH_LIMIT } from "@/lib/constants";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface CourtSearchPaginationProps {
  totalItems: number; // Total number of items found.
  currentPage?: number; // Current page number.
}

export default function SearchPagination({
  totalItems,
  currentPage = 1,
}: CourtSearchPaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const totalPages = Math.ceil(totalItems / DEFAULT_SEARCH_LIMIT);

  const handlePageChange = (page: number) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("page", `${page}`);

    router.push(`${pathname}?${newParams}`);
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className={
              currentPage < 2
                ? "pointer-events-none opacity-50"
                : "cursor-pointer"
            }
            onClick={() => handlePageChange(Number(currentPage) - 1)}
          />
        </PaginationItem>

        {Array.from({ length: totalPages }).map((_, idx) => (
          <PaginationItem key={idx}>
            <PaginationLink
              className="cursor-pointer"
              onClick={() => handlePageChange(idx + 1)}
              isActive={currentPage == idx + 1}
            >
              {idx + 1}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            className={
              currentPage >= totalPages
                ? "pointer-events-none opacity-50"
                : "cursor-pointer"
            }
            onClick={() => handlePageChange(Number(currentPage) + 1)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
