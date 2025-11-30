import styled from 'styled-components';
import { useData } from './providers';

export function Pagination() {
  const { currentPage, totalPages, changePage, isFetching } = useData();

  const handlePageChange = (newPage) => {
    if (isFetching || newPage < 1 || newPage > totalPages) return;

    window.scrollTo({ top: 0, behavior: 'smooth' });
    changePage(newPage);
  };

  if (totalPages <= 1) return null;

  const getVisiblePages = () => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage <= 3) {
      return [1, 2, 3, 4, 5, '...', totalPages];
    }

    if (currentPage >= totalPages - 2) {
      return [
        1,
        '...',
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages
      ];
    }

    return [
      1,
      '...',
      currentPage - 1,
      currentPage,
      currentPage + 1,
      '...',
      totalPages
    ];
  };

  const visiblePages = getVisiblePages();

  return (
    <StyledPagination>
      <Page
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1 || isFetching}
      >
        ‹
      </Page>

      {visiblePages.map((page, index) =>
        page === '...' ? (
          <Ellipsis key={`ellipsis-${index}`}>...</Ellipsis>
        ) : (
          <Page
            key={page}
            active={page === currentPage}
            onClick={() => handlePageChange(page)}
            disabled={isFetching}
          >
            {page}
          </Page>
        )
      )}

      <Page
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages || isFetching}
      >
        ›
      </Page>
    </StyledPagination>
  );
}

const StyledPagination = styled.div`
  width: 100%;
  text-align: center;
`;

const Page = styled.span`
  color: #fff;
  font-size: 18px;
  padding: 5px;
  cursor: pointer;
  transition: color 0.2s;
  ${({ active }) => active && 'color: #83bf46'};
  ${({ disabled }) => disabled && 'opacity: 0.3; cursor: not-allowed;'};

  &:hover:not([disabled]) {
    color: #83bf46;
  }
`;

const Ellipsis = styled(Page)`
  cursor: default;

  &:hover {
    color: #fff;
  }
`;
