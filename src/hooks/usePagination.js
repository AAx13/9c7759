import { useMemo } from 'react'
export const DOTS = "...";

/*
    Rewrite the logic here to map out the pagination to be displayed

    !!!!!! ATTENTION !!!!!!
    Please replace this comment here with a description of this hook.
    
  */
function usePagination({
  currentPage,
  totalCount,
  pageSize,
}) {
  const paginationRange = useMemo(() => {

    const totalPageCount = Math.ceil(totalCount / pageSize)

    // debug
    console.log(totalPageCount, totalCount, pageSize, currentPage)
 
    // default
    if (currentPage == 1) {
      return [1, 2, 3, DOTS, totalPageCount]
    }

    // [1] single page
    if (totalPageCount == 1) {
      return [1]
    }

    // [1 ... 2 3 4 ... 13] middle layout
    if (currentPage > 2 && currentPage <= totalPageCount - 2) {
      return [1, DOTS, currentPage - 1, currentPage, currentPage + 1, DOTS, totalPageCount]
    }

    // [1 2 3 ... 13] beginning layout
    if (currentPage < 3) {
      return [1, 2, 3, DOTS, totalPageCount]
    }

    // [1 ... 11 12 13] end layout
    if (currentPage > totalPageCount - 2) {
      return [1, DOTS, totalPageCount - 2, totalPageCount - 1, totalPageCount]
    }
    
  }, [currentPage, totalCount, pageSize])
  return paginationRange;
}

export default usePagination;
