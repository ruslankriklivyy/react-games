import React from 'react';
import styled from 'styled-components';

import createPages from '../utils/createPages';

interface IPaginator {
  currentPage: number;
  totalPages: number;
  onSelectPage: (pageNumber: number) => void;
}

export const Paginator: React.FC<IPaginator> = ({ currentPage, totalPages, onSelectPage }) => {
  const perPage = 5;
  const countPages = Math.ceil(totalPages / perPage);
  const pages: Array<number> = [];

  createPages(pages, countPages, currentPage);

  return (
    <PaginatorWrapper>
      <ul>
        {pages.map((page, index) => (
          <li
            className={page === currentPage ? 'active' : ''}
            key={index}
            onClick={() => onSelectPage(page)}>
            {page}
          </li>
        ))}
      </ul>
    </PaginatorWrapper>
  );
};

const PaginatorWrapper = styled.div`
  ul {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
    li {
      font-weight: 500;
      font-size: 18px;
      margin: 0 7px;
      cursor: pointer;
      &.active {
        color: #0581aa;
      }
    }
  }
`;
