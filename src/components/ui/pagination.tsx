
import {
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { ButtonProps, buttonVariants } from "@/components/ui/button"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  className?: string
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  className,
}: PaginationProps) => {
  // Функция для создания массива страниц с учетом эллипсисов
  const generatePagination = () => {
    // Если страниц мало, показываем все
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    
    // Всегда показываем первую и последнюю страницу
    // и несколько страниц вокруг текущей
    const pages = [];
    
    // Добавляем первую страницу
    pages.push(1);
    
    // Добавляем эллипсис, если текущая страница не близка к началу
    if (currentPage > 3) {
      pages.push(-1); // -1 означает эллипсис
    }
    
    // Добавляем страницы вокруг текущей
    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    // Добавляем эллипсис, если текущая страница не близка к концу
    if (currentPage < totalPages - 2) {
      pages.push(-2); // -2 означает второй эллипсис
    }
    
    // Добавляем последнюю страницу
    if (totalPages > 1) {
      pages.push(totalPages);
    }
    
    return pages;
  };
  
  const pages = generatePagination();
  
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
    >
      <ul className="flex flex-row items-center gap-1">
        <li>
          <PaginationLink
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            aria-label="Go to previous page"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous</span>
          </PaginationLink>
        </li>
        
        {pages.map((page, i) => {
          // Если это эллипсис
          if (page < 0) {
            return (
              <li key={`ellipsis-${i}`}>
                <span className="flex h-9 w-9 items-center justify-center">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">More pages</span>
                </span>
              </li>
            );
          }
          
          // Обычная страница
          return (
            <li key={page}>
              <PaginationLink
                onClick={() => onPageChange(page)}
                isActive={page === currentPage}
                aria-label={`Go to page ${page}`}
                aria-current={page === currentPage ? "page" : undefined}
              >
                {page}
              </PaginationLink>
            </li>
          );
        })}
        
        <li>
          <PaginationLink
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages || totalPages === 0}
            aria-label="Go to next page"
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next</span>
          </PaginationLink>
        </li>
      </ul>
    </nav>
  );
};

interface PaginationLinkProps extends ButtonProps {
  isActive?: boolean;
  disabled?: boolean;
}

const PaginationLink = ({
  className,
  isActive,
  disabled,
  onClick,
  children,
  ...props
}: PaginationLinkProps) => (
  <button
    onClick={onClick}
    className={cn(
      buttonVariants({
        variant: isActive ? "default" : "outline",
        size: "icon",
      }),
      disabled && "pointer-events-none opacity-50",
      className
    )}
    disabled={disabled}
    {...props}
  >
    {children}
  </button>
);

export { Pagination, PaginationLink };
