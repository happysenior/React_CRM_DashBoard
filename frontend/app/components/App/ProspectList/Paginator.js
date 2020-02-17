import React from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

export default function Paginator() {
  return (
    <div className="prospect-pagination">
      <Pagination className="mx-auto">
        <PaginationItem className="first-page">
          <PaginationLink previous href="#" />
        </PaginationItem>
        <PaginationItem active>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">2</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">4</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">5</PaginationLink>
        </PaginationItem>
        <PaginationItem className="last-page">
          <PaginationLink next href="#" />
        </PaginationItem>
      </Pagination>
    </div>
  );
}
