"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "./button";
import { useTransition } from "react";

interface PaginationProps {
  count: number;
  countPerPage: number;
}

export function Pagination({ count, countPerPage }: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const totalPages = Math.ceil(count / countPerPage);
  const currentOffset = Number.parseInt(searchParams.get("offset") || "0");
  const currentPage = currentOffset + 1;

  const getPageNumbers = (isMobile: boolean) => {
    const pages: (number | string)[] = [];
    const firstPagesToShow = isMobile ? 1 : 5;

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      for (let i = 1; i <= firstPagesToShow; i++) {
        pages.push(i);
      }

      if (currentPage > firstPagesToShow && currentPage < totalPages) {
        if (currentPage > firstPagesToShow + 1) {
          pages.push("...");
        }
        pages.push(currentPage);
      }

      if (currentPage < totalPages - 1 && currentPage <= firstPagesToShow) {
        pages.push("...");
      } else if (
        currentPage > firstPagesToShow &&
        currentPage < totalPages - 1
      ) {
        pages.push("...");
      }

      pages.push(totalPages);
    }

    return pages;
  };

  const handlePageChange = (page: number) => {
    const offset = page - 1;
    const limit = countPerPage;

    const params = new URLSearchParams(searchParams);
    params.set("offset", offset.toString());
    params.set("limit", limit.toString());

    startTransition(() => {
      router.push(`?${params.toString()}`);
    });
  };

  const mobilePageNumbers = getPageNumbers(true);
  const desktopPageNumbers = getPageNumbers(false);

  return (
    <div className="flex flex-col items-center gap-2 md:gap-4">
      <div className="hidden md:flex items-center gap-1 lg:gap-2">
        <Button
          variant="flat"
          size="sm"
          color="default"
          isDisabled={currentPage === 1 || isPending}
          onClick={() => handlePageChange(currentPage - 1)}
          className="bg-white"
          startContent="‹"
        >
          Previous
        </Button>

        {desktopPageNumbers.map((page, index) => {
          if (page === "...") {
            return (
              <span
                key={`ellipsis-${index}`}
                className="px-1 lg:px-2 text-muted-foreground text-xs lg:text-sm"
              >
                ...
              </span>
            );
          }

          const pageNum = page as number;
          const isActive = pageNum === currentPage;

          return (
            <Button
              key={pageNum}
              variant="flat"
              size="sm"
              color={isActive ? "default" : "default"}
              onClick={() => handlePageChange(pageNum)}
              isDisabled={isPending}
              className={
                isActive ? "bg-foreground text-background" : "bg-white"
              }
            >
              {pageNum}
            </Button>
          );
        })}

        <Button
          variant="flat"
          size="sm"
          color="default"
          isDisabled={currentPage === totalPages || isPending}
          onClick={() => handlePageChange(currentPage + 1)}
          className="bg-white"
          endContent="›"
        >
          Next
        </Button>
      </div>

      <div className="flex md:hidden items-center gap-1">
        <Button
          variant="flat"
          size="md"
          color="default"
          isDisabled={currentPage === 1 || isPending}
          onClick={() => handlePageChange(currentPage - 1)}
          className="px-2 bg-white"
        >
          ‹
        </Button>

        {mobilePageNumbers.map((page, index) => {
          if (page === "...") {
            return (
              <span
                key={`ellipsis-${index}`}
                className="px-1 text-muted-foreground text-xs"
              >
                ...
              </span>
            );
          }

          const pageNum = page as number;
          const isActive = pageNum === currentPage;

          return (
            <Button
              key={pageNum}
              variant="flat"
              size="sm"
              color={isActive ? "default" : "default"}
              onClick={() => handlePageChange(pageNum)}
              isDisabled={isPending}
              className={
                isActive ? "bg-foreground text-background" : "bg-white"
              }
            >
              {pageNum}
            </Button>
          );
        })}

        <Button
          variant="flat"
          size="md"
          color="default"
          isDisabled={currentPage === totalPages || isPending}
          onClick={() => handlePageChange(currentPage + 1)}
          className="px-2 bg-white"
        >
          ›
        </Button>
      </div>

      <p className="text-xs md:text-sm text-muted-foreground">
        Page {currentPage} of {totalPages} ({countPerPage} items shown)
      </p>
    </div>
  );
}
