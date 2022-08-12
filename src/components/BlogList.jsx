import BlogPost from "./BlogPost";
import Pagination from "./Pagination";
import React, { useState } from "react";
import blogs from "../data/blogs.json";

const PAGE_SIZES = [15, 25, 50, 100];

function BlogList() {

  /**
   * Several states and logic required to update page, content for each page, as well as handling page size
   * Todo - A refactor pass to combine into one state or create a separate hook to handle these states.
   */
  const [currentPage, setCurrentPage] = useState(1)
  const [currentPageSize, setPageSize] = useState(15)
  const [currentPaginationData, setPaginationData] = useState(blogs.posts.slice(0, currentPageSize))

  /**
   * Updates page by changing current page state as well as updates data state to be displayed.
   * @param {Number} page Current page number.
   */
  const updatePage = (page) => {
    setCurrentPage(page)
    /** handles default data state */
    if (page == 1) {
      setPaginationData(blogs.posts.slice(0, currentPageSize))
    } else {
      /** calculates correct data to retrive based on page and current page size. */
      setPaginationData(blogs.posts.slice(currentPageSize * (page - 1), currentPageSize * page))
    }
  };

  /**
   * Updates the page size and default data to display upon selection of desired page size.
   * @param {String} size Desired page size.
   */
  const updateRowsPerPage = (size) => {
    setPageSize(Number(size))
    setCurrentPage(1)
    setPaginationData(blogs.posts.slice(0, size))
  };

  return (
    <div>
      <Pagination
        currentPage={currentPage}
        totalCount={blogs.posts.length}
        pageSize={currentPageSize}
        pageSizeOptions={PAGE_SIZES}
        onPageChange={page => updatePage(page)}
        onPageSizeOptionChange={size => updateRowsPerPage(size)}
      />
      <ul
        // Do not remove the aria-label below, it is used for Hatchways automation.
        aria-label="blog list"
      >
        {currentPaginationData.map((blog) => (
          <BlogPost
            key={blog.id}
            author={blog.author}
            title={blog.title}
            excerpt={blog.excerpt}
            featureImage={blog.image}
          />
        ))}
      </ul>
    </div>
  );
}

export default BlogList;
