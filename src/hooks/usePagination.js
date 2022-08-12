import PropTypes, { InferProps } from "prop-types";
import { useMemo } from 'react'

export const DOTS = "...";

/**
 * Calculates correct pagination button format
 * 
 * @returns {Array} Containing correct pagination button format.
 */
function usePagination({
  currentPage,
  totalCount,
  pageSize,
}) {
  const paginationRange = useMemo(() => {

    /** totalPageCount calculated using Math.ceil to ensure extra page is not cut off */
    const totalPageCount = Math.ceil(totalCount / pageSize)

    /** handles lower page count */
    if (totalPageCount <= 3) {

      /** default */
      return range(1, totalPageCount)

    } else {

      /** defautl - [1 2 3 ... 13] beginning layout */
      if (currentPage < 3) {
        return [1, 2, 3, DOTS, totalPageCount]
      }

      /** [1 ... 2 3 4 ... 13] middle layout */
      if (currentPage > 2 && currentPage <= totalPageCount - 2) {
        return [1, DOTS, currentPage - 1, currentPage, currentPage + 1, DOTS, totalPageCount]
      }

      /** [1 ... 11 12 13] end layout */
      if (currentPage > totalPageCount - 2) {
        return [1, DOTS, totalPageCount - 2, totalPageCount - 1, totalPageCount]
      }
    }

  }, [currentPage, totalCount, pageSize])
  return paginationRange;
}

/**
 * Takes two numbers and returns an Array containing the params and the range of numbers between them.
 * @param {Number} start Number to start from
 * @param {Number} end Number to end at
 * @return {Array} Containing desired range
*/
function range(start, end) {
  return Array.from({ length: end - start + 1 }, (_, i) => i + start);
};

usePagination.propTypes = {
  totalCount: PropTypes.number,
  currentPage: PropTypes.number,
  pageSize: PropTypes.number,
};

usePagination.defaultProps = {
  totalCount: 0,
  currentPage: 1,
  pageSize: 1,
};

export default usePagination;
