import BlogPost from "./BlogPost";
import Pagination from "./Pagination";
import React, { useState } from "react";
import blogs from "../data/blogs.json";

const PAGE_SIZES = [15, 25, 50, 100];

function BlogList() {
  const [currentPage, setCurrentPage] = useState(1)
  const [currentPageSize, setPageSize] = useState(Number(15))
  const setPaginationData = blogs.posts.slice(0, currentPageSize)

  const updatePage = (page) => {
    setCurrentPage(page)
  };

  const updateRowsPerPage = (size) => {
    setPageSize(Number(size))
    setCurrentPage(1)
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
        {setPaginationData.map((blog) => (
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
