import { useMemo } from "react";

export const DOTS = '...';

export const usePagination = ({totalCount, pageSize, siblingCount = 1, currentPage}) => {
  const paginationRange = useMemo(() => {
    // debugger;
    const totalPageCount = Math.ceil(totalCount / pageSize);

    const range = (start, end) => {
      let length = end - start + 1;
      return Array.from({length}, (_, idx) => idx + start)
    }

    const totalPageNumbers = siblingCount + 5;

    //condition 1 - (see bottom)
    if (totalPageNumbers >= totalPageCount){
      return range(1, totalPageCount)
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPageCount);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    //condition 2 - (see bottom)
    if(!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 3 + 2 * siblingCount;
      let leftRange = range(1, leftItemCount);

      return [...leftRange, DOTS, totalPageCount]
    }

    //condition 3 - (see below)
    if(shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 3 + 2 * siblingCount;
      let rightRange = range(totalPageCount - rightItemCount + 1, totalPageCount)

      return [firstPageIndex, DOTS, ...rightRange]
    }

    //condition 4 - (see below)
    if(shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex) 
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex]
    }


  }, [totalCount, pageSize, siblingCount, currentPage]);

  return paginationRange;
}

/* 
Code inspired from https://www.freecodecamp.org/news/build-a-custom-pagination-component-in-react/

4 conditions:
- Total page count is less than the page pills we want to show. In such a case we just return the range from 1 to totalPageCount.
- Total page count is greater than the page pills but only the right DOTS are visible.
- Total page count is greater than the page pills but only the left DOTS are visible.
- Total page count is greater than the page pills and both the left and the right DOTS are visible.
*/