import { Button } from "@heroui/react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  startIndex: number;
  endIndex: number;
  onPageChange: (page: number) => void;
  itemLabel?: string;
}

export function Pagination({
  currentPage,
  totalPages,
  totalItems,
  startIndex,
  endIndex,
  onPageChange,
  itemLabel = "elementos",
}: PaginationProps) {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="border-divider flex items-center justify-center border-t px-6 py-4 md:justify-between">
      <p className="text-muted hidden text-sm md:block">
        Mostrando {startIndex + 1} a {Math.min(endIndex, totalItems)} de {totalItems} {itemLabel}
      </p>
      <div className="flex items-center gap-2">
        <Button size="sm" variant="tertiary" isDisabled={currentPage === 1} onPress={handlePrevious}>
          <span className="icon-[heroicons--chevron-left]" />
          <span className="hidden md:inline-block">Anterior</span>
        </Button>
        <div className="flex gap-1">
          {(() => {
            // Calcular el rango de páginas a mostrar (3 páginas)
            let startPage = Math.max(1, currentPage - 1);
            const endPage = Math.min(totalPages, startPage + 2);

            // Ajustar si estamos cerca del final
            if (endPage - startPage < 2) {
              startPage = Math.max(1, endPage - 2);
            }

            return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((page) => (
              <Button
                key={page}
                size="sm"
                variant={currentPage === page ? "tertiary" : "ghost"}
                onPress={() => onPageChange(page)}
                className="min-w-10"
              >
                {page}
              </Button>
            ));
          })()}
        </div>
        <Button size="sm" variant="tertiary" isDisabled={currentPage === totalPages} onPress={handleNext}>
          <span className="hidden md:inline-block">Siguiente</span>
          <span className="icon-[heroicons--chevron-right]" />
        </Button>
      </div>
    </div>
  );
}
