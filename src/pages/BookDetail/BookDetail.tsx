import * as React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

import ClipLoader from 'react-spinners/ClipLoader';

import { fetchBookDetail } from '@/actions/books';

import toast from '@/lib/toast';

import AppState from '@/types/states/app';
import { Books } from '@/types/books';

interface StatePropsInterface {
  bookDetail: Books;
  isLoadingFetchBookDetail: boolean;
}

interface DispatchPropsInterface {
  fetchBookDetail: (id: string) => void;
}

type BookDetailProps = StatePropsInterface & DispatchPropsInterface;

const BookDetail = (props: BookDetailProps) => {
  const { id } = useParams();

  const { fetchBookDetail, isLoadingFetchBookDetail, bookDetail } = props;

  React.useEffect(() => {
    async function getBookDetail() {
      try {
        if (!id) return;

        await fetchBookDetail(id);
      } catch (err: any) {
        toast(err.message, 'error');
      }
    }

    getBookDetail();
  }, [id]);

  return (
    (!isLoadingFetchBookDetail && (
      <>
        <section className="detail-book">
          <header className="detail-book__header" data-test-id="detail-book-header">
            Title: {bookDetail && bookDetail.title?.toUpperCase()}
          </header>
          <p className="detail-book__info" data-test-id="detail-book-status">{`Status: ${status}`}</p>
          <p className="detail-book__info" data-test-id="detail-book-link-counts">
            Description: {bookDetail?.description || 0}
          </p>
          <p className="detail-book__info" data-test-id="detail-book-ad-counts">
            Category: {bookDetail?.category || 0}
          </p>
          <p className="detail-book__info" data-test-id="detail-book-non-ad-counts">
            Burrowed: {bookDetail?.burrowedNumber || 0} times
          </p>
          <p className="detail-book__info" data-test-id="detail-book-search-engine">
            Added Date: {bookDetail?.addedAt}
          </p>
          <button data-test-id="detail-book-download" className="button button--primary detail-book__button">
            Borrow Book
          </button>
        </section>
      </>
    )) || <ClipLoader />
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    bookDetail: state.data.books.bookDetail,
    isLoadingFetchBookDetail: state.ui.books.isLoadingFetchBookDetail,
  };
};

const mapDispatchToProps = {
  fetchBookDetail,
};

export default connect<StatePropsInterface, DispatchPropsInterface>(mapStateToProps, mapDispatchToProps)(BookDetail);
