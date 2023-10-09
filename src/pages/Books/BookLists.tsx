import { connect } from 'react-redux';
import ClipLoader from 'react-spinners/ClipLoader';
import { useNavigate } from 'react-router-dom';

import { fetchBooks } from '@/actions/books';

import AppState from '@/types/states/app';
import { Books } from '@/types/books';
import { QueryParams, PaginationMeta, BooksSort } from '@/types/query';

import Pagination from '@/components/Pagination/Pagination';
import SortIcon from '@/components/SortIcon/SortIcon';

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
  const { onApplyFilter, resetFilter, state, dispatch } = useListBooks({ fetchBooks });

  const setPageNumber = (pageNumber: number) => {
    dispatch({ type: 'SET_PAGE_NUMBER', payload: pageNumber });
  };

  const setSortParams = (parameter: keyof BooksSort) => {
    if (!parameter) return;
    let sortParameter;

    switch (state.sortParams[parameter]) {
      case 'asc':
        sortParameter = {
          [parameter]: 'desc',
        };
        break;

      case 'desc':
        sortParameter = {
          [parameter]: '',
        };
        break;

      default:
        sortParameter = {
          [parameter]: 'asc',
        };
    }

    dispatch({ type: 'SET_SORT_PARAMS', payload: { ...state.sortParams, ...sortParameter } });
  };

  const visitBookDetail = (id: string) => {
    let path = `/app/book/${id}`;
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
            <th
              onClick={() => {
                setSortParams('burrowedNumber');
              }}
            >
              <div className="table__column-sort">
                Burrowed Number
                <SortIcon sort={state.sortParams.burrowedNumber} />
              </div>
            </th>
            <th
              onClick={() => {
                setSortParams('addedAt');
              }}
            >
              <div className="table__column-sort">
                Added At
                <SortIcon sort={state.sortParams.addedAt} />
              </div>
            </th>
          </tr>
        </thead>
        {(!isLoadingFetchBooks && (
          <tbody data-test-id="book-table-body" className="table__body">
            {books.map((book) => {
              return (
                <tr
                  key={book.id}
                  onClick={() => {
                    visitBookDetail(book.id);
                  }}
                >
                  <td headers="title-column" className="table__column-image">
                    <img className="w-10 h-10 rounded-full" src={book.imageUrl} alt="book Cover" />
                    <div className="m-2">{book.title}</div>
                  </td>
                  <td headers="description-column">
                    <div className="table__column-ellipsis">{book.description}</div>
                  </td>
                  <td headers="category-column">{book.category}</td>
                  <td headers="burrowed-number-column">{book.burrowedNumber}</td>
                  <td headers="added-at-column">{book.addedAt}</td>
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
