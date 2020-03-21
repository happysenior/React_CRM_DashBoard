import React from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

function makePageNumbers(props) {
  let result = [];
  let oneToFive = [1, 2, 3, 4, 5, -1];
  if (props.lastPage < 6) {
    for (let i = 1; i <= props.lastPage; i++) result.push(i);
    return result;
  }
  if (props.page <= 3) {
    result = result.concat(oneToFive);
    result.push(props.lastPage);
    return result;
  }
  if (props.lastPage - 3 < props.page) {
    result = [1, -1];
    for (let i = props.lastPage - 4; i <= props.lastPage; i++) {
      result.push(i);
    }
    return result;
  }

  result = [1, -1];
  for (let i = props.page - 2; i <= props.page + 2; i++) {
    result.push(i);
  }
  result.push(-1);
  result.push(props.lastPage);
  return result;
}

export default function Paginator(props) {
  const pageNumbers = makePageNumbers(props);
  return (
    <div className="prospect-pagination">
      <Pagination className="mx-auto">
        {props.page !== 1 ? (
          <PaginationItem className="prev-page">
            <PaginationLink
              previous
              onClick={() => props.goTo(props.page - 1)}
            />
          </PaginationItem>
        ) : null}
        {pageNumbers
          ? pageNumbers.map((x, i) => {
              return (
                <PaginationItem
                  active={x === props.page}
                  disabled={x < 0}
                  key={`nav${x}_${i}}`}
                >
                  {x < 0 ? (
                    <PaginationLink>...</PaginationLink>
                  ) : (
                    <PaginationLink
                      onClick={() => {
                        props.goTo(x);
                      }}
                    >
                      {x}
                    </PaginationLink>
                  )}
                </PaginationItem>
              );
            })
          : null}
        {props.lastPage !== props.page ? (
          <PaginationItem className="next-page">
            <PaginationLink
              next
              onClick={() => {
                props.goTo(props.page + 1);
              }}
            />
          </PaginationItem>
        ) : null}
      </Pagination>
    </div>
  );
}
