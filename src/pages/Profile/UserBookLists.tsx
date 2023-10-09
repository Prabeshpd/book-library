import { useState, useEffect } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import { useNavigate } from 'react-router-dom';

import Pagination from '@/components/Pagination/Pagination';
import { PAGINATION_CURRENT_PAGE, PAGINATION_LIMIT } from '@/constants/constants';

import toast from '@/lib/toast';

import { PaginationMeta, PageQueryParams } from '@/types/query';
import { UserBook } from '@/types/userBooks';

interface BookListProps {
  meta: PaginationMeta;
  userBooks: UserBook[];
  isLoadingFetchUserBooks: boolean;
  fetchUserBooks: (userId: string, pageQueryParams: PageQueryParams) => void;
  userId: string;
}

const UserBookList = (props: BookListProps) => {
  const { userBooks, isLoadingFetchUserBooks, meta, userId, fetchUserBooks } = props;

  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState<number>(PAGINATION_CURRENT_PAGE);

  const setPageNumber = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const getQueryParams = () => ({
    _limit: PAGINATION_LIMIT,
    _page: currentPage,
  });

  const visitBookDetail = (id: string) => {
    let path = `/app/book/${id}`;
    navigate(path);
  };

  useEffect(() => {
    async function listUserBooks() {
      try {
        const paginationParams = getQueryParams();
        await fetchUserBooks(userId, paginationParams);
      } catch (err) {
        toast('Unable to fetch the user books', 'error');
      }
    }

    listUserBooks();
  }, [currentPage]);

  return (
    <section className="user-book-list">
      <header className="user-book-list__header">Book Burrowed</header>
      <table className="table">
        <thead className="table__head">
          <tr data-test-id="table-header-columns">
            <th>Title</th>
            <th>Description</th>
            <th>Category</th>
            <th>Burrowed Number</th>
            <th>Added At</th>
          </tr>
        </thead>
        {(!isLoadingFetchUserBooks && (
          <tbody data-test-id="search-table-body" className="table__body">
            {userBooks.map((userBook) => {
              const { book } = userBook;
              return (
                <tr
                  key={userBook.id}
                  onClick={() => {
                    visitBookDetail(userBook.book.id);
                  }}
                >
                  <td headers="keyword-column" className="table__column-image">
                    <img className="w-10 h-10 rounded-full" src={book.imageUrl} alt="book Cover" />
                    <div className="m-2">{book.title}</div>
                  </td>
                  <td headers="total-links-count-column">
                    <div className="table__column-ellipsis">{book.description}</div>
                  </td>
                  <td headers="status-column">{book.category}</td>
                  <td headers="search-engine-column">{book.burrowedNumber}</td>
                  <td headers="search-engine-column">{book.addedAt}</td>
                </tr>
              );
            })}
          </tbody>
        )) || <ClipLoader />}
      </table>
      <Pagination
        totalPageCount={Math.ceil(meta.totalCounts / meta.limit)}
        perPageLimit={meta.limit}
        currentPage={meta.currentPage}
        handleChange={(number: number) => {
          setPageNumber(number);
        }}
        totalRowCount={meta.totalCounts}
      />
    </section>
  );
};

export default UserBookList;
