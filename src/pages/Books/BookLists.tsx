import { connect } from 'react-redux';
import ClipLoader from 'react-spinners/ClipLoader';
import { useNavigate } from 'react-router-dom';

import { fetchBooks } from '@/actions/books';

import AppState from '@/types/states/app';
import { Books } from '@/types/books';
import { QueryParams, PaginationMeta } from '@/types/query';

import Pagination from '@/components/Pagination/Pagination';

import FilterForm from './FilterForm';
import { useListBooks } from './hooks';

interface StatePropsInterface {
  books: Books[];
  isLoadingFetchBooks: boolean;
  meta: PaginationMeta;
}

interface DispatchPropsInterface {
  fetchBooks: (queryParams: QueryParams) => void;
}

type BookListProps = StatePropsInterface & DispatchPropsInterface;

const BookList = (props: BookListProps) => {
  const { books, fetchBooks, isLoadingFetchBooks, meta } = props;

  const navigate = useNavigate();
  const { onApplyFilter, resetFilter, state: _state, dispatch } = useListBooks({ fetchBooks });

  const setPageNumber = (pageNumber: number) => {
    dispatch({ type: 'SET_PAGE_NUMBER', payload: pageNumber });
  };

  const visitBookDetail = (id: string) => {
    let path = `/app/results/${id}`;
    navigate(path);
  };

  return (
    <section className="list-books">
      <header className="list-books__header">
        <FilterForm onApplyFilter={onApplyFilter} onResetFilter={resetFilter} />
      </header>
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
        {(!isLoadingFetchBooks && (
          <tbody data-test-id="search-table-body" className="table__body">
            {books.map((book) => {
              return (
                <tr
                  key={book.id}
                  onClick={() => {
                    visitBookDetail(book.id);
                  }}
                >
                  <td headers="keyword-column">{book.title}</td>
                  <td headers="total-links-count-column">{book.description || 0}</td>
                  <td headers="status-column"></td>
                  <td headers="search-engine-column">{book.burrowedNumber || ''}</td>
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

const mapStateToProps = (state: AppState) => {
  return {
    books: state.data.books.books,
    meta: state.data.books.meta,
    isLoadingFetchBooks: state.ui.books.isLoadingFetchBooks,
  };
};

const mapDispatchToProps = {
  fetchBooks,
};

export default connect<StatePropsInterface, DispatchPropsInterface>(mapStateToProps, mapDispatchToProps)(BookList);
