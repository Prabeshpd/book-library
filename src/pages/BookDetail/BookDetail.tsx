import * as React from 'react';
import { useParams } from 'react-router-dom';

import ClipLoader from 'react-spinners/ClipLoader';

import { borrowBooks } from '@/adapters/userBooks';
import { useAppDispatch, useAppSelector } from '@/hooks/store';
import toast from '@/lib/toast';
import { fetchBookDetail } from '@/reducers/Books/actions';

const BookDetail = () => {
  const { id } = useParams();

  const { book: bookDetail, isLoadingFetchBookDetail } = useAppSelector((state) => state.books);
  const userId = useAppSelector((state) => state.users.user.id);
  const dispatch = useAppDispatch();

  const getBookDetail = async () => {
    try {
      if (!id) return;

      await dispatch(fetchBookDetail(id));
    } catch (err: any) {
      toast(err.message, 'error');
    }
  };

  React.useEffect(() => {
    getBookDetail();
  }, [id]);

  const borrowBook = async () => {
    if (!id) return;

    try {
      await borrowBooks({ userId, bookId: id });
      await getBookDetail();
      toast('Book has been borrowed', 'success');
    } catch (err) {
      toast('The book could not be borrowed. Sorry, for the inconvenience', 'error');
    }
  };

  const isBookBorrowed = () => {
    const filter = bookDetail.userBooks.filter((userBook) => userBook.userId === userId);

    return filter.length !== 0;
  };

  return (
    (!isLoadingFetchBookDetail && (
      <div className="detail-book">
        <section className="detail-book__card">
          <img className="detail-book__image" src={bookDetail.imageUrl} alt="image description" />
          <div className="m-5">
            <header className="detail-book__header" data-test-id="detail-book-title">
              Title: {bookDetail && bookDetail.title?.toUpperCase()}
            </header>
            <p className="detail-book__info" data-test-id="detail-book-description">
              Description: {bookDetail?.description}
            </p>
            <p className="detail-book__info" data-test-id="detail-book-category">
              Category: {bookDetail?.category}
            </p>
            <p className="detail-book__info" data-test-id="detail-book-burrowed-number">
              Burrowed: {bookDetail?.burrowedNumber} times
            </p>
            <p className="detail-book__info" data-test-id="detail-book-added-at">
              Added Date: {bookDetail?.addedAt}
            </p>
            {(!isBookBorrowed() && (
              <button
                onClick={borrowBook}
                data-test-id="detail-book-borrow"
                className="button button--primary detail-book__button"
              >
                Borrow Book
              </button>
            )) || <p data-test-id="detail-book-borrowed">Already Borrowed</p>}
          </div>
        </section>
      </div>
    )) || <ClipLoader />
  );
};

export default BookDetail;
