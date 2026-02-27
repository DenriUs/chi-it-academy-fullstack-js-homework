import { useMemo } from 'react';
import Link from 'next/link';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

import { getNumbersRange } from '@/lib/array.helpers';
import { createNewSearchParams } from '@/lib/search-params/search-params.helpers';

import {
  Pagination as UIPagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from './ui/Pagination';

import { Button } from './ui/Button';

type BoundaryElement = {
  value: number;
};

const getPaginationElements = (page: number, lastPage: number, siblingsPerSideCount = 1) => {
  const edgeElementsPerSideCount = 1;
  const restElementsCount = 3;

  const totalEdgeElementsCount = edgeElementsPerSideCount * 2;
  const totalSiblingsCount = siblingsPerSideCount * 2;

  const reservedSlotsCount = totalEdgeElementsCount + totalSiblingsCount + restElementsCount;
  if (lastPage <= reservedSlotsCount) {
    return getNumbersRange(1, lastPage);
  }

  const leftBoundaryIndex = page - siblingsPerSideCount - 1;
  const rightBoundaryIndex = page + siblingsPerSideCount + 1;

  const isLeftOutOfBoundary = leftBoundaryIndex >= edgeElementsPerSideCount + siblingsPerSideCount;
  const isRightOutOfBoundary = rightBoundaryIndex < lastPage - edgeElementsPerSideCount;

  const leftBoundaryElement: BoundaryElement = {
    value: leftBoundaryIndex,
  };
  const rightBoundaryElement: BoundaryElement = {
    value: rightBoundaryIndex,
  };

  if (isLeftOutOfBoundary && !isRightOutOfBoundary) {
    return [
      1,
      leftBoundaryElement,
      ...getNumbersRange(lastPage - reservedSlotsCount + restElementsCount, lastPage),
    ];
  }

  if (isLeftOutOfBoundary && isRightOutOfBoundary) {
    return [
      1,
      leftBoundaryElement,
      ...getNumbersRange(leftBoundaryIndex + 1, rightBoundaryIndex - 1),
      rightBoundaryElement,
      lastPage,
    ];
  }

  if (!isLeftOutOfBoundary && isRightOutOfBoundary) {
    return [
      ...getNumbersRange(1, reservedSlotsCount - edgeElementsPerSideCount - 1),
      rightBoundaryElement,
      lastPage,
    ];
  }

  return getNumbersRange(1, lastPage);
};

type PaginationProps = {
  path: string;
  page: number;
  total: number;
  lastPage: number;
  limit: number;
};

export function Pagination({ path, page, lastPage, limit }: PaginationProps) {
  const elements = useMemo(() => getPaginationElements(page, lastPage, 2), [page, lastPage]);

  return (
    <UIPagination>
      <PaginationContent>
        <PaginationItem>
          <Button variant='ghost' size='icon' disabled={page === 1}>
            <Link
              href={`${path}?${createNewSearchParams({ page: page === 1 ? page : page - 1, limit }).toString()}`}
            >
              <ChevronLeftIcon className='size-5' />
            </Link>
          </Button>
        </PaginationItem>

        {elements.map((element, index) => (
          <PaginationItem key={index}>
            <PaginationLink isActive={page === element} asChild>
              {typeof element === 'object' ? (
                <Link
                  href={`${path}?${createNewSearchParams({ page: element.value, limit }).toString()}`}
                >
                  <PaginationEllipsis />
                </Link>
              ) : (
                <Link
                  href={`${path}?${createNewSearchParams({ page: element, limit }).toString()}`}
                >
                  {element}
                </Link>
              )}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <Button variant='ghost' size='icon' disabled={page === lastPage}>
            <Link
              href={`${path}?${createNewSearchParams({ page: page === lastPage ? page : page + 1, limit }).toString()}`}
            >
              <ChevronRightIcon className='size-5' />
            </Link>
          </Button>
        </PaginationItem>
      </PaginationContent>
    </UIPagination>
  );
}
