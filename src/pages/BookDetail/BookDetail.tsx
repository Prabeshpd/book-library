import * as React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

import ClipLoader from 'react-spinners/ClipLoader';

import { fetchBookDetail } from '@/actions/books';

import toast from '@/lib/toast';

import { borrowBooks } from '@/services/userBooks';
import AppState from '@/types/states/app';
import { Books } from '@/types/books';

interface StatePropsInterface {
  bookDetail: Books;
  userId: string;
  isLoadingFetchBookDetail: boolean;
}

interface DispatchPropsInterface {
  fetchBookDetail: (id: string) => void;
}

type BookDetailProps = StatePropsInterface & DispatchPropsInterface;

const BookDetail = (props: BookDetailProps) => {
  const { id } = useParams();

  const { fetchBookDetail, isLoadingFetchBookDetail, bookDetail, userId } = props;

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

  const borrowBook = async () => {
    if (!id) return;

    try {
      await borrowBooks(userId, id);
    } catch (err) {
      toast('The book could not be borrowed. Sorry, for the inconvenience', 'error');
    }
  };

  return (
    (!isLoadingFetchBookDetail && (
      <div className="detail-book">
        <section className="detail-book__card">
          <img className="detail-book__image" src={bookDetail.imageUrl} alt="image description" />
          <div className="m-5">
            <header className="detail-book__header" data-test-id="detail-book-header">
              Title: {bookDetail && bookDetail.title?.toUpperCase()}
            </header>
            <p className="detail-book__info" data-test-id="detail-book-link-counts">
              Description: {bookDetail?.description}
            </p>
            <p className="detail-book__info" data-test-id="detail-book-ad-counts">
              Category: {bookDetail?.category}
            </p>
            <p className="detail-book__info" data-test-id="detail-book-non-ad-counts">
              Burrowed: {bookDetail?.burrowedNumber} times
            </p>
            <p className="detail-book__info" data-test-id="detail-book-search-engine">
              Added Date: {bookDetail?.addedAt}
            </p>
            <button
              onClick={borrowBook}
              data-test-id="detail-book-download"
              className="button button--primary detail-book__button"
            >
              Borrow Book
            </button>
          </div>
        </section>
      </div>
    )) || <ClipLoader />
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    bookDetail: state.data.books.bookDetail,
    isLoadingFetchBookDetail: state.ui.books.isLoadingFetchBookDetail,
    userId: state.data.users.user.id,
  };
};

const mapDispatchToProps = {
  fetchBookDetail,
};

export default connect<StatePropsInterface, DispatchPropsInterface>(mapStateToProps, mapDispatchToProps)(BookDetail);
