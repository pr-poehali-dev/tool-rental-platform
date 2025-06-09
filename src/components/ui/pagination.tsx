
import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
}

export function Pagination({ 
  currentPage, 
  totalPages, 
  onPageChange, 
  siblingCount = 1 
}: PaginationProps) {
  // Если страниц меньше или равно 7, показываем все страницы
  // Иначе используем эллипсис
  const shouldShowEllipsis = totalPages > 7;

  // Генерируем массив страниц для отображения
  const getPageNumbers = () => {
    if (!shouldShowEllipsis) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    const showLeftDots = leftSiblingIndex > 2;
    const showRightDots = rightSiblingIndex < totalPages - 1;

    if (!showLeftDots && showRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      return [...Array.from({ length: leftItemCount }, (_, i) => i + 1), "ellipsis", totalPages];
    }

    if (showLeftDots && !showRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      return [1, "ellipsis", ...Array.from(
        { length: rightItemCount }, 
        (_, i) => totalPages - rightItemCount + i + 1
      )];
    }

    if (showLeftDots && showRightDots) {
      return [
        1,
        "leftEllipsis",
        ...Array.from(
          { length: rightSiblingIndex - leftSiblingIndex + 1 },
          (_, i) => leftSiblingIndex + i
        ),
        "rightEllipsis",
        totalPages,
      ];
    }

    return Array.from({ length: totalPages }, (_, i) => i + 1);
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex gap-1">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
      >
        <ChevronLeft size={16} />
        <span className="sr-only">Предыдущая страница</span>
      </Button>

      {pageNumbers.map((pageNumber, i) => 
        pageNumber === "ellipsis" || pageNumber === "leftEllipsis" || pageNumber === "rightEllipsis" ? (
          <Button key={`ellipsis-${i}`} variant="outline" size="sm" disabled>
            <MoreHorizontal size={16} />
            <span className="sr-only">Больше страниц</span>
          </Button>
        ) : (
          <Button
            key={pageNumber}
            variant="outline"
            size="sm"
            className={currentPage === pageNumber ? "bg-primary text-white" : ""}
            onClick={() => onPageChange(pageNumber as number)}
          >
            {pageNumber}
          </Button>
        )
      )}

      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
      >
        <ChevronRight size={16} />
        <span className="sr-only">Следующая страница</span>
      </Button>
    </div>
  );
}
